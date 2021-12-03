import { configureStore } from '@reduxjs/toolkit';

import todosReducer from '../features/Todos/todosSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer
  },
});
