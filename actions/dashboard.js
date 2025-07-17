"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { GoogleGenAI } from "@google/genai";


export async function  generateAiInsight(industry){
    const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
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
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;
    const ai = new GoogleGenAI({
        apiKey : process.env.GEMINI_KEY ,
    });

    async function main() {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });
        return response.text ;
      }
      
       const data   = await main();
       const cleanText = data.replace(/```(?:json)?\n?/g ,"").trim() ;
       return JSON.parse(cleanText) ;
}
export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("unauthorised");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: { industryInsight: true },
  });

  if (!user) throw new Error("user not found");
  
  // if(user.industryInsight){
  //   console.log("HELLLLO")
  //   return user.industryInsight
  // }

  const normalizedIndustry = user.industry.toLowerCase().trim();
  try {
    const insights = await generateAiInsight(normalizedIndustry);

    const industryInsight = await db.industryInsight.upsert({
      where: { industry: normalizedIndustry }, 
      update: {
        industry: normalizedIndustry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      create: {
        industry: normalizedIndustry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // optional
      }
    });
    

   
    return industryInsight;
  } catch (err) {
   
    throw err;
  }
}
