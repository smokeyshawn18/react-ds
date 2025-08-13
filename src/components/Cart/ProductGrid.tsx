import type { CartItem } from "../../interfaces/cartInterface";

type Props = {
  products: CartItem[];
  onAddToCart: (item: CartItem) => void;
};

export function ProductGrid({ products, onAddToCart }: Props) {
  return (
    <div className="grid grid-cols-3 gap-6 p-4">
      {products.map((p) => (
        <div
          key={p.id}
          className="border rounded p-4 flex flex-col items-center space-y-2"
        >
          <img src={p.image} alt={p.name} className="h-32 object-contain" />
          <div className="font-semibold">{p.name}</div>
          <div>${p.price.toFixed(2)}</div>
          <button
            onClick={() => onAddToCart({ ...p, quantity: 1 })}
            className="mt-auto bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
