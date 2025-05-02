import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { injectable } from 'inversify';

export interface IKafkaProducer{
    connect(): Promise<void>,
    disconnect(): Promise<void>,
    sendMessage<T>(topic: string, message:IKafkaMsg<T>): Promise<void>
}
export interface IKafkaMsg<T>{
  msg_name:string;
  content: T
}
@injectable()
export class KafkaProducer {
  private producer_instance: Producer;
  private isConnected: boolean = false;
  private reconnectTimer: NodeJS.Timeout|null= null; //משתנה ששומר לי את הפעולה מונע מצב שבו יתחיל כמה ניסיונות התחברות במקביל.
  private readonly reconnectInterval = 5000; 

  constructor() {
    const kafka = new Kafka({
      clientId: 'payment-service', //מזהה ייחודי- יהיה שם הסרביס
      brokers: ['kafka:9092'], //רשימת כתובות של ברוקרז שאליהם הקליינט יתחבר, אינסטנס של קפקה- אפשר להפעיל כמה כאלה
      retry: {
        initialRetryTime: 100, //כמה זמן בין ניסיון לניסיון 
        retries: 8 // ניסיונות חוזרים עד לכשל מוחלט
      }
    });

    this.producer_instance = kafka.producer({
      allowAutoTopicCreation: true,
      transactionTimeout: 30000 // 30 seconds
    });

    //מאזין לאיוונטים של ניתוק הקונדישיין
    this.producer_instance.on('producer.disconnect', () => {
      console.log('Kafka producer disconnected');
      this.isConnected = false;
      this.scheduleReconnect();
    });

    this.producer_instance.on('producer.connect', () => {
      console.log('Kafka producer connected');
      this.isConnected = true;
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }
    });
  }
//אם החיבור נופל – מבצע התחברות מחדש אוטומטית 
  private scheduleReconnect(): void {
    if (!this.reconnectTimer) { //בודק אם כבר קיים טיימר של reconnect בפעולה.
      this.reconnectTimer = setTimeout(async () => {
        console.log('Attempting to reconnect Kafka producer...');
        this.reconnectTimer = null; //מאפסת את הטיימר אחרת ניתקע בלולאה שלא יהיה אפשרי ניסיונות חוזרים
        try {
          await this.connect();
        } catch (error) {
          console.error('Failed to reconnect Kafka producer:', error);
          this.scheduleReconnect(); 
        }
      }, this.reconnectInterval);
    }
  }

  async connect(): Promise<void> {
    // Don't try to connect if already connected
    if (this.isConnected) 
        return;
    try {
      await this.producer_instance.connect();
      this.isConnected = true; //שומר משתנה כדי למנוע חיבורים כפולים
      console.log('kafka producer connected successfully');
    } catch (error) {
      this.isConnected = false;
      console.error('error connecting to Kafka producer: ', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.isConnected) {
      // Clear any reconnection attempts
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }
      
      await this.producer_instance.disconnect();
      this.isConnected = false;
      console.log('Kafka producer disconnected');
    }
  }

  async sendMessage<T>(topic: string, message:IKafkaMsg<T>): Promise<void> {
    // Only check connection once at the beginning
    if (!this.isConnected) {
      try {
        await this.connect();
      } catch (error) {
        console.error('Failed to connect to Kafka before sending message:', error);
        this.scheduleReconnect();
        throw new Error(`Cannot send message: Kafka producer not connected: ${(error as Error).message}`);
      }
    }

    const sendingMsgformat: ProducerRecord = {
      topic,
      messages: [
        { 
          key: message.msg_name || 'payment-service-msg', 
          value: JSON.stringify(message.content)
        }
      ]
    };

    try {
      await this.producer_instance.send(sendingMsgformat);
      console.log(`Message sent to topic ${topic}`);
    } catch (error) {
      console.error(`Error sending message to topic ${topic}:`, error);
        if (error instanceof Error && error.name === 'KafkaJSConnectionError') {
        this.isConnected = false;
        this.scheduleReconnect();
      }
      throw error;
    }
  }
}

// export const producePaymentEvent = async (event: any) => {
//   try {
//     await producer.connect();
//     await producer.send({
//       topic: 'payment-events',
//       messages: [
//         {
//           value: JSON.stringify(event),
//         },
//       ],
//     });
//     await producer.disconnect();
//   } catch (error) {
//     console.log("something got wrong on kafka's producer sending");
//   }
// };


// // When payment is processed successfully:
// // sendPaymentEvent('user123', 'pmt_456', 'sub_789');

