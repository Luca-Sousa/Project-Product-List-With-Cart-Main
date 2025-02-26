export interface Product {
  id: string;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
  quantity?: number;
}

export interface ProductCardProps {
  product: Product;
  onQuantityChange: (delta: number, product: Product) => void;
  reset: boolean;
  onReset: (productId: string) => void;
}

export interface ModalProps {
  selectedProducts: Product[];
  totalValue: number;
  handleNewOrder: () => void;
}

export interface ItensCartProps {
  selectedProducts: Product[];
  handleRemoveProduct: (productId: string) => void;
}
