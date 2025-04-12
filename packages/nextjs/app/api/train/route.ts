import { NextResponse } from "next/server";
import { userTrainings } from "../shared/state";

// Store topics, opinions, and user-trained data in-memory for simplicity
// In production, use a database like MongoDB, Redis, etc.

export async function POST(request: Request) {
  try {
    const { userId, topic, opinion } = await request.json();

    if (!userId || !topic || !opinion) {
      return NextResponse.json({ error: "userId, topic, and opinion are required" }, { status: 400 });
    }

    if (!userTrainings[userId]) {
      userTrainings[userId] = [];
    }

    // Save the topic and opinion in user's training data
    userTrainings[userId].push({ topic, opinion });

    return NextResponse.json({ message: "AI agent trained with new topic and opinion" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
