//קובץ קונפיגורציה או סקריפט Kafka Admin הוא פשוט סקריפט שמריץ את הפקודות הניהוליות.
//פעולות ניהול נפוצות:

// יצירת נושאים (topics)

// מחיקה או עדכון נושאים

// בדיקת סטטוס של brokers

// בדיקה של consumers וכו'

// לכן Kafka מספק ממשק ניהולי 
// infra/kafka-setup/admin.ts
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'admin-client',
  brokers: ['kafka:9092'], // Use localhost if running from host machine
});

const kafkaAdmin = async () => {
  const admin = kafka.admin();
  try {
    console.log('🔄 Connecting to Kafka...');
    await admin.connect();
    console.log('✅ Connected to Kafka');
    
    console.log('🔄 Creating payment-events topic...');
    await admin.createTopics({
      topics: [
        {
          topic: 'payment-events',
          numPartitions: 3,
          replicationFactor: 1,
        },
      ],
    });

    console.log('✅ Topic created successfully');
    
    // List all topics to confirm
    const topics = await admin.listTopics();
    console.log('📋 Current topics:', topics);
    
  } catch (err) {
    console.error('❌ Failed:', err);
    
  } finally {
    await admin.disconnect();
  }
};

kafkaAdmin();
