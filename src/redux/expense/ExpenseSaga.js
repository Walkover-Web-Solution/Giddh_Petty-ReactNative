import { takeLatest, call, put, select } from 'redux-saga/effects';
import api from '../../../interceptor';
import { fetchExpensesRequest, fetchExpensesSuccess, fetchExpensesFailure } from './ExpenseSlice';

function* fetchExpenses(action) {
  try {
    const { uniqueName, page, setLoading, setIsListEnd,startDate,endDate } = action.payload;
    console.log(page)
    const currentExpenses = yield select(state => state?.expenses?.expenses);
    if(page!==1){
      if(6*(page-1)===currentExpenses["AllRequests"]?.length){

    }else{
      setIsListEnd(true);
    }
    }
    const apiUrl = `company/${uniqueName}/pettycash-manager/client-report?page=${page}&count=6&lang=en`;
    const payload = {
      from: startDate,
      to: endDate,
    };
    const response = yield api.post(apiUrl, payload);
    if(response?.data?.body?.results===undefined||response?.data?.body?.results[0]?.entries===undefined||response===undefined){
      console.log(page,'p');
      const filteredData = {
    "Pending":  [],
    "Approved": [],
    "AllRequests": [],
    "Rejected": []
  };
      if(page===1){
    yield put(fetchExpensesSuccess(filteredData));
  }else{
    const updatedExpenses = {
      "Pending": [...currentExpenses["Pending"], ...filteredData["Pending"]],
      "Approved": [...currentExpenses["Approved"], ...filteredData["Approved"]],
      "AllRequests": [...currentExpenses["AllRequests"], ...filteredData["AllRequests"]],
      "Rejected": [...currentExpenses["Rejected"] , ...filteredData["Rejected"]]
    };
    yield put(fetchExpensesSuccess(updatedExpenses));
  }
  setLoading(false);
  return;
    }
    const responseData = response?.data?.body?.results[0]?.entries;
    const pending = responseData?.filter(item => item?.status === 'pending');
    const rejected = responseData?.filter(item => item?.status === 'rejected');
    const approved = responseData?.filter(item => item?.status === 'approved');
    const allRequests = responseData;
    const filteredData = {
      "Pending": pending ?? [],
      "Approved": approved ?? [],
      "AllRequests": allRequests ?? [],
      "Rejected": rejected ?? []
    };
    
    if(page!==1){
      const updatedExpenses = {
      "Pending": [...currentExpenses["Pending"], ...filteredData["Pending"]],
      "Approved": [...currentExpenses["Approved"], ...filteredData["Approved"]],
      "AllRequests": [...currentExpenses["AllRequests"], ...filteredData["AllRequests"]],
      "Rejected": [...currentExpenses["Rejected"] , ...filteredData["Rejected"]]
    };
    yield put(fetchExpensesSuccess(updatedExpenses));
    setLoading(false);
    return;
  }
  yield put(fetchExpensesSuccess(filteredData));
    setLoading(false);
  } catch (error) {
    console.error("e", error);
    yield put(fetchExpensesFailure(error.message));
  }
}

export function* watchFetchExpenses() {
  yield takeLatest('expenses/fetchExpensesRequest', fetchExpenses);
}
