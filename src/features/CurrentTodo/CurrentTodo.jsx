import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Card, Button, Space} from 'antd';

import './CurrentTodo.css';
import {selectTodoById} from '../Todos/todosSlice';
import {CurrentTodoContent} from './CurrentTodoContent';
import {TodoForm} from '../TodoForm/TodoForm';

export const CurrentTodo = () => {
    useEffect(() => {
        document.title = 'Детали задачи';
    }, [])

    const [isEdit, setIsEdit] = useState(false);

    let {todoId} = useParams();
    const todo = useSelector((state) =>
        selectTodoById(state, todoId));


    const content = !isEdit
        ? <CurrentTodoContent todo={todo}/>
        : <TodoForm isEdit={true} todo={todo} setIsEdit={setIsEdit}/>;

    return (
        <Card
            title={todo.id}
            extra={
                <Space>
                    <Button className={isEdit ? 'hidden' : null}
                            onClick={() => setIsEdit(true)}
                    >
                        Редактировать
                    </Button>
                    <Button className={!isEdit ? 'hidden' : null} form={'todoForm'} htmlType={'submit'}>
                        Сохранить
                    </Button>
                    <Button
                        className={!isEdit ? 'hidden' : null}
                        onClick={() => setIsEdit(false)}
                    >
                        Отменить
                    </Button>
                </Space>
            }
        >
            {content}
        </Card>
    );
}