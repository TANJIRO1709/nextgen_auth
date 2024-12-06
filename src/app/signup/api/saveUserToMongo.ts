// pages/api/saveUserToMongo.ts
import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URL || ''; 
const client = new MongoClient(MONGO_URI);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { userData } = req.body;

        if (!userData) {
            return res.status(400).json({ message: 'Invalid user data' });
        }

        await client.connect();
        const db = client.db('your-database-name'); // Replace with your database name
        const collection = db.collection('users'); // Replace with your collection name

        const result = await collection.insertOne(userData);

        res.status(200).json({ message: 'User saved successfully', result });
    } catch (error) {
        console.error('Error saving user to MongoDB:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
    }
}
