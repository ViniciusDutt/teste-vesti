import { render, screen } from "@testing-library/react";
import { ProductCard } from "../product-card";

const product = {
  id: "1",
  slug: "produto-teste",
  name: "Produto Teste",
  price: "99.90",
  promotion: true,
  media: {
    normal: {
      url: "https://via.placeholder.com/150",
      width: 150,
      height: 150,
    },
  },
};

describe("ProductCard", () => {
  it("deve exibir o nome e o preço do produto", () => {
    render(<ProductCard product={product} showPromoBadge={false} />);
    expect(screen.getByText("Produto Teste")).toBeInTheDocument();
    expect(screen.getByText("R$ 99,90")).toBeInTheDocument();
  });

  it("deve exibir o selo de promoção se showPromoBadge for true", () => {
    render(<ProductCard product={product} showPromoBadge={true} />);
    expect(screen.getByText("Promoção 🔥")).toBeInTheDocument();
  });

  it("deve exibir botão 'Ver detalhes' se não houver preço", () => {
    render(<ProductCard product={{ ...product, price: null }} />);
    expect(screen.getByText(/ver detalhes/i)).toBeInTheDocument();
  });
});
