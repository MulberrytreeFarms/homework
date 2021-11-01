import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import rankListReducer from '../features/comics/rankListSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    rank: rankListReducer,
  },
});
