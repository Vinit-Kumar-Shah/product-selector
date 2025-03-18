import React, { useState } from "react";
import {
  DiscountApplicationType,
  ProductType,
  VariantType,
} from "../../lib/types/productSelector";
import {
  CaretDown,
  DotsSixVertical,
  PencilSimple,
  X,
} from "@phosphor-icons/react";
import { useProductSelectorContext } from "../../lib/contexts/ProductSelectorContext";
import DraggableList from "./DraggableList";
import {
  Draggable,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";

interface ProductListItemProps {
  product: ProductType;
  index: number;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  index,
  dragHandleProps,
}) => {
  const {
    state: { products },
    actions: {
      setPickerOpen,
      setDiscountOfProduct,
      removeProduct,
      removeVariant,
      setVariants,
    },
  } = useProductSelectorContext();

  const [showVariants, setShowVariants] = useState(false);

  return (
    <div
      key={product.productId}
      className="flex flex-col w-full pt-4 select-none"
    >
      <div className="flex items-center space-x-4 justify-center w-full">
        <div
          {...dragHandleProps}
          className="flex w-3/5 space-x-3 items-center cursor-pointer"
        >
          <DotsSixVertical
            size={24}
            weight="regular"
            className="text-gray-dark"
          />
          <span className="text-coal-dark text-sm font-normal">
            {index + 1}.
          </span>
          <div
            className="flex relative items-center justify-center w-full"
            onClick={() => setPickerOpen(true)}
          >
            <input
              type="text"
              className="text-sm border-gray-light bg-white border p-2.5 py-1.5 placeholder:text-gray-dark w-full outline-none cursor-pointer"
              placeholder={product.title}
              value={""}
            />
            <PencilSimple
              size={20}
              weight="regular"
              className="text-gray-dark absolute right-2"
            />
          </div>
        </div>
        <div className="flex w-2/5 space-x-3 items-center justify-between">
          <div className="flex space-x-3 items-center justify-start">
            {product.discount.type === DiscountApplicationType.NONE ? (
              <button
                className="py-1.5 px-6 rounded-sm text-white text-sm bg-green font-medium cursor-pointer transition-all duration-300 hover:opacity-90"
                onClick={() =>
                  setDiscountOfProduct(product.productId, {
                    type: DiscountApplicationType.PERCENTAGE,
                    value: 0,
                  })
                }
              >
                Add Discount
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  className="py-1.5 px-3 w-[6rem] rounded-sm text-sm bg-white border border-gray-light outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  value={product.discount.value}
                  onChange={(e) => {
                    let value = parseFloat(e.target.value);
                    if (
                      product.discount.type ===
                        DiscountApplicationType.PERCENTAGE &&
                      value > 100
                    ) {
                      value = 100;
                    }
                    setDiscountOfProduct(product.productId, {
                      type: product.discount.type,
                      value: value,
                    });
                  }}
                />
                <div className="bg-white pr-2 border border-gray-light">
                  <select
                    className="py-1.5 pl-2 pr-4 w-[8rem] rounded-sm text-sm bg-white outline-none"
                    value={product.discount.type}
                    onChange={(e) =>
                      setDiscountOfProduct(product.productId, {
                        type: e.target.value as DiscountApplicationType,
                        value: product.discount.value,
                      })
                    }
                  >
                    <option value={DiscountApplicationType.PERCENTAGE}>
                      Percentage
                    </option>
                    <option value={DiscountApplicationType.FIXED}>Fixed</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <X
            size={16}
            weight="bold"
            className="text-coal-dark cursor-pointer"
            onClick={() => removeProduct(product)}
          />
        </div>
      </div>
      <div className="flex items-center space-x-1  pt-2 justify-end w-full">
        <button
          className="text-blue text-xs font-light underline cursor-pointer"
          onClick={() => setShowVariants(!showVariants)}
        >
          {showVariants ? "Hide Variants" : "Show Variants"}
        </button>
        <CaretDown
          size={16}
          weight="bold"
          className={`text-blue cursor-pointer transition-all duration-300 ${
            showVariants ? "rotate-180" : ""
          }`}
          onClick={() => setShowVariants(!showVariants)}
        />
      </div>
      {/* Variants */}
      {showVariants && (
        <DraggableList
          id="variants"
          listComponent={
            <div className="flex flex-col space-y-2 pt-4 w-full">
              {product.variants.map((variant: VariantType, i: number) => (
                <Draggable
                  draggableId={variant.variantId.toString()}
                  key={variant.variantId}
                  index={i}
                >
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <div
                        key={variant.variantId}
                        className="flex items-center space-x-4 justify-center w-full"
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="flex w-3/5 space-x-3 items-center pl-12"
                        >
                          <DotsSixVertical
                            size={20}
                            weight="regular"
                            className="text-gray-dark"
                          />
                          <div className="flex relative items-center justify-center w-full rounded-full overflow-hidden bg-white">
                            <input
                              type="text"
                              className="text-sm border-gray-light border p-2.5 py-1.5 placeholder:text-gray-dark w-full outline-none rounded-full"
                              value={variant.title}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="flex w-2/5 space-x-3 items-center justify-between">
                          <div className="flex space-x-3 items-center justify-start">
                            <div className="flex items-center space-x-2">
                              <input
                                type="number"
                                className="py-1.5 px-3 w-[6rem] text-sm bg-white border border-gray-light outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-full disabled:opacity-80"
                                value={product.discount.value}
                                disabled
                              />
                              <div className="bg-white pr-2 border border-gray-light rounded-full overflow-hidden">
                                <select
                                  className="py-1.5 pl-2 pr-4 w-[8rem] rounded-sm text-sm bg-white outline-none disabled:opacity-60"
                                  value={product.discount.type}
                                  onChange={(e) =>
                                    setDiscountOfProduct(variant.variantId, {
                                      type: e.target
                                        .value as DiscountApplicationType,
                                      value: product.discount.value,
                                    })
                                  }
                                  disabled
                                >
                                  <option value={DiscountApplicationType.NONE}>
                                    None
                                  </option>
                                  <option
                                    value={DiscountApplicationType.PERCENTAGE}
                                  >
                                    Percentage
                                  </option>
                                  <option value={DiscountApplicationType.FIXED}>
                                    Fixed
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <X
                            size={16}
                            weight="bold"
                            className="text-coal-dark cursor-pointer"
                            onClick={() =>
                              product.variants.length > 1
                                ? removeVariant(product, variant)
                                : removeProduct(product)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          }
          listData={product.variants}
          setListData={(variants: VariantType[]) => {
            setVariants(product.productId, variants);
          }}
        />
      )}
      {index !== products.length - 1 && (
        <div className="px-12 pt-6">
          <div className="bg-gray-200 h-[2px] w-full rounded-full" />
        </div>
      )}
    </div>
  );
};

export default ProductListItem;
