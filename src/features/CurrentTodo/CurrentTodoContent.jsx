import {Divider, Tag, Typography} from 'antd';

const {Paragraph} = Typography;

export const CurrentTodoContent = ({todo}) => {
    return (
        <>
            <Divider orientation={'left'}>
                Заголовок
            </Divider>
            <Paragraph>{todo.title}</Paragraph>
            <Divider orientation={'left'}>
                Описание
            </Divider>
            <Paragraph>{todo.description}</Paragraph>
            <Divider orientation={'left'}>
                Дата
            </Divider>
            <Paragraph>{todo.deadline}</Paragraph>
            <Divider orientation={'left'}>
                Теги
            </Divider>
            <Paragraph>{todo.tags && todo.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</Paragraph>
        </>
    );
}