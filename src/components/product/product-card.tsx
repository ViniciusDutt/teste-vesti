"use client";

import { Product } from "@/@/types/product";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  showPromoBadge?: boolean;
}

export const ProductCard = ({ product, showPromoBadge }: ProductCardProps) => {
  const isPromo = product.promotion === true;
  return (
    <Link href={`/product/${product.slug}`} className="relative flex flex-col">
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {showPromoBadge && (
          <span className="absolute top-2 left-2 rounded bg-primary text-white px-2 py-1 text-xs font-bold z-10">
            Promoção 🔥
          </span>
        )}
        <Image
          src={product.media.normal.url}
          alt={product.name}
          width={product.media.normal.width}
          height={product.media.normal.height}
          className="object-cover w-full h-full"
        />
      </div>

      <span className="text-sm mt-2">{product.name}</span>

      {product.price !== null ? (
        <span className="text-sm font-bold">
          R$ {parseFloat(product.price).toFixed(2).replace(".", ",")}
        </span>
      ) : (
        <div>
          <Button
            variant="link"
            className="text-sm font-normal text-muted-foreground p-0"
          >
            Ver detalhes
          </Button>
        </div>
      )}
    </Link>
  );
};

export default ProductCard;
