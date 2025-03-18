import { ProductSelectorContextType, ProductSelectorStateType } from "../types/productSelector";

export const initialProductSelectorState: ProductSelectorStateType = {
  products: [],
  pickerOpen: false,
};

export const initialProductSelectorContext: ProductSelectorContextType = {
  state: initialProductSelectorState,
  actions: {
    setProducts: () => {},
    setVariants: () => {},
    setDiscountOfProduct: () => {},
    setDiscountOfVariant: () => {},
    setPickerOpen: () => {},
    addProduct: () => {},
    removeProduct: () => {},
    addVariant: () => {},
    removeVariant: () => {},
  },
};
