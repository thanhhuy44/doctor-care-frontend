import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, notification } from 'antd';
import { Input } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import request from '~/utils';

function ChangePassword() {
    const navigate = useNavigate();
    const adminInfo = useSelector((state) => state.doctorCare.adminInfo);
    const roleLogin = useSelector((state) => state.doctorCare.roleLogin);
    const onFinish = (values) => {
        if (roleLogin === 'admin') {
            request
                .post(`/admin/change-password/${adminInfo._id}`, {
                    password: values.curPassword,
                    newPassword: values.newPassword,
                })
                .then((res) => {
                    if (res.errCode === 0) {
                        notification.open({
                            icon: <FontAwesomeIcon icon={faCheckCircle} className="text-green-700" />,
                            message: 'Thành công',
                            description: res.message,
                        });
                        navigate('/admin');
                    } else {
                        notification.open({
                            icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
                            message: 'Lỗi',
                            description: res.message,
                        });
                    }
                });
        }
        if (roleLogin === 'doctor') {
            request
                .post(`/doctor/change-password/${adminInfo._id}`, {
                    password: values.curPassword,
                    newPassword: values.newPassword,
                })
                .then((res) => {
                    if (res.errCode === 0) {
                        notification.open({
                            icon: <FontAwesomeIcon icon={faCheckCircle} className="text-green-700" />,
                            message: 'Thành công',
                            description: res.message,
                        });
                        navigate('/doctor/management');
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
        <div
            style={{
                maxWidth: '800px',
                margin: '0 auto',
            }}
        >
            <h1 className="text-4xl my-5 font-semibold text-center">Đổi mật khẩu</h1>
            <Form
                layout="vertical"
                name="login"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className=" md:min-w-[400px]"
            >
                <Form.Item
                    label={'Họ và tên'}
                    style={{
                        marginBottom: '20px',
                    }}
                    name="name"
                    initialValue={adminInfo.name}
                >
                    <Input
                        disabled
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
                    name="curPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trường này!',
                        },
                    ]}
                >
                    <Input.Password
                        placeholder="Nhập mật khẩu cũ..."
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
                    label="Mật khẩu mới"
                    name="newPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trường này!',
                        },
                        {
                            min: 8,
                            message: 'Mật khẩu quá ngắn!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('curPassword') !== value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Vui lòng nhập mật khẩu mới khác với mật khẩu cũ!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        placeholder="Nhập mật khẩu mới..."
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
                    label="Nhập lại mật khẩu mới"
                    name="VerifyNewPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập trường này!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Không trùng khớp với mật khẩu mới!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        placeholder="Nhập lại mật khẩu mới..."
                        style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                        }}
                    />
                </Form.Item>
                <Form.Item
                    style={{
                        marginTop: '40px',
                        marginBottom: '20px',
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Đổi mật khẩu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default ChangePassword;
