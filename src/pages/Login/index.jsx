import { Button, Radio, Form, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setAdminInfo, setLogIn, setRoleLogin } from '~/redux/features/doctorCareSlice';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import request from '~/utils';

function Login() {
    const dispatch = useDispatch();
    const [role, setRole] = useState('admin');
    const navigate = useNavigate();
    const onFinish = (values) => {
        if (values.role === 'admin') {
            request.post('/admin/login', values).then((res) => {
                if (res.errCode === 0) {
                    dispatch(setLogIn(true));
                    dispatch(setAdminInfo(res.data));
                    dispatch(setRoleLogin(role));
                    notification.open({
                        icon: <FontAwesomeIcon icon={faCheckCircle} className="text-green-700" />,
                        message: 'Thành công',
                        description: res.message,
                    });
                    if (window.location.pathname === '/login') {
                        navigate('/admin');
                        // values.role === 'doctor' && navigate('/management/doctor');
                    }
                } else {
                    notification.open({
                        icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
                        message: 'Lỗi',
                        description: res.message,
                    });
                }
            });
        }
        if (values.role === 'doctor') {
            request.post('/doctor/login', values).then((res) => {
                if (res.errCode === 0) {
                    dispatch(setLogIn(true));
                    dispatch(setAdminInfo(res.data));
                    dispatch(setRoleLogin(role));
                    notification.open({
                        icon: <FontAwesomeIcon icon={faCheckCircle} className="text-green-700" />,
                        message: 'Thành công',
                        description: res.message,
                    });
                    if (window.location.pathname === '/login') {
                        navigate('/doctor/management');
                    }
                } else {
                    notification.open({
                        icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
                        message: 'Lỗi',
                        description: res.message,
                    });
                }
            });
        }
    };
    const onFinishFailed = () => {
        notification.open({
            icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
            message: 'Lỗi',
            description: 'Vui lòng điền đầy đủ thông tin!',
        });
    };
    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-[#E5E5E5] flex items-center justify-center">
            <div className="p-4 md:bg-white rounded-lg">
                <div className="mb-8 text-[#224957] text-center">
                    <h1 className="text-3xl mb-2 font-medium text-[#224957]">Đăng nhập</h1>
                    <p className="text-base">Chào mừng bạn đến với hệ thống Doctor Care</p>
                </div>
                <Form
                    layout="vertical"
                    name="login"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className=" md:min-w-[400px]"
                >
                    <Form.Item
                        style={{
                            marginBottom: '20px',
                        }}
                        label={role === 'admin' ? 'Tên đăng nhập' : 'Email'}
                        name={role === 'admin' ? 'userName' : 'email'}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập trường này!',
                            },
                        ]}
                    >
                        <Input
                            placeholder={role === 'admin' ? 'Nhập tên đăng nhập...' : 'Nhập email bác sĩ...'}
                            style={{
                                padding: '8px 12px',
                                borderRadius: '8px',
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        style={{
                            marginBottom: '20px',
                        }}
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập trường này!',
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Nhập mật khẩu..."
                            style={{
                                padding: '8px 12px',
                                borderRadius: '8px',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        initialValue={role}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập trường này!',
                            },
                        ]}
                        label="Ai đang đăng nhập?"
                    >
                        <Radio.Group
                            onChange={(e) => {
                                setRole(e.target.value);
                            }}
                        >
                            <Radio value={'admin'}>Quản trị hệ thống</Radio>
                            <Radio value={'doctor'}>Bác sĩ</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        style={{
                            marginBottom: '20px',
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;
