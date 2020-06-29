import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        data: []
    },
    reducers: {
        load: (state, action) => {
            state.data = action.payload
        },
        add: (state, action) => {
            state.data = [...state.data, action.payload]
        },
        clear: (state) => {
            state.data = []
        },
    //    delete
    }
})

const { actions, reducer } = todoSlice
export const { load, add, clear } = actions
export const allData = state => state.todos.data;
// console.log(state.todos)
export default todoSlice.reducer