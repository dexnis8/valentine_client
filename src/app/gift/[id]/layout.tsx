import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Valentine's Gift",
  description: "Open your special Valentine's Day gift",
  icons: {
    icon: [{ url: "/love4.jpg", type: "image/jpeg" }],
    apple: [{ url: "/love4.jpg", type: "image/jpeg" }],
  },
};

export default function GiftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
