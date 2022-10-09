import { AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import location from '~/assets/location/local.json';
import { phoneNumberRegex } from '~/regex';

const { Option } = Select;
const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

const options = location.map((item) => {
    return {
        value: item.name,
        label: item.name,
        children: item.districts.map((district) => {
            return {
                value: district.name,
                label: district.name,
                children: district.wards.map((ward) => {
                    return {
                        value: ward.name,
                        label: ward.name,
                    };
                }),
            };
        }),
    };
});

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
        md: {
            span: 4,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
        md: {
            span: 18,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const App = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const suffixSelector = (
        <Form.Item name="suffix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="USD">$</Option>
                <Option value="CNY">¥</Option>
            </Select>
        </Form.Item>
    );
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    const onWebsiteChange = (value) => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
        }
    };

    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
    }));
    return (
        <div className="max-w-[1000px] mx-auto">
            <Form
                title="Thêm bác sĩ"
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    prefix: '86',
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="name"
                    label="Họ và tên"
                    rules={[
                        {
                            required: true,
                            message: 'Trường này là bắt buộc!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phoneNumber"
                    label="Số điện thoại"
                    rules={[
                        {
                            required: true,
                            message: 'Trường này là bắt buộc!',
                        },
                        ({ getFieldValue }) => ({
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
                    <Input />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Địa chỉ"
                    rules={[
                        {
                            type: 'array',
                            required: true,
                            message: 'Trường này là bắt buộc!',
                        },
                    ]}
                >
                    <Cascader placeholder="Chọn địa chỉ" options={options} />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Giá"
                    rules={[
                        {
                            required: true,
                            message: 'Trường này là bắt buộc!',
                        },
                    ]}
                    initialValue={200000}
                >
                    <InputNumber
                        // defaultValue={200000}
                        step={50000}
                        addonAfter={'VNĐ'}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="intro"
                    label="Intro"
                    rules={[
                        {
                            required: true,
                            message: 'Trường này là bắt buộc',
                        },
                    ]}
                >
                    <ReactQuill
                        theme="snow"
                        style={{
                            height: '250px',
                            backgroundColor: 'white',
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                        {
                            required: true,
                            message: 'Please select gender!',
                        },
                    ]}
                >
                    <Select placeholder="select your gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default App;
