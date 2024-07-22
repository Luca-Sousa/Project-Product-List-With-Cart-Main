import { useState } from "react";
import { ProductCard } from "./components/ProductCard";
import Data from "./data.json";
import { Product } from "./types";

export function App() {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleQuantityChange = (delta: number, product: Product) => {
    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + delta);
    setTotalValue((prevTotalValue) => prevTotalValue + delta * product.price);

    setSelectedProducts((prevSelectedProducts) => {
      const existingProductIndex = prevSelectedProducts.findIndex(
        (p) => p.id === product.id
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = [...prevSelectedProducts];
        const updatedQuantity =
          (updatedProducts[existingProductIndex].quantity || 0) + delta;

        if (updatedQuantity <= 0) {
          updatedProducts.splice(existingProductIndex, 1);
        } else {
          updatedProducts[existingProductIndex] = {
            ...product,
            quantity: updatedQuantity,
          };
        }

        return updatedProducts;
      } else if (delta > 0) {
        return [...prevSelectedProducts, { ...product, quantity: delta }];
      }

      return prevSelectedProducts;
    });
  };

  return (
    <div className="max-w-[1440px] mx-auto flex gap-4 my-16">
      <div className="flex-1 space-y-6">
        <h2 className="font-bold text-4xl text-colorRose900">Desserts</h2>

        <div className="w-full grid grid-cols-3 gap-6">
          {Data.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
      </div>

      <div className="w-80 h-fit space-y-5 bg-colorRose50 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-colorRed">
          Your Cart ({totalQuantity})
        </h2>

        <div>
          {selectedProducts.map((product) => (
            <ul
              key={product.id}
              className="flex justify-between items-center border-b border-colorRose200 py-2"
            >
              <div className="space-y-2">
                <li className="text-sm text-colorRose900 font-semibold">
                  {product.name}
                </li>
                <div className="flex gap-3">
                  <li className="text-colorRed font-bold">
                    {product.quantity}x
                  </li>
                  <li className="text-colorRose300">
                    @ ${product.price.toFixed(2)}
                  </li>
                  <li className="text-colorRose400">
                    ${(product.price * (product.quantity || 0)).toFixed(2)}
                  </li>
                </div>
              </div>

              <div className="flex items-center justify-center size-5 rounded-full border border-colorRose300 cursor-pointer hover:scale-110">
                <img
                  className="size-3"
                  src="/public/icon-remove-item.svg"
                  alt=""
                />
              </div>
            </ul>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p>Order Total</p>
          <div className="text-colorRose900 font-bold">
            ${totalValue.toFixed(2)}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 bg-colorRose100 rounded-lg py-4">
          <img
            className="size-5"
            src="/public/icon-carbon-neutral.svg"
            alt=""
          />
          <p className="text-sm text-colorRose900">
            This is a <span className="font-semibold">carbon-neutral</span>{" "}
            delivery
          </p>
        </div>

        <button className="w-full py-3 rounded-full bg-colorRed text-colorRose100 hover:bg-red-700 transition duration-300 ease-in-out">
          Confirm Order
        </button>
      </div>
    </div>
  );
}
