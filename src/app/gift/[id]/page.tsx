/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState, useCallback } from "react";
import { useGift } from "@/hooks/useGift";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorAlert from "@/components/ui/ErrorAlert";
import Image from "next/image";
import Link from "next/link";
import { Gift } from "@/types/gift";

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ViewGift({ params, searchParams }: PageProps) {
  const { getGift } = useGift();
  const [gift, setGift] = useState<Gift | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [loveEmojis, setLoveEmojis] = useState<
    Array<{ id: number; left: number }>
  >([]);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  useEffect(() => {
    const loadGift = async () => {
      try {
        const giftData = await getGift(params.id);
        setGift(giftData);
        if (!giftData?.hasPassword) {
          // setIsRevealed(true);
        }
      } catch (error: any) {
        setError(error?.message || "Failed to load gift");
      } finally {
        setLoading(false);
      }
    };

    loadGift();
  }, [getGift, params.id]);

  const handleOpenGift = async () => {
    if (gift?.hasPassword && !password) {
      setPasswordError(true);
      return;
    }

    setIsOpening(true);
    setIsEnvelopeOpen(true);

    try {
      const giftData = await getGift(params.id, password);
      if (giftData) {
        setGift(giftData);
        setTimeout(() => {
          setIsRevealed(true);
        }, 2000);
      }
    } catch (error: any) {
      setPasswordError(true);
      setIsEnvelopeOpen(false);
    }
    setIsOpening(false);
  };

  // Function to create falling love emojis
  const createLoveEmoji = useCallback(() => {
    const newEmoji = {
      id: Date.now(),
      left: Math.random() * 100, // Random position from 0-100%
    };
    setLoveEmojis((prev) => [...prev, newEmoji]);
    setTimeout(() => {
      setLoveEmojis((prev) => prev.filter((emoji) => emoji.id !== newEmoji.id));
    }, 3000);
  }, []);

  // Start love shower when gift is revealed
  useEffect(() => {
    if (isRevealed) {
      const interval = setInterval(createLoveEmoji, 300);
      return () => clearInterval(interval);
    }
  }, [isRevealed, createLoveEmoji]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-valentine-red to-valentine-pink flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !gift) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-valentine-red to-valentine-pink p-4">
        <ErrorAlert message={error || "Gift not found"} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-valentine-red to-valentine-pink overflow-hidden">
      {/* Love Emoji Shower */}
      {isRevealed && (
        <div className="fixed inset-0 pointer-events-none">
          {loveEmojis.map((emoji) => (
            <div
              key={emoji.id}
              className="absolute animate-love-shower"
              style={{ left: `${emoji.left}%` }}
            >
              {["❤️", "💝", "💖", "💕", "💗"][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Delux Coding School Branding */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-xl text-white">A Special Gift Powered by</h2>
          <h3 className="text-3xl font-bold text-white">Delux Coding School</h3>
          <p className="text-white">Where Love Meets Code ❤️</p>
        </div>

        <div className="max-w-2xl mx-auto overflow-hidden transform transition-all duration-500">
          {!isRevealed ? (
            <div className="relative bg-white rounded-lg shadow-xl p-8 text-center">
              <div className="relative transform transition-all duration-500">
                {/* Envelope Container */}
                <div
                  onClick={!isOpening ? handleOpenGift : undefined}
                  className={`w-64 h-48 mx-auto mb-6 relative perspective-1000 cursor-pointer ${
                    isOpening ? "pointer-events-none" : "hover:scale-105"
                  }`}
                >
                  {/* Envelope Body */}
                  <div
                    className={`absolute inset-0 bg-valentine-red rounded-lg shadow-lg ${
                      isEnvelopeOpen ? "animate-envelope-open" : ""
                    }`}
                  >
                    {/* Envelope Flap */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-12 bg-valentine-crimson rounded-t-lg origin-top transform-gpu ${
                        isEnvelopeOpen ? "animate-envelope-flap" : ""
                      }`}
                      style={{
                        clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                      }}
                    />
                    {/* Envelope Content */}
                    <div
                      className={`absolute inset-4 bg-white rounded-lg shadow-inner transform-gpu ${
                        isEnvelopeOpen ? "animate-card-rise" : ""
                      }`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl">💌</span>
                      </div>
                    </div>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                  You've Received a Valentine's Gift!
                </h1>
                {gift.hasPassword && (
                  <div className="mb-6">
                    <input
                      type="password"
                      placeholder="Enter gift password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError(false);
                      }}
                      className={`w-full max-w-xs px-4 py-2 rounded-full border ${
                        passwordError
                          ? "border-valentine-red"
                          : "border-gray-300"
                      }`}
                    />
                    {passwordError && (
                      <p className="text-valentine-red text-sm mt-2">
                        Invalid password
                      </p>
                    )}
                  </div>
                )}
                <button
                  disabled={isOpening}
                  onClick={handleOpenGift}
                  className="bg-valentine-red text-white py-3 px-8 rounded-full font-semibold hover:bg-valentine-crimson transition-colors duration-300"
                >
                  {isOpening ? "Opening..." : "Open Your Gift"}
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-fall-in bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={gift.imageUrl}
                  alt="Valentine's Gift"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white text-lg">{gift.message}</p>
                  <span className="inline-block px-2 py-1 bg-valentine-pink text-white text-xs rounded mt-2">
                    {gift.theme}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-sm font-medium text-gray-500">From</h2>
                    <p className="text-xl text-gray-800">{gift.senderName}</p>
                  </div>
                  {gift.customMessage && (
                    <div>
                      <h2 className="text-sm font-medium text-gray-500">
                        Message
                      </h2>
                      <p className="text-xl text-gray-800 italic">
                        &quot;{gift.customMessage}&quot;
                      </p>
                    </div>
                  )}
                  <div className="pt-4 text-center">
                    <p className="text-valentine-red font-medium animate-heart-beat">
                      Happy Valentine's Day! ❤️
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action Section */}
        <div className="max-w-2xl mx-auto mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center animate-fade-in">
          <h3 className="text-2xl font-bold text-white mb-4">
            Want to Create Your Own Valentine's Gift?
          </h3>
          <p className="text-white mb-6">
            Join Delux Coding School and learn how to build amazing applications
            like this one!
          </p>
          <div className="space-x-4">
            <Link
              href="/create"
              className="inline-block bg-valentine-gold text-valentine-red px-6 py-3 rounded-full font-semibold hover:bg-white transition-colors duration-300"
            >
              Create a Gift
            </Link>
            <a
              href="https://deluxcodingschool.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-valentine-red px-6 py-3 rounded-full font-semibold hover:bg-valentine-light-pink transition-colors duration-300"
            >
              Learn to Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
