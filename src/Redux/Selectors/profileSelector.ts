import {AppStateType} from "../reduxStore";

export const selectProfile = (state: AppStateType) => {
  return state.profilePage.profile;
};

export const selectProfileStatus = (state: AppStateType) => {
  return state.profilePage.profileStatus;
};

export const selectGetAuthorizedUserId = (state: AppStateType) => {
  return state.auth.userId;
};
