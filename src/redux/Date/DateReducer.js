const SET_START_DATE = 'SET_START_DATE';
const SET_END_DATE = 'SET_END_DATE';

const initialState = {
  startDate: null,
  endDate: null,
};

const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_START_DATE:
      return {
        ...state,
        startDate: action.payload,
      };
    case SET_END_DATE:
      return {
        ...state,
        endDate: action.payload,
      };
    default:
      return state;
  }
};

export default dateReducer;