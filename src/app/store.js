import { configureStore } from '@reduxjs/toolkit';
import rankListReducer from '../stores/comics/rankListSlice';

export const store = configureStore({
  reducer: {
    rank: rankListReducer,
  },
});
