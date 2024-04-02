
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  branches: [],
  selectedBranch: null,
  selectedCompany: null,
};

const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    setBranches(state, action) {
      state.branches = action.payload;
    },
    setSelectedBranch(state, action) {
      state.selectedBranch = action.payload;
    },
    setSelectedCompany(state, action) {
      state.selectedCompany = action.payload;
    },
    resetBranch(state) {
      state.branches = [];
      state.selectedBranch = null;
      state.selectedCompany = null;
    }
  },
});

export const { setBranches, setSelectedBranch, setSelectedCompany,resetBranch } = branchSlice.actions;

export default branchSlice.reducer;
