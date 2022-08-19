import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Hospital.module.scss';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function Hospital() {
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div className={cx('cover')}>
                    <img
                        className={cx('cover-img')}
                        src="https://cdn.bookingcare.vn/fr/w1000/2020/06/03/114348-bv-viet-duc.jpg"
                        alt="cover"
                    />
                </div>
                <div className={cx('info')}>
                    <div className={cx('avatar')}>
                        <img
                            className={cx('avatar-img')}
                            src="https://cdn.bookingcare.vn/fr/w300/2018/06/18/083122lo-go-viet-duc.jpg"
                            alt="avatar"
                        />
                    </div>
                    <div className={cx('bio')}>
                        <h3 className={cx('name')}>Bệnh viện Hữu nghị Việt Đức</h3>
                        <p className={cx('address')}>
                            <FontAwesomeIcon icon={faLocationDot} className={cx('address-icon')} />
                            <span className={cx('address-text')}>Số 16-18 Phủ Doãn - Hoàn Kiếm - Hà Nội</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('section')}>
                    <h4 className={cx('section-title')}>GIỚI THIỆU</h4>
                    <p className={cx('section-content')}>
                        Bệnh viện Việt Đức là một trong 5 bệnh viện tuyến Trung ương, hạng đặc biệt của Việt Nam. Bệnh
                        viện có lịch sử trên 100 năm, bề dày truyền thống danh tiếng, là cái nôi của ngành ngoại khoa
                        Việt Nam gắn liền với những thành tựu Y học quan trọng của đất nước. Việt Đức là địa chỉ uy tín
                        hàng đầu về ngoại khoa, tiến hành khám bệnh, chữa bệnh và thực hiện các kỹ thuật chụp chiếu, xét
                        nghiệm, thăm dò chức năng cơ bản và chuyên sâu hàng ngày cho người dân. Bệnh viện có đội ngũ y
                        bác sĩ hùng hậu, nhiều người kiêm là cán bộ giảng dạy tại Đại học Y khoa Hà Nội hoặc Khoa Y Dược
                        - Đại học Quốc gia Hà Nội. Trong số họ nhiều người là chuyên gia đầu ngành và bác sĩ giàu kinh
                        nghiệm ở các chuyên khoa khác nhau.{' '}
                    </p>
                </div>
                <div className={cx('section')}>
                    <h4 className={cx('section-title')}>GIỚI THIỆU</h4>
                    <p className={cx('section-content')}>
                        Bệnh viện Việt Đức là một trong 5 bệnh viện tuyến Trung ương, hạng đặc biệt của Việt Nam. Bệnh
                        viện có lịch sử trên 100 năm, bề dày truyền thống danh tiếng, là cái nôi của ngành ngoại khoa
                        Việt Nam gắn liền với những thành tựu Y học quan trọng của đất nước. Việt Đức là địa chỉ uy tín
                        hàng đầu về ngoại khoa, tiến hành khám bệnh, chữa bệnh và thực hiện các kỹ thuật chụp chiếu, xét
                        nghiệm, thăm dò chức năng cơ bản và chuyên sâu hàng ngày cho người dân. Bệnh viện có đội ngũ y
                        bác sĩ hùng hậu, nhiều người kiêm là cán bộ giảng dạy tại Đại học Y khoa Hà Nội hoặc Khoa Y Dược
                        - Đại học Quốc gia Hà Nội. Trong số họ nhiều người là chuyên gia đầu ngành và bác sĩ giàu kinh
                        nghiệm ở các chuyên khoa khác nhau.{' '}
                    </p>
                </div>
                <div className={cx('section')}>
                    <h4 className={cx('section-title')}>GIỚI THIỆU</h4>
                    <p className={cx('section-content')}>
                        Bệnh viện Việt Đức là một trong 5 bệnh viện tuyến Trung ương, hạng đặc biệt của Việt Nam. Bệnh
                        viện có lịch sử trên 100 năm, bề dày truyền thống danh tiếng, là cái nôi của ngành ngoại khoa
                        Việt Nam gắn liền với những thành tựu Y học quan trọng của đất nước. Việt Đức là địa chỉ uy tín
                        hàng đầu về ngoại khoa, tiến hành khám bệnh, chữa bệnh và thực hiện các kỹ thuật chụp chiếu, xét
                        nghiệm, thăm dò chức năng cơ bản và chuyên sâu hàng ngày cho người dân. Bệnh viện có đội ngũ y
                        bác sĩ hùng hậu, nhiều người kiêm là cán bộ giảng dạy tại Đại học Y khoa Hà Nội hoặc Khoa Y Dược
                        - Đại học Quốc gia Hà Nội. Trong số họ nhiều người là chuyên gia đầu ngành và bác sĩ giàu kinh
                        nghiệm ở các chuyên khoa khác nhau.{' '}
                    </p>
                </div>
                <div className={cx('section')}>
                    <h4 className={cx('section-title')}>GIỚI THIỆU</h4>
                    <p className={cx('section-content')}>
                        Bệnh viện Việt Đức là một trong 5 bệnh viện tuyến Trung ương, hạng đặc biệt của Việt Nam. Bệnh
                        viện có lịch sử trên 100 năm, bề dày truyền thống danh tiếng, là cái nôi của ngành ngoại khoa
                        Việt Nam gắn liền với những thành tựu Y học quan trọng của đất nước. Việt Đức là địa chỉ uy tín
                        hàng đầu về ngoại khoa, tiến hành khám bệnh, chữa bệnh và thực hiện các kỹ thuật chụp chiếu, xét
                        nghiệm, thăm dò chức năng cơ bản và chuyên sâu hàng ngày cho người dân. Bệnh viện có đội ngũ y
                        bác sĩ hùng hậu, nhiều người kiêm là cán bộ giảng dạy tại Đại học Y khoa Hà Nội hoặc Khoa Y Dược
                        - Đại học Quốc gia Hà Nội. Trong số họ nhiều người là chuyên gia đầu ngành và bác sĩ giàu kinh
                        nghiệm ở các chuyên khoa khác nhau.{' '}
                    </p>
                </div>
            </div>
            <div className={cx('footer')}>
                <Button type="primary" size="full" className={cx('btn') + ' grid wide'}>
                    Chọn chuyên khoa
                </Button>
            </div>
        </div>
    );
}

export default Hospital;
