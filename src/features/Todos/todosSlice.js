import {createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { initialTodos } from '../initialTodos/initialTodos';

const todosAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.deadline.localCompare(a.deadline)
})

export const todosSlice = createSlice({
    name: 'todos',
    initialState: todosAdapter.getInitialState({
        //  ids: [ ...initialTodos.map(todo => todo.id)],
        //  entities: function() { 
        //      let obj = {};

        //      initialTodos.forEach((todo) => {
        //          obj[todo.id] = todo;
        //      })

        //      return obj;
        // }(),
        loading: 'idle'
    }),
    reducers: {
        todoInitialized: todosAdapter.addMany,
        todoAdded: todosAdapter.addOne,
    },
})

export const {todoInitialized, todoAdded} = todosSlice.actions;

export const {
    selectAll: selectAllTodos,
    selectIds: selectTodoIds,
    selectEntities: selectTodos,
    selectTotal: selectTotalTodos,
    selectById: selectTodoById
} = todosAdapter.getSelectors((state) => state.todos);

export default todosSlice.reducer;