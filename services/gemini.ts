import { GoogleGenAI, Type } from "@google/genai";
import { ItemCategory } from "../types";
import { CATEGORIES } from "../constants";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Using mock data.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export interface GeminiAnalysisResult {
  title: string;
  description: string;
  category: ItemCategory;
  subcategory: string;
}

// This is a mock function for development when an API key isn't available.
const analyzeItemImageMock = (
  _base64Image: string,
  _mimeType: string
): Promise<GeminiAnalysisResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: "Mock: Black Headphones",
        description: "A pair of over-ear black headphones, likely for listening to music. They appear to be in good condition.",
        category: "Electronics",
        subcategory: "Headphones",
      });
    }, 1500);
  });
};

// This is the primary function that calls the Gemini API.
const analyzeItemImageLive = async (
  base64Image: string,
  mimeType: string
): Promise<GeminiAnalysisResult> => {
  try {
    // 1. Prepare the image data for the API request.
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    };

    // 2. Prepare the text prompt that instructs the AI what to do.
    const textPart = {
        text: `Analyze the image of this item. Based on the image, provide a concise and clear title, a helpful description, suggest the most appropriate category, and a suitable subcategory for a lost and found website. The available categories are: ${CATEGORIES.join(', ')}. The subcategory should be a specific type of the item (e.g., 'Smartphone' for the 'Electronics' category, or 'Backpack' for 'Bags').`
    };

    // 3. Call the Gemini model with both the image and the text prompt.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts: [imagePart, textPart] },
      // 4. Configure the model to return a structured JSON response.
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "A short, descriptive title for the item (e.g., 'Black Leather Wallet', 'Silver iPhone 13')."
            },
            description: {
              type: Type.STRING,
              description: "A brief, helpful description of the item, noting any distinguishing features visible in the image."
            },
            category: {
              type: Type.STRING,
              enum: CATEGORIES as unknown as string[],
              description: "The most fitting category from the provided list."
            },
            subcategory: {
              type: Type.STRING,
              description: "A specific subcategory for the item (e.g., 'Headphones', 'Backpack', 'Passport')."
            }
          },
          required: ["title", "description", "category", "subcategory"],
        }
      }
    });

    // 5. Parse the JSON text from the response.
    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText) as GeminiAnalysisResult;
    return result;

  } catch (error) {
    console.error("Error analyzing image with Gemini:", error);
    throw new Error("Failed to analyze image. Please try again or enter details manually.");
  }
};

// 6. Export the correct function based on whether an API key is available.
export const analyzeItemImage = process.env.API_KEY 
  ? analyzeItemImageLive 
  : analyzeItemImageMock;