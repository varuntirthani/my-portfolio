import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "About",
  description:
    "Interests, current work, and areas of exploration at the intersection of technology, investing, and research.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 py-14 sm:py-20">
      <Container as="main">
        <AboutContent />
      </Container>
    </main>
  );
}
