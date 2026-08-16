"use client";

import { useEffect, ReactNode } from "react";
import { useSetHeaderVariant } from "./hooks/HeaderVariantProvider";

type HeaderVariant = "default" | "hero";

export function HeaderVariantClient({
  variant,
  children,
}: {
  variant: HeaderVariant;
  children: ReactNode;
}) {
  const setHeaderVariant = useSetHeaderVariant();

  useEffect(() => {
    setHeaderVariant(variant);
    return () => setHeaderVariant("default");
  }, [variant, setHeaderVariant]);

  return <>{children}</>;
}
