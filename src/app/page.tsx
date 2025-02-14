/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import Footer from "@/components/ui/Footer";
// import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-valentine-red to-valentine-pink">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="mb-8">
            <h2 className="text-xl text-white mb-2">Presented by</h2>
            <h3 className="text-3xl font-bold text-white mb-4">
              Delux Coding School
            </h3>
            <p className="text-white text-lg">Where Coding Dreams Come True</p>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-float">
            Valentine's Day Gifting
          </h1>
          <p className="text-xl text-white mb-12">
            Share love and joy with your special someone through our digital
            gifts
          </p>
          <Link
            href="/create"
            className="inline-block bg-white text-valentine-red px-8 py-4 rounded-full font-semibold text-lg hover:bg-valentine-light-pink hover:text-valentine-crimson transition-colors duration-300 animate-heart-beat"
          >
            Create a Gift
          </Link>

          <div className="mt-16 max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-2xl font-semibold mb-4">
              Why Choose Delux Coding School?
            </h3>
            <ul className="text-left space-y-3">
              <li className="flex items-center">
                <span className="mr-2">💻</span>
                Expert instructors with industry experience
              </li>
              <li className="flex items-center">
                <span className="mr-2">🚀</span>
                Hands-on project-based learning
              </li>
              <li className="flex items-center">
                <span className="mr-2">🌟</span>
                Modern curriculum covering latest technologies
              </li>
              <li className="flex items-center">
                <span className="mr-2">🤝</span>
                Supportive learning community
              </li>
            </ul>
            <a
              href="https://deluxcodingschool.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-valentine-gold text-valentine-red px-6 py-3 rounded-full font-semibold hover:bg-white transition-colors duration-300"
            >
              Start Your Coding Journey
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
