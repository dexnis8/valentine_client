"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGift } from "@/hooks/useGift";
import type { GiftTemplate } from "@/types/gift";
import Modal from "@/components/ui/Modal";

interface GiftTemplateListProps {
  templates: GiftTemplate[];
}

export default function GiftTemplateList({ templates }: GiftTemplateListProps) {
  const router = useRouter();
  const { sendGift } = useGift();
  const [selectedTemplate, setSelectedTemplate] = useState<GiftTemplate | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTemplateClick = (template: GiftTemplate) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSenderName("");
    setCustomMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate) return;

    setLoading(true);
    try {
      const gift = await sendGift({
        templateId: selectedTemplate._id,
        senderName,
        customMessage,
      });
      if (gift) {
        router.push(`/preview/${gift._id}`);
      }
    } catch (error) {
      console.error("Failed to create gift:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template._id}
            className="relative rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => handleTemplateClick(template)}
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={template.imageUrl}
                alt={template.message}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white text-sm">{template.message}</p>
              <span className="inline-block px-2 py-1 bg-valentine-pink text-white text-xs rounded mt-2">
                {template.theme}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Personalize Your Gift"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-valentine-light-pink/10 rounded-lg p-4 mb-6">
            <p className="text-lg font-medium text-valentine-red mb-2">
              Selected Template
            </p>
            <p className="text-gray-700">{selectedTemplate?.message}</p>
          </div>

          <div>
            <label
              htmlFor="senderName"
              className="block text-sm font-medium text-gray-700"
            >
              Your Name
            </label>
            <input
              type="text"
              id="senderName"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              required
              className="mt-1 p-2 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-valentine-red focus:ring-valentine-red"
            />
          </div>

          <div>
            <label
              htmlFor="customMessage"
              className="block text-sm font-medium text-gray-700"
            >
              Custom Message (Optional)
            </label>
            <textarea
              id="customMessage"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={4}
              className="mt-1 p-2 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-valentine-red focus:ring-valentine-red"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-valentine-red text-white py-2 px-6 rounded-full font-semibold hover:bg-valentine-crimson transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "Creating Gift..." : "Create Gift"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
