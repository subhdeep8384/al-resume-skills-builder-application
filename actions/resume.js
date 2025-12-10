"use server"
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
 
import { revalidatePath, updateTag } from 'next/cache'

export async function saveResume(resume) {
    const { userId } = await auth() ;
    if( !userId ) throw new Error("Not logged in");

    const user = await db.user.findUnique({
        where:{
            clerkUserId : userId 
        },
    })

    if(!user) throw new Error("User not found");

    try{
        const resume = await db.resume.upsert({
            where : {
                userId : user.id ,
                content : resume ,
            }
        })

        revalidatePath('/resume')
        return resume ;
    }catch(e){
        console.log(e)
        throw new Error("Failed to save resume");
    }
 }

 export async function getResume(){
    const { userId } = await auth() ;
    if( !userId ) throw new Error("Not logged in");

    const user = await db.user.findUnique({
        where:{
            clerkUserId : userId 
        },
    })

    if(!user) throw new Error("User not found");

    try{
        const resume = await db.resume.findUnique({
            where : {
                userId : user.id ,
            }
        })

        return resume ;
    }catch(e){
        console.log(e)
        throw new Error("Failed to get resume");
    }
}

export async function improveWithAi({
    current , 
    type 
}) {
    console.log("inside improve with ai")
    const { userId } = await auth() ;
    if( !userId ) throw new Error("Not logged in");

    const user = await db.user.findUnique({
        where:{
            clerkUserId : userId 
        },
    })
    if(!user) throw new Error("User not found");
    console.log("after user validation ")
    try{
        const prompt = `
        As an expert resume writter , improve the following ${type} description for a ${user.industry} professional .
        make it more impactful , quantifiable and aligned with industry standards .
        Current content : "${current}"

        requirement :
        1 Use action verbs 
        2 Include metrics and resulkts where posssible 
        3 highlight the impact of the skills
        4 keep it consise but detailed 
        5 focus on achievements  over responsibilities
        6 use industry specific terms


        Format the response as a single paragraph without any additional text or explanation.
        `

        console.log("after prompt" , current , "\n\n\n")
        async function main() {
            const ai = new GoogleGenAI({
                apiKey: process.env.GEMINI_KEY,
            });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });
            return response.text;
        }
        const data = await main();
        const cleanText = data.replace(/```(?:json)?\n?/g, "").trim();
        return cleanText;
    }catch(e){
        throw new Error("Failed to improve resume");
    }
}