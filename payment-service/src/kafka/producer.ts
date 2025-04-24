import { Kafka } from 'kafkajs';

// Create Kafka client
const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

// Connect at service startup
await producer.connect();

// Function to send payment event
async function sendPaymentEvent(userId: string, paymentId: string, subscriptionId: string) {
  await producer.send({
    topic: 'payment-events',
    messages: [
      { 
        // Use userId as key for partitioning (users' events go to same partition)
        key: userId,
        value: JSON.stringify({
          userId,
          paymentId,
          subscriptionId,
          timestamp: Date.now(),
          status: 'success'
        })
      }
    ]
  });
  console.log(`Payment event sent for user ${userId}, subscription ${subscriptionId}`);
}

// When payment is processed successfully:
// sendPaymentEvent('user123', 'pmt_456', 'sub_789');

// In your producer
producer.on(producer.events.CONNECTION_FAILURE, async (event) => {
    console.error('Producer connection failed:', event);
    // Reconnect logic
  });
