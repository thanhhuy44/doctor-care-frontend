import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar';
import images from '~/assets';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div className={cx('logo')}>
                    <Link to="/" className={cx('logo-link')}>
                        <img className={cx('logo-img')} src={images.logo} alt="logo" />
                    </Link>
                </div>
                <div className={cx('nav')}>
                    <Navbar />
                </div>
                <div className={cx('option')}>
                    <Link className={cx('help-link')} to="/help">
                        <span className={cx('text')}>Hỗ trợ</span>
                        <FontAwesomeIcon className={cx('icon')} icon={faCircleQuestion} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
