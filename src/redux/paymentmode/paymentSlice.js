
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paymentMode: [],
  selectedMode: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentSuccess(state, action) {
      state.paymentMode = action.payload;
    },
    resetPayment(state) {
      state.selectedMode =null;
    },
    setSelectedPaymentMode(state, action){
      state.selectedMode = action.payload;
    }
  },
});

export const { setPaymentSuccess,resetPayment,setSelectedPaymentMode } = paymentSlice.actions;

export default paymentSlice.reducer;
