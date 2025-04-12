// Store topics, opinions, and user-trained data in-memory for simplicity
// In production, use a database like MongoDB, Redis, etc.
export const userTrainings: Record<string, Array<{ topic: string; opinion: string }>> = {};
