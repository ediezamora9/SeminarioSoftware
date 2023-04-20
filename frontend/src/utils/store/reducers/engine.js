export const STORE_ENGINES = "STORE_ENGINES";
export const INITIAL_STATE = "INITIAL_STATE";

const emptyState = {
  engines: [],
  route: {
    brand: "",
    year: "",
    model: "",
  },
};

const initialState = {
  engines: [],
  route: {
    brand: "",
    year: "",
    model: "",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_ENGINES:
      return {
        ...initialState,
        engines: action.payload.engines,
        route: {
          ...initialState.route,
          brand: action.payload.brand,
          year: action.payload.year,
          model: action.payload.model,
        },
      };
    case INITIAL_STATE:
      return {
        ...initialState,
        ...emptyState,
        route: {
          ...initialState.route,
          ...emptyState.route
        }
      }
    default:
      break;
  }
  return state;
};

export default reducer;
