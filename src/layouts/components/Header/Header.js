import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faUser } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar';
import images from '~/assets';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className="fixed top-0 right-0 left-0 z-50 bg-white border-b border-gray-700">
            <div className="container mx-auto flex items-center  h-20">
                <div className="w-52 h-full">
                    <Link to="/" className="w-full h-full">
                        <img className="w-full h-full" src={images.logo} alt="logo" />
                    </Link>
                </div>
                <div className="mx-12 flex-1">
                    <Navbar />
                </div>
                <div className="cursor-pointer text-2xl px-3 hover:text-cyan-600">
                    <Link to="/login">
                        {/* <span className={cx('text')}>Hỗ trợ</span> */}
                        <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
