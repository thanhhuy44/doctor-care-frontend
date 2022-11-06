import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBook,
    faCircleInfo,
    faFaceSmile,
    faFile,
    faFolderOpen,
    faHospital,
    faKey,
    faKitMedical,
    faPenNib,
    faRightFromBracket,
    faUserDoctor,
    faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setLogIn } from '~/redux/features/doctorCareSlice';
const cx = classNames.bind(styles);

function Sidebar() {
    const dispatch = useDispatch();
    const roleLogin = useSelector((state) => state.doctorCare.roleLogin);
    const adminInfo = useSelector((state) => state.doctorCare.adminInfo);
    if (roleLogin === 'admin') {
        return (
            <div className={cx('sidebar')}>
                <NavLink to="/admin/change-password" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faKey} className={cx('icon')} />
                    <span className={cx('text')}>Đổi mật khẩu</span>
                </NavLink>
                <NavLink to="/admin/doctors" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faUserDoctor} className={cx('icon')} />
                    <span className={cx('text')}>Bác sĩ</span>
                </NavLink>
                <NavLink to="/admin/hospitals" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faHospital} className={cx('icon')} />
                    <span className={cx('text')}>Cơ sở y tế</span>
                </NavLink>
                <NavLink to="/admin/specialties" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faBook} className={cx('icon')} />
                    <span className={cx('text')}>Chuyên khoa</span>
                </NavLink>
                <NavLink to="/admin/type-packages" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faFolderOpen} className={cx('icon')} />
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
                <NavLink to="/admin/posts" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faPenNib} className={cx('icon')} />
                    <span className={cx('text')}>Bài viết</span>
                </NavLink>
                <NavLink to="/admin/management" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faUserGroup} className={cx('icon')} />
                    <span className={cx('text')}>Quản trị viên</span>
                </NavLink>
                <NavLink
                    to="/login"
                    onClick={() => {
                        dispatch(setLogIn(false));
                        localStorage.clear();
                    }}
                    className={(nav) => cx('item', { active: nav.isActive }) + ' border-t mt-20 text-red-500'}
                >
                    <FontAwesomeIcon icon={faRightFromBracket} className={cx('icon')} />
                    <span className={cx('text')}>Đăng xuất</span>
                </NavLink>
            </div>
        );
    }
    if (roleLogin === 'doctor') {
        return (
            <div className={cx('sidebar')}>
                <NavLink
                    to={`/doctor/management/update-info/${adminInfo._id}`}
                    className={(nav) => cx('item', { active: nav.isActive })}
                >
                    <FontAwesomeIcon icon={faUserDoctor} className={cx('icon')} />
                    <span className={cx('text')}>Chỉnh sửa thông tin</span>
                </NavLink>
                <NavLink
                    to="/doctor/management/change-password"
                    className={(nav) => cx('item', { active: nav.isActive })}
                >
                    <FontAwesomeIcon icon={faKey} className={cx('icon')} />
                    <span className={cx('text')}>Đổi mật khẩu</span>
                </NavLink>
                <NavLink to="/doctor/management/orders" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faFile} className={cx('icon')} />
                    <span className={cx('text')}>Đơn khám</span>
                </NavLink>
                <NavLink to="/doctor/management/rating" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faFaceSmile} className={cx('icon')} />
                    <span className={cx('text')}>Xem đánh giá</span>
                </NavLink>
                <NavLink to="/doctor/management/support" className={(nav) => cx('item', { active: nav.isActive })}>
                    <FontAwesomeIcon icon={faCircleInfo} className={cx('icon')} />
                    <span className={cx('text')}>Hỗ trợ</span>
                </NavLink>
                <NavLink
                    to="/login"
                    onClick={() => {
                        dispatch(setLogIn(false));
                        localStorage.clear();
                    }}
                    className={(nav) => cx('item', { active: nav.isActive }) + ' border-t mt-20 text-red-500'}
                >
                    <FontAwesomeIcon icon={faRightFromBracket} className={cx('icon')} />
                    <span className={cx('text')}>Đăng xuất</span>
                </NavLink>
            </div>
        );
    }
}

export default Sidebar;
