import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  SET_PAGE,
  SET_PAGE_SIZE,
} from "../actions/userAction";

import { AnyAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    country: string;
  };
  email: string;
  phone: string;
}

interface State {
  users: Array<User>;
  loading: boolean;
  error: Error | null;
  currentPage: number;
  pageSize: number;
}

const initialState: State = {
  users: [],
  loading: true,
  error: null,
  currentPage: 1,
  pageSize: 5,
};

export default function reducer(
  state: State = initialState,
  action: AnyAction
): State {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: action.users,
      };

    case FETCH_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        users: [],
      };

    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.newPageSize,
      };

    default:
      return state;
  }
}
