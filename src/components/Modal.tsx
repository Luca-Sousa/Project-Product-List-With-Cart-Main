import { CheckCircle } from "lucide-react";
import { ModalProps } from "../types";

export function Modal({
  selectedProducts,
  totalValue,
  handleNewOrder,
}: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 xs:items-end xs:justify-start">
      <div className="w-[480px] h-fit bg-colorRose50 p-6 rounded-xl space-y-4 xs:w-full xs:rounded-none xs:rounded-t-2xl">
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
              className="flex justify-between items-center border-b border-colorRose200 px-4 py-3 gap-2"
            >
              <li className="flex gap-4 items-center">
                <img
                  className="size-12 rounded-md"
                  src={product.image.thumbnail}
                  alt="Image Thumbnail"
                />

                <ul className="text-sm space-y-1 flex-1 min-w-0">
                  <li className="text-colorRose900 font-semibold truncate">
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
  );
}
