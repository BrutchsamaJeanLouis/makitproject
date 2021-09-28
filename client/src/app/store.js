import { configureStore } from '@reduxjs/toolkit';
import  ThunkMiddleware from 'redux-thunk';
import counterReducer from '../features/counter/counterSlice';

const rootReducer = {
  userID: 'imported Reducer Goes Here',
  username: 'Imported Reducer Goes here',
  


}


export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
