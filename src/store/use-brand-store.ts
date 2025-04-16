import { create } from "zustand";

type Brand = {
  id: string;
  name: string;
  slug: string;
  active: boolean;
};

interface BrandStore {
  brands: Brand[];
  setBrands: (brands: Brand[]) => void;
}

export const useBrandStore = create<BrandStore>((set) => ({
  brands: [],
  setBrands: (brands) => set({ brands }),
}));
