import { Button, Form, Input, Modal } from 'antd';
import { useEffect } from 'react';
import ReactQuill from 'react-quill';
import { emailRegex, phoneNumberRegex } from '~/regex';

function ReviewModal({ modalOpen, setModalOpen, handleSubmit }) {
    const [form] = Form.useForm();
    useEffect(() => {
        if (modalOpen === true) {
            form.resetFields();
        }
    }, [modalOpen]);
    return (
        <Modal
            title="Viết đánh giá cho bác sĩ"
            open={modalOpen}
            onCancel={() => {
                form.resetFields();
                setModalOpen(false);
            }}
            onOk={() => {}}
            footer={false}
        >
            <Form form={form} layout="vertical" onFinish={(values) => handleSubmit(values)}>
                <Form.Item
                    label="Họ và tên"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trường này',
                        },
                    ]}
                >
                    <Input type="text" placeholder="Nhập tên của bạn (bắt buộc)" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trường này',
                        },
                        () => ({
                            validator(_, value) {
                                if (!value || emailRegex.test(value)) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject(new Error('Vui lòng nhập đúng email!'));
                                }
                            },
                        }),
                    ]}
                >
                    <Input type="email" placeholder="Nhập email của bạn (bắt buộc)" />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="phoneNumber"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trường này',
                        },
                        () => ({
                            validator(_, value) {
                                if (!value || phoneNumberRegex.test(value)) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject(new Error('Vui lòng nhập đúng số điện thoại!'));
                                }
                            },
                        }),
                    ]}
                >
                    <Input type="tel" placeholder="Nhập số điện thoại của bạn (bắt buộc)" />
                </Form.Item>
                <Form.Item
                    label="Nội dung"
                    name="content"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trường này',
                        },
                    ]}
                >
                    <Input className="" placeholder="Nhập đánh giá của bạn..." />
                </Form.Item>
                <Form.Item className="mb-0">
                    <Button type="primary" htmlType="submit">
                        Gửi đánh giá
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ReviewModal;
