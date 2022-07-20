import { ADD_USER_INFO } from "../authentication/type";

const initialState = JSON.parse(localStorage.getItem("userInfo")) || [];

const userInforeducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_INFO:
      state = [...state, action.payload];
      localStorage.setItem("userInfo", JSON.stringify(state));
      return state;

    default:
      return state;
  }
};

export default userInforeducer;
