import * as Types from './types';

//change password
export function changePassword(params) {
  return {
    type: Types.CHANGE_PASSWORD,
    params,
  };
}

export function changePasswordStart() {
  return {
    type: Types.CHANGE_PASSWORD_START,
  };
}

export function changePasswordSuccess() {
  return {
    type: Types.CHANGE_PASSWORD_SUCCESS,
  };
}

export function changePasswordFailed() {
  return {
    type: Types.CHANGE_PASSWORD_FAILED,
  };
}

export function changePasswordClear() {
  return {
    type: Types.CHANGE_PASSWORD_CLEAR,
  };
}

//get me
export function getMe() {
  return {
    type: Types.GET_ME,
  };
}

export function clearMe() {
  return {
    type: Types.GET_ME_CLEAR,
  };
}

export function getMeStart() {
  return {
    type: Types.GET_ME_START,
  };
}

export function getMeSuccess(meData) {
  return {
    type: Types.GET_ME_SUCCESS,
    meData,
  };
}

export function getMeFailed() {
  return {
    type: Types.GET_ME_FAILED,
  };
}

//update profile
export function updateProfile(params) {
  return {
    type: Types.UPDATE_PROFILE,
    params,
  };
}

export function clearProfileReducer() {
  return {
    type: Types.UPDATE_PROFILE_CLEAR,
  };
}

export function updateProfileStart() {
  return {
    type: Types.UPDATE_PROFILE_START,
  };
}

export function updateProfileSuccess() {
  return {
    type: Types.UPDATE_PROFILE_SUCCESS,
  };
}

export function updateProfileFailed() {
  return {
    type: Types.UPDATE_PROFILE_FAILED,
  };
}

//update profile image
export function updateImageProfile(params) {
  return {
    type: Types.UPDATE_IMAGE_PROFILE,
    params,
  };
}

export function updateImageProfileStart() {
  return {
    type: Types.UPDATE_IMAGE_PROFILE_START,
  };
}

export function updateImageProfileSuccess() {
  return {
    type: Types.UPDATE_IMAGE_PROFILE_SUCCESS,
  };
}

export function updateImageProfileFailed() {
  return {
    type: Types.UPDATE_IMAGE_PROFILE_FAILED,
  };
}

//delete account
export function deleteAccount(params) {
  return {
    type: Types.DELETE_ACCOUNT,
    params,
  };
}

export function deleteAccountStart() {
  return {
    type: Types.DELETE_ACCOUNT_START,
  };
}

export function deleteAccountSuccess() {
  return {
    type: Types.DELETE_ACCOUNT_SUCCESS,
  };
}

export function deleteAccountFailed() {
  return {
    type: Types.DELETE_ACCOUNT_FAILED,
  };
}
