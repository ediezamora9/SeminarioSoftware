export const STORE_BRANDS = "STORE_BRAND";
export const INITIAL_STATE = "INITIAL_STATE";
export const SELECT_BRAND = "SELECT_BRAND";
export const CHANGE_BRAND_NAME = "CHANGE_BRAND_NAME";

const emptyState = {
  brands: [],
  currentBrand: undefined,
};

const initialState = {
  brands: [],
  currentBrand: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_BRANDS:
      return {
        ...state,
        brands: action.brands,
      };
    case INITIAL_STATE:
      return {
        ...initialState,
        ...emptyState,
      };
    case SELECT_BRAND:
      return {
        ...state,
        currentBrand: action.payload,
      };
    case CHANGE_BRAND_NAME:
      return {
        ...state,
        brands: state.brands.map((brand) => {
          if (brand._id === action.payload._id) {
            return action.payload;
          }

          return brand;
        }),
      };
    default:
      return state;
      break;
  }
  return state;
};

export default reducer;
