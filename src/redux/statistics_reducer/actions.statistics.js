import axios from "axios";
import {
  CLEARDATA,
  DELETEDATA,
  ERROR,
  LOADING,
  STATSBASEURL,
  SUCCESSDATA,
  UPDATEDATA,
} from "./actionsTypes.statistics";

const LOADINGFUNCTION = () => {
  return { type: LOADING };
};

const ERRORFUNCTION = () => {
  return { type: ERROR };
};

const SUCCESSDATAFUNCTION = (payload) => {
  return { type: SUCCESSDATA, payload };
};

const UPDATEDATAFUNCTION = (id, data) => {
  return { type: UPDATEDATA, payload: { id, data } };
};

const DELETEDATAFUNCTION = (payload) => {
  return { type: DELETEDATA, payload };
};

export const DATACALLFUNCTION = async (dispatch, user, extension, page) => {
  dispatch(LOADINGFUNCTION());
  try {
    const request = await axios.get(
      `${STATSBASEURL}/${extension}/${user}?page=${page}`
    );

    const response = await request.data;
    dispatch(SUCCESSDATAFUNCTION(response));
  } catch (err) {
    dispatch(ERRORFUNCTION());
  }
};

export const CLEARDATAFUNCTION = (dispatch) => {
  dispatch({ type: CLEARDATA });
};

export const UPDATECALLFUNCTION = async (dispatch, id, data) => {
  dispatch(LOADINGFUNCTION());
  dispatch(UPDATEDATAFUNCTION(id, data));
};

export const DELETECALLFUNCTION = async (dispatch, id) => {
  dispatch(LOADINGFUNCTION());
  dispatch(DELETEDATAFUNCTION(id));
};
