export const selectIsAuth = (state) => {
  return state.auth.isAuth;
};

export const selectCaptchaUrl = (state) => {
  return state.auth.captchaUrl;
};