const kafkaAdmin=async()=>{
    const admin = kafka.admin();
    await admin.connect();
    await admin.createTopics({
    topics: [
        { 
        topic: 'payment-events', 
        numPartitions: 3,
        replicationFactor: 1
        }
    ]
    });
}

