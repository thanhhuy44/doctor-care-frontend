import { Form, Input, Upload, Button, Typography, notification, Cascader } from 'antd';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import location from '~/assets/location/local.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

const addressOptions = location.map((item) => {
    return {
        value: item.name,
        label: item.name,
        id: item.id,
        children: item.districts.map((disctrict) => {
            return {
                value: disctrict.name,
                label: disctrict.name,
                id: disctrict.id,
                children: disctrict.wards.map((ward) => {
                    return {
                        value: ward.name,
                        label: ward.name,
                        id: ward.id,
                    };
                }),
            };
        }),
    };
});

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

function UpdateHospital() {
    const params = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [logoUrl, setLogoUrl] = useState();
    const [imageUrl, setImageUrl] = useState();
    const formData = new FormData();

    const onFinish = (values) => {
        formData.append('name', values.name);
        formData.append('address', values.address);
        formData.append('description', values.description);
        formData.append('equipments', values.equipments);
        formData.append('strengths', values.strengths);
        formData.append('procedure', values.procedure);
        values.logo && formData.append('logo', values.logo.file.originFileObj);
        values.image && formData.append('image', values.image.file.originFileObj);
        values.location.forEach((value) => {
            formData.append('location', value);
        });

        axios
            .post(`http://localhost:3030/api/hospital/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((res) => {
                if (res.data.errCode === 0) {
                    navigate('/admin/hospitals');
                    notification.open({
                        icon: <FontAwesomeIcon icon={faCheckCircle} className="text-green-700" />,
                        message: res.data.message,
                    });
                } else {
                    notification.open({
                        icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
                        message: res.data.message,
                    });
                    window.location.reload();
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

    useEffect(() => {
        axios.get(`http://localhost:3030/api/hospital/${params.id}`).then((res) => {
            setData(res.data.data);
            setImageUrl(res.data.data.image);
            setLogoUrl(res.data.data.logo);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <h1>Is Loading</h1>;
    } else {
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
                    Thêm mới bệnh viện
                </Typography.Title>
                <Form.Item label="Logo cơ sở y tế" name="logo" valuePropName={'file'}>
                    <Upload
                        style={{
                            margin: '0 auto',
                        }}
                        listType="picture-card"
                        showUploadList={false}
                        customRequest={dummyRequest}
                        onChange={(e) => {
                            getBase64(e.file.originFileObj, (url) => {
                                setLogoUrl(url);
                            });
                        }}
                    >
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt="logo"
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
                <Form.Item label="Hình ảnh bệnh viện" name="image" valuePropName={'file'}>
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
                    label="Tên bệnh viện"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trường này',
                        },
                    ]}
                    initialValue={data.name}
                >
                    <Input type="text" placeholder="Nhập tên bệnh viện (bắt buộc)" />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ bệnh viện"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trường này',
                        },
                    ]}
                    initialValue={data.address}
                >
                    <Input type="text" placeholder="Nhập địa chỉ bệnh viện (bắt buộc)" />
                </Form.Item>
                <Form.Item
                    label="Tỉnh thành"
                    name="location"
                    rules={[
                        {
                            type: 'array',
                            required: true,
                            message: 'Vui lòng nhập trường này',
                        },
                    ]}
                    initialValue={[data.location.province, data.location.district, data.location.wards]}
                >
                    <Cascader placeholder="Chọn địa chỉ bệnh viện" options={addressOptions} />
                </Form.Item>
                <Form.Item
                    label="Thông tin tổng quan cơ sở y tế"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trường này',
                        },
                    ]}
                    initialValue={data.description}
                >
                    <ReactQuill
                        style={{
                            backgroundColor: 'white',
                        }}
                        placeholder="Thông tin tổng quan về cơ sở y tế (bắt buộc)..."
                    />
                </Form.Item>
                <Form.Item
                    label="Thế mạnh chuyên môn"
                    name="strengths"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trường này',
                        },
                    ]}
                    initialValue={data.strengths}
                >
                    <ReactQuill
                        style={{
                            backgroundColor: 'white',
                        }}
                        placeholder="Thế mạnh chuyên môn của cơ sở y tế (bắt buộc)..."
                    />
                </Form.Item>
                <Form.Item
                    label="Trang thiết bị"
                    name="equipments"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trường này',
                        },
                    ]}
                    initialValue={data.equipments ? data.equipments : ''}
                >
                    <ReactQuill
                        style={{
                            backgroundColor: 'white',
                        }}
                        placeholder="Trang thiết bị của cơ sở y tế (bắt buộc)..."
                    />
                </Form.Item>
                <Form.Item
                    label="Quy trình khám bệnh"
                    name="procedure"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trường này',
                        },
                    ]}
                    initialValue={data.procedure}
                >
                    <ReactQuill
                        style={{
                            backgroundColor: 'white',
                        }}
                        placeholder="Quy trình khám bệnh của cơ sở y tế (bắt buộc)..."
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

export default UpdateHospital;
