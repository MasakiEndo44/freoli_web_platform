import { Hero } from "@/components/sections/Hero";
import { SNSBar } from "@/components/sections/SNSBar";
import { LivesSection } from "@/components/sections/LivesSection";
import { PastLives } from "@/components/sections/PastLives";
import { MembersSection } from "@/components/sections/MembersSection";
import { PhotoGallery } from "@/components/sections/PhotoGallery";
import { SubscribeBar } from "@/components/sections/SubscribeBar";
import { NewsList } from "@/components/sections/NewsList";
import { ContactForm } from "@/components/sections/ContactForm";
import { lives } from "@/data/lives";
import { photos } from "@/data/photos";
import { partitionLives } from "@/lib/lives-utils";

export default function HomePage() {
  const { upcoming, past } = partitionLives(lives);

  return (
    <main className="min-h-screen">
      {/* 非交渉 UX シーケンス（AGENTS.md §1 / 要件定義書 F2.1 / engineering.md §4.2）：
          1.Hero → 2.SNSBar → 3.NextLive → 4.PastLives → 5.Members → 6.PhotoGallery
          → 7.Subscribe → 8.News → 9.ContactForm */}
      <Hero />
      <SNSBar />
      <LivesSection nextLive={upcoming[0]} />
      <PastLives pastLives={past} />
      <MembersSection />
      <PhotoGallery photos={photos} />
      <SubscribeBar />
      <NewsList />
      <ContactForm />
    </main>
  );
}
