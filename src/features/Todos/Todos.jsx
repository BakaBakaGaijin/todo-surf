import {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {Divider, Button} from 'antd';

import './Todos.css';
import {alphabeticallySort} from './alphabeticallySort';
import {selectAllTodos} from './todosSlice';
import {TodoList} from './TodoList';
import {AddTodoModal} from '../AddTodoModal/AddTodoModal';

export const Todos = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        document.title = 'Список задач';
    }, [])

    let todos = useSelector(selectAllTodos);

    let newTodos = todos.filter(todo => todo.done === false);
    newTodos = alphabeticallySort(newTodos);

    let completedTodos = todos.filter(todo => todo.done);
    completedTodos = alphabeticallySort(completedTodos);

    let tags = useMemo(() => { // Считаем сколько раз встречается каждый из тегов
        let tmp = {};

        todos.forEach(todo => {
            if (todo.tags) {
                todo.tags.forEach(tag => {
                    tmp[tag] ? tmp[tag] = tmp[tag] + 1 : tmp[tag] = 1;
                })
            }
        })

        return tmp;
    }, [todos])

    const showModal = () => {
        setIsModalVisible(true);
    };

    return (
        <>
            <Divider orientation={'left'}>Осталось выполнить</Divider>
            <TodoList todos={newTodos} tags={tags}/>
            <Divider orientation={'left'}>Выполненные</Divider>
            <TodoList todos={completedTodos} tags={tags}/>
            <Button
                onClick={showModal}
                className={'addTodoBtn'}
                type={'primary'}
            >
                Добавить
            </Button>
            <AddTodoModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
        </>
    );
};