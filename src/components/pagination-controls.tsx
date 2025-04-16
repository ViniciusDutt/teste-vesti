"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface PaginationControlsProps {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function PaginationControls({
  currentPage,
  hasNextPage,
  hasPrevPage,
}: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        {hasPrevPage && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => goToPage(currentPage - 1)}
              className="cursor-pointer"
            />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive className="cursor-default">
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {hasNextPage && (
          <PaginationItem>
            <PaginationNext
              onClick={() => goToPage(currentPage + 1)}
              className="cursor-pointer"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
