import classNames from 'classnames/bind';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import styles from './ManagementLayout.module.scss';
import '../components/gridsystem.scss';
import HeaderManagement from '../components/HeaderManagement';

const cx = classNames.bind(styles);

function ManagementLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container') + ' grid wide'}>
                <div className={cx('header')}>
                    <HeaderManagement />
                </div>
                <div className={cx('content')}>
                    <div className={cx('sidebar')}>
                        <Sidebar />
                    </div>
                    <div className={cx('page')}>{children}</div>
                </div>
                <div className={cx('footer')}>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ManagementLayout;
