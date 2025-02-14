import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preview Valentine's Gift",
  description: "Preview and share your Valentine's Day gift",
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
