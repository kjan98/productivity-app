import { createSlice } from '@reduxjs/toolkit'

export const taskSlice = createSlice( {
    name: 'task',
    initialState: {
        inProgress: [],
        timeCompleted: []
    },
    reducers: {
        start: (state, action) => {state.inProgress.push(action.payload)},
        end: (state, action) => {
            state.inProgress = state.inProgress.filter(x => x!== action.payload.id) //to remove from inprogress
            state.timeCompleted = [...state.timeCompleted, action.payload] //action.payload is an object: {id: time}
        }
    }
})

export const { start, end } = taskSlice.actions;

export const selectInProgress = state => state.task.inProgress;
export const selectTimeCompleted = state => state.task.timeCompleted;

export default taskSlice.reducer;