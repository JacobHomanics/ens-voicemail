import { ChatOpenAI } from "@langchain/openai";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import * as dotenv from "dotenv";

dotenv.config();


const llm = new ChatOpenAI({
    model: "gpt-4",
    temperature: 0,
    // other params...
  });
  
const memory = new BufferMemory();
const chain = new ConversationChain({ llm, memory });