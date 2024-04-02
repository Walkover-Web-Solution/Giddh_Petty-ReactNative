import { put, call, takeLatest } from 'redux-saga/effects';
import { setBranches } from './BranchSlice';
import api from '../../../interceptor';

function* fetchBranchListSaga(action) {
  try {
    const { uniqueName } = action.payload;
    const response = yield api.get(`company/${uniqueName}/branch?branchUniqueName=&lang=en`);
    const branches = response.data;
    yield put(setBranches(branches.body));
  } catch (error) {
    console.error('Error fetching branch list:', error.message);
  }
}

export function* watchFetchBranchList() {
  yield takeLatest('branch/FETCH_BRANCH_LIST', fetchBranchListSaga);
}
