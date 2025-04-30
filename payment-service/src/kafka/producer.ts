import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'payment-producer',
  brokers: [process.env.KAFKA_BROKERS||'kafka:9092'], // שם הקונטיינר בקומפוז, לא localhost!
});

const producer = kafka.producer();

export const producePaymentEvent = async (event: any) => {
  try {
    await producer.connect();
    await producer.send({
      topic: 'payment-events',
      messages: [
        {
          value: JSON.stringify(event),
        },
      ],
    });
    await producer.disconnect();
  } catch (error) {
    console.log("something got wrong on kafka's producer sending");
  }
};


// When payment is processed successfully:
// sendPaymentEvent('user123', 'pmt_456', 'sub_789');

