export type SlideBodyItem =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type SlideCTA = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

import type { GeometryFigure } from "@/content/geometry";

export type Slide = {
  id?: string;
  /** The figure marking this section. See src/content/geometry.ts. */
  figure?: GeometryFigure;
  title: string;
  subtitle?: string;
  body?: SlideBodyItem[];
  ctas?: SlideCTA[];
};
