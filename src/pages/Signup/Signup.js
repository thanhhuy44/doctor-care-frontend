import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import background from '~/assets/images/bookingcare-cover-4.jpg';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function Signup() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const handleSignUp = (data) => {
        console.log(data);
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
                        </div>
                        <div className={cx('feild')}>
                            <p className={cx('label')}>Gendar</p>
                            <div className={cx('select')}>
                                <span className={cx('option', errors.sex && 'error')}>
                                    <input
                                        defaultValue={'nam'}
                                        type="radio"
                                        {...register('sex', {
                                            required: true,
                                        })}
                                        name="sex"
                                        className={cx('input')}
                                    />
                                    <label>Male</label>
                                </span>
                                <span className={cx('option', errors.sex && 'error')}>
                                    <input
                                        {...register('sex', {
                                            required: true,
                                        })}
                                        type="radio"
                                        name="sex"
                                        className={cx('input')}
                                    />
                                    <label>Female</label>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('group')}>
                        <div className={cx('feild')}>
                            <label className={cx('label')}>Email</label>
                            <input
                                {...register('email', {
                                    required: true,
                                    pattern: {
                                        value: '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/',
                                        message: 'Please enter valid email !!!',
                                    },
                                })}
                                className={cx('input')}
                                type="text"
                                placeholder="Email"
                            />
                        </div>
                        <div className={cx('feild')}>
                            <label className={cx('label')}>Phone number</label>
                            <input
                                {...register('phoneNumber', {
                                    required: true,
                                    pattern: {
                                        value: '/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/',
                                        message: 'Please enter valid number phone!!!',
                                    },
                                })}
                                className={cx('input')}
                                type="tel"
                                placeholder="Phone number"
                            />
                        </div>
                    </div>
                    <div className={cx('group', 'password')}>
                        <div className={cx('feild')}>
                            <label className={cx('label')}>Password</label>
                            <input className={cx('input')} type="password" placeholder="Password" />
                        </div>
                        <div className={cx('feild')}>
                            <label className={cx('label')}>Verify Password</label>
                            <input className={cx('input')} type="password" placeholder="Verify Password" />
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
