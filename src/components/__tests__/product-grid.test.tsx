import { render, screen, fireEvent } from "@testing-library/react";
import { ProductGrid } from "@/components/product/product-grid";
import { vi } from "vitest";
import { useCartStore } from "@/store/use-cart-store";

vi.mock("@/store/use-cart-store", async () => {
  const actual = await vi.importActual<typeof import("@/store/use-cart-store")>(
    "@/store/use-cart-store"
  );
  return {
    ...actual,
    useCartStore: vi.fn(() => ({
      items: [],
      addItem: vi.fn(),
      decrementItem: vi.fn(),
    })),
  };
});

const mockProduct = {
  id: "p1",
  name: "Camiseta",
  slug: "camiseta",
  price: 49.9,
  main_media: {
    thumb: {
      url: "https://via.placeholder.com/100",
    },
  },
};

const colors = [
  {
    id: "c1",
    name: "Preto",
    code: "#000000",
    media: null,
  },
];

const sizes = [
  { id: "s1", name: "P" },
  { id: "s2", name: "M" },
];

const stocks = [
  { color_id: "c1", size_id: "s1", quantity: 10, sell: true },
  { color_id: "c1", size_id: "s2", quantity: 0, sell: false },
];

describe("ProductGrid", () => {
  it("deve renderizar botão '+' quando o produto tem estoque", () => {
    render(
      <ProductGrid
        product={mockProduct}
        colors={colors}
        sizes={sizes}
        stocks={stocks}
      />
    );

    expect(screen.getAllByText("+").length).toBeGreaterThan(0);
  });

  it("não deve renderizar botão '+' se o produto não pode ser vendido", () => {
    render(
      <ProductGrid
        product={mockProduct}
        colors={colors}
        sizes={sizes}
        stocks={stocks}
      />
    );

    const disabledCell = screen
      .getAllByRole("cell")
      .find((cell) => cell.textContent === "");

    expect(disabledCell).toBeDefined();
  });

  it("deve chamar addItem ao clicar no botão '+'", () => {
    const mockAdd = vi.fn();
    (useCartStore as any).mockReturnValue({
      items: [],
      addItem: mockAdd,
      decrementItem: vi.fn(),
    });

    render(
      <ProductGrid
        product={mockProduct}
        colors={colors}
        sizes={sizes}
        stocks={stocks}
      />
    );

    const plusButton = screen.getAllByText("+")[0];
    fireEvent.click(plusButton);

    expect(mockAdd).toHaveBeenCalled();
  });
});
