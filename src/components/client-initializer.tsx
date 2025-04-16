"use client";

import { useEffect } from "react";
import { setupBrands } from "@/lib/setup/setup-brands";
import { setupCompany } from "@/lib/setup/setup-company";

export const ClientInitializer = () => {
  useEffect(() => {
    setupBrands();
    setupCompany();
  }, []);

  return null;
};
