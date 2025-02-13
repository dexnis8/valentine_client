"use client";

import { useEffect, useState } from "react";
import { useGift } from "@/hooks/useGift";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorAlert from "@/components/ui/ErrorAlert";
import Image from "next/image";
import { Gift } from "@/types/gift";
import Modal from "@/components/ui/Modal";

export default function GiftPreview({ params }: { params: { id: string } }) {
  const { getGift } = useGift();
  const [gift, setGift] = useState<Gift | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const loadGift = async () => {
      try {
        const giftData = await getGift(params.id);
        setGift(giftData);
      } catch (err) {
        setError("Failed to load gift");
      } finally {
        setLoading(false);
      }
    };

    loadGift();
  }, [getGift, params.id]);

  const handleCopyLink = () => {
    const giftUrl = `${window.location.origin}/gift/${gift?._id}`;
    navigator.clipboard.writeText(giftUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

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
    <main className="min-h-screen bg-gradient-to-br from-valentine-red to-valentine-pink">
      <div className="container mx-auto px-4 py-8">
        {/* Delux Coding School Branding */}
        <div className="text-center mb-8">
          <h2 className="text-xl text-white">Powered by</h2>
          <h3 className="text-3xl font-bold text-white">Delux Coding School</h3>
          <p className="text-white">Spreading Love Through Code 💝</p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="relative h-64">
            <Image
              src={gift.imageUrl}
              alt="Gift preview"
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
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Your Valentine&apos;s Gift is Ready!
            </h1>
            <div className="space-y-4">
              {/* <div>
                <h2 className="text-sm font-medium text-gray-500">
                  Template Message
                </h2>
                <p className="text-lg text-gray-800">{gift.message}</p>
              </div> */}
              <div>
                <h2 className="text-sm font-medium text-gray-500">From</h2>
                <p className="text-lg text-gray-800">{gift.senderName}</p>
              </div>
              {gift.customMessage && (
                <div>
                  <h2 className="text-sm font-medium text-gray-500">
                    Custom Message
                  </h2>
                  <p className="text-lg text-gray-800 italic">
                    &quot;{gift.customMessage}&quot;
                  </p>
                </div>
              )}
              <div className="pt-4 space-y-3">
                <button
                  onClick={handleCopyLink}
                  className="w-full bg-valentine-red text-white py-3 px-6 rounded-full font-semibold hover:bg-valentine-crimson transition-colors duration-300"
                >
                  {copied ? "Link Copied!" : "Copy Gift Link"}
                </button>
                <button
                  onClick={handleEdit}
                  className="w-full border-2 border-valentine-red text-valentine-red py-3 px-6 rounded-full font-semibold hover:bg-valentine-light-pink/10 transition-colors duration-300"
                >
                  Edit Gift
                </button>
                <p className="text-sm text-gray-500 text-center">
                  Share this link with your valentine
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Promotional Footer */}
        <div className="max-w-2xl mx-auto mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
          <p className="text-white mb-4">
            This Valentine&apos;s gift was created using skills taught at Delux
            Coding School. Join us to learn how to build amazing web
            applications!
          </p>
          <a
            href="https://deluxcodingschool.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-valentine-gold text-valentine-red px-6 py-3 rounded-full font-semibold hover:bg-white transition-colors duration-300"
          >
            Start Learning Today
          </a>
        </div>
      </div>

      {/* Edit Confirmation Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Your Gift"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Would you like to edit your gift? This will take you back to the
            creation page where you can:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Choose a different template</li>
            <li>Update your name</li>
            <li>Modify your custom message</li>
          </ul>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Cancel
            </button>
            <a
              href="/create"
              className="bg-valentine-red text-white py-2 px-6 rounded-full font-semibold hover:bg-valentine-crimson transition-colors duration-300"
            >
              Edit Gift
            </a>
          </div>
        </div>
      </Modal>
    </main>
  );
}
