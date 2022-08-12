import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import './gridsystem.scss';

import Header from '../components/Header';
import Footer from '../components/Footer';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
    return (
        <div className="grid wide">
            <div className={cx('header')}>
                <Header />
            </div>
            <div className={cx('page')}>{children}</div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
}

export default MainLayout;
