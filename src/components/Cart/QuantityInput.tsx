type Props = {
  quantity: number;
  onChange: (qty: number) => void;
};

export function QuantityInput({ quantity, onChange }: Props) {
  return (
    <input
      type="number"
      min={1}
      value={quantity}
      onChange={(e) => {
        const val = Number(e.target.value);
        if (val >= 1) onChange(val);
      }}
      className="w-16 border rounded px-2 py-1"
    />
  );
}
