"use client";

import { getBrands } from "@/lib/api/brands";
import { useBrandStore } from "@/store/use-brand-store";

let hasInitialized = false;

export async function setupBrands() {
  if (hasInitialized) return;
  hasInitialized = true;

  const brands = await getBrands();
  useBrandStore.getState().setBrands(brands);
}
