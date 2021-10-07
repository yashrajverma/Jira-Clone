export const initialState = null;
export const reducer = (state, action) => {
  if (action.type == "USER") {
    return action.payload;
  }
  if (action.type == "CLEAR") {
    return null;
  }
  if (action.type == "UPDATE") {
    return {
      ...state,
      state: action.payload,
    };
  }
  if (action.type == "UPDATEPIC") {
    return {
      ...state,
      pic: action.payload,
    };
  }
  return state;
};
