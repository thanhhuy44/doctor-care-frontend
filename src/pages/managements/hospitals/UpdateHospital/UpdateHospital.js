import { Form, Input, Sct, Upload, Button, Typography, Modal, Cascader } from 'antd';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import location from '~/assets/location/local.json';

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

const getBase64ListFiles = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });

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
    const [imageUrl, setImageUrl] = useState();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const formData = new FormData();

    const onFinish = (values) => {
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('equipments', values.equipments);
        formData.append('strengths', values.strengths);
        formData.append('procedure', values.procedure);
        formData.append('image', values.avatar.file.originFileObj);
        values.address.forEach((value) => {
            formData.append('address', value);
        });
        values.descImages.fileList.forEach((file) => {
            formData.append('descImages', file.originFileObj);
        });

        axios
            .post('http://localhost:3030/api/hospital/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((res) => {
                if (res.data.errCode === 0) {
                    navigate('/admin/hospitals');
                }
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64ListFiles(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    useEffect(() => {
        axios.get(`http://localhost:3030/api/hospital/${params.id}`).then((res) => {
            setData(res.data.data);
            setImageUrl(res.data.data.image);
            setIsLoading(false);
            setFileList(res.data.data.descImages);
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
                            type: 'array',
                            required: true,
                            message: 'Vui lòng nhập trường này',
                        },
                    ]}
                    initialValue={[data.address.province, data.address.district, data.address.wards]}
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
                    initialValue={data.equipments}
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
                <Form.Item
                    label="Ảnh mô tả bệnh viện"
                    name="descImages"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trường này',
                        },
                        () => ({
                            validator(_, value) {
                                if (fileList.length >= 3) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject(new Error('Vui lòng nhập ít nhất 3 ảnh!'));
                                }
                            },
                        }),
                    ]}
                >
                    <Upload
                        multiple
                        customRequest={dummyRequest}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        valuePropName={'fileList'}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <img
                                alt="example"
                                style={{
                                    width: '100%',
                                }}
                                src={previewImage}
                            />
                        </Modal>
                    </Upload>
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
