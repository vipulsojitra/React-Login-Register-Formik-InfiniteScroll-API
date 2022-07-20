const TOKEN_KEY = "TEST_TOKEN_KEY";

export const login = () => {
  localStorage.setItem(TOKEN_KEY, "SHATISH_DESAI");
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return false;
};
