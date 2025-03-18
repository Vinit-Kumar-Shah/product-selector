import React, { useEffect, useState } from "react";
import { useProductSelectorContext } from "../../lib/contexts/ProductSelectorContext";
import {
  DiscountApplicationType,
  ProductType,
  VariantType,
} from "../../lib/types/productSelector";
import { getRequest } from "../../lib/utils/apiClient";
import { parseInventoryProducts } from "../../lib/utils/parsers";
import {
  CircleNotch,
  MagnifyingGlass,
  Package,
  X,
} from "@phosphor-icons/react";

const ProductPicker: React.FC = () => {
  const {
    state: { pickerOpen, products },
    actions: {
      setPickerOpen,
      setProducts,
      addProduct,
      removeProduct,
      addVariant,
      removeVariant,
    },
  } = useProductSelectorContext();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [inventoryProducts, setInventoryProducts] = useState<ProductType[]>([]);
  const [defaultSelectedProducts, setDefaultSelectedProducts] = useState<
    ProductType[]
  >([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const productList = document.getElementById("product-list");
    if (productList) {
      productList.addEventListener("scroll", handleScroll);
      return () => {
        productList.removeEventListener("scroll", handleScroll);
      };
    }
  }, [page, hasMore, isLoading]);

  useEffect(() => {
    if (pickerOpen) {
      setPage(1);
      setHasMore(true);
      setInventoryProducts([]);
      fetchInventoryProducts(1);
    }
  }, [pickerOpen, searchQuery]);

  useEffect(() => {
    if (pickerOpen) {
      setDefaultSelectedProducts(products);
    }
  }, [pickerOpen]);

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLDivElement;
    if (!target) return;

    const { scrollTop, scrollHeight, clientHeight } = target;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

    if (isNearBottom && hasMore && !isLoading) {
      fetchInventoryProducts(page + 1);
      setPage(page + 1);
    }
  };

  const handleClose = () => {
    setProducts(defaultSelectedProducts);
    setPickerOpen(false);
  };

  const handleSave = () => {
    setPickerOpen(false);
  };

  const fetchInventoryProducts = async (page: number = 1) => {
    try {
      setIsLoading(true);
      const response = await getRequest(
        `/task/products/search?page=${page}&limit=10${
          searchQuery.length > 0 ? "&search=" + searchQuery : ""
        }`
      );
      const parsedInventoryProducts = parseInventoryProducts(response);

      if (page === 1) {
        setInventoryProducts(parsedInventoryProducts);
      } else {
        setInventoryProducts((prev) => [...prev, ...parsedInventoryProducts]);
      }

      // Update hasMore based on whether we received any products
      setHasMore(parsedInventoryProducts.length === 10);
    } catch (error) {
      console.error(error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductSelection = (product: ProductType) => {
    const isProductSelected = products.some(
      (p) => p.productId === product.productId
    );
    if (isProductSelected) {
      removeProduct(product);
      return;
    }
    addProduct(product);
  };

  const handleVariantSelection = (
    product: ProductType,
    variant: VariantType
  ) => {
    const selectedProduct = products.find(
      (p) => p.productId === product.productId
    );
    if (selectedProduct) {
      const isVariantSelected = selectedProduct?.variants.some(
        (v) => v.variantId === variant.variantId
      );

      if (isVariantSelected) {
        const updatedProduct: ProductType = {
          ...selectedProduct,
          variants: selectedProduct?.variants.filter(
            (v) => v.variantId !== variant.variantId
          ),
        };
        if (updatedProduct.variants.length === 0) {
          removeProduct(product);
        } else {
          removeVariant(product, variant);
        }
      }
      if (!isVariantSelected) {
        addVariant(product, variant);
      }
      return;
    }
    const newProduct: ProductType = {
      productId: product.productId,
      title: product.title,
      image: product.image,
      discount: {
        type: DiscountApplicationType.NONE,
        value: 0,
      },
      variants: [
        {
          variantId: variant.variantId,
          productId: variant.productId,
          title: variant.title,
          price: variant.price,
          compareAtPrice: variant.compareAtPrice,
          inventoryQuantity: variant.inventoryQuantity,
        },
      ],
    };
    addProduct(newProduct);
  };

  if (!pickerOpen) return <></>;

  return (
    <div className="fixed inset-0 bg-[#00000069] min-h-screen bg-opacity-30 flex items-start justify-center pt-16">
      <div className="bg-white rounded-md shadow-lg w-[40rem] border border-gray-light">
        <div className="flex items-center justify-between p-4 pb-2 border-b-2 border-gray-light">
          <h2 className="text-lg font-medium">Select Products</h2>
          <X
            size={24}
            className="text-coal-dark"
            weight="bold"
            onClick={handleClose}
          />
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-b-2 border-gray-light">
          <div className="flex items-center justify-start space-x-2 w-full border-2 rounded-xs border-gray-light px-3">
            <MagnifyingGlass size={24} className="text-coal-dark" />
            <input
              type="text"
              placeholder="Search product"
              className="w-full pl-0 pr-3 py-2 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div id="product-list" className="pb-8 h-[28rem] overflow-y-auto">
          {inventoryProducts.map((product: ProductType) => (
            <div key={product.productId} className="">
              <div
                className="flex items-center space-x-4 px-8 border-b-2 border-gray-light py-3 cursor-pointer"
                onClick={() => handleProductSelection(product)}
              >
                <input
                  type="checkbox"
                  className="w-4.5 h-4.5 rounded accent-green cursor-pointer"
                  checked={products.some(
                    (p) => p.productId === product.productId
                  )}
                />
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-9 h-9 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-9 h-9 border-2 border-coal-lighter rounded-md flex items-center justify-center">
                    <Package size={24} className="text-coal-lighter" />
                  </div>
                )}
                <h3 className="font-normal text-base text-charcoal">
                  {product.title}
                </h3>
              </div>
              {product.variants.map((variant) => (
                <div
                  key={variant.variantId}
                  className="flex items-center justify-between px-16 py-4 border-b-2 border-gray-light cursor-pointer"
                  onClick={() => handleVariantSelection(product, variant)}
                >
                  <div className="flex items-center space-x-6 w-[20rem]">
                    <input
                      type="checkbox"
                      className="w-4.5 h-4.5 rounded accent-green cursor-pointer"
                      checked={products.some(
                        (p) =>
                          p.productId === product.productId &&
                          p.variants.some(
                            (v) => v.variantId === variant.variantId
                          )
                      )}
                    />
                    <span className="text-charcoal text-base font-normal">
                      {variant.title}
                    </span>
                  </div>
                  <span
                    className={`text-sm ${
                      variant.inventoryQuantity > 0
                        ? "text-coal-light"
                        : "text-red-400"
                    }`}
                  >
                    {variant.inventoryQuantity} available
                  </span>
                  <span className="font-medium text-charcoal">
                    ${variant.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          ))}
          {isLoading && (
            <div className="flex w-full items-center justify-center">
              <CircleNotch size={32} className="animate-spin text-coal-dark" />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-4 py-4">
          <p className="text-coal-dark text-sm font-normal pl-2">
            {products.length} Selected Products
          </p>
          <div className="flex items-center justify-center space-x-4 pr-2">
            <button
              className="py-1.5 px-6 rounded-sm text-coal-dark text-sm bg-white border-2 border-gray-dark font-medium cursor-pointer transition-all duration-300 hover:bg-gray-light"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="py-2 px-6 rounded-sm text-white text-sm bg-green font-medium cursor-pointer transition-all duration-300 hover:opacity-90"
              onClick={handleSave}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPicker;
