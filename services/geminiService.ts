
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are "Market Mentor AI", a helpful and insightful trading assistant for the 7NA LMATRIX app. Your goal is to help users with their trading questions. Provide analysis, explain trading strategies, discuss risk management, and define market concepts. Keep your answers concise, educational, and clear. Format your responses using markdown for better readability. Do not give financial advice or answer questions unrelated to trading, finance, or economics.`;

export async function getSimpleChatResponse(prompt: string): Promise<string> {
    if (!process.env.API_KEY) {
        return "API Key not found. Please configure your environment variables.";
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Sorry, I'm having trouble connecting to my brain right now. Please try again later.";
    }
}
