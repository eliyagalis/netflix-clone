//קובץ קונפיגורציה או סקריפט Kafka Admin הוא פשוט סקריפט שמריץ את הפקודות הניהוליות.
//פעולות ניהול נפוצות:

// יצירת נושאים (topics)

// מחיקה או עדכון נושאים

// בדיקת סטטוס של brokers

// בדיקה של consumers וכו'

// לכן Kafka מספק ממשק ניהולי 
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'admin-client',
  brokers: ['kafka:9092'],
});

const kafkaAdmin = async () => {
  const admin = kafka.admin();
  try {
    await admin.connect();
    await admin.createTopics({
      topics: [
        {
          topic: 'payment-events',
          numPartitions: 3,
          replicationFactor: 1,
        },
      ],
    });
    console.log('Topic created successfully');
  } catch (err) {
    console.error('Failed to create topic:', err);
  } finally {
    await admin.disconnect();
  }
};

kafkaAdmin();
