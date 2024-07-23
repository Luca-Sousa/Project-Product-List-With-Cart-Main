import { useEffect, useState } from "react";
import { ProductCardProps } from "../types";
import { MinusCircle, PlusCircle } from "lucide-react";

export function ProductCard({ product, onQuantityChange, reset, onReset }: ProductCardProps) {
  const [quantityOfItems, setQuantityOfItems] = useState(0);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  useEffect(() => {
    if (reset) {
      setQuantityOfItems(0);
      setIsButtonVisible(true);
      onReset(product.id);
    }
  }, [reset, product.id, onReset]);

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
          className="w-1/2 absolute top-[93%] left-1/2 -translate-x-1/2 group"
        >
          <div
            className={`${
              isButtonVisible ? "flex" : "hidden"
            } bg-colorRose50 items-center justify-center gap-2 rounded-full py-3 border border-colorRose300 group-hover:border-colorRed`}
          >
            <img
              className="size-5"
              src="/public/icon-add-to-cart.svg"
              alt="Icon Add to Card"
            />
            <p className="font-semibold text-colorRose900 group-hover:text-colorRed">
              Add to Cart
            </p>
          </div>
        </button>

        <div
          className={`${
            isButtonVisible ? "hidden" : "flex"
          } w-1/2 absolute top-[93%] left-1/2 -translate-x-1/2 bg-colorRed items-center justify-between rounded-full px-3 py-3`}
        >
          <div
            onClick={DecrementQuantitysItems}
            className="rounded-full cursor-pointer hover:bg-colorRose50"
          >
            <MinusCircle className="size-6 text-colorRose100 hover:scale-125 hover:text-colorRed" />
          </div>

          <div className="text-colorRose100">{quantityOfItems}</div>

          <div
            onClick={IncrementQuantitysItems}
            className="rounded-full cursor-pointer hover:bg-colorRose50"
          >
            <PlusCircle className="size-6 text-colorRose100 hover:scale-125  hover:text-colorRed" />
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
