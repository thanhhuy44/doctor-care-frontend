import { useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import background from '~/assets/images/bookingcare-cover-4.jpg';
import Button from '~/components/Button/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { emailRegex } from '~/regex';

const cx = classNames.bind(styles);

function Login() {
    const {
        register,
        getValues,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm();
    const [hidePass, setHidePass] = useState(true);

    const handleLogin = (data) => {
        console.log(data);
    };
    return (
        <div>
            <div className={cx('background')}>
                <img className={cx('background-img')} src={background} alt="bg" />
            </div>
            <div className={cx('content')}>
                <div className={cx('form')}>
                    <h3 className={cx('title')}>Login</h3>
                    <div className={cx('form-group')}>
                        <div className={cx('feild', errors.email && 'error')}>
                            <label className={cx('label')} htmlFor="email">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </label>
                            <input
                                {...register('email', {
                                    required: true,
                                    pattern: {
                                        value: emailRegex,
                                        message: 'Please enter valid email !!!',
                                    },
                                })}
                                type="text"
                                id="email"
                                className={cx('input')}
                                placeholder="Email"
                            />
                        </div>
                        {errors.email?.type === 'required' && <p className={cx('error-mess')}>Feild is required!!!</p>}
                        {errors.email && <p className={cx('error-mess')}>{errors.email.message}</p>}
                    </div>

                    <div className={cx('form-group')}>
                        <div className={cx('feild', errors.password && 'error')}>
                            <label className={cx('label')} htmlFor="password">
                                <FontAwesomeIcon icon={faKey} />
                            </label>
                            <input
                                {...register('password', {
                                    required: true,
                                })}
                                id="password"
                                type={hidePass ? 'password' : 'text'}
                                className={cx('input')}
                                placeholder="Password"
                            />
                            <Button
                                onClick={() => setHidePass(!hidePass)}
                                className={cx('seepass-btn') + ' min-w-[28px] text-center'}
                            >
                                {hidePass ? (
                                    <FontAwesomeIcon className={cx('btn-icon')} icon={faEye} />
                                ) : (
                                    <FontAwesomeIcon className={cx('btn-icon')} icon={faEyeSlash} />
                                )}
                            </Button>
                        </div>
                        {errors.password && <p className={cx('error-mess')}>Feild is required!!!</p>}
                    </div>

                    <Button onClick={handleSubmit(handleLogin)} type="primary" size="full" className={cx('login-btn')}>
                        LOGIN
                    </Button>
                    <div className={cx('social-login')}>
                        <p className={cx('social-login-title')}>Or login with</p>
                        <div className={cx('social-button')}>
                            <Button size="full" className={cx('social-login-button')} type="primary">
                                Facebook
                            </Button>
                            <Button size="full" className={cx('social-login-button')} type="primary">
                                Google
                            </Button>
                        </div>
                    </div>
                    <p className={cx('signup')}>
                        <span className={cx('signup-text')}>Not a member?</span>{' '}
                        <Link to="/signup" className={cx('signup-link')} target="_blank">
                            Sign up now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
