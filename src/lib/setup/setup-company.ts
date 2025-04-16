"use client";

import { getCompanyData } from "@/lib/api/company";
import { useCompanyStore } from "@/store/use-company-store";

let hasInitialized = false;

export async function setupCompany() {
  if (hasInitialized) return;
  hasInitialized = true;

  const company = await getCompanyData();
  useCompanyStore.getState().setCompany(company);
}
