import * as Types from './types';

export function getListData() {
  return {
    type: Types.GET_LISTDATA,
  };
}

export function getListDataStart() {
  return {
    type: Types.GET_LISTDATA_START,
  };
}

export function getListDataSuccess(list) {
  return {
    type: Types.GET_LISTDATA_SUCCESS,
    list: list,
  };
}

export function getListDataFailed() {
  return {
    type: Types.GET_LISTDATA_FAILED,
  };
}
