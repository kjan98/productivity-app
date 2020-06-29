import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todoReducer from '../slices/todoSlice';
import taskReducer from '../slices/taskSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
    task: taskReducer
  },
});
