const SET_START_DATE = 'SET_START_DATE';
 const SET_END_DATE = 'SET_END_DATE';

export const setStartDateT = (startDate) => ({
  type: SET_START_DATE,
  payload: startDate,
});

export const setEndDateT = (endDate) => ({
  type: SET_END_DATE,
  payload: endDate,
});