import { Form, Input, Upload, Button, Typography, InputNumber, Select, notification } from 'antd';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
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

function UpdatePackage() {
    const params = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [imageUrl, setImageUrl] = useState();
    const [hospitals, setHospitals] = useState([]);
    const [typePackages, setTypePackages] = useState([]);

    const onFinish = (values) => {
        axios
            .post(
                `http://localhost:3030/api/package/update/${params.id}`,
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
                    navigate('/admin/packages');
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
        axios.get(`http://localhost:3030/api/package/${params.id}`).then((res) => {
            setData(res.data.data);
            setImageUrl(res.data.data.image);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3030/api/hospitals').then((res) => {
            setHospitals(res.data.data);
        });
    }, []);
    useEffect(() => {
        axios.get('http://localhost:3030/api/type-packages').then((res) => {
            setTypePackages(res.data.data);
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
                    elements: data.elements,
                    hospital: data.hospital._id,
                    typePackage: data.typePackage._id,
                    procedure: data.procedure,
                    price: data.price,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
            >
                <Typography.Title level={1} style={{ textAlign: 'center' }}>
                    Cập nhật thông tin gói khám
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
                    label="Tên gói khám"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trường này',
                        },
                    ]}
                >
                    <Input type="text" placeholder="Nhập tên gói khám (bắt buộc)" />
                </Form.Item>
                <Form.Item
                    label="Thông tin tổng quan gói khám"
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
                        placeholder="Thông tin tổng quan về gói khám (bắt buộc)..."
                    />
                </Form.Item>
                <Form.Item
                    label="Các thành phần"
                    name="elements"
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
                        placeholder="Các thành phần của gói khám (bắt buộc)..."
                    />
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
                            <Select.Option key={hospital._id} name={hospital.name} value={hospital._id}>
                                {hospital.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Loại gói khám"
                    name="typePackage"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trường này',
                        },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Chọn Loại gói khám (bắt buộc)"
                        filterOption={(input, option) => option.name.toLowerCase().includes(input.toLowerCase())}
                    >
                        {typePackages.map((typePackage) => (
                            <Select.Option key={typePackage._id} name={typePackage.name} value={typePackage._id}>
                                {typePackage.name}
                            </Select.Option>
                        ))}
                    </Select>
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
                <Form.Item
                    label="Giá"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trường này',
                        },
                    ]}
                >
                    <InputNumber
                        step={50000}
                        style={{
                            width: '100%',
                        }}
                        type="tel"
                        placeholder="Nhập giá khám bệnh của gói khám..."
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

export default UpdatePackage;
