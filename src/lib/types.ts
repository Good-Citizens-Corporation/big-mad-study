export type SlideBodyItem =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type SlideCTA = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type Slide = {
  id?: string;
  emoji?: string;
  title: string;
  subtitle?: string;
  body?: SlideBodyItem[];
  ctas?: SlideCTA[];
};
