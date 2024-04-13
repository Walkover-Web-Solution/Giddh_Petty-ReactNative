
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: {
    "Pending": [],
    "Approved": [],
    "AllRequests": [],
    "Rejected": [],
  },
  loading: false,
  error: null,
  selectedExpense: null
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    fetchExpensesRequest: state => {
      state.loading = true;
      state.error = null;
    },
    fetchExpensesSuccess: (state, action) => {
      state.loading = false;
      state.expenses = action.payload;
    },

    fetchExpensesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedExpense: (state, action) => {
      state.selectedExpense = action.payload;
    },
    resetExpenses: (state) => {
      state.expenses = initialState.expenses;
      state.selectedExpense = null;
    }
  },
});

export const { fetchExpensesRequest, fetchExpensesSuccess, fetchExpensesFailure,setSelectedExpense,resetExpenses } = expenseSlice.actions;

export default expenseSlice.reducer;
