"use server"
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { GoogleGenAI } from "@google/genai";


export async function generateQuiz() {
    console.log("Inside generate quiz")
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorised")
    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        },
    });

    if (!user) throw new Error("ma chud gye")


    try {
        const prompt = `
            Generate 10 technical interview questions for a ${user.industry
            } professional${user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
            }.
            
            Each question should be multiple choice with 4 options.
            
            Return the response in this JSON format only, no additional text:
            {
                "questions": [
                {
                    "question": "string",
                    "options": ["string", "string", "string", "string"],
                    "correctAnswer": "string",
                    "explanation": "string"
                }
                ]
            }
    `;

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
        const quiz = JSON.parse(cleanText);


        return quiz.questions

    } catch (err) {
        console.log(err)
    }
}

export async function saveQuizResult(question , answers , score ){
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorised")
    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        },
    });

    if (!user) throw new Error("ma chud gye")

        const questionResults = question.map((q, index) => ({
            question: q.question,
            answer: q.correctAnswer ,

            userAnser: answers[index] ,
            isCorrect: q.correctAnswer === answers[index] ,
            explanation : q.explanation ,
        }))
        
        const wrongAnswer = questionResults.filter((q) => !q.isCorrect) ;

        if(wrongAnswer.length > 0 ) {
            const wrongQuestionText = wrongAnswer.map(
                (q) => `Question "${q.question}" \nCorrect Answer: ${q.answer} \nYour Answer: ${q.userAnser} \nExplanation: ${q.explanation}`
            )
            .join("\n\n")

            const improvementPrompt = `
            The user got the following ${user.industry} technical interview questions wrong:
      
            ${wrongQuestionText}
      
            Based on these mistakes, provide a concise, specific improvement tip.
            Focus on the knowledge gaps revealed by these wrong answers.
            Keep the response under 2 sentences and make it encouraging.
            Don't explicitly mention the mistakes, instead focus on what to learn/practice.
          `; 
        let improvementTip = null ;
          try{
            async function main() {
                const ai = new GoogleGenAI({
                    apiKey: process.env.GEMINI_KEY,
                });
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: improvementPrompt,
                });
                return response.text;
            }
            const data = await main();
            improvementTip = data.trim();
            
            console.log("QUIZ SAVing done")
            return quiz.questions
          }catch(err){
            console.log(err)
          }

          try{
            const assessment = await  db.assessment.create({
                data : {
                    userId : user.id ,
                    quizScore : score ,
                    questions : questionResults ,
                    category : "Technical" ,
                    improvementTip ,
                }
            })
            return assessment ;
          }catch(err){
            console.log(err)
          }
        }
}

export async function getAssessment(){
    const { userId  } = await auth() ;
    if(!userId) throw new Error("Unauthorised")
        const user = await db.user.findUnique({
        where : {
        clerkUserId : userId ,
        }
    })
    if(!user) throw new Error("ma chud gye")
        try{
            const assessment = await db.assessment.findMany({
                where : {
                    userId : user.id ,
                } ,
                orderBy :{
                    createdAt : "desc" ,
                }
            })
            return assessment ;
        }catch(e){console.log(e)}
}