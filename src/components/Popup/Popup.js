import classNames from 'classnames/bind';
import styles from './Popup.module.scss';

const cx = classNames.bind(styles);

function Popup({ children, display }) {
    return (
        <div style={{ display: display ? 'flex' : 'none' }} className={cx('container')}>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default Popup;
