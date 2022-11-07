import { Form, Input, Upload, Button, Typography, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import Loading from '~/pages/Loading';
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

function UpdatePost() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const params = useParams();
    const [data, setData] = useState();
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        request.get(`/post/${params.id}`).then((res) => {
            setData(res.data);
            setImageUrl(res.data.banner);
        });
    });

    const onFinish = (values) => {
        request
            .post(
                `/post/update/${params.id}`,
                {
                    banner: values.avatar ? values.avatar.file.originFileObj : data.banner,
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
                    navigate('/admin/posts');
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

    return data ? (
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
                Chỉnh sửa bài viết
            </Typography.Title>
            <Form.Item label="Thumbnail bài viết" name="avatar" valuePropName={'file'}>
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
                label="Tên bài viết"
                name="title"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                    },
                ]}
                initialValue={data.title}
            >
                <Input type="text" placeholder="Nhập tên bài viết (bắt buộc)" />
            </Form.Item>
            <Form.Item
                label="Tên tác giả"
                name="artist"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                    },
                ]}
                initialValue={data.artist}
            >
                <Input type="text" placeholder="Nhập tên tác giả (bắt buộc)" />
            </Form.Item>
            <Form.Item
                label="Lời tựa"
                name="summary"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                    },
                ]}
                initialValue={data.summary}
            >
                <Input type="text" placeholder="Nhập Lời tựa cho bài viết (bắt buộc)" />
            </Form.Item>
            <Form.Item
                label="Nội dung bài viết"
                name="content"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                    },
                ]}
                initialValue={data.content}
            >
                <ReactQuill
                    style={{
                        backgroundColor: 'white',
                    }}
                    placeholder="Nội dung bài viết (bắt buộc)..."
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    ) : (
        <Loading />
    );
}

export default UpdatePost;
