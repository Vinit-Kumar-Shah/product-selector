import React from "react";
import { useProductSelectorContext } from "../../lib/contexts/ProductSelectorContext";

const ProductAddButton: React.FC = () => {
  const {
    actions: { setPickerOpen },
  } = useProductSelectorContext();

  return (
    <div className="w-full flex items-center justify-end pr-[8rem] pt-4">
      <button
        className="border-2 border-green text-green px-12 py-2 rounded-md cursor-pointer"
        onClick={() => setPickerOpen(true)}
      >
        Add Product
      </button>
    </div>
  );
};

export default ProductAddButton;
