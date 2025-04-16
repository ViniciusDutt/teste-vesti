import { getProductBySlug } from "@/lib/api/product";
import { getCompanyData } from "@/lib/api/company";
import type { Metadata } from "next";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getProductBySlug(params.slug);
  const company = await getCompanyData();
  const product = data?.product_group;

  if (!product) {
    return {
      title: "Produto não encontrado",
    };
  }

  return {
    title: `${product.name} | ${company.company.social_name}`,
    description: product.description ?? "Confira este produto incrível!",
    openGraph: {
      title: `${product.name} | ${company.company.social_name}`,
      description: product.description ?? "Confira este produto incrível!",
      images: [
        {
          url: product.main_media?.thumb?.url ?? "/default-thumb.png",
          width: 800,
          height: 600,
        },
      ],
    },
  };
}
