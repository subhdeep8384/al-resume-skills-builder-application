import React from 'react'
import { ModeToggle } from "@/components/mode-toggle"

import {
  SignInButton,
  SignUp,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, StarIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { checkUser } from '@/lib/checkUser';



const Header = async  () => {
  const user = await checkUser()
  return (
    <header className='fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/70'>
      <nav className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <div className='flex items-center space-x-1.5 md:space-x-2'>

          <Link href="/">
            <Image src={"/goku.png"}
              alt='goku logo '
              width={100}
              height={80}
              className='h-15 py-1 w-auto object-contain'
            />


          </Link>
          <span className='text-2xl font-semibold hidden '> uAI </span>
        </div>
        <div className='flex items-center space-x-2 md:space-x-5'>

          <SignedIn >
            <Link href={'/dashboard'}>
              <Button variant="outline">
                <LayoutDashboard className='h-4 w-4' />
                <span className='hidden md:block'>
                  Industry insight
                </span>
                <ChevronDown></ChevronDown>
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button >
                  <StarIcon className='h-4 w-4' />
                  <span className='hidden md:block'>
                    Ai Tools
                  </span>
                  <ChevronDown className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My account</DropdownMenuLabel>
                <DropdownMenuSeparator />


                <DropdownMenuItem>
                  <Link href={"/build-resume"}>
                    <div className='flex space-x-2  items-center md:space-x-2 '>

                      <FileText className='h-4 w-4 ' />
                      <span > Build resume </span>
                    </div>
                  </Link>


                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/interview-prep"}>
                    <div className='flex space-x-2  items-center md:space-x-2 '>

                      <GraduationCap className='h-4 w-4 ' />
                      <span > Interview Prepration</span>
                    </div>
                  </Link>
                </DropdownMenuItem>


                <DropdownMenuItem>
                  <Link href={"/cover-letter"}>
                    <div className='flex space-x-2  items-center md:space-x-2 '>

                      <PenBox className='h-4 w-4 ' />
                      <span > Cover letter</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <UserButton />

          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button>
                <span className="px-1 py-1 rounded cursor-pointer">Sign-In</span>
              </Button>
            </SignInButton>

            <SignUpButton>
              <Button>
                <span className="px-1 py-1 rounded cursor-pointer">Sign-Up</span>
              </Button>
            </SignUpButton>
          </SignedOut>


    <div className='flex justify-between items-center gap-6'>
          {user ? <div className='sm:text-sm md:text-xl lg:text-2xl gradient-text'>{user.name}</div> : ""}
          <ModeToggle />
    </div>


        </div>
      </nav>
    </header>
  )
}

export default Header;
