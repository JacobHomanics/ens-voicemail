// Install necessary packages: npm install express langchain openai dotenv

// const express = require('express');
// const { OpenAI } = require('langchain');
// const { LLMChain, PromptTemplate } = require('langchain');
// import { OpenAI } from "langchain";
// import { ChatOpenAI } from "@langchain/openai";
// import type { PromptTemplate } from "@langchain/core/prompts";

import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";

import { ChatPromptTemplate } from "@langchain/core/prompts";

dotenv.config();

console.log(process.env.OPENAI_API_KEY);
const llm = new ChatOpenAI({
  model: "gpt-4",
  temperature: 0,
  // other params...
});


  
  async function aye() {

    const prompt = ChatPromptTemplate.fromMessages([
        [
          "opinion",
          "topic",
        ],
        ["human", "{input}"],
      ]);
      
      const chain = prompt.pipe(llm);
      const result = await chain.invoke({
        input_language: "English",
        output_language: "English",
        input: "I love programming.",
      });
    
      console.log(result);
  }
  aye();


const app = express();
app.use(express.json());



const prompt = new PromptTemplate({
  inputVariables: ["opinion", "topic"],
  template: "The user provided the following opinion on {topic}: {opinion}. Please store this for future queries.",
});

const opinions = {}; // A simple in-memory store for user opinions

// Endpoint to provide opinion
app.post('/api/opinion', async (req, res) => {
  const { userId, topic, opinion } = req.body;

  // Store user opinion in the memory (you can use a database in production)
  opinions[userId] = opinions[userId] || {};
  opinions[userId][topic] = opinion;

// Create the prompt using the ChatPromptTemplate
const prompt = ChatPromptTemplate.fromMessages([
    { role: "system", content: "You are an AI assistant." },
    { role: "human", content: `The user provided the following opinion on ${topic}: ${opinion}. Please store this for future queries.` }
  ]);

  // Generate response using LangChain
  const result = await prompt.pipe(llm).invoke({
    input_language: "English",
    output_language: "English",
    input: opinion
  });

  res.json({ message: "Opinion stored", aiResponse: result });
});

// Endpoint to query opinion
app.get('/api/opinion', (req, res) => {
  const { userId, topic } = req.query;
  const opinion = opinions[userId] ? opinions[userId][topic] : null;

  if (opinion) {
    res.json({ opinion });
  } else {
    res.status(404).json({ message: "Opinion not found" });
  }
});

// Start server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});
