/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGift } from "@/hooks/useGift";
import GiftTemplateList from "@/components/features/GiftTemplateList";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorAlert from "@/components/ui/ErrorAlert";
import Image from "next/image";

export default function CreateGift() {
  const router = useRouter();
  const { templates, loading, error, getTemplates } = useGift();

  useEffect(() => {
    getTemplates();
  }, [getTemplates]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-valentine-red to-valentine-pink flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-valentine-red to-valentine-pink p-4">
        <ErrorAlert message={error} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-valentine-red to-valentine-pink">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-4 top-20 w-24 h-24 animate-float opacity-20">
          <Image
            src="/images/heart1.svg"
            alt="Floating heart"
            width={96}
            height={96}
            className="object-contain"
          />
        </div>
        <div
          className="absolute right-10 top-40 w-16 h-16 animate-float opacity-20"
          style={{ animationDelay: "1s" }}
        >
          <Image
            src="/images/heart2.svg"
            alt="Floating heart"
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
        <div
          className="absolute left-1/4 bottom-20 w-20 h-20 animate-float opacity-20"
          style={{ animationDelay: "1.5s" }}
        >
          <Image
            src="/images/heart3.svg"
            alt="Floating heart"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        {/* Delux Coding School Branding */}
        <div className="text-center mb-8">
          <h2 className=" text-white text-2xl">@</h2>
          <h3 className="text-3xl font-bold text-white mb-2">
            Delux Coding School
          </h3>
          <p className="text-white text-lg mb-2">Where Tech Meets Heart ❤️</p>
          <div className="w-24 h-1 bg-valentine-gold mx-auto rounded-full mb-8"></div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          Create Your Valentine's Gift
        </h1>

        {/* Instructions Card */}
        <div className="max-w-2xl mx-auto mb-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">How It Works</h3>
          <ol className="space-y-3 list-decimal list-inside">
            <li>Choose a template that speaks to your heart</li>
            <li>Add your personal touch with a custom message</li>
            <li>Share the love with a unique gift link</li>
          </ol>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-xl p-6 relative">
          <div className="absolute top-0 right-0 -mt-12 mr-4">
            <div className="bg-valentine-gold text-valentine-red px-4 py-2 rounded-full text-sm font-semibold transform rotate-12">
              Made with ❤️
            </div>
          </div>
          <GiftTemplateList templates={templates} />
        </div>

        {/* Promotional Footer */}
        <div className="max-w-2xl mx-auto mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
          <p className="text-white mb-4">
            Learn to create beautiful web applications like this at Delux Coding
            School!
          </p>
          <a
            href="https://deluxcodingschool.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-valentine-gold text-valentine-red px-6 py-3 rounded-full font-semibold hover:bg-white transition-colors duration-300"
          >
            Explore Our Courses
          </a>
        </div>
      </div>
    </main>
  );
}
