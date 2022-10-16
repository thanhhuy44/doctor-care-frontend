import { Form, Input, InputNumber, Select, Upload, Button, DatePicker, Typography } from 'antd';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emailRegex, phoneNumberRegex } from '~/regex';
import { PlusOutlined } from '@ant-design/icons';
const { Option } = Select;

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

function AddDoctor() {
    const navigate = useNavigate();
    const [specialties, setSpecialties] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        axios.get('http://localhost:3030/api/specialties').then((res) => {
            setSpecialties(res.data.data);
            console.log(res.data.data);
        });
    }, []);
    useEffect(() => {
        axios.get('http://localhost:3030/api/hospitals').then((res) => {
            setHospitals(res.data.data);
            console.log(res.data.data);
        });
    }, []);

    const onFinish = (values) => {
        console.log('Success:', values);
        axios
            .post(
                'http://localhost:3030/api/doctor/create',
                {
                    image: values.avatar.file.originFileObj,
                    ...values,
                },
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            )
            .then((res) => {
                console.log(res.data);
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
                Thêm bác sĩ
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
                <Input type="text" placeholder="Nhập tên bác sĩ (bắt buộc)" />
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
                <Input type="email" placeholder="Nhập email bác sĩ (bắt buộc)" />
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
                <Input type="tel" placeholder="Nhập số điện thoại của bác sĩ (bắt buộc)" />
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
                    format="DD-MM-YYYY"
                    inputReadOnly={true}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>
            <Form.Item
                label="Chuyên khoa"
                name="specialty"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                    },
                ]}
            >
                <Select
                    showSearch
                    placeholder="Chọn chuyên khoa (bắt buộc)"
                    filterOption={(input, option) => option.name.toLowerCase().includes(input.toLowerCase())}
                    onChange={(value) => {
                        if (value.startsWith('/')) {
                            navigate('/admin/doctors');
                        }
                    }}
                >
                    {specialties.map((specialty) => (
                        <Option key={specialty._id} name={specialty.name} value={specialty._id}>
                            {specialty.name}
                        </Option>
                    ))}
                    <Option key={0} name="---Thêm chuyên khoa---" value="/admin/doctors">
                        ---Thêm chuyên khoa---
                    </Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Bệnh viện"
                name="hospital"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                    },
                ]}
            >
                <Select
                    showSearch
                    placeholder="Chọn bệnh viện (bắt buộc)"
                    filterOption={(input, option) => option.name.toLowerCase().includes(input.toLowerCase())}
                >
                    {hospitals.map((hospital) => (
                        <Option key={hospital._id} name={hospital.name} value={hospital._id}>
                            {hospital.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Giới thiệu ngắn"
                name="shortDescription"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                    },
                ]}
            >
                <ReactQuill
                    className="text-editor"
                    style={{
                        backgroundColor: 'white',
                    }}
                    theme="snow"
                    placeholder="Giới thiệu ngắn về bác sĩ (bắt buộc)..."
                />
            </Form.Item>
            <Form.Item
                label="Thông tin chi tiết"
                name="description"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                    },
                ]}
            >
                <ReactQuill
                    className="text-editor"
                    style={{
                        backgroundColor: 'white',
                    }}
                    placeholder="Thông tin chi tiết về bác sĩ (bắt buộc)..."
                />
            </Form.Item>
            <Form.Item
                label="Giá"
                name="price"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập trường này',
                    },
                ]}
                initialValue={200000}
            >
                <InputNumber
                    step={50000}
                    style={{
                        width: '100%',
                    }}
                    type="tel"
                    placeholder="Nhập giá khám bệnh cho bác sĩ..."
                    addonAfter="VNĐ"
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

export default AddDoctor;
