import { describe, expect, it, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useCartStore } from "@/store/use-cart-store";

describe("useCartStore", () => {
  beforeEach(() => {
    const store = useCartStore.getState();
    act(() => store.clearCart());
  });

  it("adiciona item ao carrinho", () => {
    const { result } = renderHook(() => useCartStore());
    act(() => {
      result.current.addItem(
        {
          id: "1",
          name: "Produto 1",
          slug: "produto-1",
          media: "/img.png",
          price: 100,
        },
        1
      );
    });

    const item = result.current.items.find((i) => i.id === "1");
    expect(item).toBeDefined();
    expect(item?.quantity).toBe(1);
  });

  it("incrementa quantidade se o item já existir", () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(
        {
          id: "2",
          name: "Produto 2",
          slug: "produto-2",
          media: "/img.png",
          price: 50,
        },
        1
      );
      result.current.addItem(
        {
          id: "2",
          name: "Produto 2",
          slug: "produto-2",
          media: "/img.png",
          price: 50,
        },
        2
      );
    });

    const item = result.current.items.find((i) => i.id === "2");
    expect(item?.quantity).toBe(3);
  });

  it("decrementa item corretamente e remove quando quantidade é 0", () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(
        {
          id: "3",
          name: "Produto 3",
          slug: "produto-3",
          media: "/img.png",
          price: 20,
        },
        2
      );
    });

    let item = result.current.items.find((i) => i.id === "3");
    expect(item?.quantity).toBe(2);

    act(() => result.current.decrementItem("3"));
    item = result.current.items.find((i) => i.id === "3");
    expect(item?.quantity).toBe(1);

    act(() => result.current.decrementItem("3"));
    item = result.current.items.find((i) => i.id === "3");
    expect(item).toBeUndefined();
  });

  it("remove item do carrinho", () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(
        {
          id: "4",
          name: "Produto 4",
          slug: "produto-4",
          media: "/img.png",
          price: 150,
        },
        1
      );
      result.current.removeItem("4");
    });

    const item = result.current.items.find((i) => i.id === "4");
    expect(item).toBeUndefined();
  });

  it("limpa todo o carrinho", () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(
        {
          id: "5",
          name: "Produto 5",
          slug: "produto-5",
          media: "/img.png",
          price: 10,
        },
        1
      );
      result.current.clearCart();
    });

    expect(result.current.items.length).toBe(0);
  });
});
