import {Button, List, Tag, Typography} from 'antd';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {todoStatusChanged} from './todosSlice';

const {Title, Paragraph, Text} = Typography;

export const TodoList = ({todos, tags}) => {
    const dispatch = useDispatch();

    return (
        <List
            size={'large'}
            dataSource={todos}
            renderItem={todo => (
                <List.Item
                    actions={[<Link to={`/${todo.id}`}>Подробнее</Link>,
                        <Button
                            onClick={() => dispatch(todoStatusChanged({
                                id: todo.id,
                                changes: {
                                    done: !todo.done
                                }
                            }))}
                        >
                            {!todo.done ? 'Готово' : 'Отмена'}
                        </Button>]}
                >
                    <div>
                        <Title level={4}>{todo.title}</Title>
                        <Paragraph>{todo.deadline}</Paragraph>
                        <Text>
                            {!todo.tags
                                ? null
                                : (() => {
                                    if (todo.tags.length > 3) {
                                        let sortedTags = [...todo.tags];

                                        sortedTags.sort((a, b) => {
                                            return tags[b] - tags[a];
                                        })

                                        return sortedTags.slice(0, 3);
                                    }

                                    return todo.tags;
                                })().map((tag) => <Tag key={tag}>{tag}</Tag>)
                            }
                        </Text>
                    </div>
                </List.Item>
            )}
        />
    )
}