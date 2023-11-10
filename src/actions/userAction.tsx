import axios from "axios";
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

export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";

export const SET_PAGE = "SET_PAGE";
export const SET_PAGE_SIZE = "SET_PAGE_SIZE";

export const fetchUsers =
  () =>
  async (dispatch: (action: AnyAction) => void): Promise<void> => {
    try {
      dispatch({ type: FETCH_USERS_REQUEST });

      const response = await axios.get("https://randomuser.me/api?results=50");
      const users: Array<User> = response.data.results;

      dispatch({ type: FETCH_USERS_SUCCESS, users });
    } catch (error) {
      dispatch({ type: FETCH_USERS_ERROR, error });
    }
  };

export const setPage = (currentPage: number) => {
  return { type: SET_PAGE, payload: currentPage };
};

export const setPageSize = (newPageSize: number) => {
  return { type: SET_PAGE_SIZE, newPageSize };
};
