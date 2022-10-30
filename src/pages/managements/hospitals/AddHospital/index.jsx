import { Form, Input, Upload, Button, Typography, Cascader, notification } from 'antd';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import location from '~/assets/location/local.json';
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

function AddHospital() {
    const navigate = useNavigate();
    const [logoUrl, setLogoUrl] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [form] = Form.useForm();
    const formData = new FormData();

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

    const onFinish = (values) => {
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('phoneNumber', values.phoneNumber);
        formData.append('description', values.description);
        values.equipments && formData.append('equipments', values.equipments);
        values.strengths && formData.append('strengths', values.strengths);
        formData.append('procedure', values.procedure);
        formData.append('address', values.address);
        formData.append('logo', values.logo.file.originFileObj);
        formData.append('image', values.image.file.originFileObj);
        values.location.forEach((value) => {
            formData.append('location', value);
        });

        axios
            .post('http://localhost:3030/api/hospital/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((res) => {
                if (res.data.errCode === 0) {
                    notification.open({
                        icon: <FontAwesomeIcon icon={faCheckCircle} className="text-green-700" />,
                        message: 'Thành công',
                        description: res.data.message,
                    });
                    navigate('/admin/hospitals');
                } else {
                    notification.open({
                        icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
                        message: 'Lỗi',
                        description: res.data.message,
                    });
                    form.resetFields();
                    setLogoUrl('');
                    setImageUrl('');
                }
            })
            .catch(() => {
                form.resetFields();
                setImageUrl('');
                setLogoUrl('');
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
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
                Thêm mới cơ sở y tế
            </Typography.Title>
            <Form.Item
                label="Logo cơ sở y tế"
                name="logo"
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
                    multiple={false}
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
                label="Hình ảnh cơ sở y tế"
                name="image"
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
                    multiple={false}
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
                label="Tên cơ sở y tế"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                    },
                ]}
            >
                <Input type="text" placeholder="Nhập tên cơ sở y tế (bắt buộc)" />
            </Form.Item>
            {/* <Form.Item
                label="Email cơ sở y tế"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                    },
                ]}
            >
                <Input type="text" placeholder="Nhập email cơ sở y tế (bắt buộc)" />
            </Form.Item>
            <Form.Item
                label="Số điện thoại cơ sỏ y tế"
                name="phoneNumber"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                    },
                ]}
            >
                <Input type="text" placeholder="Nhập số điện thoại cơ sỏ y tế (bắt buộc)" />
            </Form.Item> */}
            <Form.Item
                label="Địa chỉ cơ sở y tế"
                name="address"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                    },
                ]}
            >
                <Input type="text" placeholder="Nhập địa chỉ cơ sở y tế (bắt buộc)" />
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
            >
                <Cascader placeholder="Chọn tỉnh thành..." options={addressOptions} />
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
            >
                <ReactQuill
                    style={{
                        backgroundColor: 'white',
                    }}
                    placeholder="Thông tin tổng quan về cơ sở y tế (bắt buộc)..."
                />
            </Form.Item>
            <Form.Item label="Thế mạnh chuyên môn" name="strengths">
                <ReactQuill
                    style={{
                        backgroundColor: 'white',
                    }}
                    placeholder="Thế mạnh chuyên môn của cơ sở y tế (bắt buộc)..."
                />
            </Form.Item>
            <Form.Item label="Trang thiết bị" name="equipments">
                <ReactQuill
                    style={{
                        backgroundColor: 'white',
                    }}
                    placeholder="Trang thiết bị của cơ sở y tế..."
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

export default AddHospital;
