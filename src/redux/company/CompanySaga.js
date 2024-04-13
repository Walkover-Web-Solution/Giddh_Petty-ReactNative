import { put, takeLatest, call } from 'redux-saga/effects';
import api from '../../../interceptor'; // Import the interceptor instance
import { fetchCompanyListSuccess, fetchCompanyListFailure } from './CompanySlice';

function* fetchCompanyList(actions) {
  try {
    const response = yield call(api.get, `users/${actions.payload.uniqueName}/v2/companies`);
    const data = response.data.body;
    // console.log(data);
    yield put(fetchCompanyListSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(fetchCompanyListFailure(error.message));
  }
}

export function* watchFetchCompanyList() {
  yield takeLatest('company/FETCH_COMPANY_LIST', fetchCompanyList);
}
