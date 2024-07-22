import { useState } from "react";

interface ImageData {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

interface ProductCardProps {
  image: ImageData;
  name: string;
  category: string;
  price: number;
}

export function ProductCard({
  image,
  name,
  category,
  price,
}: ProductCardProps) {
  const [quantityOfItems, setQuantityOfItems] = useState(1);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const handleAddToCartClick = () => {
    setIsButtonVisible(false);
  };

  const DecrementQuantitysItems = () => {
    if (quantityOfItems <= 1) {
      return;
    }
    setQuantityOfItems(quantityOfItems - 1);
  };

  const IncrementQuantitysItems = () => {
    if (quantityOfItems < 1) {
      return;
    }
    setQuantityOfItems(quantityOfItems + 1);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="relative">
        <img
          src={image.desktop}
          alt={name}
          className={`rounded-2xl ${
            isButtonVisible == false && "ring-4 ring-colorRed"
          }`}
        />
        <button
          onClick={handleAddToCartClick}
          className="w-2/5 absolute top-[93%] left-1/2 -translate-x-1/2"
        >
          <div
            className={`${
              isButtonVisible ? "flex" : "hidden"
            } bg-colorRose50 items-center justify-center gap-2 rounded-full py-3 border border-colorRose300`}
          >
            <img className="size-5" src="/public/icon-add-to-cart.svg" alt="" />
            <p className="font-semibold text-colorRose900">Add to Cart</p>
          </div>

          <div
            className={`${
              isButtonVisible ? "hidden" : "flex"
            } bg-colorRed items-center justify-between rounded-full px-3 py-3`}
          >
            <div className="rounded-full border p-1 hover:scale-110">
              <img
                onClick={DecrementQuantitysItems}
                className="size-3"
                src="/public/icon-decrement-quantity.svg"
                alt=""
              />
            </div>

            <div className="text-colorRose100">{quantityOfItems}</div>

            <div className="rounded-full border p-1 hover:scale-110">
              <img
                onClick={IncrementQuantitysItems}
                className="size-3"
                src="/public/icon-increment-quantity.svg"
                alt=""
              />
            </div>
          </div>
        </button>
      </div>

      <div>
        <p className="text-colorRose500">{category}</p>
        <h2 className="text-colorRose900 font-bold">{name}</h2>
        <p className="text-colorRed font-bold">${price.toFixed(2)}</p>
      </div>
    </div>
  );
}
