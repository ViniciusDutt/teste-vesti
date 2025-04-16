"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoveLeft, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useBrandStore } from "@/store/use-brand-store";

export function BrandDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const brands = useBrandStore((state) => state.brands);

  const paramsObject = Object.fromEntries(searchParams.entries());
  const initialBrand = paramsObject.brand ?? "";

  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (initialBrand) {
      setSelected(initialBrand.split(","));
    } else {
      setSelected([]);
    }
  }, [initialBrand]);

  const toggleBrand = (slug: string) => {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((b) => b !== slug) : [...prev, slug]
    );
  };

  const clear = () => setSelected([]);

  const filter = () => {
    const params = new URLSearchParams(paramsObject);
    if (selected.length > 0) {
      params.set("brand", selected.join(","));
    } else {
      params.delete("brand");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });

    onClose();
  };

  const filteredBrands =
    search.length > 0
      ? brands.filter((b) =>
          b.name.toLowerCase().includes(search.toLowerCase())
        )
      : brands;

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="p-0 h-full" aria-describedby={undefined}>
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col w-full">
            <DrawerHeader className="w-full border-b px-4 h-20 gap-6 flex flex-row items-center justify-between">
              {!showSearch ? (
                <>
                  <button className="cursor-pointer" onClick={onClose}>
                    <MoveLeft />
                  </button>
                  <DrawerTitle>Marcas</DrawerTitle>
                </>
              ) : (
                <>
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      setShowSearch(false);
                      setSearch("");
                    }}
                  >
                    <X />
                  </button>
                  <div className="w-full">
                    <Input
                      autoFocus
                      placeholder="Buscar marca..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="bg-gray-6 p-3 h-auto placeholder:text-gray-3 text-black"
                    />
                  </div>
                </>
              )}
              <button onClick={() => setShowSearch(!showSearch)}>
                <Search />
              </button>
            </DrawerHeader>

            <div className="p-4 flex flex-wrap gap-2 overflow-y-auto">
              {filteredBrands.map((brand) => (
                <Button
                  key={brand.id}
                  variant={
                    selected.includes(brand.slug) ? "default" : "outline"
                  }
                  onClick={() => toggleBrand(brand.slug)}
                  className={cn(
                    "text-sm font-normal bg-gray-6 border border-[#D5D5D5]",
                    selected.includes(brand.slug) && "bg-primary text-white"
                  )}
                >
                  {brand.name}
                </Button>
              ))}

              {filteredBrands.length === 0 && (
                <p className="w-full text-sm text-center text-muted-foreground">
                  Nenhuma marca encontrada.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 sticky bottom-0 p-5 bg-white border-t">
            <Button
              variant="outline"
              className="flex-1 py-6 text-base border-primary"
              onClick={clear}
              disabled={selected.length === 0}
            >
              Limpar
            </Button>
            <Button
              onClick={filter}
              disabled={selected.length === 0}
              className="flex-1 py-6 text-base"
            >
              Filtrar
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
