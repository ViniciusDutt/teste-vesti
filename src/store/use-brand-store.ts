import { create } from "zustand";
import type { Brand } from "@/@/types/brand";

interface BrandStore {
  brands: Brand[];
  setBrands: (brands: Brand[]) => void;
}

export const useBrandStore = create<BrandStore>((set) => ({
  brands: [],
  setBrands: (brands) => set({ brands }),
}));
