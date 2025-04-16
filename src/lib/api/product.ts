export async function getProductBySlug(slug: string) {
  const res = await fetch(
    `https://apivesti.vesti.mobi/appmarca/v1/products/company/vesti/product/${slug}/showcase`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  return await res.json();
}
