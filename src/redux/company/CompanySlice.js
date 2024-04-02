
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  companies: [],
  selectedCompany:null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    fetchCompanyListStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCompanyListSuccess(state, action) {
      state.loading = false;
      state.companies = action.payload;
    },
    fetchCompanyListFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedCompany(state, action){
      state.selectedCompany=action.payload;
    },
    resetCompany(state,action) {
      state.companies=[];
      state.selectedCompany=null;
    }
  },
});

export const { fetchCompanyListStart, fetchCompanyListSuccess, fetchCompanyListFailure,setSelectedCompany,resetCompany } = companySlice.actions;

export default companySlice.reducer;
