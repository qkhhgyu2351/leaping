import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HomeFeed } from "@/components/home-feed";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HomeFeed />
      </main>
      <Footer />
    </div>
  );
}
