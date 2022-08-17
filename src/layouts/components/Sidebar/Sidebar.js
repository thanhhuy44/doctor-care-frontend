import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('container')}>
            <h1>This is Side bar</h1>
        </div>
    );
}

export default Sidebar;
