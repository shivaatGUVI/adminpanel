import axios from "axios";
import {
  CLEARCATEGORY,
  DELETECATEGORY,
  ERROR,
  LOADING,
  CATEGORYBASEURL,
  SUCCESSCATEGORY,
  UPDATECATEGORY,
} from "./actionTypes.category";

const LOADINGFUNCTION = () => {
  return { type: LOADING };
};

const ERRORFUNCTION = () => {
  return { type: ERROR };
};

const SUCCESSCATEGORYFUNCTION = (payload) => {
  return { type: SUCCESSCATEGORY, payload };
};

const UPDATECATEGORYFUNCTION = (id, data) => {
  return { type: UPDATECATEGORY, payload: { id, data } };
};

const DELETECATEGORYFUNCTION = (payload) => {
  return { type: DELETECATEGORY, payload };
};

export const CATEGORYCALL = async (dispatch, user, category, page) => {
  dispatch(LOADINGFUNCTION());
  try {
    const request = await axios.get(
      `${CATEGORYBASEURL}/post/${user}?page=${page}&category=${category}`
    );

    const response = await request.data;
    dispatch(SUCCESSCATEGORYFUNCTION(response));
  } catch (err) {
    dispatch(ERRORFUNCTION());
  }
};

export const CLEARCATEGORYFUNCTION = (dispatch) => {
  dispatch({ type: CLEARCATEGORY });
};

export const UPDATECATEGORYCALL = async (dispatch, id, data) => {
  dispatch(LOADINGFUNCTION());
  dispatch(UPDATECATEGORYFUNCTION(id, data));
};

export const DELETECATEGORYCALL = async (dispatch, id) => {
  dispatch(LOADINGFUNCTION());
  dispatch(DELETECATEGORYFUNCTION(id));
};
