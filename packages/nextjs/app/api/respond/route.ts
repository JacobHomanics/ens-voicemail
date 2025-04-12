import { NextResponse } from "next/server";
import { userTrainings } from "../shared/state";
import { ChatOpenAI } from "@langchain/openai";

export async function POST(request: Request) {
  try {
    const { userId, topic } = await request.json();

    if (!userId || !topic) {
      return NextResponse.json({ error: "userId and topic are required" }, { status: 400 });
    }

    const userTraining = userTrainings[userId];
    if (!userTraining || userTraining.length === 0) {
      return NextResponse.json({ error: "No training data found for this user" }, { status: 404 });
    }

    // Find the user's opinion on the given topic
    const trainingData = userTraining.find(t => t.topic === topic);
    if (!trainingData) {
      return NextResponse.json({ error: "No opinion found for the given topic" }, { status: 404 });
    }

    // Generate a response using the AI model based on the opinion
    const llm = new ChatOpenAI({
      model: "gpt-4",
      temperature: 0,
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await llm.invoke([
      {
        role: "system",
        content: `You are a persona of the person providing the opinion: ${trainingData.opinion}. Based on this, provide a response to a question about "${topic}".`,
      },
    ]);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error generating AI response:", error);
    return NextResponse.json({ error: "Error generating response" }, { status: 500 });
  }
}
