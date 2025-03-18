import React from "react";
import { ProductSelectorProvider } from "../../lib/contexts/ProductSelectorContext";
import ProductList from "./ProductList";
import ProductPicker from "./ProductPicker";
import ProductAddButton from "./ProductAddButton";

const ProductSelector: React.FC = () => {
  return (
    <ProductSelectorProvider>
      <div className="flex flex-col items-center justify-center pt-16">
        <div className="flex flex-col items-start justify-start min-w-[44rem] space-y-8">
          <h1 className="text-lg text-coal-dark font-semibold">Add Products</h1>
          <ProductList />
          <ProductPicker />
          <ProductAddButton />
        </div>
      </div>
    </ProductSelectorProvider>
  );
};

export default ProductSelector;
