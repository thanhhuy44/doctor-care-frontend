import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import background from '~/assets/images/bookingcare-cover-4.jpg';
import images from '~/assets';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('container')}>
            <div className={cx('main-content')}>
                <div className={cx('background')}>
                    <img className={cx('background-img')} src={background} alt="background" />
                </div>
                <div className={cx('content')}>
                    <h1 className={cx('title')}>
                        NỀN TẢNG Y TẾ
                        <br />
                        CHĂM SÓC SỨC KHỎE TOÀN DIỆN
                    </h1>
                    <div className={cx('search')}>
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                        <input className={cx('search-input')} placeholder="Search..." />
                    </div>
                    <div className={cx('download')}>
                        <a
                            className={cx('download-link')}
                            href="https://play.google.com/store/apps/details?id=vn.bookingcare.bookingcare"
                            target="blank"
                        >
                            <img className={cx('download-img')} src={images.googleplay} alt="google-play" />
                        </a>
                        <a
                            className={cx('download-link')}
                            href="https://apps.apple.com/vn/app/bookingcare/id1347700144"
                            target="blank"
                        >
                            <img className={cx('download-img')} target="blank" src={images.appstore} alt="app-store" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
