import { configureStore } from '@reduxjs/toolkit';
import reducer from './state';

const store =  configureStore({
  reducer: reducer,
  devTools: true
});

export default store;