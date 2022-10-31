import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFolder, faHospital, faKitMedical, faUser, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function Sidebar() {
    const roleLogin = useSelector((state) => state.doctorCare.roleLogin);
    if (roleLogin === 'admin') {
        return (
            <div className={cx('sidebar')}>
                {/* <NavLink to="/admin/detail" replace className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                    <span className={cx('text')}>Thông tin cá nhân</span>
                </NavLink> */}
                <NavLink to="/admin/doctors" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faUserDoctor} className={cx('icon')} />
                    <span className={cx('text')}>Bác sĩ</span>
                </NavLink>
                <NavLink to="/admin/hospitals" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faHospital} className={cx('icon')} />
                    <span className={cx('text')}>Cơ sở y tế</span>
                </NavLink>
                <NavLink to="/admin/specialties" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faKitMedical} className={cx('icon')} />
                    <span className={cx('text')}>Chuyên khoa</span>
                </NavLink>
                <NavLink to="/admin/type-packages" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faKitMedical} className={cx('icon')} />
                    <span className={cx('text')}>Loại gói khám</span>
                </NavLink>
                <NavLink to="/admin/packages" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faKitMedical} className={cx('icon')} />
                    <span className={cx('text')}>Gói khám</span>
                </NavLink>

                <NavLink to="/admin/booking" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faFile} className={cx('icon')} />
                    <span className={cx('text')}>Đơn khám bệnh</span>
                </NavLink>
                {/* <NavLink to="/admin/quan-ly-admin" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faFolder} className={cx('icon')} />
                    <span className={cx('text')}>Quản trị viên</span>
                </NavLink> */}
            </div>
        );
    }
    if (roleLogin === 'doctor') {
        return (
            <div className={cx('sidebar')}>
                <NavLink to="/admin/doctors" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faUserDoctor} className={cx('icon')} />
                    <span className={cx('text')}>Chỉnh sửa thông tin</span>
                </NavLink>
                <NavLink to="/admin/hospitals" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faHospital} className={cx('icon')} />
                    <span className={cx('text')}>Đơn khám</span>
                </NavLink>
                <NavLink to="/admin/packages" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faKitMedical} className={cx('icon')} />
                    <span className={cx('text')}>Xem đánh giá</span>
                </NavLink>
                <NavLink to="/admin/booking" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faFile} className={cx('icon')} />
                    <span className={cx('text')}>Hỗ trợ</span>
                </NavLink>
                <NavLink to="/admin/quan-ly-admin" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faFolder} className={cx('icon')} />
                    <span className={cx('text')}>Đăng xuất</span>
                </NavLink>
            </div>
        );
    }
}

export default Sidebar;
