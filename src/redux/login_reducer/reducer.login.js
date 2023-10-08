import {
  ERROR,
  GETUSER,
  LOGOUTUSER,
  SUCCESSUSER,
  GETCATEGORY,
  SUCCESSCATEGORY,
} from "./actionTypes.login";

const headerKey = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isLoadingLogin: false,
  isError: false,
  user: user || null,
  token: headerKey || null,
  categories: null,
};

export const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ERROR: {
      return { ...state, isLoadingLogin: false, isError: true };
    }
    case GETUSER: {
      return { ...state, isLoadingLogin: true };
    }
    case LOGOUTUSER: {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return { ...state, user: null, token: null };
    }
    case SUCCESSUSER: {
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isLoadingLogin: false,
        token: payload.token,
        user: payload.user,
      };
    }
    case GETCATEGORY: {
      return { ...state, isLoadingLogin: true };
    }
    case SUCCESSCATEGORY: {
      return {
        ...state,
        isLoadingLogin: false,
        categories: payload,
      };
    }
    default: {
      return state;
    }
  }
};
