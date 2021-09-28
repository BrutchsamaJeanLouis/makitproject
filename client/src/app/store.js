import { configureStore } from '@reduxjs/toolkit';
import  ThunkMiddleware from 'redux-thunk';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  // preloadedState: {},  incase predefine state
  middleware: [ThunkMiddleware],
  devTools:true

});
