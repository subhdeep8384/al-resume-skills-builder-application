
import z  from "zod";

export const onboardingScheme = z.object({
    industry: z.string({
        required_error: "Please select a industry",
    }),
    subIndustry: z.string({
        required_error: "Please select a subIndustry",
    }),

    bio: z.string().max(500).optional(),
    experience: z.string().transform((val) => parseInt(val, 10)).pipe(
        z.number().min(0, "Experience must be at leadt 0 years").max(50, "Experience cannot exceed 50 years")
    ),

    skills: z.string().transform((val) => {
        return val
          ? val.split(",").map((skill) => skill.trim()).filter(Boolean)
          : undefined;
      }),
    
});

export const contactSchema = z.object({
    email : z.string().email("invalid email"),
    mobile : z.string().optional() ,
    linkedin : z.string().optional() ,
    twitter : z.string().optional() ,
})

export const entrySchema = z.object({
    title: z.string().min(1, "Title required"),
    organization: z.string().min(1, "Organization required"),
    startDate: z.string().min(1, "Start date required"),
    endDate: z.string().optional(),
    description: z.string().min(1, "Description required"),
    current: z.boolean().default(false),
  }).refine((data) => {

    if (!data.current) {
      return data.endDate && data.endDate.length > 0;
    }
    return true;
  }, {
    message: "End date is required unless current",
    path: ["endDate"],
  }).refine((data) => {
    
    if (data.startDate && data.endDate) {
      return new Date(data.endDate) >= new Date(data.startDate);
    }
    return true;
  }, {
    message: "End date cannot be less than start date",
    path: ["endDate"]
  });

export const resumeSchema = z.object({
    contactInfo : contactSchema ,
    summary : z.string().min(1) ,
    skills : z.string().min(1) ,
    experience : z.array(entrySchema) ,
    education : z.array(entrySchema) ,
    projects : z.array(entrySchema) ,
})