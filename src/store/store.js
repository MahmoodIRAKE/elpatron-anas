import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

// Import slices
import allBranchesReducer from './slices/allBranchesSlice';
import branchStatusReducer from './slices/branchStatusSlice';
import branchAnalyticsReducer from './slices/branchAnalyticsSlice';
import topCustomersReducer from './slices/topCustomersSlice';
import ordersPDFReducer from './slices/ordersPDFSlice';

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['allBranches', 'branchStatus', 'branchAnalytics', 'topCustomers'], // Only persist these reducers
  blacklist: ['ordersPDF'], // Don't persist PDF state
};

// Root reducer
const rootReducer = combineReducers({
  allBranches: allBranchesReducer,
  branchStatus: branchStatusReducer,
  branchAnalytics: branchAnalyticsReducer,
  topCustomers: topCustomersReducer,
  ordersPDF: ordersPDFReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Persistor
export const persistor = persistStore(store);

export default store;
