import { XCircle } from "lucide-react";
import { ItensCartProps } from "../types";

export function ItensCart({
  selectedProducts,
  handleRemoveProduct,
}: ItensCartProps) {
  return (
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
              <li className="text-colorRed font-bold">{product.quantity}x</li>
              <li className="text-colorRose300">
                @ ${product.price.toFixed(2)}
              </li>
              <li className="text-colorRose400">
                ${(product.price * (product.quantity || 0)).toFixed(2)}
              </li>
            </div>
          </div>

          <button
            onClick={() => handleRemoveProduct(product.id)}
            className="text-colorRose300 cursor-pointer hover:scale-125 hover:text-colorRose900"
          >
            <XCircle className="size-5" />
          </button>
        </ul>
      ))}
    </div>
  );
}
