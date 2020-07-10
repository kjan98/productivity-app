import {createSlice} from '@reduxjs/toolkit'
// import {enableMapSet} from 'immer';
import {Set} from 'immutable';

// enableMapSet();

export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        inProgress: Set(),
        completed: Set(),
        time: {},

    },
    reducers: {
        start: (state, action) => {
            state.inProgress = Set([...state.inProgress, action.payload]);
        },
        pause: (state, action) => {
            console.log("in pause");
            state.inProgress = Set([...state.inProgress.delete(action.payload.id)]);
            let d = {};
            d[action.payload.id] = action.payload.time;
            state.time = {...state.time, ...d};
        },
        stop: (state, action) => {
            let d = {};
            d[action.payload.id] = action.payload.time;
            state.time = {...state.time, ...d};
            console.log(state.data);
            let tmp = [...state.data];
            let idx = state.data.findIndex(el => el.id === action.payload.id);
            tmp[idx] = {...tmp[idx], completed:true}
            state.completed = tmp;
            // state.completed = Set([...state.completed, action.payload.id])
            state.inProgress = Set([...state.inProgress.delete(action.payload.id)]);
        }

    }

})

export const {start, pause, stop, loadTime, update} = taskSlice.actions;

export const selectInProgress = state => state.task.inProgress;
export const selectCompleted = state => state.task.completed;
export const selectTime = state => state.task.time;

export default taskSlice.reducer;