export async function getProducts(params: {
  page?: number;
  perpage?: number;
  sort?: string;
  promo?: boolean;
  search?: string;
  brand?: string;
}) {
  const query = new URLSearchParams();

  if (params.page) query.set("page", String(params.page));
  if (params.perpage) query.set("perpage", String(params.perpage));
  if (params.sort) query.set("sort", params.sort);
  if (params.promo) query.set("filter[promotion]", "true");
  if (params.search) query.set("filter[search]", params.search);
  if (params.brand) query.set("filter[brand_slugs]", params.brand);

  const res = await fetch(
    `https://apivesti.vesti.mobi/appmarca/v2/catalogue/company/vesti?${query.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Erro ao buscar produtos");

  const data = await res.json();

  return {
    products: data.products || [],
    pagination: {
      currentPage: data.meta.current_page,
      hasNextPage: !!data.links.next,
      hasPrevPage: !!data.links.prev,
    },
  };
}
