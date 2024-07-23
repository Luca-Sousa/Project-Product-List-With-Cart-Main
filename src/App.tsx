import { useState } from "react";
import { ProductCard } from "./components/ProductCard";
import { ProductsData } from "./ProductsData";
import { Product } from "./types";
import { CheckCircle, XCircle } from "lucide-react";
import IconCarbonNeutral from "./assets/icons/icon-carbon-neutral.svg";

export function App() {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [resetProductIds, setResetProductIds] = useState<string[]>([]);

  const handleQuantityChange = (delta: number, product: Product) => {
    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + delta);
    setTotalValue((prevTotalValue) => prevTotalValue + delta * product.price);

    setSelectedProducts((prevSelectedProducts) => {
      const updatedProducts = prevSelectedProducts
        .map((p) =>
          p.id === product.id
            ? { ...p, quantity: (p.quantity || 0) + delta }
            : p
        )
        .filter((p) => p.quantity! > 0);

      if (!updatedProducts.some((p) => p.id === product.id) && delta > 0) {
        updatedProducts.push({ ...product, quantity: delta });
      }

      return updatedProducts;
    });
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts((prevSelectedProducts) => {
      const productToRemove = prevSelectedProducts.find(
        (p) => p.id === productId
      );

      if (!productToRemove) {
        return prevSelectedProducts;
      }

      setTotalQuantity(
        (prevTotalQuantity) =>
          prevTotalQuantity - (productToRemove.quantity || 0)
      );

      setTotalValue(
        (prevTotalValue) =>
          prevTotalValue -
          productToRemove.price * (productToRemove.quantity || 0)
      );

      setResetProductIds((prevIds) => [...prevIds, productId]);

      return prevSelectedProducts.filter((p) => p.id !== productId);
    });
  };

  const handleResetProduct = (productId: string) => {
    setResetProductIds((prevIds) => prevIds.filter((id) => id !== productId));
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleNewOrder = () => {
    setIsOpenModal(false);
    clearCart();
  };

  const clearCart = () => {
    setTotalQuantity(0);
    setTotalValue(0);
    setSelectedProducts([]);
    setResetProductIds(selectedProducts.map((product) => product.id));
  };

  return (
    <div className="max-w-[1440px] mx-auto flex gap-4 py-16">
      <div className="flex-1 space-y-6">
        <h2 className="font-bold text-4xl text-colorRose900">Desserts</h2>

        <div className="w-full grid grid-cols-3 gap-6">
          {ProductsData.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuantityChange={handleQuantityChange}
              reset={resetProductIds.includes(product.id)}
              onReset={handleResetProduct}
            />
          ))}
        </div>
      </div>

      <div className="w-80 h-fit space-y-5 bg-colorRose50 p-6 rounded-xl">
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

              <XCircle
                onClick={() => handleRemoveProduct(product.id)}
                className="size-5 text-colorRose300 cursor-pointer hover:scale-125 hover:text-colorRose900"
              />
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
            src={IconCarbonNeutral}
            alt="Icon Carbon Neutral"
          />
          <p className="text-sm text-colorRose900">
            This is a <span className="font-semibold">carbon-neutral</span>{" "}
            delivery
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="w-full py-3 rounded-full bg-colorRed text-colorRose100 hover:bg-red-800 transition duration-300 ease-in-out"
        >
          Confirm Order
        </button>

        {isOpenModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="w-[480px] h-fit bg-colorRose50 p-6 rounded-xl space-y-4">
              <CheckCircle className="size-10 text-colorGreen" />

              <div className="space-y-1">
                <h2 className="font-bold text-3xl text-colorRose900">
                  Order Confirmed
                </h2>
                <p>We hope you enjoy your food!</p>
              </div>

              <div className="bg-colorRose100 rounded-lg">
                {selectedProducts.map((product) => (
                  <ul
                    key={product.id}
                    className="flex justify-between items-center border-b border-colorRose200 px-4 py-3"
                  >
                    <li className="flex gap-4 items-center">
                      <img
                        className="size-12 rounded-md"
                        src={product.image.thumbnail}
                        alt="Image Thumbnail"
                      />

                      <ul className="text-sm space-y-1">
                        <li className="text-colorRose900 font-semibold">
                          {product.name}
                        </li>
                        <li className="font-semibold flex gap-3">
                          <p className="text-colorRed">{product.quantity}x</p>
                          <p className="text-colorRose400">
                            @ ${product.price.toFixed(2)}
                          </p>
                        </li>
                      </ul>
                    </li>

                    <div className="text-colorRose900 font-semibold">
                      ${(product.price * (product.quantity || 0)).toFixed(2)}
                    </div>
                  </ul>
                ))}

                <div className="flex items-center justify-between p-4">
                  <p>Order Total</p>
                  <div className="text-colorRose900 font-bold">
                    ${totalValue.toFixed(2)}
                  </div>
                </div>
              </div>

              <button
                onClick={handleNewOrder}
                className="w-full py-3 rounded-full bg-colorRed text-colorRose100 hover:bg-red-800 transition duration-300 ease-in-out"
              >
                Start New Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
