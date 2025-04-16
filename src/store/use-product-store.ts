import { create } from "zustand";

interface ProductStoreState {
  quantities: Record<string, number>;
  setQuantity: (key: string, quantity: number) => void;
  increment: (key: string) => void;
  decrement: (key: string) => void;
  reset: () => void;
}

export const useProductStore = create<ProductStoreState>((set) => ({
  quantities: {},
  setQuantity: (key, quantity) =>
    set((state) => ({
      quantities: { ...state.quantities, [key]: quantity },
    })),
  increment: (key) =>
    set((state) => ({
      quantities: {
        ...state.quantities,
        [key]: (state.quantities[key] || 0) + 1,
      },
    })),
  decrement: (key) =>
    set((state) => {
      const newQty = (state.quantities[key] || 0) - 1;
      const newQuantities = { ...state.quantities };

      if (newQty <= 0) {
        delete newQuantities[key];
      } else {
        newQuantities[key] = newQty;
      }

      return { quantities: newQuantities };
    }),
  reset: () => set({ quantities: {} }),
}));
