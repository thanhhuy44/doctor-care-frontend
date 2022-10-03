import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';

import Header from '../components/Header';
import Footer from '../components/Footer';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
    return (
        <div className="overflow-hidden">
            <div className="bg-white">
                <Header />
            </div>
            <div className="mt-[80px]">{children}</div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
}

export default MainLayout;
