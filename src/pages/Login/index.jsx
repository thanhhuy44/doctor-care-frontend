import { useState } from 'react';
import { useForm } from 'react-hook-form';
import background from '~/assets/images/bookingcare-cover-4.png';
import Button from '~/components/Button/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faEye, faEyeSlash, faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAdminInfo, setLogIn } from '~/redux/features/doctorCareSlice';
import { notification } from 'antd';

function Login() {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [hidePass, setHidePass] = useState(true);

    const handleLogin = (data) => {
        axios.post('http://localhost:3030/api/admin/login', data).then((res) => {
            if (res.data.errCode === 0) {
                dispatch(setLogIn(true));
                dispatch(setAdminInfo(res.data.data));
                notification.open({
                    icon: <FontAwesomeIcon icon={faCheckCircle} className="text-green-700" />,
                    message: 'Thành công',
                    description: res.data.message,
                });
            } else {
                notification.open({
                    icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
                    message: 'Lỗi',
                    description: res.data.message,
                });
            }
        });
    };
    return (
        <div>
            <div className="hidden xl:block fixed top-0 right-0 bottom-0 left-0 z-0">
                <img className="w-full object-cover" src={background} alt="bg" />
            </div>
            <div className="z-[1] fixed top-0 right-0 bottom-0 left-0 bg-white md:bg-black/25 flex items-center justify-center">
                <div className="bg-white p-3 rounded-lg shadow-sm w-full max-w-[400px] sm:w-[400px]">
                    <h3 className="my-7 text-center uppercase text-2xl font-semibold">Login</h3>
                    <div className="mb-5">
                        <div
                            className={`text-xl mb-3 bg-gray-300 py-2 px-4 rounded flex items-center text-gray-900 border ${
                                errors.userName && 'border-red-600'
                            }`}
                        >
                            <label className="cursor-pointer" htmlFor="email">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </label>
                            <input
                                {...register('userName', {
                                    required: true,
                                })}
                                type="email"
                                id="email"
                                className="flex-1 w-full bg-transparent ml-2 text-xl text-gray-900 px-1"
                                placeholder="Tên người dùng (User Name)..."
                            />
                        </div>
                        {errors.userName?.type === 'required' && (
                            <p className="pl-3 mt-2 text-xs font-medium text-red-500">Feild is required!!!</p>
                        )}
                    </div>
                    <div className="mb-5">
                        <div
                            className={`w-full text-xl mb-3 bg-gray-300 py-2 px-4 rounded flex items-center text-gray-900 border ${
                                errors.password && 'border-red-600'
                            }`}
                        >
                            <label className="cursor-pointer" htmlFor="password">
                                <FontAwesomeIcon icon={faKey} />
                            </label>
                            <input
                                {...register('password', {
                                    required: true,
                                })}
                                id="password"
                                type={hidePass ? 'password' : 'text'}
                                className="flex-1 w-full bg-transparent ml-2 text-xl text-gray-900 px-1"
                                placeholder="Mật khẩu..."
                            />
                            <Button onClick={() => setHidePass(!hidePass)} className={'block min-w-[28px] text-center'}>
                                {hidePass ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                            </Button>
                        </div>
                        {errors.password && (
                            <p className="pl-3 mt-2 text-xs font-medium text-red-500">Feild is required!!!</p>
                        )}
                    </div>
                    <Button onClick={handleSubmit(handleLogin)} type="primary" size="full" className="mt-12">
                        LOGIN
                    </Button>
                    {/* <div className={cx('social-login')}>
                        <p className={cx('social-login-title')}>Or login with</p>
                        <div className={cx('social-button')}>
                            <Button size="full" className={cx('social-login-button')} type="primary">
                                Facebook
                            </Button>
                            <Button size="full" className={cx('social-login-button')} type="primary">
                                Google
                            </Button>
                        </div>
                    </div> */}
                    <p className="mt-10 text-sm text-center font-normal">
                        <span>Not a member?</span>{' '}
                        <Link to="/signup" className="inline-block underline font-medium" target="_blank">
                            Sign up now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
