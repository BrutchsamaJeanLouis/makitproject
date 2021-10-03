import { configureStore } from '@reduxjs/toolkit';
import  ThunkMiddleware from 'redux-thunk';

// these are just names to label the reducer from the import 
import counterReducers from '../features/counter/counterSlice';
import sessionReducers from '../features/credentialsModal/credentialsModalSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducers,
    session: sessionReducers,
  },
  // preloadedState: {},  incase predefine state
  middleware: [ThunkMiddleware],
  devTools:true

});


// using thunk to fetch store initial state
// const exampleThunkFunction = (dispatch, getState) => {
//   const stateBefore = getState()
//   console.log(`Counter before: ${stateBefore.counter}`)
//   dispatch(increment())
//   const stateAfter = getState()
//   console.log(`Counter after: ${stateAfter.counter}`)
// }

// store.dispatch(exampleThunkFunction)
