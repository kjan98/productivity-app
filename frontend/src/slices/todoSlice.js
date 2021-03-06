import {createSlice} from '@reduxjs/toolkit';
import {updateCompletedAttribute, haltTimer} from "./reducerUtils";

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        current_data: [],
        time: {},
        colors: {},
        projects: {}
    },
    reducers: {
        load: (state, action) => {
            state.current_data = action.payload.current_data;
            state.colors = action.payload.colors;
            state.projects = action.payload.projects;
        },
        add: (state, action) => {
            state.current_data = [...state.current_data, action.payload];
        },
        clear: (state) => {
            state.current_data = [];
        },
        loadTime: (state, action) => {
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
            updateCompletedAttribute(state, action);

            let d = {};
            let t = {};
            t['timerStart'] = action.payload.timerStart;
            t['timerTime'] = action.payload.timerTime;
            t['inProgress'] = action.payload.inProgress;
            t['timerInterval'] = action.payload.timerInterval;
            d[action.payload.id] = t;
            state.time = {...state.time, ...d}

        },
        update: (state, action) => {
            let t = {...state.time[action.payload.id]};
            let d = {};
            t['timerTime'] = action.payload.val;
            d[action.payload.id] = t;
            state.time = {...state.time, ...d};
        },
        pause: (state, action) => {
            haltTimer(state, action);
        },
        stop: (state, action) => {
            updateCompletedAttribute(state, action);
            haltTimer(state, action);
        },
        updateCompleted: (state, action) => {
            updateCompletedAttribute(state, action);
        }
    }
})

const {actions, reducer} = todoSlice
export const {load, add, clear, start, pause, stop, update, loadTime, loadColors, updateCompleted} = actions
export const currentData = state => state.todos.current_data;
export const selectInProgress = state => state.todos.inProgress;
export const selectCompleted = state => state.todos.completed;
export const selectTime = state => state.todos.time;
export const selectColors = state => state.todos.colors;
// console.log(state.todos)
export default todoSlice.reducer