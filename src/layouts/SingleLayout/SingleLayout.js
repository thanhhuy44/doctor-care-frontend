import classNames from 'classnames/bind';
import styles from './SingleLayout.module.scss';
import './gridsystem.scss';

const cx = classNames.bind(styles);

function SingleLayout({ children }) {
    return <div className={cx('container') + ' grid wide'}>{children}</div>;
}

export default SingleLayout;
