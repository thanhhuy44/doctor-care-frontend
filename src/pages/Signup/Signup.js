import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import background from '~/assets/images/bookingcare-cover-4.jpg';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function Signup() {
    return (
        <div className={cx('container')}>
            <div className={cx('background')}>
                <img className={cx('background-img')} src={background} alt="bg" />
            </div>
            <div className={cx('content')}>
                <div className={cx('form')}>
                    <h3 className={cx('title')}>Sign up form</h3>
                    <div className={cx('group')}>
                        <div className={cx('feild')}>
                            <label className={cx('label')}>First name</label>
                            <input className={cx('input')} type="text" placeholder="First name" />
                        </div>
                        <div className={cx('feild')}>
                            <label className={cx('label')}>Last name</label>
                            <input className={cx('input')} type="text" placeholder="Last name" />
                        </div>
                    </div>
                    <div className={cx('group')}>
                        <div className={cx('feild')}>
                            <label className={cx('label')}>Birth day</label>
                            <input className={cx('input')} type="date" />
                        </div>
                        <div className={cx('feild')}>
                            <p className={cx('label')}>Gendar</p>
                            <div className={cx('select')}>
                                <span className={cx('option')}>
                                    <input type="radio" name="sex" className={cx('input')} />
                                    <label>Male</label>
                                </span>
                                <span className={cx('option')}>
                                    <input type="radio" name="sex" className={cx('input')} />
                                    <label>Female</label>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('group')}>
                        <div className={cx('feild')}>
                            <label className={cx('label')}>Email</label>
                            <input className={cx('input')} type="text" placeholder="Email" />
                        </div>
                        <div className={cx('feild')}>
                            <label className={cx('label')}>Phone number</label>
                            <input className={cx('input')} type="tel" placeholder="Phone number" />
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
                        <Button type="primary" size="full" onClick={() => alert('quai loz')}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
