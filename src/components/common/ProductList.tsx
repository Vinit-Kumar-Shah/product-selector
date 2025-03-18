import React from "react";
import { useProductSelectorContext } from "../../lib/contexts/ProductSelectorContext";
import { DotsSixVertical, PencilSimple } from "@phosphor-icons/react";

import ProductListItem from "./ProductListItem";
import DraggableList from "./DraggableList";
import { Draggable } from "react-beautiful-dnd";

const ProductList: React.FC = () => {
  const {
    state: { products },
    actions: { setPickerOpen, setProducts },
  } = useProductSelectorContext();

  return (
    <div className="flex flex-col w-full items-start justify-start space-y-4">
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col w-3/5 items-start justify-start space-y-4">
          <p className="pl-8 text-coal-dark text-base font-medium">Products</p>
        </div>
        <div className="flex flex-col w-2/5 items-start justify-start space-y-4">
          <p className="pl-6 text-coal-dark text-base font-medium">Discount</p>
        </div>
      </div>
      {products.length > 0 ? (
        <DraggableList
          id="products"
          listComponent={
            <>
              {products.map((product, index) => (
                <Draggable
                  draggableId={product.productId.toString()}
                  key={product.productId}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <ProductListItem
                        key={product.productId}
                        product={product}
                        index={index}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            </>
          }
          listData={products}
          setListData={setProducts}
        />
      ) : (
        <div className="flex items-center justify-center w-full space-x-4">
          <div
            className="flex w-3/5 space-x-3 items-center cursor-pointer"
            onClick={() => setPickerOpen(true)}
          >
            <DotsSixVertical
              size={24}
              weight="regular"
              className="text-gray-dark"
            />
            <span className="text-coal-dark text-sm font-normal">1.</span>
            <div className="flex relative items-center justify-center w-full">
              <input
                type="text"
                className="text-sm border-gray-light bg-white border p-2.5 py-1.5 placeholder:text-gray-dark w-full outline-none cursor-pointer"
                placeholder="Select Product"
                value={""}
              />
              <PencilSimple
                size={20}
                weight="regular"
                className="text-gray-dark absolute right-2"
              />
            </div>
          </div>
          <div className="flex w-2/5 space-x-3 items-center">
            <button
              className="py-1.5 px-6 rounded-sm text-white text-sm bg-green font-medium"
              onClick={() => setPickerOpen(true)}
            >
              Add Discount
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
