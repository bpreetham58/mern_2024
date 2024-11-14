const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/new_training';

async function main() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        
        const database = client.db('trainer');
        const collection = database.collection('teachers');
        
        const result = await collection.insertOne({ name: 'Alice', age: 30 });
        console.log('Document inserted with _id:', result.insertedId);
        
        const documents = await collection.find({}).toArray();
        console.log('Found documents:', documents);
    } finally {
        await client.close();
    }
}


main().catch(console.error);

