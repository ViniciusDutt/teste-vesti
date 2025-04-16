"use client";

import { useCompanyStore } from "@/store/use-company-store";
import { Menu, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { useState } from "react";
import { useCartUI } from "@/store/use-cart-ui";
import { useCartStore } from "@/store/use-cart-store";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MenuItems = [
  {
    name: "Início",
  },
  {
    name: "Masculino",
  },
  {
    name: "Feminino",
  },
];

const Header = () => {
  const company = useCompanyStore(
    (state) =>
      state.company as {
        company: { app_url?: string; logo?: string; social_name?: string };
      } | null
  );
  const [search, setSearch] = useState(false);
  const { toggle } = useCartUI();
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!company) return null;

  return (
    <>
      <header className="flex items-center py-2 px-5 justify-between border-b border-gray-5">
        <div className="flex items-center gap-2">
          <Sheet modal={true}>
            <SheetTrigger className="cursor-pointer">
              <Menu />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <nav className="px-4 flex flex-col gap-2">
                {MenuItems.map((item) => (
                  <Link href="/" key={item.name}>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href={company?.company?.app_url ?? "/"}>
            <Image
              src={company?.company?.logo ?? ""}
              alt={company?.company?.social_name ?? "Logo"}
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setSearch((prev) => !prev)}>
            <Search className="text-gray-1 cursor-pointer" />
          </button>
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
        </div>
      </header>
      {search && (
        <div className="px-5 py-3">
          <SearchInput />
        </div>
      )}
    </>
  );
};

export default Header;
