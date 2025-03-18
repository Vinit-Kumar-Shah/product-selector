import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import {
  DiscountType,
  ProductSelectorActionSet,
  ProductSelectorActionType,
  ProductSelectorContextType,
  ProductSelectorStateType,
  ProductType,
  VariantType,
} from "../types/productSelector";
import {
  initialProductSelectorContext,
  initialProductSelectorState,
} from "../configs/productSelectorConfigs";

export const ProductSelectorContext = createContext<ProductSelectorContextType>(
  initialProductSelectorContext
);

function reducer(
  state: ProductSelectorStateType,
  action: ProductSelectorActionType
): ProductSelectorStateType {
  switch (action.type) {
    case ProductSelectorActionSet.SET_PRODUCTS:
      return { ...state, products: action.payload };
    case ProductSelectorActionSet.ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case ProductSelectorActionSet.REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.productId !== action.payload.productId
        ),
      };
    case ProductSelectorActionSet.SET_VARIANTS:
      return {
        ...state,
        products: state.products.map((product) =>
          product.productId === action.payload.productId
            ? { ...product, variants: action.payload.variants }
            : product
        ),
      };
    case ProductSelectorActionSet.ADD_VARIANT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.productId === action.payload.product.productId
            ? {
                ...product,
                variants: [...product.variants, action.payload.variant],
              }
            : product
        ),
      };
    case ProductSelectorActionSet.REMOVE_VARIANT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.productId === action.payload.product.productId
            ? {
                ...product,
                variants: product.variants.filter(
                  (variant) =>
                    variant.variantId !== action.payload.variant.variantId
                ),
              }
            : product
        ),
      };
    case ProductSelectorActionSet.SET_DISCOUNT_OF_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.productId === action.payload.productId
            ? { ...product, discount: action.payload.discount }
            : product
        ),
      };
    case ProductSelectorActionSet.SET_DISCOUNT_OF_VARIANT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.productId === action.payload.productId
            ? {
                ...product,
                variants: product.variants.map((variant) =>
                  variant.variantId === action.payload.variantId
                    ? { ...variant, discount: action.payload.discount }
                    : variant
                ),
              }
            : product
        ),
      };
    case ProductSelectorActionSet.SET_SELECTOR_OPEN:
      return { ...state, pickerOpen: action.payload };
    default:
      return state;
  }
}

export const ProductSelectorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialProductSelectorState);

  const setProducts = useCallback((products: ProductType[]) => {
    dispatch({
      type: ProductSelectorActionSet.SET_PRODUCTS,
      payload: products,
    });
  }, []);

  const setDiscountOfProduct = useCallback(
    (productId: string, discount: DiscountType) => {
      dispatch({
        type: ProductSelectorActionSet.SET_DISCOUNT_OF_PRODUCT,
        payload: { productId, discount },
      });
    },
    []
  );

  const setDiscountOfVariant = useCallback(
    (productId: string, variantId: string, discount: DiscountType) => {
      dispatch({
        type: ProductSelectorActionSet.SET_DISCOUNT_OF_VARIANT,
        payload: { productId, variantId, discount },
      });
    },
    []
  );

  const setPickerOpen = useCallback((open: boolean) => {
    dispatch({
      type: ProductSelectorActionSet.SET_SELECTOR_OPEN,
      payload: open,
    });
  }, []);

  const addProduct = useCallback((product: ProductType) => {
    dispatch({
      type: ProductSelectorActionSet.ADD_PRODUCT,
      payload: product,
    });
  }, []);

  const removeProduct = useCallback((product: ProductType) => {
    dispatch({
      type: ProductSelectorActionSet.REMOVE_PRODUCT,
      payload: product,
    });
  }, []);

  const setVariants = useCallback((productId: string, variants: VariantType[]) => {
    dispatch({
      type: ProductSelectorActionSet.SET_VARIANTS,
      payload: { productId, variants },
    });
  }, []);

  const addVariant = useCallback(
    (product: ProductType, variant: VariantType) => {
      dispatch({
        type: ProductSelectorActionSet.ADD_VARIANT,
        payload: { product, variant },
      });
    },
    []
  );

  const removeVariant = useCallback(
    (product: ProductType, variant: VariantType) => {
      dispatch({
        type: ProductSelectorActionSet.REMOVE_VARIANT,
        payload: { product, variant },
      });
    },
    []
  );

  const actions = useMemo(
    () => ({
      setProducts,
      setDiscountOfProduct,
      setDiscountOfVariant,
      setPickerOpen,
      addProduct,
      removeProduct,
      addVariant,
      removeVariant,
      setVariants,
    }),
    [
      setProducts,
      setDiscountOfProduct,
      setDiscountOfVariant,
      setPickerOpen,
      addProduct,
      removeProduct,
      addVariant,
      removeVariant,
      setVariants,
    ]
  );

  return (
    <ProductSelectorContext.Provider value={{ state, actions }}>
      {children}
    </ProductSelectorContext.Provider>
  );
};

export const useProductSelectorContext = () => {
  const context = useContext(ProductSelectorContext);
  if (!context) {
    throw new Error(
      "useProductSelectorContext must be used within a ProductSelectorProvider"
    );
  }
  return context;
};
