import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import background from '~/assets/images/bookingcare-cover-4.jpg';
import Button from '~/components/Button/Button';
import { emailRegex, phoneNumberRegex } from '~/regex';

const cx = classNames.bind(styles);

function Signup() {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm();
    const handleSignUp = (data) => {
        console.log(data);
        alert(data);
    };
    return (
        <div className={cx('container')}>
            <div className={cx('background')}>
                <img className={cx('background-img')} src={background} alt="bg" />
            </div>
            <div className={cx('content')}>
                <div className={cx('form')}>
                    <h3 className={cx('title')}>Sign up</h3>
                    <div className={cx('group')}>
                        <div className={cx('feild')}>
                            <label className={cx('label')}>First name</label>
                            <input
                                className={cx('input', errors.firstName && 'error')}
                                {...register('firstName', {
                                    required: true,
                                })}
                                type="text"
                                placeholder="First name"
                            />
                            {errors.firstName?.type === 'required' && (
                                <p className={cx('error-mess')}>Feild is required !!!</p>
                            )}
                        </div>
                        <div className={cx('feild')}>
                            <label className={cx('label')}>Last name</label>
                            <input
                                {...register('lastName', {
                                    required: true,
                                })}
                                className={cx('input', errors.lastName && 'error')}
                                type="text"
                                placeholder="Last name"
                            />
                            {errors.lastName?.type === 'required' && (
                                <p className={cx('error-mess')}>Feild is required !!!</p>
                            )}
                        </div>
                    </div>
                    <div className={cx('group')}>
                        <div className={cx('feild')}>
                            <label className={cx('label')}>Birth day</label>
                            <input
                                {...register('birthDay', {
                                    required: true,
                                })}
                                className={cx('input', errors.birthDay && 'error')}
                                type="date"
                            />
                            {errors.birthDay?.type === 'required' && (
                                <p className={cx('error-mess')}>Feild is required !!!</p>
                            )}
                        </div>
                        <div className={cx('feild')}>
                            <p className={cx('label')}>Gendar</p>
                            <select
                                defaultValue={1}
                                {...register('sex', {
                                    required: true,
                                })}
                                className={cx('select', errors.sex && 'error')}
                            >
                                <option className={cx('option')} value="1">
                                    Nam
                                </option>
                                <option className={cx('option')} value="0">
                                    Nữ
                                </option>
                            </select>
                            {errors.sex?.type === 'required' && (
                                <p className={cx('error-mess')}>Feild is required !!!</p>
                            )}
                        </div>
                    </div>
                    <div className={cx('group')}>
                        <div className={cx('feild')}>
                            <label className={cx('label')}>Email</label>
                            <input
                                {...register('email', {
                                    required: true,
                                    pattern: {
                                        value: emailRegex,
                                        message: 'Please enter valid email !!!',
                                    },
                                })}
                                className={cx('input', errors.email && 'error')}
                                type="text"
                                placeholder="Email"
                            />
                            {errors.email?.type === 'required' && (
                                <p className={cx('error-mess')}>Feild is required !!!</p>
                            )}
                            {errors.email && <p className={cx('error-mess')}>{errors.email.message}</p>}
                        </div>
                        <div className={cx('feild')}>
                            <label className={cx('label')}>Phone number</label>
                            <input
                                {...register('phoneNumber', {
                                    required: true,
                                    pattern: {
                                        value: phoneNumberRegex,
                                        message: 'Please enter valid number phone!!!',
                                    },
                                })}
                                className={cx('input', errors.phoneNumber && 'error')}
                                type="tel"
                                placeholder="Phone number"
                            />
                            {errors.phoneNumber?.type === 'required' && (
                                <p className={cx('error-mess')}>Feild is required !!!</p>
                            )}
                            {errors.phoneNumber && <p className={cx('error-mess')}>{errors.phoneNumber.message}</p>}
                        </div>
                    </div>
                    <div className={cx('group', 'password')}>
                        <div className={cx('feild')}>
                            <label className={cx('label')}>Password</label>
                            <input
                                {...register('password', {
                                    required: true,
                                })}
                                className={cx('input', errors.password && 'error')}
                                type="password"
                                placeholder="Password"
                            />
                            {errors.password?.type === 'required' && (
                                <p className={cx('error-mess')}>Feild is required !!!</p>
                            )}
                        </div>
                        <div className={cx('feild')}>
                            <label className={cx('label')}>Verify Password</label>
                            <input
                                {...register('verify_password', {
                                    required: true,
                                    validate: (value) => {
                                        if (watch('password') !== value) {
                                            return 'Your passwords do no match';
                                        }
                                    },
                                })}
                                className={cx('input', errors.verify_password && 'error')}
                                type="password"
                                placeholder="Verify Password"
                            />
                            {errors.verify_password?.type === 'required' && (
                                <p className={cx('error-mess')}>Feild is required !!!</p>
                            )}
                            {errors.verify_password && (
                                <p className={cx('error-mess')}>{errors.verify_password.message}</p>
                            )}
                        </div>
                    </div>
                    <div className={cx('group')}>
                        <Button type="primary" size="full" onClick={handleSubmit(handleSignUp)}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
