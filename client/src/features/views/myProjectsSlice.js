import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projects: []
}

export const projectSlice = createSlice({
  name: 'myProjects',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setProjects: (state, action) => {
      // uses the Immer library to detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log('DISPATCHED SETPROJECT')
      state.projects = action.payload
    }
  }
})

export const {
  setProjects
} = projectSlice.actions

export default projectSlice.reducer
