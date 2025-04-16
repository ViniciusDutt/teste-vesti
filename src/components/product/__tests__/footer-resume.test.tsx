import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FooterResume } from "../footer-resume";
import { useCartStore } from "@/store/use-cart-store";

vi.mock("@/store/use-cart-store", () => {
  return {
    useCartStore: vi.fn(),
  };
});

describe("FooterResume", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve exibir o total de itens e o valor total corretamente", () => {
    (useCartStore as any).mockReturnValue([
      {
        id: "1",
        name: "Produto Teste",
        slug: "produto-teste",
        media: "https://example.com/img.jpg",
        price: 50,
        quantity: 2,
      },
      {
        id: "2",
        name: "Outro Produto",
        slug: "outro-produto",
        media: "https://example.com/img2.jpg",
        price: 25,
        quantity: 1,
      },
    ]);

    render(<FooterResume />);

    expect(screen.getByText("3 pc.")).toBeInTheDocument();
    expect(screen.getByText("R$ 125,00")).toBeInTheDocument();
    expect(screen.getByText(/Finalizar compra/i)).toBeInTheDocument();
  });

  it("não deve mostrar botão de finalizar quando não há itens", () => {
    (useCartStore as any).mockReturnValue([]);

    render(<FooterResume />);

    expect(screen.getByText("0 pc.")).toBeInTheDocument();
    expect(screen.queryByText(/Finalizar compra/i)).not.toBeInTheDocument();
  });
});
