import { configureStore } from '@reduxjs/toolkit';
import  ThunkMiddleware from 'redux-thunk';

// these are just names to label the reducer from the import 
import counterReducer from '../features/counter/counterSlice';
import sessionReducer from '../features/credentialsModal/credentialsModalSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    session: sessionReducer
  },
  // preloadedState: {},  incase predefine state
  middleware: [ThunkMiddleware],
  devTools:true

});
