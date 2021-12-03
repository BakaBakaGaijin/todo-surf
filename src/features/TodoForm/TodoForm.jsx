import {v4 as uuidv4} from 'uuid';
import {DatePicker, Form, Input, Tag, Space} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import {TweenOneGroup} from 'rc-tween-one';
import moment from 'moment';
import {useDispatch} from 'react-redux';

import {todoCreated, todoUpdated} from '../Todos/todosSlice';

export const TodoForm = ({isEdit, todo, handleCancel, setIsEdit}) => {
    const dispatch = useDispatch();

    const [tags, setTags] = useState(todo ? todo.tags : []);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const initialValues = todo
        ? {
            title: todo.title,
            description: todo.description,
            deadline: moment(todo.deadline),
        }
        : {
            title: '',
            description: '',
            deadline: '',
            tags: []
        }

    const onFinish = (values) => {
        let {title, description, deadline} = values;

        if (deadline) {
            deadline = deadline.format('YYYY-MM-DD HH:MM:SS');
        }

        if (!isEdit) {
            dispatch(todoCreated({
                id: uuidv4(),
                title,
                description,
                deadline,
                tags,
                done: false
            }))

            handleCancel();
        } else {
            dispatch(todoUpdated({
                id: todo.id,
                changes: {
                    title,
                    description,
                    deadline,
                    tags
                }
            }))

            setIsEdit(false);
        }
    }

    const saveInputRef = useRef();

    const handleClose = (removedTag) => {
        const _tags = tags.filter((tag) => tag !== removedTag);
        setTags(_tags);
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleInputConfirm = () => {
        let _tags = tags;
        if (inputValue && _tags.indexOf(inputValue) === -1) {
            _tags = [..._tags, inputValue];
        }

        setTags(_tags);
        setInputVisible(false);
        setInputValue('');
    }

    useEffect(() => {
        if (saveInputRef.current) {
            saveInputRef.current.focus()
        }
    }, [inputVisible])

    const showInput = () => {
        setInputVisible(true)
    }

    const forMap = (tag) => {
        const tagElem = (
            <Tag
                closable
                onClose={(e) => {
                    e.preventDefault();
                    handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span
                key={tag} style={{display: 'inline-block'}}
            >
                {tagElem}
            </span>
        );
    }

    let tagChild = tags.map(forMap)

    return (
        <Form
            id={'todoForm'}
            name={'todoForm'}
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={initialValues}
            onFinish={onFinish}
        >
            <Form.Item
                label={'Заголовок'}
                name={'title'}
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите заголовок!'
                    }
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label={'Описание'}
                name={'description'}
            >
                <TextArea/>
            </Form.Item>
            <Form.Item
                label={'Сделать до'}
                name={'deadline'}
            >
                <DatePicker showTime/>
            </Form.Item>
            <Form.Item
                label={'Теги'}
                name={'tags'}
            >
                <Space wrap={true}>
                    <div>
                        <TweenOneGroup
                            enter={{
                                scale: 0.8,
                                opacity: 0,
                                type: 'from',
                                duration: 100
                            }}
                            onEnd={(e) => {
                                if (e.type === 'appear' || e.type === 'enter') {
                                    e.target.style = 'display: inline-block';
                                }
                            }}
                            leave={{opacity: 0, width: 0, scale: 0, duration: 200}}
                            appear={false}
                        >
                            {tagChild}
                        </TweenOneGroup>
                    </div>
                    {inputVisible && (
                        <Input
                            ref={saveInputRef}
                            type={'text'}
                            size={'small'}
                            style={{width: 78}}
                            value={inputValue}
                            onChange={handleInputChange}
                            onBlur={handleInputConfirm}
                            onPressEnter={handleInputConfirm}
                        />
                    )}
                    {!inputVisible && (
                        <Tag
                            className={'site-tag-plus'}
                            onClick={showInput}
                        >
                            <PlusOutlined/> Новый тег
                        </Tag>
                    )}
                </Space>
            </Form.Item>
        </Form>
    );
}