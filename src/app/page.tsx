import { Suspense } from "react";
import { ClientInitializer } from "@/components/client-initializer";
import Header from "@/components/header";
import Filters from "@/components/filters";
import { CartDrawer } from "@/components/cart-drawer";
import { ProductsGrid } from "@/components/products";
import { ProductCardSkeleton } from "@/components/product-card-skeleton";

interface HomeProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <main className="flex flex-col min-h-dvh pb-10">
      <CartDrawer />
      <ClientInitializer />
      <Header />
      <Filters />
      <Suspense
        fallback={
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-3 px-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <ProductsGrid searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
