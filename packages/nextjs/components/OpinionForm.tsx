import { useState } from "react";

const OpinionForm = () => {
  const [userId, setUserId] = useState("");
  const [topic, setTopic] = useState("");
  const [opinion, setOpinion] = useState("");
  const [response, setResponse] = useState<any>();

  // Function to train the AI with a topic and opinion
  const trainAI = async () => {
    try {
      const res = await fetch("/api/train", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, topic, opinion }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("AI trained successfully");
      } else {
        console.error("Error training AI:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to get the AI's response based on a topic
  const getAIResponse = async () => {
    try {
      const res = await fetch("/api/respond", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, topic }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data.response);
      } else {
        console.error("Error getting AI response:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Train AI and Get AI Response</h1>

      <div>
        <h2>Train AI</h2>
        <input type="text" placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
        <input type="text" placeholder="Topic" value={topic} onChange={e => setTopic(e.target.value)} />
        <input type="text" placeholder="Opinion" value={opinion} onChange={e => setOpinion(e.target.value)} />
        <button onClick={trainAI}>Train AI</button>
      </div>

      <div>
        <h2>Get AI Response</h2>
        <input type="text" placeholder="Topic" value={topic} onChange={e => setTopic(e.target.value)} />
        <button onClick={getAIResponse}>Get Response</button>

        {response && <p>{response?.kwargs?.content}</p>}
      </div>
    </div>
  );
};

export default OpinionForm;
