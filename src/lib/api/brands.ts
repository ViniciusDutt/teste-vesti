"use server";

import { Brand } from "@/@/types/brand";

export async function getBrands(): Promise<Brand[]> {
  const res = await fetch(
    "https://apivesti.vesti.mobi/appmarca/v1/company/vesti/brands",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Erro ao buscar marcas");

  const data = await res.json();
  return data.data.filter((brand: Brand) => brand.active);
}
