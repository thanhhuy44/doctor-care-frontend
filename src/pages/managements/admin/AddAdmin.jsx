import { Form, Input, Upload, Button, DatePicker, Typography, notification } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emailRegex, phoneNumberRegex } from '~/regex';
import { PlusOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import request from '~/utils';
import axios from 'axios';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess('ok');
    }, 0);
};

function AddAdmin() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState();

    const onFinish = (values) => {
        axios
            .post(
                'http://localhost:3030/api/admin/create',
                {
                    image: values.avatar.file.originFileObj,
                    ...values,
                },
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            )
            .then((res) => {
                if (res.data.errCode === 0) {
                    notification.open({
                        icon: <FontAwesomeIcon icon={faCheckCircle} className="text-green-700" />,
                        message: 'Thành công',
                        description: res.data.message,
                    });
                    navigate('/admin/management');
                } else {
                    notification.open({
                        icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
                        message: 'Lỗi',
                        description: res.data.message,
                    });
                    form.resetFields();
                }
            });
    };

    const onFinishFailed = (errorInfo) => {
        notification.open({
            icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
            message: 'Lỗi',
            description: 'Vui lòng điền đầy đủ thông tin!',
        });
    };
    return (
        <Form
            style={{
                maxWidth: '1000px',
                margin: '0 auto',
            }}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
        >
            <Typography.Title level={1} style={{ textAlign: 'center' }}>
                Thêm Quản trị viên
            </Typography.Title>
            <Form.Item
                label="Ảnh đại diện"
                name="avatar"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                    },
                ]}
                valuePropName={'file'}
            >
                <Upload
                    style={{
                        margin: '0 auto',
                    }}
                    listType="picture-card"
                    // className="avatar-uploader"
                    showUploadList={false}
                    customRequest={dummyRequest}
                    onChange={(e) => {
                        getBase64(e.file.originFileObj, (url) => {
                            setImageUrl(url);
                        });
                    }}
                >
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="avatar"
                            style={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    ) : (
                        <div>
                            {<PlusOutlined />}
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </div>
                    )}
                </Upload>
            </Form.Item>
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
                <Input type="text" placeholder="Nhập họ và tên quản trị viên (bắt buộc)" />
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
                <Input type="email" placeholder="Nhập email quản trị viên (bắt buộc)" />
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
                <Input type="tel" placeholder="Nhập số điện thoại của quản trị viên (bắt buộc)" />
            </Form.Item>
            <Form.Item
                label="Ngày sinh"
                name="birth"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                    },
                ]}
            >
                <DatePicker
                    placeholder="Chọn sinh nhật của quản trị viên (bắt buộc)"
                    format="DD-MM-YYYY"
                    inputReadOnly={true}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>
            <Form.Item
                label="Tên đăng nhập"
                name="userName"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                    },
                ]}
            >
                <Input type="text" placeholder="Nhập tên đăng nhập của quản trị viên (bắt buộc)" />
            </Form.Item>
            <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                    },
                ]}
            >
                <Input.Password autoComplete="new-password" placeholder="Nhập mật khẩu cho quản trị viên (bắt buộc)" />
            </Form.Item>
            <Form.Item
                style={{
                    marginTop: '50px',
                }}
            >
                <Button type="primary" htmlType="submit">
                    Thêm quản trị viên
                </Button>
            </Form.Item>
        </Form>
    );
}

export default AddAdmin;
