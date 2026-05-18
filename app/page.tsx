import { Hero } from "@/components/sections/Hero";
import { SNSBar } from "@/components/sections/SNSBar";
import { LivesSection } from "@/components/sections/LivesSection";
import { MembersSection } from "@/components/sections/MembersSection";
import { SubscribeBar } from "@/components/sections/SubscribeBar";
import { NewsList } from "@/components/sections/NewsList";
import { ContactForm } from "@/components/sections/ContactForm";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 非交渉 UX シーケンス（AGENTS.md §1 / 要件定義書 F2.1）：
          1.Hero → 2.SNSBar → 3.Lives → 4.Members → 5.Subscribe → 6.News → 7.ContactForm */}
      <Hero />
      <SNSBar />
      <LivesSection />
      <MembersSection />
      <SubscribeBar />
      <NewsList />
      <ContactForm />
    </main>
  );
}
