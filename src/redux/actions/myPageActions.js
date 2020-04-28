import * as Types from './types';

//sign up
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
