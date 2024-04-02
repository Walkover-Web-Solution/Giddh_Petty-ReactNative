
import { all } from 'redux-saga/effects';
import { authSaga } from './auth/authSaga';
import {watchFetchCompanyList} from './company/CompanySaga';
import {watchFetchBranchList} from './company/BranchSaga';
import {watchFetchExpenses} from './expense/ExpenseSaga';
import { watchFetchPaymentList } from './paymentmode/paymentSaga';
import {watchFetchData} from './addExpense/AddExpenseSaga'
export default function* rootSaga() {
  yield all([
    authSaga(),
    watchFetchCompanyList(),
    watchFetchBranchList(),
    watchFetchExpenses(),
    watchFetchPaymentList(),
    watchFetchData(),
  ]);
}
