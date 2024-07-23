import { useEffect, useState } from "react";
import { ProductCardProps } from "../types";
import { MinusCircle, PlusCircle } from "lucide-react";
import IconAddToCart from "../assets/icons/icon-add-to-cart.svg";

export function ProductCard({
  product,
  onQuantityChange,
  reset,
  onReset,
}: ProductCardProps) {
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
        <picture>
          <source srcSet={product.image.desktop} media="(min-width: 1024px)" />
          <source
            srcSet={product.image.tablet}
            media="(min-width: 768px) and (max-width: 1023px)"
          />
          <source srcSet={product.image.mobile} media="(max-width: 767px)" />
          <img
            src={product.image.desktop}
            alt={product.name}
            className={`rounded-2xl ${
              !isButtonVisible && "ring-4 ring-colorRed"
            } w-full`}
          />
        </picture>
        {/* <img
          src={product.image.desktop}
          alt={product.name}
          className={`rounded-2xl ${
            !isButtonVisible && "ring-4 ring-colorRed"
          }`}
        /> */}

        <button
          onClick={handleAddToCartClick}
          className={`${
            isButtonVisible ? "flex" : "hidden"
          } w-1/2 absolute top-[93%] left-1/2 -translate-x-1/2 group bg-colorRose50 items-center justify-center gap-2 rounded-full py-3 border-2 border-colorRose300 hover:border-colorRed xl:w-4/6 lg:w-3/4 md:w-1/2 sm:w-3/4 xs:w-1/2"`}
        >
          <img className="size-5" src={IconAddToCart} alt="Icon Add to Card" />
          <p className="font-semibold text-colorRose900 group-hover:text-colorRed">
            Add to Cart
          </p>
        </button>

        <div
          className={`${
            isButtonVisible ? "hidden" : "flex"
          } w-1/2 absolute top-[93%] left-1/2 -translate-x-1/2 bg-colorRed items-center justify-between rounded-full px-3 py-3 xl:w-4/6 lg:w-3/4 md:w-1/2 sm:w-3/4 xs:w-1/2`}
        >
          <div
            onClick={DecrementQuantitysItems}
            className="rounded-full cursor-pointer hover:bg-colorRose50"
          >
            <MinusCircle className="size-6 text-colorRose100 hover:text-colorRed" />
          </div>

          <div className="text-colorRose100">{quantityOfItems}</div>

          <div
            onClick={IncrementQuantitysItems}
            className="rounded-full cursor-pointer hover:bg-colorRose50"
          >
            <PlusCircle className="size-6 text-colorRose100 hover:text-colorRed" />
          </div>
        </div>
      </div>

      <div className="py-1 lg:py-2">
        <p className="text-colorRose500">{product.category}</p>
        <h2 className="text-colorRose900 font-bold">{product.name}</h2>
        <p className="text-colorRed font-bold">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
