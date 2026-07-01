"use client";

import { createContext, useContext, ReactNode, useState } from "react";

type HeaderVariant = "default" | "hero";

interface HeaderVariantContextValue {
  variant: HeaderVariant;
  setVariant: (variant: HeaderVariant) => void;
}

const HeaderVariantContext = createContext<HeaderVariantContextValue>({
  variant: "default",
  setVariant: () => {},
});

export function HeaderVariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<HeaderVariant>("default");

  return (
    <HeaderVariantContext.Provider value={{ variant, setVariant }}>
      {children}
    </HeaderVariantContext.Provider>
  );
}

export function useHeaderVariant(): HeaderVariant {
  return useContext(HeaderVariantContext).variant;
}

export function useSetHeaderVariant(): (variant: HeaderVariant) => void {
  return useContext(HeaderVariantContext).setVariant;
}
