import * as Types from './types';

//sign up
export function signUp(params) {
  return {
    type: Types.SIGN_UP,
    params,
  };
}

export function signUpStart() {
  return {
    type: Types.SIGN_UP_START,
  };
}

export function signUpSuccess() {
  return {
    type: Types.SIGN_UP_SUCCESS,
  };
}

export function signUpFailed(reason) {
  return {
    type: Types.SIGN_UP_FAILED,
    reason,
  };
}

export function signUpClearData() {
  return {
    type: Types.SIGN_UP_CLEAR,
  };
}

//generate access token
export function generateAccessToken() {
  return {
    type: Types.GENERATE_ACCESS_TOKEN,
  };
}

export function generateAccessTokenStart() {
  return {
    type: Types.GENERATE_ACCESS_TOKEN_START,
  };
}

export function generateAccessTokenSuccess(data) {
  return {
    type: Types.GENERATE_ACCESS_TOKEN_SUCCESS,
    data,
  };
}

export function generateAccessTokenFailed() {
  return {
    type: Types.GENERATE_ACCESS_TOKEN_FAILED,
  };
}

//sign in
export function signIn(params) {
  return {
    type: Types.SIGN_IN,
    params,
  };
}

export function signInClear() {
  return {
    type: Types.SIGN_IN_CLEAR,
  };
}

export function signInStart() {
  return {
    type: Types.SIGN_IN_START,
  };
}

export function signInSuccess() {
  return {
    type: Types.SIGN_IN_SUCCESS,
  };
}

export function signInFailed() {
  return {
    type: Types.SIGN_IN_FAILED,
  };
}

//find password
export function findPassword(email) {
  return {
    type: Types.FIND_PASSWORD,
    email,
  };
}

export function findPasswordStart() {
  return {
    type: Types.FIND_PASSWORD_START,
  };
}
export function findPasswordSuccess() {
  return {
    type: Types.FIND_PASSWORD_SUCCESS,
  };
}
export function findPasswordFailed() {
  return {
    type: Types.FIND_PASSWORD_FAILED,
  };
}

//sns sign in
export function snsSignIn(params) {
  return {
    type: Types.SNS_SIGNIN,
    params,
  };
}

export function snsSignInClear() {
  return {
    type: Types.SNS_SIGNIN_CLEAR,
  };
}

export function snsSignInStart() {
  return {
    type: Types.SNS_SIGNIN_START,
  };
}
export function snsSignInSuccess() {
  return {
    type: Types.SNS_SIGNIN_SUCCESS,
  };
}
export function snsSignInFailed() {
  return {
    type: Types.SNS_SIGNIN_FAILED,
  };
}

//action update push alert status
export function updatePushAlert(available) {
  return {
    type: Types.UPDATE_PUSH_ALERT,
    available,
  };
}
