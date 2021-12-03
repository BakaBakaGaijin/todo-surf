import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Routes, Route, Link, useLocation} from 'react-router-dom';
import {Breadcrumb} from 'antd';

import './App.css';
import {Todos} from './features/Todos/Todos';
import {CurrentTodo} from './features/CurrentTodo/CurrentTodo';
import {todoInitialized} from './features/Todos/todosSlice';
import {initialTodos} from './features/initialTodos/initialTodos';

function App() {
    const dispatch = useDispatch(initialTodos)

    useEffect(() => {
        dispatch(todoInitialized(initialTodos))

        return () => {
        }
    }, [dispatch])

    const location = useLocation();

    const pathSnippets = location.pathname.split('/').filter(i => i);

    const extraBreadcrumbsItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return <Breadcrumb.Item key={url}>
            <Link to={url}>{'Детали задачи'}</Link>
        </Breadcrumb.Item>
    })

    const breadcrumbItems = [
        <Breadcrumb.Item key={'home'}>
            <Link to={'/'}>Список задач</Link>
        </Breadcrumb.Item>
    ].concat(extraBreadcrumbsItems);

    return (
        <div className='App'>
            <Breadcrumb className={'breadcrumbs'}>{breadcrumbItems}</Breadcrumb>
            <Routes>
                <Route path={'/:todoId'} element={<CurrentTodo/>}/>
                <Route path={'*'} element={<Todos/>}/>
            </Routes>
        </div>
    );
}

export default App;
