import { Form, Input, Upload, Button, Typography, notification } from 'antd';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import Loading from '~/pages/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

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

function UpdateSpecialty() {
    const params = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState();
    const [isLoading, setIsloading] = useState(true);
    const [data, setData] = useState({});

    const onFinish = (values) => {
        axios
            .post(
                `http://localhost:3030/api/specialty/update/${params.id}`,
                {
                    image: values.avatar ? values.avatar.file.originFileObj : data.image,
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
                    navigate('/admin/specialties');
                } else {
                    notification.open({
                        icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
                        message: 'Lỗi',
                        description: res.data.message,
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
        axios.get(`http://localhost:3030/api/specialty/${params.id}`).then((res) => {
            setData(res.data.data);
            setImageUrl(res.data.data.image);
            setIsloading(false);
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
                initialValues={{ name: data.name, description: data.description }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
            >
                <Typography.Title level={1} style={{ textAlign: 'center' }}>
                    Chỉnh sửa chuyên khoa
                </Typography.Title>
                <Form.Item label="Ảnh đại diện" name="avatar" valuePropName={'file'}>
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
                    label="Tên chuyên khoa"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trường này',
                        },
                    ]}
                >
                    <Input type="text" placeholder="Nhập tên chuyên khoa (bắt buộc)" />
                </Form.Item>
                <Form.Item
                    label="Thông tin về chuyên khoa"
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
                        placeholder="Thông tin tổng quan về chuyên khoa (bắt buộc)..."
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

export default UpdateSpecialty;
