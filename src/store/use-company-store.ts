import { create } from "zustand";

type Company = {
  id: string;
  social_name: string;
  company_name: string;
  logo: string;
  app_url: string;
  phone: string;
  bio: string;
  site: string;
  instagram: string;
  color: string;
  [key: string]: string | number | boolean | null | undefined;
};

interface CompanyStore {
  company: Company | null;
  setCompany: (company: Company) => void;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  company: null,
  setCompany: (company) => set({ company }),
}));
