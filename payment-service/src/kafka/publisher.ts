import { inject, injectable } from "inversify";
import { Tokens } from "../utils/tokens";
import { IKafkaMsg, IKafkaProducer, KafkaProducer } from "./producer";
import { EventTypes } from "../utils/eventTypes-enum";
import { IEventBus, IPaymentSuccessEvent, ISubscriptionCanceledEvent } from "../interfaces/KafkasInterfaces";

@injectable()
export class KafkaPublisher {
  constructor(
    @inject(Tokens.IEventBus) private eventBus: IEventBus,
    @inject(Tokens.IKafkaProducer) private kafkaProducer: IKafkaProducer
  ) {
    this.initEventSubscriptions();
  }

  private initEventSubscriptions(): void {
    // Subscribe to subscription created events
    this.eventBus.subscribe(
      EventTypes.PAYMENT_SUCCESS, 
      this.handleSubscriptionCreated.bind(this)
    );

    // Subscribe to subscription canceled events
    this.eventBus.subscribe(
      EventTypes.SUBSCRIPTION_CANCELED, 
      this.handleSubscriptionCanceled.bind(this)
    );
  }

  private async handleSubscriptionCreated(event:IPaymentSuccessEvent): Promise<void> {
    try {
      await this.kafkaProducer.sendMessage('payment-service', { 
        msg_name:EventTypes.PAYMENT_SUCCESS,
        content: {
          userId: event.userId,
          subscriptionId: event.subscriptionId
        }
      });
      console.log(`created subscription event sent successfully to Kafka for user ${event.userId}`);
    } catch (error) {
      console.error('Error sending subscription created event to Kafka:', error);
      throw new Error((error as Error).message)
    }
  }

  private async handleSubscriptionCanceled(event: ISubscriptionCanceledEvent): Promise<void> {
    try {
      await this.kafkaProducer.sendMessage('payment-service', {
        msg_name: EventTypes.SUBSCRIPTION_CANCELED,
        content:{
          userId: event.userId,
        }
      });
      console.log(`Subscription canceled event sent to Kafka for user ${event.userId}`);
    } catch (error) {
      console.error('Error sending subscription canceled event to Kafka:', error);
    }
  }


}
