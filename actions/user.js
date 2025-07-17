"use server"
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import {DemandLevel , MarketOutlook} from "@prisma/client"

export async function updateUser(data){
    const {userId} = await auth() ;
    if(!userId) throw new Error("Unauthorised")

    const user = await db.user.findUnique({
        where : {
            clerkUserId : userId,
        },
    }) ;

    if(!user) throw new Error("ma chud gye")

    try{
        const result = await db.$transaction(
            async(tx)=>{
                let industryInsight = await tx.industryInsight.findUnique({
                    where :{
                        industry : data.industry ,
                    }
                }) ;

                if(!industryInsight){
                    industryInsight = await tx.industryInsight.create({
                        data : {
                            industry : data.industry , 
                            salaryRanges : [] ,
                            growthRate : 0.0 ,
                            demandLevel : DemandLevel.medium,  
                            topSkills : [] ,
                            marketOutlook : MarketOutlook.neutral ,
                            keyTrends : [] ,
                            recommendedSkills : [] ,
                            nextUpdate : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) ,
                        } ,
                    })
                }
                const updateUser = await tx.user.update({
                    where : {
                        id : user.id ,
                    } ,
                    data : {
                        industry : data.industry ,
                        experience : data.experience ,
                        bio : data.bio ,
                        skills : data.skills ,
                    },
                }) 
                return {updateUser , industryInsight } 
            } ,
            {
                timeout : 10000 ,
            }
        )
        return {success : true , ...result} ;
        // find if the industry exits else xretae one and update user 
    }catch(err){
        throw new Error(err)
    }
}



export async function getUserOnBoardingStatus(){
    const { userId } = await auth() ;

    if(!userId ) throw new Error("Unauthorized ") ;
    
    const user = await db.user.findUnique({
        where : {
            clerkUserId : userId ,
        }
    })
    if(!user) throw new Error("User not found") ;
    try{
        const user = await db.user.findUnique({
            where : {
                clerkUserId : userId ,
            } ,
            select : {
                industry :  true ,
            } ,
        })
        return {
            isOnboarded : !!user?.industry ,
        }
    }catch(err){

        throw new Error("Failed to check onboarding status") ;
    }
}