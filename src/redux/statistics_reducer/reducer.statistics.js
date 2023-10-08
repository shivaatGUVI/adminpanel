import {
  CLEARDATA,
  DELETEDATA,
  ERROR,
  LOADING,
  SUCCESSDATA,
  UPDATEDATA,
} from "./actionsTypes.statistics";

const initialState = {
  isLoadingStatistics: false,
  isError: false,
  statsArray: { array: null, totalPages: null },
};

export const statisticsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ERROR: {
      return { ...state, isLoadingStatistics: false, isError: true };
    }
    case LOADING: {
      return { ...state, isLoadingStatistics: true };
    }
    case SUCCESSDATA: {
      return {
        ...state,
        isLoadingStatistics: false,
        statsArray: payload,
      };
    }
    case CLEARDATA: {
      return initialState;
    }
    case UPDATEDATA: {
      const newStatsArray = state.statsArray.array.map((el) => {
        if (el._id === payload.id) {
          return { ...el, ...payload.data };
        }
        return el;
      });
      return {
        ...state,
        isLoadingStatistics: false,
        statsArray: {
          array: newStatsArray,
          totalPages: state.statsArray.totalPages,
        },
      };
    }
    case DELETEDATA: {
      const newStatsArray = state.statsArray.array.filter((el) => {
        return el._id !== payload;
      });
      return {
        ...state,
        isLoadingStatistics: false,
        statsArray: {
          array: newStatsArray,
          totalPages: state.statsArray.totalPages,
        },
      };
    }
    default: {
      return state;
    }
  }
};
