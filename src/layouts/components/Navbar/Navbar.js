import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <div className="flex items-center">
            <NavLink className="flex-1 text-stone-900 hover:text-blue-700" to="/category">
                <p className="text-lg font-bold ">Chuyên khoa</p>
                <p className="mt-2 text-xs font-light">Tìm bác sĩ theo chuyên khoa</p>
            </NavLink>
            <NavLink className="flex-1 text-stone-900 hover:text-blue-700" to="/category">
                <p className="text-lg font-bold ">Cơ sở y tế</p>
                <p className="mt-2 text-xs font-light">Chọn bệnh viện phòng khám</p>
            </NavLink>
            <NavLink className="flex-1 text-stone-900 hover:text-blue-700" to="/category">
                <p className="text-lg font-bold ">Bác sĩ</p>
                <p className="mt-2 text-xs font-light">Chọn bác sĩ giỏi</p>
            </NavLink>
            <NavLink className="flex-1 text-stone-900 hover:text-blue-700" to="/category">
                <p className="text-lg font-bold ">Gói khám</p>
                <p className="mt-2 text-xs font-light">Khám sức khỏe tổng quát</p>
            </NavLink>
        </div>
    );
}

export default Navbar;
