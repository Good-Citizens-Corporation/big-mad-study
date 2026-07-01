import { SlideDeck } from "../../components/SlideDeck";
import { TopNav } from "../../components/TopNav";
import { publicHomeSlides } from "@/content/publicHome";

export const metadata = {
  title: "The Big-Mad Behavioral Study",
  description:
    "A full-screen, slide-based story that shares what we're studying, how to participate, and why the work matters.",
};

export default function Home() {
  return (
    <>
      <TopNav />
      <SlideDeck slides={publicHomeSlides} />
    </>
  );
}
