import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { WritingPreviewSection } from "@/components/home/WritingPreviewSection";
import { Container } from "@/components/layout/Container";

export default function Home() {
  return (
    <main className="flex-1 py-14 sm:py-20">
      <Container wide className="space-y-20">
        <HeroSection />
        <SkillsSection />
        <FeaturedProjectsSection />
        <WritingPreviewSection />
      </Container>
    </main>
  );
}
