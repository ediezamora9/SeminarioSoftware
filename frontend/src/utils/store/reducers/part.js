export const SELECT_PART = "SELECT_PART";

const initialState = {
  selectedPart: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PART:
      return {
        ...state,
        selectedPart: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
