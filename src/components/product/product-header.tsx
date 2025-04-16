"use client";

import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/use-cart-store";
import { useCartUI } from "@/store/use-cart-ui";
import { MoveLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";

const ProductHeader = () => {
  const { toggle } = useCartUI();
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 bg-white border-b flex items-center justify-between py-2 px-5 z-10">
      <Link href="/" className="cursor-pointer">
        <MoveLeft />
      </Link>
      <button
        onClick={toggle}
        className={cn(
          "relative cursor-pointer p-3",
          totalItems > 0 && "bg-success/20 rounded-xl"
        )}
      >
        {totalItems > 0 && (
          <span className="absolute top-1 right-1 text-xs text-white bg-success rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
        <ShoppingCart className="text-gray-1" />
      </button>
    </header>
  );
};

export default ProductHeader;
