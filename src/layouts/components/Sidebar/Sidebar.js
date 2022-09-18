import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faHospital, faUser, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('sidebar')}>
            <NavLink to="/admin" replace className={(nav) => cx('item', { active: nav.isActive })}>
                <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                <span className={cx('text')}>Thông tin cá nhân</span>
            </NavLink>
            <NavLink to="/admin/doctors" className={(nav) => cx('item', { active: nav.isActive })}>
                <FontAwesomeIcon icon={faUserDoctor} className={cx('icon')} />
                <span className={cx('text')}>Bác sĩ</span>
            </NavLink>
            <NavLink to="/admin/hospitals" className={(nav) => cx('item', { active: nav.isActive })}>
                <FontAwesomeIcon icon={faHospital} className={cx('icon')} />
                <span className={cx('text')}>Bệnh viện</span>
            </NavLink>
            <NavLink to="/admin/quan-ly-admin" className={(nav) => cx('item', { active: nav.isActive })}>
                <FontAwesomeIcon icon={faFolder} className={cx('icon')} />
                <span className={cx('text')}>Quản trị viên</span>
            </NavLink>
            <div className="flex-1"></div>
        </div>
    );
}

export default Sidebar;
