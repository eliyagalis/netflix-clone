import { Kafka } from 'kafkajs';

// Create Kafka client
const kafka = new Kafka({
  clientId: 'user-service',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ 
  groupId: 'user-service-group'
});

// Connect and subscribe at service startup
async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({ 
    topic: 'payment-events',
    fromBeginning: false
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value) {
        const paymentEvent = JSON.parse(message.value.toString());
        console.log(`Received payment event: ${JSON.stringify(paymentEvent)}`);
        
        // Update user subscription in database
        await updateUserSubscription(
          paymentEvent.userId, 
          paymentEvent.subscriptionId
        );
      }
    }
  });
}

async function updateUserSubscription(userId, subscriptionId) {
  // Database logic to update user's subscription
  console.log(`Updated subscription for user ${userId} to ${subscriptionId}`);
}

startConsumer().catch(console.error);

consumer.on(consumer.events.CRASH, async (event) => {
    console.error('Consumer crashed:', event);
    // Reconnect logic
  });
