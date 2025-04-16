import { getProducts } from "@/lib/api/products";
import ProductCard from "@/components/product/product-card";
import { PaginationControls } from "@/components/pagination-controls";
import { Product } from "@/@/types/product";

interface Props {
  searchParams: Record<string, string | string[] | undefined>;
}

export async function ProductsGrid({ searchParams }: Props) {
  const { page, perpage, sort, promo, term, brand } = await searchParams;

  const { products, pagination } = await getProducts({
    page: Number(page) || 1,
    perpage: 30,
    sort: typeof sort === "string" ? sort : undefined,
    promo: promo === "true",
    search: typeof term === "string" ? term : undefined,
    brand: typeof brand === "string" ? brand : undefined,
  });

  const isPromoPage = promo === "true";

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-3 px-5">
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            showPromoBadge={isPromoPage}
          />
        ))}
      </div>
      <PaginationControls {...pagination} />
    </>
  );
}
