import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface GeneratedContent {
  title: string;
  description: string;
  tags: string[];
  imagePrompt: string;
}

export async function generateContentWithGemini(topic: string, platform: string, type: string, tone: string, length?: number): Promise<GeneratedContent> {
  const isBlog = type === 'Blog' || platform === 'Blog';
  const lengthInstruction = isBlog ? `The blog post should be approximately ${length || 600} words long.` : '';
  
  const prompt = `Generate unique ${isBlog ? 'blog' : 'social media'} content for the topic: "${topic}".
  Platform: ${platform}
  Content Type: ${type}
  Tone: ${tone}
  ${lengthInstruction}
  
  Return a JSON object with:
  1. title: A catchy title.
  2. description: ${isBlog ? 'A unique, comprehensive blog post with multiple sections (Introduction, Body Paragraphs, Conclusion).' : 'A unique, engaging description/caption optimized for the platform.'}
  3. tags: An array of 5-8 relevant ${isBlog ? 'keywords' : 'hashtags'}.
  4. imagePrompt: A detailed prompt for an AI image generator to create a unique visual for this content.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          tags: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          imagePrompt: { type: Type.STRING }
        },
        required: ["title", "description", "tags", "imagePrompt"]
      }
    }
  });

  return JSON.parse(response.text);
}

export async function generateImageWithGemini(prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: prompt,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("No image generated");
}
