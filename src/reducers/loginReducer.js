export const loginReducer = (state = [], action) => {
  switch (action.type) {
    case "LOGIN":
      state = action.payload;
      return state;

    default:
      return state;
  }
};
