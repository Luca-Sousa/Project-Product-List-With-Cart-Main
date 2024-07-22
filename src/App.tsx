import { ProductCard } from "./components/ProductCard";
import Data from "./data.json";

export function App() {
  return (
    <div className="max-w-[1440px] mx-auto flex gap-4 my-16">
      <div className="flex-1 space-y-6">
        <h2 className="font-bold text-4xl text-colorRose900">Desserts</h2>

        <div className="w-full grid grid-cols-3 gap-6">
          {Data.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              name={product.name}
              category={product.category}
              price={product.price}
            />
          ))}
        </div>
      </div>
      <div className="max-w-96">
        <h2>Your Cart ()</h2>
         Your added items will appear here
      </div>
    </div>
  );
}
