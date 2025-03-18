export type ProductSelectorStateType = {
  products: ProductType[];
  pickerOpen: boolean;
};

export interface ProductSelectorContextType {
  state: ProductSelectorStateType;
  actions: {
    setProducts: (products: ProductType[]) => void;
    addProduct: (product: ProductType) => void;
    removeProduct: (product: ProductType) => void;
    setVariants: (productId: string, variants: VariantType[]) => void;
    addVariant: (product: ProductType, variant: VariantType) => void;
    removeVariant: (product: ProductType, variant: VariantType) => void;
    setDiscountOfProduct: (productId: string, discount: DiscountType) => void;
    setDiscountOfVariant: (
      productId: string,
      variantId: string,
      discount: DiscountType
    ) => void;
    setPickerOpen: (open: boolean) => void;
  };
}

export enum ProductSelectorActionSet {
  SET_PRODUCTS = "SET_PRODUCTS",
  ADD_PRODUCT = "ADD_PRODUCT",
  REMOVE_PRODUCT = "REMOVE_PRODUCT",
  SET_VARIANTS = "SET_VARIANTS",
  ADD_VARIANT = "ADD_VARIANT",
  REMOVE_VARIANT = "REMOVE_VARIANT",
  SET_DISCOUNT_OF_PRODUCT = "SET_DISCOUNT_OF_PRODUCT",
  SET_DISCOUNT_OF_VARIANT = "SET_DISCOUNT_OF_VARIANT",
  SET_SELECTOR_OPEN = "SET_SELECTOR_OPEN",
}

export type ProductSelectorActionType =
  | {
      type: ProductSelectorActionSet.SET_PRODUCTS;
      payload: ProductType[];
    }
  | {
      type: ProductSelectorActionSet.ADD_PRODUCT;
      payload: ProductType;
    }
  | {
      type: ProductSelectorActionSet.REMOVE_PRODUCT;
      payload: ProductType;
    }
  | {
      type: ProductSelectorActionSet.SET_VARIANTS;
      payload: { productId: string; variants: VariantType[] };
    }
  | {
      type: ProductSelectorActionSet.ADD_VARIANT;
      payload: { product: ProductType; variant: VariantType };
    }
  | {
      type: ProductSelectorActionSet.REMOVE_VARIANT;
      payload: { product: ProductType; variant: VariantType };
    }
  | {
      type: ProductSelectorActionSet.SET_DISCOUNT_OF_PRODUCT;
      payload: { productId: string; discount: DiscountType };
    }
  | {
      type: ProductSelectorActionSet.SET_DISCOUNT_OF_VARIANT;
      payload: { productId: string; variantId: string; discount: DiscountType };
    }
  | {
      type: ProductSelectorActionSet.SET_SELECTOR_OPEN;
      payload: boolean;
    };

export type ProductType = {
  productId: string;
  title: string;
  image: string;
  variants: VariantType[];
  discount: DiscountType;
};

export type VariantType = {
  variantId: string;
  productId: string;
  title: string;
  price: number;
  compareAtPrice: number;
  inventoryQuantity: number;
  // currency: string; // Assuming currency as $ for now as it's not specified in the API
};

export enum DiscountApplicationType {
  PERCENTAGE = "percentage",
  FIXED = "fixed",
  NONE = "none",
}

export type DiscountType = {
  type: DiscountApplicationType;
  value: number;
};
