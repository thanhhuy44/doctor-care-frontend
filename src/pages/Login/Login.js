import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import background from '~/assets/images/bookingcare-cover-4.jpg';
import Button from '~/components/Button/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('container' + ' row')}>
            <div className={cx('background')}>
                <img className={cx('background-img')} src={background} alt="bg" />
            </div>
            <div className={cx('content')}>
                <div className={cx('form')}>
                    <h3 className={cx('title')}>Login</h3>
                    <div className={cx('feild')}>
                        <label htmlFor="email">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </label>
                        <input type="text" id="email" className={cx('input')} placeholder="Email" />
                    </div>
                    <div className={cx('feild')}>
                        <label htmlFor="password">
                            <FontAwesomeIcon icon={faKey} />
                        </label>
                        <input id="password" type="password" className={cx('input')} placeholder="Password" />
                        <Button className={cx('seepass-btn')}>
                            <FontAwesomeIcon icon={faEye} />
                        </Button>
                    </div>

                    <Button type="primary" size="full" className={cx('login-btn')}>
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
