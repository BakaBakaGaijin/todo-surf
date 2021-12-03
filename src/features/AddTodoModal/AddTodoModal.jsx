import {
    Button,
    Modal,
    Space,
} from 'antd';

import './AddTodoModal.css';
import {TodoForm} from '../TodoForm/TodoForm';

export const AddTodoModal = ({isModalVisible, setIsModalVisible}) => {

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Modal
            footer={null}
            closable={false}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <TodoForm isEdit={false} handleCancel={handleCancel}/>
            <div className={'addTodoModal-flexContainer'}>
                <Space align={'center'}>
                    <Button onClick={handleCancel}>Отмена</Button>
                    <Button form={'todoForm'} type={'primary'} htmlType={'submit'}>Добавить</Button>
                </Space>
            </div>
        </Modal>
    );
}