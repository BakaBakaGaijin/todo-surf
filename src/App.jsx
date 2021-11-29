import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';

import './App.css';

import {Todos} from './features/Todos/Todos';
import {todoInitialized} from './features/Todos/todosSlice';
import {initialTodos, todoAdded} from './features/initialTodos/initialTodos';

function App() {
  const dispatch = useDispatch(initialTodos)

    useEffect(() => {
      dispatch(todoAdded({id: 'myId', data: 'mydata'}))
            //dispatch(todoInitialized())
            // let openRequest = indexedDB.open('todos', '1');
            // console.log('openRequest: ', openRequest);
            // //console.log('openRequest.result: ', openRequest.result); // вызывает ошибку
            // openRequest.onupgradeneeded = function() {
            //     // срабатывает, если на клиенте нет базы данных
            //     // ...выполнить инициализацию...
            // }
            // openRequest.onerror = function() {
            //     console.error("Error", openRequest.error);
            // }
            // openRequest.onsuccess = function() {
            //     let db = openRequest.result;
            //     // продолжить работу с базой данных, используя объект db
            // }



        return () => {}
    }, [])
  return (
    <div className="App">
      <Todos />
    </div>
  );
}

export default App;
