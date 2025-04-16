"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { CartItem, useCartStore } from "@/store/use-cart-store";

interface Color {
  id: string;
  name: string;
  code: string;
  media:
    | {
        thumb: {
          url: string;
        };
      }[]
    | null;
}

interface Size {
  id: string;
  name: string;
}

interface Stock {
  color_id: string;
  size_id: string;
  quantity: number;
  sell: boolean;
}

interface Props {
  colors: Color[];
  sizes: Size[];
  stocks: Stock[];
  product: {
    id: string;
    name: string;
    slug: string;
    price: number | null;
    main_media?: {
      thumb?: {
        url: string;
      };
    };
  };
}

export function ProductGrid({ colors, sizes, stocks, product }: Props) {
  const { items, addItem, decrementItem } = useCartStore();

  const getKey = (colorId: string, sizeId: string) =>
    `${product.id}_${colorId}_${sizeId}`;

  const getQuantity = (key: string) => {
    const item = Array.isArray(items)
      ? items.find((item: CartItem) => item.id === key)
      : undefined;
    return item?.quantity || 0;
  };

  const handleIncrement = (key: string, color: Color, size: Size) => {
    addItem(
      {
        id: key,
        name: `${product.name} - ${color.name} / ${size.name}`,
        slug: product.slug,
        media:
          color.media?.[0]?.thumb?.url ?? product.main_media?.thumb?.url ?? "",
        price: product.price,
      },
      1
    );
  };

  const handleDecrement = (key: string) => {
    decrementItem(key);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-center">
        <thead>
          <tr>
            <th className="w-24"></th>
            {sizes.map((size) => (
              <th
                key={size.id}
                className={cn(
                  "p-2 text-sm font-normal text-gray-700 border-l border-gray-4"
                )}
              >
                {size.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {colors.map((color) => (
            <tr key={color.id}>
              <td className="p-2 bg-gray-6 border-b border-b-white">
                <div className="flex flex-col items-center">
                  {color.media?.[0]?.thumb?.url ? (
                    <Image
                      src={color.media[0].thumb.url}
                      alt={color.name}
                      width={40}
                      height={40}
                      className="rounded-full aspect-square object-cover"
                    />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full"
                      style={{ backgroundColor: color.code }}
                    />
                  )}
                  <span className="text-xs mt-1">{color.name}</span>
                </div>
              </td>

              {sizes.map((size) => {
                const stock = stocks.find(
                  (s) =>
                    s.color_id === color.id && s.size_id === size.id && s.sell
                );

                const key = getKey(color.id, size.id);
                const quantity = getQuantity(key);

                return (
                  <td
                    key={size.id}
                    className={cn(
                      "relative border-l border-l-gray-4 border-b border-b-white",
                      stock ? "bg-gray-6" : "bg-[#DEDEDE]"
                    )}
                  >
                    {stock &&
                      (quantity === 0 ? (
                        <button
                          onClick={() => handleIncrement(key, color, size)}
                          className="text-3xl text-gray-1 cursor-pointer"
                        >
                          +
                        </button>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <button
                            onClick={() => handleIncrement(key, color, size)}
                            className="text-sm cursor-pointer text-gray-1"
                          >
                            +
                          </button>
                          <span className="text-sm">{quantity}</span>
                          <button
                            onClick={() => handleDecrement(key)}
                            className="text-sm cursor-pointer text-gray-1"
                          >
                            –
                          </button>
                        </div>
                      ))}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
