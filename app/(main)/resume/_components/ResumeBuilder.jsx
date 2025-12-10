"use client"
import { Button } from '@/components/ui/button'
import { AlertTriangle, Download, Edit, Edit2, Loader2, Monitor, Save } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resumeSchema } from '@/lib/schema'
import useFetch from '@/hooks/use-fetch'
import { saveResume } from '@/actions/resume'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import EntryForm from './EntryForm'
import { useUser } from '@clerk/nextjs'
import MDEditor from '@uiw/react-md-editor'
import { toast } from 'sonner'
import { marked } from "marked"




const ResumeBuilder = ({ initialContent }) => {
    const [activeTab, setActiveTab] = useState("edit")
    const [resumeMode, setResumeMode] = useState("preview")
    const [previewContent, setPreviewContent] = useState(initialContent)
    console.log("previewContent", previewContent)
    const { user } = useUser()
    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            contactInfo: {
                email: "",
                mobile: "",
                linkedin: "",
                twitter: "",
            },
            summary: "",
            skills: "",
            experience: [],
            education: [],
            projects: [],
        }
    })

    const {
        loading: isSaving,
        fn: saveResumeFn,
        data: saveResult,
        error: saveError
    } = useFetch(saveResume)

    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

    const formValue = watch()

    useEffect(() => {
        if (initialContent) {
            setActiveTab("preview")
        }
    }, [initialContent])

    useEffect(() => {
        if (activeTab === "edit") {
            const newContent = getCombinedContent();
            setPreviewContent(newContent ? newContent : initialContent)
        }
    }, [formValue, activeTab])

    const getContactMarkdown = () => {
        const { contactInfo } = formValue;
        const parts = [];
        if (contactInfo.email) parts.push(`${contactInfo.email}`)
        if (contactInfo.mobile) parts.push(`${contactInfo.mobile}`)
        if (contactInfo.linkedin) parts.push(`${contactInfo.linkedin}`)
        if (contactInfo.twitter) parts.push(`${contactInfo.twitter}`)

        return parts.length > 0 ?
            `## <div align="center">${user.fullName}</div>
            \n\n<div align="center">${parts.join(" | ")}</div>
            `
            : "";
    }

    const getCombinedContent = () => {
        const {
            summary,
            skills,
            experience,
            education,
            projects
        } = formValue


        return [
            getContactMarkdown(),
            summary && `## Professional Summary\n\n${summary}\n\n`,
            skills && `## Skills\n\n${skills}\n\n`,
            experience && `## Work Experience\n\n${experience.map(item => `- ${item.title}\n\t- ${item.organization}\n\t- ${item.startDate} - ${item.endDate}\n\t- ${item.description}\n`).join("\n")}\n\n`,
            education && `## Education\n\n${education.map(item => `- ${item.title}\n\t- ${item.organization}\n\t- ${item.startDate} - ${item.endDate}\n\t- ${item.description}\n`).join("\n")}\n\n`,
            projects && `## Projects\n\n${projects.map(item => `- ${item.title}\n\t- ${item.organization}\n\t- ${item.startDate} - ${item.endDate}\n\t- ${item.description}\n`).join("\n")}\n\n`,
        ].filter(Boolean).join("\n\n");
    }

    const genratePDF = async () => {
        setIsGeneratingPdf(true)
        try {
            const html2pdf = (await import("html2pdf.js")).default
            const element = document.getElementById('resume-pdf')

            const options = {
                margin: [15, 15],
                filename: "resume.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            };

            await html2pdf().set(options).from(element).save()
        } catch (e) {
            console.error(e)
            toast.error("cannot generate pdf")
        } finally {
            setIsGeneratingPdf(false)
        }
    }

    const onSubmit = (data) => {
        console.log(data)
    }


    return (
        <div className='space-y-4'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-3'>
                <h1 className='font-bold gradient-text text-4xl md:text-6xl'>
                    Resume builder
                </h1>

                <div className='space-x-2'>
                    <Button variant={"destructive"}>
                        <Save className='h-5 w-5'></Save>
                        Save
                    </Button>
                    <Button onClick={genratePDF} disabled={isGeneratingPdf}>
                        {isGeneratingPdf ? (<>
                            <Loader2 className='h-5 w-5 animate-spin' />
                            Wait for pdf to be generated
                        </>) : (<>
                            <Download className='h-5 w-5'></Download>
                            Download Pdf</>)}
                    </Button>
                </div>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="edit">Form</TabsTrigger>
                    <TabsTrigger value="preview">Markdown</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h3 className='text-lg font-medium'>Contact Information</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
                            <div className='space-y-2'>
                                <div>
                                    <label className='text-sm font-medium'> Email</label>
                                    <Input
                                        {...register("contactInfo.email")}
                                        type={"email"}
                                        placeholder="john@example.com"
                                        error={errors.contactInfo?.email?.message}
                                    />

                                    {errors.contactInfo?.email && (
                                        <p className='text-sm text-red-700'>{errors.contactInfo?.email?.message}</p>
                                    )}
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <div>
                                    <label className='text-sm font-medium'> Mobile</label>
                                    <Input
                                        {...register("contactInfo.mobile")}
                                        type={"mobile"}
                                        placeholder="+1 (555) 555-5555"
                                        error={errors.contactInfo?.mobile?.message}
                                    />

                                    {errors.contactInfo?.mobile && (
                                        <p className='text-sm text-red-700'>{errors.contactInfo?.email?.message}</p>
                                    )}
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <div>
                                    <label className='text-sm font-medium'> Linkedin</label>
                                    <Input
                                        {...register("contactInfo.linkedin")}
                                        type={"linkedin"}
                                        placeholder="www.linkedin.com/in/john-doe"
                                        error={errors.contactInfo?.linkedin?.message}
                                    />

                                    {errors.contactInfo?.linkedin && (
                                        <p className='text-sm text-red-700'>{errors.contactInfo?.linkedin?.message}</p>
                                    )}
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <div>
                                    <label className='text-sm font-medium'> Twitter</label>
                                    <Input
                                        {...register("contactInfo.twitter")}
                                        type={"twitter"}
                                        placeholder="www.twitter.com/johndoe"
                                        error={errors.contactInfo?.twitter?.message}
                                    />

                                    {errors.contactInfo?.twitter && (
                                        <p className='text-sm text-red-700'>{errors.contactInfo?.twitter?.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <h3 className='text-lg font-medium pt-5'>Professional Summary</h3>
                            <Controller
                                name='summary'
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        className={`h-32`}
                                        placeholder='Write a summary of your professional experience'
                                        error={errors.summary?.message}
                                    />
                                )} />
                            {errors.summary && (
                                <p className='text-sm text-red-700'>{errors.summary?.message}
                                </p>
                            )}
                        </div>


                        <div className='space-y-2'>
                            <h3 className='text-lg font-medium pt-5'>Skills</h3>
                            <Controller
                                name='skills'
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        className={`h-32`}
                                        placeholder='List your key skills here...'
                                        error={errors.skills?.message}
                                    />
                                )} />
                            {errors.skills && (
                                <p className='text-sm text-red-700'>{errors.skills?.message}
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <h3 className='text-lg font-medium pt-5'>Work Experience</h3>
                            <Controller
                                name='experience'
                                control={control}
                                render={({ field }) => (
                                    <EntryForm
                                        type={"Experience"}
                                        entries={field.value}
                                        onChange={field.onChange}
                                    />
                                )} />
                            {errors.experience && (
                                <p className='text-sm text-red-700'>{errors.experience?.message}
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <h3 className='text-lg font-medium pt-5'>Education</h3>
                            <Controller
                                name='education'
                                control={control}
                                render={({ field }) => (
                                    <EntryForm
                                        type={"Education"}
                                        entries={field.value}
                                        onChange={field.onChange}
                                    />
                                )} />
                            {errors.education && (
                                <p className='text-sm text-red-700'>{errors.education?.message}
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <h3 className='text-lg font-medium pt-5'>Projects</h3>
                            <Controller
                                name='projects'
                                control={control}
                                render={({ field }) => (
                                    <EntryForm
                                        type={"Projects"}
                                        entries={field.value}
                                        onChange={field.onChange}
                                    />
                                )} />
                            {errors.projects && (
                                <p className='text-sm text-red-700'>{errors.projects?.message}
                                </p>
                            )}
                        </div>

                    </form>
                </TabsContent>

                <TabsContent value="preview">

                    <Button
                        variant={"outline"}
                        type={"button"}
                        className={`mb-2`}
                        onClick={() => setResumeMode(resumeMode === "preview" ? "edit" : "preview")}
                    >
                        {resumeMode === "preview" ? (
                            <>
                                <Edit2 className='h-5 w-5'></Edit2>
                                edit resume</>
                        ) : (
                            <>
                                <Monitor className='h-4 w-4' />
                                show preview
                            </>
                        )}
                    </Button>

                    {resumeMode !== "preview" && (
                        <div className='flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded-md mb-2'>
                            <AlertTriangle className='h-5 w-5' />
                            <span className='text-sm'>
                                you will lose edited markdown if you update the form data
                            </span>
                        </div>
                    )}
                    <div className='border rounded-3xl'>
                        <MDEditor
                            value={previewContent}
                            onChange={setPreviewContent}
                            height={500}
                            preview={"preview"}
                        />
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            left: "-9999px",
                            top: "-9999px",
                            visibility: "visible",
                        }}
                    >
                    </div>
                    <div className="hidden">
                        <div id="resume-pdf">
                            <MDEditor.Markdown
                                source={previewContent}
                                style={{
                                    background: "white",
                                    color: "black",
                                }}
                            />
                        </div>
                    </div>

                </TabsContent>
            </Tabs>
        </div>
    )
}

export default ResumeBuilder
