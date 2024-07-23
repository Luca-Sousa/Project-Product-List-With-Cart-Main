import { useEffect, useState } from "react";
import { ProductCard } from "./components/ProductCard";
import { ProductsData } from "./ProductsData";
import { Product } from "./types";
import IconCarbonNeutral from "./assets/icons/icon-carbon-neutral.svg";
import IllustrationEmptyCart from "./assets/icons/illustration-empty-cart.svg";
import { Modal } from "./components/Modal";
import { ItensCart } from "./components/ItensCart";

export function App() {
  const [isOpenCartItens, SetOpenCartItens] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [resetProductIds, setResetProductIds] = useState<string[]>([]);

  useEffect(() => {
    if (totalQuantity > 0) {
      SetOpenCartItens(true);
    }
  }, [totalQuantity]);

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
    SetOpenCartItens(false);
  };

  return (
    <div className="max-w-[1440px] mx-auto flex gap-4 py-16 2xl:px-6 lg:py-10 lg:gap-6 md:flex-col md:gap-16">
      <div className="flex-1 space-y-6 md:space-y-10">
        <h2 className="font-bold text-4xl text-colorRose900">Desserts</h2>

        <div className="w-full grid grid-cols-3 gap-6 lg:grid-cols-2 xs:grid-cols-1">
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

      <div className="w-80 h-fit space-y-5 bg-colorRose50 p-6 rounded-xl lg:w-72 md:w-[550px] md:mx-auto sm:w-full">
        <h2 className="text-xl font-bold text-colorRed">
          Your Cart ({totalQuantity})
        </h2>

        {isOpenCartItens ? (
          <div className="space-y-5">
            <ItensCart
              selectedProducts={selectedProducts}
              handleRemoveProduct={handleRemoveProduct}
            />

            <div className="flex items-center justify-between">
              <p>Order Total</p>
              <div className="text-colorRose900 font-bold">
                ${totalValue.toFixed(2)}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 bg-colorRose100 rounded-lg text-center py-4 lg:px-4">
              <img
                className="size-7"
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
              <Modal
                selectedProducts={selectedProducts}
                totalValue={totalValue}
                handleNewOrder={handleNewOrder}
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <img
              className="size-40"
              src={IllustrationEmptyCart}
              alt="Illustration Empty Cart"
            />
            <p className="text-colorRose900 text-center">
              Your added items will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
