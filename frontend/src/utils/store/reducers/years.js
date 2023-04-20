export const STORE_YEARS = "STORE_YEARS";
export const INITIAL_STATE = "INITIAL_STATE";

const emptyState = {
  years: [],
  brand: "",
};

const initialState = {
  years: [],
  brand: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_YEARS:
      return {
        ...initialState,
        years: action.payload.years,
        brand: action.payload.brand,
      };
    case INITIAL_STATE:
      return {
        ...initialState,
        ...emptyState,
      };
    default:
      break;
  }
  return state;
};

export default reducer;
