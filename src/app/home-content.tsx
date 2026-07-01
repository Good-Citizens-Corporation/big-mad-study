import { SlideDeck } from "../../components/SlideDeck";
import { TopNav } from "../../components/TopNav";
import { publicHomeSlides } from "@/content/publicHome";
import { HeaderVariantClient } from "./header-variant-client";

export function HomeContent() {
  return (
    <HeaderVariantClient variant="hero">
      <TopNav />
      <SlideDeck slides={publicHomeSlides} />
    </HeaderVariantClient>
  );
}
