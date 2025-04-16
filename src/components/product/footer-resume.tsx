"use client";

import { useCartStore } from "@/store/use-cart-store";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export const FooterResume = () => {
  const items = useCartStore((state) => state.items);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.quantity,
    0
  );

  return (
    <div className="fixed bottom-0 w-full lg:absolute lg:right-10 lg:w-auto lg:border lg:rounded-2xl lg:p-6 lg:bottom-10 bg-white border-t px-5 py-4 flex flex-col gap-2">
      <div className="text-sm flex justify-between">
        <span>{totalItems} pc.</span>
        <span>R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
      </div>

      <Button
        variant="outline"
        className="w-full border-gray-1 text-gray-1 text-base py-6 flex items-center justify-center gap-2"
      >
        <ShoppingCart className="text-primary" size={18} />
        Continuar comprando
      </Button>

      {totalItems > 0 && (
        <Button className="w-full bg-success text-white text-base py-6 flex items-center justify-center">
          Finalizar compra
        </Button>
      )}
    </div>
  );
};
