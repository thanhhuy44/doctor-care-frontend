import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function Navbar() {
    return (
        <div className={cx('container')}>
            <NavLink className={cx('item')} to="/chuyen-khoa">
                <p className={cx('nav')}>Chuyên khoa</p>
                <p className={cx('sub-nav')}>Tìm bác sĩ theo chuyên khoa</p>
            </NavLink>
            <NavLink className={cx('item')} to="/co-so-y-te">
                <p className={cx('nav')}>Cơ sở y tế</p>
                <p className={cx('sub-nav')}>Chọn bệnh viện phòng khám</p>
            </NavLink>
            <NavLink className={cx('item')} to="/bac-si">
                <p className={cx('nav')}>Bác sĩ</p>
                <p className={cx('sub-nav')}>Chọn bác sĩ giỏi</p>
            </NavLink>
            <NavLink className={cx('item')} to="/goi-kham">
                <p className={cx('nav')}>Gói khám</p>
                <p className={cx('sub-nav')}>Khám sức khỏe tổng quát</p>
            </NavLink>
        </div>
    );
}

export default Navbar;
