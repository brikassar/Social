export const selectProfile = (state) => {
  return state.profilePage.profile;
};

export const selectProfileStatus = (state) => {
  return state.profilePage.profileStatus;
};

export const selectGetAuthorizedUserId = (state) => {
  return state.auth.userId;
};
