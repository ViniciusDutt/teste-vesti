export interface ProductMedia {
  normal: {
    url: string;
    width: number;
    height: number;
  };
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: string | null;
  promotion?: boolean;
  media: ProductMedia;
}
