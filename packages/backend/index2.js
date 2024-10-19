import express from 'express';
import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import cors from 'cors';


dotenv.config(); // For loading environment variables

const port = 3008;
const app = express();
app.use(cors({
    origin: 'http://localhost:3001' // Replace with your Next.js frontend URL
  }));
  app.use(express.json());

// Store topics, opinions, and user-trained data in-memory for simplicity
// In production, use a database like MongoDB, Redis, etc.
const userTrainings = {};

// Endpoint 1: Train the AI agent with topic and opinion
app.post('/train', (req, res) => {
    const { userId, topic, opinion } = req.body;

    if (!userId || !topic || !opinion) {
        return res.status(400).send('userId, topic, and opinion are required');
    }

    if (!userTrainings[userId]) {
        userTrainings[userId] = [];
    }

    // Save the topic and opinion in user's training data
    userTrainings[userId].push({ topic, opinion });

    res.status(200).send('AI agent trained with new topic and opinion');
});

// Endpoint 2: Get AI agent's response based on a topic
app.post('/respond', async (req, res) => {
    const { userId, topic } = req.body;

    if (!userId || !topic) {
        return res.status(400).send('userId and topic are required');
    }

    const userTraining = userTrainings[userId];
    if (!userTraining || userTraining.length === 0) {
        return res.status(404).send('No training data found for this user');
    }

    // Find the user's opinion on the given topic
    const trainingData = userTraining.find(t => t.topic === topic);
    if (!trainingData) {
        return res.status(404).send('No opinion found for the given topic');
    }

    // Generate a response using the AI model based on the opinion
    const llm = new ChatOpenAI({
        model: "gpt-4o",
        temperature: 0,
        // other params...
      });


    try {
      
        const response = await llm.invoke([{
            role: "system",
            content: `You are an AI agent trained on the following opinion: ${trainingData.opinion}. Based on this, provide a response to a question about "${topic}".`
        }])
        

        res.status(200).send({ response });
    } catch (error) {
        console.error('Error generating AI response:', error);
        res.status(500).send('Error generating response');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
