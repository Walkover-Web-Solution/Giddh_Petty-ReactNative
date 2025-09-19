import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './auth/authSlice';
import dateReducer from './Date/DateReducer';
import companyReducer from './company/CompanySlice';
import rootSaga from './rootSaga';
import branchReducer from './company/BranchSlice';
import expenseReducer from './expense/ExpenseSlice';
import paymentReducer from './paymentmode/paymentSlice';
import addExpenseReducer from './addExpense/AddExpenseSlice'
const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  date: dateReducer,
  branch: branchReducer,
  expenses:expenseReducer,
  payment:paymentReducer,
  addExpense:addExpenseReducer,
});

const createSagaMiddleware = require('redux-saga').default;
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(...middleware));
sagaMiddleware.run(rootSaga);


export const persistor = persistStore(store);