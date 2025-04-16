"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const paramsObject = Object.fromEntries(searchParams.entries());
  const initialTerm = paramsObject.term ?? "";

  const [value, setValue] = useState(initialTerm);
  const debounced = useDebounce(value, 600);

  useEffect(() => {
    const params = new URLSearchParams(paramsObject);

    if (debounced) {
      params.set("term", debounced);
    } else {
      params.delete("term");
    }

    startTransition(() => {
      router.replace(`?${params.toString()}`);
    });
  }, [debounced]);

  return (
    <Input
      placeholder="O que você procura?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="bg-gray-6 p-3 h-auto placeholder:text-gray-3 text-black"
    />
  );
};
