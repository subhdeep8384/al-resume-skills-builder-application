import { db } from "../prisma";
import { inngest } from "./client";
import { GoogleGenAI } from "@google/genai";

export const generateIndustryInsight = inngest.createFunction(
  { name: "Generate Industry Insight" },
  { cron: "0 0 * * 0" },
  async ({ step }) => {
   
    const industries = await step.run("Fetch industries", async () => {
      return await db.industryInsight.findMany({
        select: { industry: true },
      });
    });

    
    for (const { industry } of industries) {
      const prompt = `
        Analyze the current state of the ${industry} industry and provide insights ONLY in this JSON format:
        {
          "salaryRanges": [
            { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
          ],
          "growthRate": number,
          "demandLevel": "high" | "medium" | "low",
          "topSkills": ["skill1", "skill2"],
          "marketOutlook": "positive" | "neutral" | "negative",
          "keyTrends": ["trend1", "trend2"],
          "recommendedSkills": ["skill1", "skill2"]
        }
        Return ONLY JSON, no markdown or extra notes.
        Include at least 5 roles, 5 skills, and 5 trends.
      `;

    
      const res = await step.ai.wrap("gemini", async () => {
        const ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_KEY,
        });

        const result = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });

        
        return  result.candidates?.[0]?.content?.parts?.[0]?.text?.trim();;
      });

     
      const cleanText = res.replace(/```(?:json)?\n?/g, "").trim();
      let insight;
      try {
        insight = JSON.parse(cleanText);
      } catch (e) {
        console.error(`❌ Failed to parse AI JSON for ${industry}`, e);
        continue;
      }

      // 5️⃣ Update the database
      await step.run(`Update ${industry} insight`, async () => {
        return await db.industryInsight.update({
          where: { industry },
          data: {
            ...insight,
            lastUpdated: new Date(),
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      });

      console.log(`✅ Updated insight for ${industry}`);
    }
  }
);
