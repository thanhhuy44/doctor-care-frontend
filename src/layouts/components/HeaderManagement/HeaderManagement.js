import classNames from 'classnames/bind';
import styles from './HeaderManagement.module.scss';
const cx = classNames.bind(styles);

function HeaderManagement() {
    return (
        <div className={cx('container')}>
            <h1>This is header of management page!</h1>
        </div>
    );
}

export default HeaderManagement;
