import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Valentine's Gift",
  description: "Open your special Valentine's Day gift",
};

export default function GiftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
