import axios from "axios";
import {
  ERROR,
  GETUSER,
  BASEURL,
  SUCCESSUSER,
  LOGOUTUSER,
  GETCATEGORY,
  SUCCESSCATEGORY,
} from "./actionTypes.login";

const ERRORFUNCTION = () => {
  return { type: ERROR };
};

const GETUSERFUNCTION = () => {
  return { type: GETUSER };
};

const USERSUCCESSFUNCTION = (payload) => {
  return { type: SUCCESSUSER, payload };
};

const LOGOUTUSERFUNCTION = () => {
  return { type: LOGOUTUSER };
};

const GETCATEGORYFUNCTION = () => {
  return { type: GETCATEGORY };
};

const SUCCESSCATEGORYFUNCTION = (payload) => {
  return { type: SUCCESSCATEGORY, payload };
};

export const USERCALLFUNCTION = async (dispatch, data) => {
  dispatch(GETUSERFUNCTION());
  try {
    const request = await axios.post(`${BASEURL}/user/login`, data);
    const response = await request.data;
    await dispatch(USERSUCCESSFUNCTION(response));
    return response;
  } catch (err) {
    dispatch(ERRORFUNCTION());
  }
};

export const LOGOUTUSERCALL = (dispatch) => {
  dispatch(LOGOUTUSERFUNCTION());
};

export const CATEGORYCALLFUNCTION = async (dispatch, owner) => {
  dispatch(GETCATEGORYFUNCTION());
  try {
    const request = await axios.get(`${BASEURL}/category/${owner}`);
    const response = await request.data;

    dispatch(SUCCESSCATEGORYFUNCTION(response));
    return response;
  } catch (err) {
    dispatch(ERRORFUNCTION());
  }
};

export const CATEGORYDELETEFUNCTION = async (dispatch, owner, id) => {
  dispatch(GETCATEGORYFUNCTION());
  try {
    const request = await axios.delete(`${BASEURL}/category/delete/${id}`);
    const response = await request.data;

    CATEGORYCALLFUNCTION(dispatch, owner);
    return response;
  } catch (err) {
    dispatch(ERRORFUNCTION());
  }
};
