import { getProductBySlug } from "@/lib/api/product";
import { FooterResume } from "@/components/product/footer-resume";
import { ProductCarousel } from "@/components/product/product-carousel";
import { ProductGrid } from "@/components/product/product-grid";
import ProductHeader from "@/components/product/product-header";
import { CartDrawer } from "@/components/cart-drawer";
import { ShareButton } from "@/components/product/share-button";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const data = await getProductBySlug(slug);
  const product = data?.product_group;

  if (!product) return notFound();

  return (
    <div className="flex flex-col pb-40 lg:pb-0 lg:justify-center">
      <CartDrawer />
      <ProductHeader />
      <div className="flex flex-col lg:flex-row lg:self-center lg:max-w-7xl">
        <ProductCarousel images={product.media} />

        <div className="p-5 flex flex-col lg:flex-1 gap-3">
          <div className="flex justify-between items-center">
            <div className="w-full flex flex-col gap-2">
              <p className="text-lg text-primary font-bold text-right lg:text-left">
                {product.price !== null
                  ? `R$ ${parseFloat(product.price)
                      .toFixed(2)
                      .replace(".", ",")}`
                  : "Sob consulta"}
              </p>
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-xl uppercase">{product.name}</h1>
                <ShareButton />
              </div>
              <span className="text-xs text-[#A6A6A6]">{product.code}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3">
            {product.composition}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {product.description}
          </p>

          <div className="text-sm p-2 bg-[#FFFBE6] border border-[#F9E8A8] text-[#F07C3C] rounded-xs text-center">
            <b>ATENÇÃO!</b> Aperte no + para incluir a quantidade de peças
            desejadas.
          </div>

          <ProductGrid
            colors={product.colors}
            sizes={product.sizes}
            stocks={product.stocks}
            product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              main_media: product.main_media,
            }}
          />
        </div>
      </div>
      <FooterResume />
    </div>
  );
}
