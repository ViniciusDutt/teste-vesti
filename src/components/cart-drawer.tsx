"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useCartStore } from "@/store/use-cart-store";
import { useCartUI } from "@/store/use-cart-ui";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function CartDrawer() {
  const { isOpen, close } = useCartUI();
  const { items, addItem, decrementItem, removeItem, clearCart } =
    useCartStore();

  const [removingIds, setRemovingIds] = useState<string[]>([]);

  const handleRemoveWithDelay = (id: string) => {
    setRemovingIds((prev) => [...prev, id]);
    setTimeout(() => {
      removeItem(id);
      setRemovingIds((prev) => prev.filter((rid) => rid !== id));
    }, 500);
  };

  const total = items.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.quantity,
    0
  );

  return (
    <Drawer open={isOpen} onOpenChange={close}>
      <DrawerContent className="h-full max-w-[768px] md:mx-auto p-0">
        <div className="flex flex-col justify-between h-full">
          <div className="h-full pb-10 overflow-auto">
            <DrawerHeader className="border-b px-4 py-2">
              <DrawerTitle>Carrinho</DrawerTitle>
            </DrawerHeader>

            <div className="p-4 space-y-4">
              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center">
                  Seu carrinho está vazio.
                </p>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item) =>
                    removingIds.includes(item.id) ? null : (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-3 items-center"
                      >
                        <Image
                          src={item.media}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="rounded object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.price !== null
                              ? `R$ ${item.price.toFixed(2).replace(".", ",")}`
                              : "Sob consulta"}
                          </p>

                          <div className="flex gap-2 mt-1 items-center">
                            <button
                              onClick={() => {
                                if (item.quantity === 1) {
                                  handleRemoveWithDelay(item.id);
                                } else {
                                  decrementItem(item.id);
                                }
                              }}
                              className="text-sm px-2 py-1 cursor-pointer"
                            >
                              –
                            </button>
                            <span className="text-sm">{item.quantity}</span>
                            <button
                              onClick={() => addItem(item, 1)}
                              className="text-sm px-2 py-1 cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveWithDelay(item.id)}
                          className="cursor-pointer"
                          aria-label="Remover item"
                        >
                          <Trash className="text-muted-foreground" />
                        </button>
                      </motion.div>
                    )
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>

          {items.length > 0 && (
            <div className="sticky bottom-0 bg-white border-t p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace(".", ",")}</span>
              </div>
              <Button className="w-full py-6 text-base">
                Finalizar compra
              </Button>
              <Button
                variant="outline"
                className="w-full py-6 border-primary text-base"
                onClick={clearCart}
              >
                Limpar carrinho
              </Button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
