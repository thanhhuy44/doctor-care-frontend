import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function Navbar({ onClick }) {
    return (
        <div className="bg-white lg:flex lg:items-center">
            <NavLink onClick={onClick} className={(nav) => cx('item', { active: nav.isActive })} to="/specialties">
                <p className={cx('heading')}>Chuyên khoa</p>
                <p className={cx('description')}>Tìm bác sĩ theo chuyên khoa</p>
            </NavLink>
            <NavLink onClick={onClick} className={(nav) => cx('item', { active: nav.isActive })} to="/hospitals">
                <p className={cx('heading')}>Cơ sở y tế</p>
                <p className={cx('description')}>Chọn bệnh viện phòng khám</p>
            </NavLink>
            <NavLink onClick={onClick} className={(nav) => cx('item', { active: nav.isActive })} to="/doctors">
                <p className={cx('heading')}>Bác sĩ</p>
                <p className={cx('description')}>Chọn bác sĩ giỏi</p>
            </NavLink>
            <NavLink onClick={onClick} className={(nav) => cx('item', { active: nav.isActive })} to="/packages">
                <p className={cx('heading')}>Gói khám</p>
                <p className={cx('description')}>Khám sức khỏe tổng quát</p>
            </NavLink>
        </div>
    );
}

export default Navbar;
