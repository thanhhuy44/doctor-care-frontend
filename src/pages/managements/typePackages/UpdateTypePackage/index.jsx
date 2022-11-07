import { Form, Input, Upload, Button, Typography, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import Loading from '~/pages/Loading';
import { useEffect } from 'react';
import request from '~/utils';

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

function UpdateTypePackage() {
    const params = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const onFinish = (values) => {
        request
            .post(
                `/type-package/update/${params.id}`,
                {
                    image: values.avatar ? values.avatar.file.originFileObj : data.image,
                    ...values,
                },
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            )
            .then((res) => {
                if (res.errCode === 0) {
                    notification.open({
                        icon: <FontAwesomeIcon icon={faCheckCircle} className="text-green-700" />,
                        message: 'Thành công',
                        description: res.message,
                    });
                    navigate('/admin/type-packages');
                } else {
                    notification.open({
                        icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
                        message: 'Lỗi',
                        description: res.message,
                    });
                    window.location.reload();
                }
            });
    };

    const onFinishFailed = () => {
        notification.open({
            icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
            message: 'Lỗi',
            description: 'Vui lòng điền đầy đủ thông tin!',
        });
    };

    useEffect(() => {
        request.get(`/type-package/${params.id}`).then((res) => {
            setData(res.data);
            setImageUrl(res.data.image);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <Form
                style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                }}
                name="basic"
                initialValues={{
                    name: data.name,
                    description: data.description,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
            >
                <Typography.Title level={1} style={{ textAlign: 'center' }}>
                    Cập nhật thông tin loại gói khám
                </Typography.Title>
                <Form.Item label="Ảnh đại diện" name="avatar" valuePropName={'file'}>
                    <Upload
                        style={{
                            margin: '0 auto',
                        }}
                        listType="picture-card"
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
}

export default UpdateTypePackage;
