import { Form, Input, Upload, Button, Typography } from 'antd';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

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

function AddTypePackage() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState();

    const onFinish = (values) => {
        axios
            .post(
                'http://localhost:3030/api/type-package/create',
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
                    alert(res.data.message);
                    navigate('/admin');
                } else {
                    alert(res.data.message);
                    form.resetFields();
                }
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            style={{
                maxWidth: '1000px',
                margin: '0 auto',
            }}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
        >
            <Typography.Title level={1} style={{ textAlign: 'center' }}>
                Thêm mới loại gói khám
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
                label="Tên loại gói khám"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                    },
                ]}
            >
                <Input type="text" placeholder="Nhập tên loại gói khám (bắt buộc)" />
            </Form.Item>
            <Form.Item
                label="Thông tin về loại gói khám"
                name="description"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                    },
                ]}
            >
                <ReactQuill
                    style={{
                        backgroundColor: 'white',
                    }}
                    placeholder="Thông tin tổng quan về cơ sở y tế (bắt buộc)..."
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default AddTypePackage;