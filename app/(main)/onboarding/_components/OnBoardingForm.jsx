"use client";

import { onboardingScheme } from '@/lib/schema';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import useFetch from "@/hooks/use-fetch"
import { updateUser } from '@/actions/user';
import { toast } from 'sonner';
import { Loader2 } from "lucide-react";

const Onboardingform = ({ industries }) => {

  const [selectIndustry, setSelectedIdustry] = useState(null)
  const { register, handleSubmit, formState: { errors },
    setValue, watch } = useForm({
      resolver: zodResolver(onboardingScheme)
    })
        
    const {
      loading : updateLoading ,
      fn : updateUserFn ,
      data : updateResult ,
    }  = useFetch(updateUser) ;


    const onSubmit =async  (values) => {
      console.log(values.industry)
      try{
        const formatIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")
        }` ;

        await updateUserFn({
          ...values , 
          industry : formatIndustry,
        })
      }catch(er){}
    }


    useEffect(()=>{
      if(updateResult?.success && !updateLoading ){
        toast.success("profile completed successfully ");
        router.push("/dashboard")
        router.refresh()
      }
    }, [updateResult , updateLoading])


  const router = useRouter()
  return (
    <div className='flex  items-center justify-center bg-background'>
      <Card className="w-full max-w-lg mt-10 mx-2.5">
        <CardHeader>
          <CardTitle className="gradient-text text-3xl">Complete your profile</CardTitle>
          <CardDescription>Select your industry to get personilized carree insight</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>

        <CardContent>
          <form  className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-4'>

              <Label htmlFor="industry" className="mb-2 text-xl">Industry</Label>
              <Select
                onValueChange={(value)=>{
                  setValue("industry" , value) ;
                  setSelectedIdustry(
                    industries.find((ind) => ind.id === value) 
                  )
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent >
                  {industries.map((industry) => {
                    return <SelectItem className="w-full" value={industry.id} key={industry.name}>{industry.name}</SelectItem>
                  })}

                </SelectContent>
              </Select>
              {errors.industry && (
                <p className='text-sm text-red-500'>{errors.industry.message}</p>
              )}
            </div>



            {/* //subindutry  */}
            { selectIndustry ? <div className='space-y-4'>

                        <Label htmlFor="subIndustry" className="mb-2 text-xl">SubIndustry</Label>
                        <Select
                          onValueChange={(value)=>{
                            setValue("subIndustry" , value) ;
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="select a subIndustry" />
                          </SelectTrigger>
                          <SelectContent >
                            {selectIndustry?.subIndustries.map((sub) => {
                              return <SelectItem className="w-full" value={sub} key={sub}>{sub}</SelectItem>
                            })}

                          </SelectContent>
                        </Select>
                        {errors.subIndustry && (
                          <p className='text-sm text-red-500'>{errors.subIndustry.message}</p>
                        )}
                      </div> : ""}




                        <div className='space-y-2'>
                          <Label htmlFor="experience">years of Experience</Label>
                          <Input
                          id="experience"
                          type="number" 
                          min="0"
                          max="50"
                          placeholder="Enter year of experience"
                          {...register("experience")}
                          ></Input>
                           {errors.experience && (
                          <p className='text-sm text-red-500'>{errors.experience.message}</p>
                        )}
                        </div>


                        <div className='space-y-2'>
                          <Label htmlFor="Skills">Skills</Label>
                          <Input
                          id="Skills"
                        
                          placeholder="e.g. , Python , java , c  ,etc"
                          {...register("skills")}
                          ></Input>
                          <p className='text-sm text-muted-foreground'>seperate multiple skills with commas</p>
                           {errors.skills && (
                          <p className='text-sm text-red-500'>{errors.skills.message}</p>
                        )}
                        </div>


                        <div className='space-y-2'>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                          id="bio"
                          className="h-32 text-2xl"
                          placeholder="Tell us about your professional backgroud "
                          {...register("bio")}
                          ></Textarea>
                
                           {errors.bio && (
                          <p className='text-sm text-red-500'>{errors.bio.message}</p>
                        )}
                        </div>
            {updateLoading ? <Loader2
              className="mr-2 h-4 w-4 animate-spin"
            ></Loader2> : <Button
            type='submit' 
            className='w-full'
          >Submit form</Button> }
                        
            
          </form>
        </CardContent>
      </Card>

    </div>
  );
};

export default Onboardingform;
