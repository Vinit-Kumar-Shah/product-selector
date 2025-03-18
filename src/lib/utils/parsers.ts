/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DiscountApplicationType,
  ProductType,
  VariantType,
} from "../types/productSelector";

export const parseInventoryProducts = (response: any) => {
  const inventoryProducts: ProductType[] = [];
  response?.data?.forEach((product: any) => {
    const inventoryVariants: VariantType[] = [];
    product?.variants?.forEach((variant: any) => {
      inventoryVariants.push({
        variantId: variant?.id ?? "",
        title: variant?.title ?? "",
        price: variant?.price ? Number(variant?.price) : 0,
        compareAtPrice: variant?.compare_at_price
          ? Number(variant?.compare_at_price)
          : 0,
        inventoryQuantity: variant?.inventory_quantity
          ? Number(variant?.inventory_quantity)
          : 0,
        productId: product?.id ?? "",
      });
    });
    inventoryProducts.push({
      productId: product?.id ?? "",
      title: product?.title ?? "",
      variants: inventoryVariants,
      image: product?.image?.src ?? "",
      discount: {
        type: DiscountApplicationType.NONE,
        value: 0,
      },
    });
  });
  return inventoryProducts;
};
