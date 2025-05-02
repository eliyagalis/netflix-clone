import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { inject, injectable } from 'inversify';
import { TOKENS } from '../tokens';
import { EventBus, EventTypes } from '../utils/eventBus';

@injectable()
export class KafkaConsumer {
  private consumer: Consumer;
  private isConnected: boolean = false;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private readonly reconnectInterval = 5000; // 5 seconds
  private isConsuming: boolean = false;

  constructor(
    @inject(TOKENS.EventBus) private eventBus: EventBus
  ) {
    const kafka = new Kafka({
      clientId: 'user-service',
      brokers: ['kafka:9092'],
      retry: {
        initialRetryTime: 100,
        retries: 8
      }
    });

    this.consumer = kafka.consumer({
      groupId: 'user-service-group',
      heartbeatInterval: 3000,
      sessionTimeout: 30000
    });

    // Add event listeners for better connection management
    this.consumer.on('consumer.disconnect', () => {
      console.warn('Kafka consumer disconnected');
      this.isConnected = false;
      this.isConsuming = false;
      this.scheduleReconnect();
    });
    this.consumer.on('consumer.connect', () => {
      console.log('Kafka consumer connected');
      this.isConnected = true;
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }
    });
  }

  private scheduleReconnect(): void {
    if (!this.reconnectTimer) {
      this.reconnectTimer = setTimeout(async () => {
        console.log('Attempting to reconnect Kafka consumer...');
        this.reconnectTimer = null;
        try {
          await this.connect();
        } catch (error) {
          console.error('Failed to reconnect Kafka consumer:', error);
          this.scheduleReconnect();
        }
      }, this.reconnectInterval);
    }
  }

  async connect(): Promise<void> {
    if (this.isConnected) return;
    
    try {
      await this.consumer.connect();
      this.isConnected = true;
      console.log('Kafka consumer connected successfully');

      // Subscribe to the user-payment topic
      await this.consumer.subscribe({ 
        topic: 'user-payment', 
        fromBeginning: false 
      });
      
      if (!this.isConsuming) {
        await this.startConsuming();
      }
    } catch (error) {
      this.isConnected = false;
      console.error('Error connecting to Kafka consumer:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.isConnected) {
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }
      
      this.isConsuming = false;
      await this.consumer.disconnect();
      this.isConnected = false;
      console.log('Kafka consumer disconnected');
    }
  }

  private async startConsuming(): Promise<void> {
    if (this.isConsuming) return;
    
    this.isConsuming = true;
    
    await this.consumer.run({
      autoCommit: true,
      eachMessage: async (payload: EachMessagePayload) => {
        try {
          const { topic, partition, message } = payload;
          const messageValue = message.value?.toString();
          
          if (!messageValue) {
            console.warn('Received empty message');
            return;
          }

          console.log(`Received message from topic ${topic} [partition ${partition}]`);
          const parsedMessage = JSON.parse(messageValue);
          
          await this.routeMessage(parsedMessage);
        } catch (error) {
          console.error('Error processing message:', error);
        }
      }
    });
  }

 private async routeMessage(message: any): Promise<void> {
    try {
      // Route messages based on eventType
      switch (message.eventType) {
        case 'PAYMENT_SUCCESS':
          this.eventBus.publish(EventTypes.PAYMENT_SUCCESS, {
            userId: message.userId,
            subscriptionId: message.subscriptionId,
            planId: message.planId,
            timestamp: message.timestamp
          });
          break;
          
        case 'SUBSCRIPTION_CANCELED':
          this.eventBus.publish(EventTypes.SUBSCRIPTION_CANCELED, {
            userId: message.userId,
            subscriptionId: message.subscriptionId,
            timestamp: message.timestamp
          });
          break;
          
        case 'SUBSCRIPTION_UPDATED':
          this.eventBus.publish(EventTypes.SUBSCRIPTION_UPDATED, {
            userId: message.userId,
            subscriptionId: message.subscriptionId,
            planId: message.planId,
            status: message.status,
            timestamp: message.timestamp
          });
          break;
          
        default:
          console.warn(`Unknown event type: ${message.eventType}`);
      }
    } catch (error) {
      console.error('Error routing message:', error);
    }
  }
}