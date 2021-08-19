const INITIAL_STATE = {
  data: [],
};

export const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return { ...state, data: action.payload };
    case "ADD_CATEGORY":
      return { ...state, data: [action.payload, ...state.data] };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        data: state.data.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
      };
    case "DELETE_CATEGORY":
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
