import { render, screen, fireEvent } from "@testing-library/react";
import { CartDrawer } from "../cart-drawer";
import { useCartStore } from "@/store/use-cart-store";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const closeMock = vi.fn();
const addItemMock = vi.fn();
const decrementItemMock = vi.fn();
const removeItemMock = vi.fn();
const clearCartMock = vi.fn();

vi.mock("@/store/use-cart-ui", () => {
  return {
    useCartUI: vi.fn(() => ({
      isOpen: true,
      close: closeMock,
    })),
  };
});

beforeEach(() => {
  useCartStore.setState({
    items: [
      {
        id: "1",
        name: "Camiseta Teste",
        slug: "camiseta-teste",
        media: "https://via.placeholder.com/150",
        price: 50.0,
        quantity: 2,
      },
    ],
    addItem: addItemMock,
    decrementItem: decrementItemMock,
    removeItem: removeItemMock,
    clearCart: clearCartMock,
  });
});

afterEach(() => {
  vi.clearAllMocks();
  useCartStore.setState({ items: [] });
});

describe("CartDrawer - Interações", () => {
  it("deve chamar addItem ao clicar no botão '+'", () => {
    render(<CartDrawer />);
    const addBtn = screen.getAllByText("+")[0];
    fireEvent.click(addBtn);
    expect(addItemMock).toHaveBeenCalled();
  });

  it("deve chamar decrementItem ao clicar no botão '–'", () => {
    render(<CartDrawer />);
    const minusBtn = screen.getAllByText("–")[0];
    fireEvent.click(minusBtn);
    expect(decrementItemMock).toHaveBeenCalled();
  });

  it("deve chamar removeItem ao clicar na lixeira", async () => {
    vi.useFakeTimers();

    render(<CartDrawer />);
    const trashBtn = screen.getByLabelText(/remover item/i);
    fireEvent.click(trashBtn);

    vi.advanceTimersByTime(1000);
    await Promise.resolve();

    expect(removeItemMock).toHaveBeenCalled();

    vi.useRealTimers();
  });

  it("deve chamar clearCart ao clicar no botão 'Limpar carrinho'", () => {
    render(<CartDrawer />);
    const clearBtn = screen.getByText(/limpar carrinho/i);
    fireEvent.click(clearBtn);
    expect(clearCartMock).toHaveBeenCalled();
  });
});
