import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app" , name:"my=app" ,
    credentials : {
        gemini : {
            apiKey : process.env.GEMINI_KEY ,
        }
    }
});
