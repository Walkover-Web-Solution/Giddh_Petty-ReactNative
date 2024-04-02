import { put, takeLatest } from 'redux-saga/effects';
import api from '../../../interceptor';
import { setPaymentSuccess, setPaymentFailure } from './paymentSlice';

function* fetchPaymentModeListSaga(action) {
  try {
    const { uniqueName } = action.payload;
    const response = yield api.get(`company/${uniqueName}/brief-accounts`, {
      params: {
        count: 0,
        group: 'cash,bankaccounts,loanandoverdraft',
      }
    });

    const data = response.data.body.results;
    yield put(setPaymentSuccess(data));
  } catch (error) {
    console.error('Error fetching payment list:', error.message);
    yield put(setPaymentFailure(error.message));
  }
}

export function* watchFetchPaymentList() {
  yield takeLatest('payment/FETCH_Payment_LIST', fetchPaymentModeListSaga);
}
