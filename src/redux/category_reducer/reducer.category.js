import {
  CLEARCATEGORY,
  DELETECATEGORY,
  ERROR,
  LOADING,
  SUCCESSCATEGORY,
  UPDATECATEGORY,
} from "./actionTypes.category";

const initialState = {
  isLoadingCategory: false,
  isError: false,
  catArray: { array: null, totalPages: null },
};

export const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ERROR: {
      return { ...state, isLoadingCategory: false, isError: true };
    }
    case LOADING: {
      return { ...state, isLoadingCategory: true };
    }
    case SUCCESSCATEGORY: {
      return {
        ...state,
        isLoadingCategory: false,
        catArray: payload,
      };
    }
    case CLEARCATEGORY: {
      return initialState;
    }
    case UPDATECATEGORY: {
      const newcatArray = state.catArray.array.map((el) => {
        if (el._id === payload.id) {
          return { ...el, ...payload.data };
        }
        return el;
      });
      return {
        ...state,
        isLoadingCategory: false,
        catArray: {
          array: newcatArray,
          totalPages: state.catArray.totalPages,
        },
      };
    }
    case DELETECATEGORY: {
      const newcatArray = state.catArray.array.filter((el) => {
        return el._id !== payload;
      });
      return {
        ...state,
        isLoadingCategory: false,
        catArray: {
          array: newcatArray,
          totalPages: state.catArray.totalPages,
        },
      };
    }
    default: {
      return state;
    }
  }
};
