
import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from './AddExpenseSlice';
import api from '../../../interceptor';

function* fetchDataSaga({uniqueName,groups}) {
  try {
    yield put(fetchDataStart());
    const response = yield api.get(`company/${uniqueName}/v3/account-search?group=${groups}`,);
    yield put(fetchDataSuccess(response.data.body.results)); 
  } catch (error) {
    console.log(error);
    yield put(fetchDataFailure(error.message));
  }
}

export function* watchFetchData() {
  yield takeLatest('ADD_EXPENSE', fetchDataSaga); 
}
