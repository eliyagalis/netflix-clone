import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongo: MongoMemoryServer;

beforeAll(async() => {
    process.env.JWT_KEY = "ef85748g9wfjmrujg";

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri);
});


beforeEach(async() => {
    const collections = await mongoose.connection.db!.collections();
    for(const collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async() => {
    if(mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});