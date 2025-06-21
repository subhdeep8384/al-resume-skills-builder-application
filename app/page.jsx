"use client";

import HeroSection from "@/components/hero";
import { features } from "@/data/features";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import faqs from "@/data/faqs";
import { howItWorks } from "@/data/howltWorks";
import Divider from '@mui/material/Divider';
// import Card from '@mui/material/Card';

// import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function Home() {
  const style = {
    py: 0,
    width: '100%',
    // maxWidth: 360,
    // borderRadius: ,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
  };

  const { theme } = useTheme();
  console.log("The theme is :::::::", theme)

  return <div>
    <div >
      <HeroSection />

      <Divider component="li" sx={style} />


      <section>
        <h2 className="text-5xl flex  justify-center wave-text  font-bold mb-20 mt-20">How it works </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {howItWorks.map((how, index) => {
          return <div >
            {/* {how.icon} */}
            <Card key={index} sx={{ maxWidth: 345  }}>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {how.icon}
                  {how.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'HighlightText' }}>
                  {how.description}
                </Typography>
              </CardContent>
            </Card>
          </div>
        })}
        </div>
      </section>
      <section>
        <div>
          <h2 className="text-5xl flex text-center items-center justify-center md:text-8xl font-bold mb-4 leading-tight  wave-text">Powerful Features for your Carrer Growth </h2>
          <div> <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-2 gap-6 pb-10 ">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border border-border rounded-2xl">
                <CardContent className="flex flex-col items-center text-center gap-4 p-6">
                  <div className="text-primary text-4xl">{feature.icon}</div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          </div>
        </div>



      </section>
      <h2 className="text-5xl flex text-center items-center justify-center md:text-8xl font-bold  leading-tight  wave-text">Most askwd questions</h2>

      <div className="flex w-full  justify-center items-center min-h-screen ">
        <div className="w-full max-w-full h-[400px] m-10 overflow-y-auto border border-border rounded-xl p-6 bg-background relative">
          {/* Hidden scrollbar but still scrollable */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Accordion key={index} type="single" collapsible>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>

          {/* Custom scrollbar styles */}
          <style jsx>{`
      .scroll-hidden::-webkit-scrollbar {
        display: none;
      }
      .scroll-hidden {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}</style>
        </div>
      </div>




    </div>


 <Divider sx={style}></Divider>
    <section className="w-full bg-zinc-900 rounded-xl">
      <div className="mx-auto py-24 wave-text rounded-3xl">
        <div className="text-center max-w-3xl mx-auto mb-12 ">
          <h2 className="text-3xl font-bold mb-4">
            Ready to accelerate your Carrer ???
          </h2>
          <p className="text-muted-foreground">
            Join thoudand of preofessional who are adv
          </p>
        </div>
      </div>
    </section>
    <Divider sx={style}></Divider>
  </div>

}
