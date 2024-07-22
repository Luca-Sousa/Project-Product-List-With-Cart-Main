import { useState } from "react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onQuantityChange: (delta: number, product: Product) => void;
}

export function ProductCard({ product, onQuantityChange }: ProductCardProps) {
  const [quantityOfItems, setQuantityOfItems] = useState(0);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const handleAddToCartClick = () => {
    setIsButtonVisible(false);
    setQuantityOfItems(1);
    onQuantityChange(1, product);
  };

  const DecrementQuantitysItems = () => {
    if (quantityOfItems > 1) {
      setQuantityOfItems((prevQuantity) => prevQuantity - 1);
      onQuantityChange(-1, product);
    } else {
      setQuantityOfItems(1);
    }
  };

  const IncrementQuantitysItems = () => {
    if (quantityOfItems >= 1) {
      setQuantityOfItems((prevQuantity) => prevQuantity + 1);
      onQuantityChange(1, product);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="relative">
        <img
          src={product.image.desktop}
          alt={product.name}
          className={`rounded-2xl ${
            !isButtonVisible && "ring-4 ring-colorRed"
          }`}
        />

        <button
          onClick={handleAddToCartClick}
          className="w-1/2 absolute top-[93%] left-1/2 -translate-x-1/2"
        >
          <div
            className={`${
              isButtonVisible ? "flex" : "hidden"
            } bg-colorRose50 items-center justify-center gap-2 rounded-full py-3 border border-colorRose300`}
          >
            <img
              className="size-5"
              src="/public/icon-add-to-cart.svg"
              alt="Icon Add to Card"
            />
            <p className="font-semibold text-colorRose900">Add to Cart</p>
          </div>
        </button>

        <div
          className={`${
            isButtonVisible ? "hidden" : "flex"
          } w-1/2 absolute top-[93%] left-1/2 -translate-x-1/2 bg-colorRed items-center justify-between rounded-full px-3 py-3`}
        >
          <div
            onClick={DecrementQuantitysItems}
            className="rounded-full border p-1 cursor-pointer hover:scale-110"
          >
            <img
              className="size-3"
              src="/public/icon-decrement-quantity.svg"
              alt="Icon Decrement Quantity"
            />
          </div>

          <div className="text-colorRose100">{quantityOfItems}</div>

          <div
            onClick={IncrementQuantitysItems}
            className="rounded-full border p-1 cursor-pointer hover:scale-110"
          >
            <img
              className="size-3"
              src="/public/icon-increment-quantity.svg"
              alt="Icon Increment Quantity"
            />
          </div>
        </div>
      </div>

      <div>
        <p className="text-colorRose500">{product.category}</p>
        <h2 className="text-colorRose900 font-bold">{product.name}</h2>
        <p className="text-colorRed font-bold">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
