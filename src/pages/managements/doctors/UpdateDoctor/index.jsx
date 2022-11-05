import { Form, Input, InputNumber, Select, Upload, Button, DatePicker, Typography } from 'antd';
import { emailRegex, phoneNumberRegex } from '~/regex';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import Loading from '~/pages/Loading';

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

function UpdateDoctor() {
    const params = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [hospitals, setHospital] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        axios.get('http://localhost:3030/api/hospitals').then((res) => {
            setHospital(res.data.data);
        });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3030/api/specialties').then((res) => {
            setSpecialties(res.data.data);
        });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:3030/api/doctor/${params.id}`).then((res) => {
            setData(res.data.data);
            setImageUrl(res.data.data.image);
            setIsLoading(false);
        });
    }, []);
    const onFinish = (values) => {
        axios
            .post(
                `http://localhost:3030/api/doctor/update/${params.id}`,
                {
                    image: values.avatar ? values.avatar.file.originFileObj : data.image,
                    ...values,
                },
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            )
            .then((res) => {
                alert(res.data.message);
                navigate('/admin/doctors');
            });
    };

    const onFinishFailed = (errorInfo) => {};

    if (isLoading) {
        <Loading />;
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
                    Chỉnh sửa thông tin bác sĩ
                </Typography.Title>
                <Form.Item
                    label="Ảnh đại diện"
                    name="avatar"
                    rules={[
                        () => ({
                            validator(_, value) {
                                if (imageUrl) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject(new Error('Vui lòng nhập trường này!'));
                                }
                            },
                        }),
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
                    initialValue={data.name}
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
                    initialValue={data.email}
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
                    initialValue={data.phoneNumber}
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
                    initialValue={moment(data.birth)}
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
                    initialValue={data.specialty._id}
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
                    initialValue={data.hospital._id}
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
                    style={{
                        height: '250px',
                        overflow: 'hidden',
                    }}
                    label="Giới thiệu ngắn"
                    name="shortDescription"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trường này',
                        },
                    ]}
                    initialValue={data.shortDescription}
                >
                    <ReactQuill
                        className="text-editor"
                        style={{
                            backgroundColor: 'white',
                            height: '200px',
                        }}
                        theme="snow"
                        placeholder="Giới thiệu ngắn về bác sĩ (bắt buộc)..."
                    />
                </Form.Item>
                <Form.Item
                    style={{
                        height: '250px',
                        overflow: 'hidden',
                    }}
                    label="Thông tin chi tiết"
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
                        className="text-editor"
                        style={{
                            height: '200px',
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
                    initialValue={data.price}
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
}

export default UpdateDoctor;
