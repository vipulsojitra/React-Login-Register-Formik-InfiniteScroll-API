import { ADD_USER_INFO } from "../authentication/type";

export const addUserInfo = (userInfo) => {
  return {
    type: ADD_USER_INFO,
    payload: userInfo,
  };
};
