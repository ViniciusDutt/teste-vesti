"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";

function useCopyToClipboard() {
  return async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Link copiado!");
    } catch {
      toast("Erro ao copiar");
    }
  };
}

export const ShareButton = () => {
  const copyToClipboard = useCopyToClipboard();

  const handleShare = () => {
    const currentUrl = window.location.href;
    copyToClipboard(currentUrl);
  };

  return (
    <button className="cursor-pointer" onClick={handleShare}>
      <Share2 />
    </button>
  );
};
