import express from "express";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

  // Gemini AI Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: `You are the RA Care AI Assistant, a compassionate healthcare educator specializing in Rheumatoid Arthritis (RA). 
        Your goal is to provide educational support, explain RA concepts, and offer lifestyle suggestions.
        
        RULES:
        1. Always maintain a professional yet empathetic tone.
        2. Speak in simple, accessible language.
        3. MANDATORY DISCLAIMER: At the end of every significant response, include: "Disclaimer: I am an AI assistant providing educational support, not a medical professional. This information is not a diagnosis or treatment plan. Please consult a qualified rheumatologist for medical advice."
        4. Do NOT prescribe medication dosages.
        5. If a user describes severe symptoms (sudden intense pain, fever, inability to move), advise seeking urgent medical attention.
        6. Summarize symptom history if provided by the user to help them prepare for doctor visits.`
      });

      const chat = model.startChat({
        history: history || [],
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      res.json({ text: response.text() });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to communicate with AI" });
    }
  });

  // RA Symptom Assessment Endpoint
  app.post("/api/assess", async (req, res) => {
    try {
      const { symptoms } = req.body;
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `Analyze the following Rheumatoid Arthritis symptoms and provide a risk assessment (Low, Moderate, High) with educational guidance.
      
      Symptoms Provided:
      ${JSON.stringify(symptoms, null, 2)}
      
      Return a JSON object with:
      {
        "riskLevel": "Low" | "Moderate" | "High",
        "score": number (0-100),
        "summary": "Short explanation of the risk",
        "recommendations": ["list", "of", "educational", "steps"],
        "disclaimer": "AI educational assessment only. Consult a doctor."
      }
      
      Ensure the assessment is conservative and prioritizes medical consultation for moderate/high scores.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      // Clean potential markdown formatting from JSON response
      const jsonStr = text.replace(/```json|```/g, "").trim();
      res.json(JSON.parse(jsonStr));
    } catch (error) {
      console.error("Assessment Error:", error);
      res.status(500).json({ error: "Failed to perform assessment" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`RA Care AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
