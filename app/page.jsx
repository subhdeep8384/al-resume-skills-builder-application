"use client";

import HeroSection from "@/components/hero";
import { features } from "@/data/features";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import faqs from "@/data/faqs";
import { howItWorks } from "@/data/howltWorks";
import Typography from "@mui/material/Typography";

export default function Home() {
  const style = {
    py: 0,
    width: "100%",
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  };

  const { theme } = useTheme();

  return (
    <div>
      <HeroSection />

  

      {/* How It Works Section */}
      <section className="my-20">
        <h2 className="text-5xl text-center font-bold mb-16 wave-text">
          How it works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
          {howItWorks.map((how, index) => (
            <Card key={index} className="border border-border rounded-2xl">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="text-4xl mb-3">{how.icon}</div>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="font-semibold"
                >
                  {how.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {how.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <h2 className="text-5xl md:text-7xl text-center font-bold mb-16 wave-text">
          Powerful Features for Your Career Growth
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 pb-10">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300 border border-border rounded-2xl"
            >
              <CardContent className="flex flex-col items-center text-center gap-4 p-6">
                <div className="text-primary text-4xl">{feature.icon}</div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="my-20">
        <h2 className="text-5xl md:text-7xl text-center font-bold mb-10 wave-text">
          Most Asked Questions
        </h2>
        <div className="flex justify-center items-center">
          <div className="w-full max-w-4xl h-[400px] overflow-y-auto border border-border rounded-xl p-6 bg-background relative scroll-hidden">
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
          </div>
        </div>
      </section>

    

      {/* Call To Action Section */}
      <section className="w-full bg-zinc-900 text-white rounded-xl py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to accelerate your Career?
          </h2>
          <p className="text-zinc-400">
            Join thousands of professionals who are advancing their growth.
          </p>
        </div>
      </section>



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
  );
}
