import {createSlice, createEntityAdapter} from '@reduxjs/toolkit';

const todosAdapter = createEntityAdapter({
    sortComparer: (a, b) => (b.deadline.localeCompare(a.deadline))
})

export const todosSlice = createSlice({
    name: 'todos',
    initialState: todosAdapter.getInitialState(),
    reducers: {
        todoInitialized: todosAdapter.addMany,
        todoAdded: todosAdapter.addOne,
        todoCreated: todosAdapter.addOne,
        todoStatusChanged: todosAdapter.updateOne,
        todoUpdated: todosAdapter.updateOne,
    },
})

export const {todoInitialized, todoAdded, todoCreated, todoStatusChanged, todoUpdated} = todosSlice.actions;

export const {
    selectAll: selectAllTodos,
    selectIds: selectTodoIds,
    selectEntities: selectTodos,
    selectById: selectTodoById
} = todosAdapter.getSelectors((state) => state.todos);

export default todosSlice.reducer;