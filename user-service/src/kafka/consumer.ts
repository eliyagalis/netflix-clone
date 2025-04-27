import { Kafka } from 'kafkajs';

interface KafkaMessage{
    topic: string;
    partition: number; 
    message: { value: Buffer | null }
}

const kafka = new Kafka({
  clientId: 'user-consumer',
  brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'user-group' });

async function updateUserSubscription(userId:string, subscriptionId:string) {
    console.log(`Updated subscription for user ${userId} to ${subscriptionId}`);
}
export const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'payment-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }:KafkaMessage) => {
        if (message.value) {
            const paymentEvent = JSON.parse(message.value.toString());
            console.log(`Received payment event: ${JSON.stringify(paymentEvent)}`);
            
            await updateUserSubscription(
              paymentEvent.userId, 
              paymentEvent.subscriptionId
            );
          }

    },
  });
};

consumer.on(consumer.events.CRASH, async (event) => {
    console.error('Consumer crashed:', event);
    setTimeout(async () => {
        try {
          console.log('🔄 Reconnecting to Kafka...');
          await consumer.connect();
          await consumer.subscribe({ topic: 'payment-events', fromBeginning: false });
          console.log('✅ Reconnected to Kafka!');
        } catch (err) {
          console.error('❌ Failed to reconnect:', err);
        }
      }, 3000);
});
startConsumer().catch(console.error);
