export const STORE_MODELS = "STORE_MODELS";
export const INITIAL_STATE = "INITIAL_STATE";

const emptyState = {
  models: [],
  route: {
    brand: "",
    year: "",
  },
};

const initialState = {
  models: [],
  route: {
    brand: "",
    year: "",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_MODELS:
      return {
        ...initialState,
        models: action.payload.models,
        route: {
          ...initialState.route,
          brand: action.payload.brand,
          year: action.payload.year,
        },
      };
    case INITIAL_STATE:
      return { ...initialState, ...emptyState, route: {...initialState.route, ...emptyState.route} };
    default:
      break;
  }
  return state;
};

export default reducer;
