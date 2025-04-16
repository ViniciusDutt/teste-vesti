"use client";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { ChevronDown, X } from "lucide-react";
import { BrandDrawer } from "@/components/brand-drawer";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";

const Filters = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const promoParam = searchParams.get("promo") === "true";

  const hasActiveFilters =
    searchParams.get("promo") === "true" ||
    searchParams.get("brand") ||
    searchParams.get("term") ||
    searchParams.get("sort");

  const hasBrandFilter = !!searchParams.get("brand");

  const togglePromo = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (promoParam) {
      params.delete("promo");
    } else {
      params.set("promo", "true");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex items-center justify-between px-5 py-3">
      <div className="flex items-center gap-2">
        {hasActiveFilters && (
          <button
            onClick={() => {
              startTransition(() => {
                router.push(pathname);
              });
            }}
            className="flex items-center gap-2 bg-primary text-white p-1 rounded-full cursor-pointer"
          >
            <X />
          </button>
        )}
        <Toggle
          pressed={promoParam}
          onPressedChange={togglePromo}
          className="bg-gray-6 p-2 font-normal text-gray-1 data-[state=on]:bg-primary data-[state=on]:text-white"
        >
          Promoção
        </Toggle>
        <Button
          onClick={() => setOpen(true)}
          variant="secondary"
          className={cn(
            "font-normal text-gray-1 gap-0",
            hasBrandFilter && "bg-primary text-white hover:bg-primary/90"
          )}
        >
          Marcas
          <ChevronDown className="ml-2" />
        </Button>
        <BrandDrawer open={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
};

export default Filters;
