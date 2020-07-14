import {createSlice} from '@reduxjs/toolkit';
import {Set} from 'immutable';

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        data: [],
        // inProgress: Set(),
        time: {},
        colors: []
    },
    reducers: {
        loadColors: (state, action) => {
            state.colors = action.payload;
        },
        load: (state, action) => {
            state.data = action.payload
        },
        add: (state, action) => {
            state.data = [...state.data, action.payload]
        },
        clear: (state) => {
            state.data = []
        },
        loadTime: (state, action) => {
            // console.log('here');
            let d = {}
            action.payload.forEach(x => {
                let t = {};
                t['timerStart'] = x.timerStart;
                t['timerTime'] = x.timerTime;
                t['inProgress'] = x.inProgress;
                t['timerTimer'] = x.timerTimer;
                d[x.task_id] = t;
            });
            state.time = {...state.time, ...d}

        },
        start: (state, action) => {
            let tmp = [...state.data];
            let idx = state.data.findIndex(el => el.id === action.payload.id);
            tmp[idx] = {...tmp[idx], completed: false}
            state.data = tmp;
            let d = {};
            let t = {};
            t['timerStart'] = action.payload.timerStart;
            t['timerTime'] = action.payload.timerTime;
            t['inProgress'] = action.payload.inProgress;
            t['ttimer'] = action.payload.ttimer;
            d[action.payload.id] = t;
            state.time = {...state.time, ...d}

        },
        update: (state, action) => {
            let t = {...state.time[action.payload.id]};
            let d = {};
            t['timerTime'] = action.payload.val;
            // t['ttimer'] = action.payload.ttimer;
            d[action.payload.id] = t;
            state.time = {...state.time, ...d};
        },
        pause: (state, action) => {
            // console.log("in pause");
            let d = {}
            let t = {...state.time[action.payload.id]}
            t['inProgress'] = action.payload.inProgress;
            t['timerTimer'] = 0;
            t['ttimer'] = action.payload.ttimer;
            d[action.payload.id] = t;
            state.time = {...state.time, ...d};
            // state.inProgress = Set([...state.inProgress.delete(action.payload.id)]);
        },
        stop: (state, action) => {
            let tmp = [...state.data];
            let idx = state.data.findIndex(el => el.id === action.payload.id);
            tmp[idx] = {...tmp[idx], completed: true}
            state.data = tmp;
            let d = {};
            let t = {...state.time[action.payload.id]};
            t['inProgress'] = action.payload.inProgress;
            t['ttimer'] = action.payload.ttimer;
            d[action.payload.id] = t;
            state.time = {...state.time, ...d};
            // state.inProgress = Set([...state.inProgress.delete(action.payload.id)]);
        }
    }
})

const {actions, reducer} = todoSlice
export const {load, add, clear, start, pause, stop, update, loadTime, loadColors} = actions
export const allData = state => state.todos.data;
export const selectInProgress = state => state.todos.inProgress;
export const selectCompleted = state => state.todos.completed;
export const selectTime = state => state.todos.time;
export const selectColors = state => state.todos.colors;
// console.log(state.todos)
export default todoSlice.reducer