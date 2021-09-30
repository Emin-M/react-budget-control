const INITIAL_STATE = {
  data: [],
};

export const recordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_RECORDS":
      return { ...state, data: action.payload };
    case "ADD_RECORD":
      return { ...state, data: [...state.data, action.payload] };
    case "UPDATE_RECORD":
      return {
        ...state,
        data: state.data.map((record) =>
          record.id === action.payload.id ? action.payload : record
        ),
      };
    case "DELETE_RECORD":
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
