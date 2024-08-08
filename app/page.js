import BackToTop from "./backToTop";
import HomePage from "./home/page";

export const metadata = {
  title: "Swift Leads Ai",
  description: "Swift Leads Ai",
};

export default function Home() {
  return (
    <main>
      <HomePage />

      <BackToTop />
    </main>
  );
}
