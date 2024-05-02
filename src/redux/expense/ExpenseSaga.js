import { takeLatest, call, put, select, takeEvery } from 'redux-saga/effects';
import api from '../../../interceptor';
import { fetchExpensesRequest, fetchExpensesSuccess, fetchExpensesFailure } from './ExpenseSlice';

function* fetchExpenses(action) {
  try {
    const { uniqueName, page, setLoading, setIsListEnd, startDate, endDate } = action.payload;
    console.log("page",page)
    const apiUrl = `company/${uniqueName}/pettycash-manager/client-report?page=${page}&count=6&lang=en`;
    const payload = {
      from: startDate,
      to: endDate,
    };
    const response = yield api.post(apiUrl, payload);
    

    // if(refreshing){
    //   // setPage(1);
    //   setIsListEnd(false);
    //   // setLoading(false);
    // }

  // console.log("response",response?.data?.body?.results?.[0]);

    // if(response?.data?.body?.results?.[0]?.entries.length <= 6){
    //   setIsListEnd(true);
    //   // setLoading(false)
    // }
  //   if(response?.data?.body?.results===undefined||response?.data?.body?.results[0]?.entries===undefined||response===undefined){
  //     console.log(page,'p');
  //     const filteredData = {
  //   "Pending":  [],
  //   "Approved": [],
  //   "AllRequests": [],
  //   "Rejected": []
  // };
  //     if(page===1){
  //   yield put(fetchExpensesSuccess(filteredData));
  // }else{
    // const newPending = filteredData["Pending"].filter(item => {
    //   return !currentExpenses["Pending"].some(existingItem => existingItem.uniqueName === item.uniqueName);
    // });
    // const newAllRequest = filteredData["Pending"].filter(item => {
    //   return !currentExpenses["AllRequests"].some(existingItem => existingItem.uniqueName === item.uniqueName);
    // });
    // const newApproved = filteredData["Approved"].filter(item => {
    //   return !currentExpenses["Approved"].some(existingItem => existingItem.uniqueName === item.uniqueName);
    // });
    // const newRejected = filteredData["Rejected"].filter(item => {
    //   return !currentExpenses["Rejected"].some(existingItem => existingItem.uniqueName === item.uniqueName);
    // });
    // const updatedExpenses = {
    //   "Pending": [...currentExpenses["Pending"], ...newPending],
    //   "Approved": [...currentExpenses["Approved"], ...newApproved],
    //   "AllRequests": [...currentExpenses["AllRequests"], ...newAllRequest],
    //   "Rejected": [...currentExpenses["Rejected"] , ...newRejected]
    // };
  //   yield put(fetchExpensesSuccess({}));
  // }
  // setLoading(false);
  // return;
  //   }
    const resultData = response?.data?.body?.results;
    for(let i=0;i<resultData.length;i++){
      const currentExpenses = yield select(state => state?.expenses?.expenses);
      if(page!==1){
        if(6*(page-1) >= currentExpenses?.["AllRequests"]?.length){
          if(response?.data?.body?.results.length === 0){
            setIsListEnd(true);
            setLoading(false);
            return ;
          }
          else{
            setIsListEnd(false);
          }
      }else{
        setIsListEnd(true);
      }
      }
      console.log("runnnedd");
      const responseData = resultData?.[i]?.entries;
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
      // if(page!==-1){
        const newPending = filteredData["Pending"].filter(item => {
          return !currentExpenses["Pending"].some(existingItem => existingItem.uniqueName === item.uniqueName);
        });
        const newAllRequest = filteredData["AllRequests"].filter(item => {
          return !currentExpenses["AllRequests"].some(existingItem => existingItem.uniqueName === item.uniqueName);
        });
        const newApproved = filteredData["Approved"].filter(item => {
          return !currentExpenses["Approved"].some(existingItem => existingItem.uniqueName === item.uniqueName);
        });
        const newRejected = filteredData["Rejected"].filter(item => {
          return !currentExpenses["Rejected"].some(existingItem => existingItem.uniqueName === item.uniqueName);
        });
        const updatedExpenses = {
        "Pending": [...currentExpenses["Pending"], ...newPending],
        "Approved": [...currentExpenses["Approved"], ...newApproved],
        "AllRequests": [...currentExpenses["AllRequests"], ...newAllRequest],
        "Rejected": [...currentExpenses["Rejected"] , ...newRejected]
      };
    //   yield put(fetchExpensesSuccess(updatedExpenses));
    //   setLoading(false);
    //   continue;
    // }
    yield put(fetchExpensesSuccess(updatedExpenses));
    // return
  }
    if(response?.data?.body?.results.length === 0){
      setIsListEnd(true);
      setLoading(false);
      return;
    }
    setIsListEnd(false);
    setLoading(false)
// if(response?.data?.body?.results?.length >=1){
//   const resultData = response?.data?.body?.results;
//   for(let i=1;i<resultData.length;i++){
//   const responseData = resultData?.[i]?.entries;
//     const pending = responseData?.filter(item => item?.status === 'pending');
//     const rejected = responseData?.filter(item => item?.status === 'rejected');
//     const approved = responseData?.filter(item => item?.status === 'approved');
//     const allRequests = responseData;
//     const filteredData = {
//       "Pending": pending ?? [],
//       "Approved": approved ?? [],
//       "AllRequests": allRequests ?? [],
//       "Rejected": rejected ?? []
//     };
//     const updatedExpenses = {
//       "Pending": [...currentExpenses["Pending"], ...filteredData["Pending"]],
//       "Approved": [...currentExpenses["Approved"], ...filteredData["Approved"]],
//       "AllRequests": [...currentExpenses["AllRequests"], ...filteredData["AllRequests"]],
//       "Rejected": [...currentExpenses["Rejected"] , ...filteredData["Rejected"]]
//     };
//     yield put(fetchExpensesSuccess(updatedExpenses));
//     if(i>=resultData.length){
//       setLoading(false);
//       return;
//     }else{
//       break;
//     }
//     // return;
// }}
  } catch (error) {
    console.error("e", error);
    yield put(fetchExpensesFailure(error.message));
  }
}

export function* watchFetchExpenses() {
  yield takeEvery('expenses/fetchExpensesRequest', fetchExpenses);
}
