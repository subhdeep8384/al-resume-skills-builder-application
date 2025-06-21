"use client";


import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const HeroSection = () => {

const { theme } = useTheme();
const [mounted, setMounted] = useState(false);
  

useEffect(() => {
  console.log(theme)
  setMounted(true);
}, []);


if (!mounted) return null;

  return (
<div className="relative min-h-screen overflow-hidden">
  <div className={theme === "dark" ? "grid-backgroundDark" : "grid-backgroundLight"} />

  <section className="w-full relative z-10 pt-36 md:pt-48 pb-10 text-center px-4">
    <div>
      <h1 className="text-5xl md:text-8xl font-bold mb-4 leading-tight gradient-text  ">
        Your AI Coach<br />For Professional Success
      </h1>

      <p className="text-gray-600 text-2xl mb-6 max-w-2xl mx-auto">
        Advance your career with personalized guidance, interview preparation, and AI-powered tools for job success.
      </p>

      <div>
        <Link href="/dashboard">
          <Button>Get Started</Button>
        </Link>
      </div>
      
    </div>
  </section>
</div>

  )
}

export default HeroSection
