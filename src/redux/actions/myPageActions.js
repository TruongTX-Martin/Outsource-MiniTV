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
