"use server";

export async function getCompanyData() {
  try {
    const res = await fetch(
      "https://apivesti.vesti.mobi/appmarca/v1/config/company/vesti/section/default",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Erro ao buscar dados da empresa");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erro na API:", err);
    return null;
  }
}
