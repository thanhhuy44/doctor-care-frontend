import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Hospital.module.scss';
import Button from '~/components/Button/Button';
import Section from '~/components/Section';

const cx = classNames.bind(styles);

function Hospital() {
    return (
        <div className="block">
            <div className="container mx-auto block">
                <div className="h-[230px] relative">
                    <img
                        className="absolute bottom-0 block w-full object-cover rounded-b-[4px]"
                        src="https://cdn.bookingcare.vn/fr/w1000/2020/06/03/114348-bv-viet-duc.jpg"
                        alt="cover"
                    />
                </div>
                <div className="flex items-center">
                    <div className="p-3">
                        <img
                            className="block max-w-[120px] h-[60px]"
                            src="https://cdn.bookingcare.vn/fr/w300/2018/06/18/083122lo-go-viet-duc.jpg"
                            alt="avatar"
                        />
                    </div>
                    <div className="block">
                        <h3 className="mb-3 text-xl">Bệnh viện Hữu nghị Việt Đức</h3>
                        <p className="text-base">
                            <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                            <span className={cx('address-text')}>Số 16-18 Phủ Doãn - Hoàn Kiếm - Hà Nội</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-7">
                {/* <div className={cx('section')}>
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
                </div> */}
                <Section bgColor="gray">
                    <h4 className={cx('section-title')}>GIỚI THIỆU</h4>
                    <p className="">
                        Bệnh viện Việt Đức là một trong 5 bệnh viện tuyến Trung ương, hạng đặc biệt của Việt Nam. Bệnh
                        viện có lịch sử trên 100 năm, bề dày truyền thống danh tiếng, là cái nôi của ngành ngoại khoa
                        Việt Nam gắn liền với những thành tựu Y học quan trọng của đất nước. Việt Đức là địa chỉ uy tín
                        hàng đầu về ngoại khoa, tiến hành khám bệnh, chữa bệnh và thực hiện các kỹ thuật chụp chiếu, xét
                        nghiệm, thăm dò chức năng cơ bản và chuyên sâu hàng ngày cho người dân. Bệnh viện có đội ngũ y
                        bác sĩ hùng hậu, nhiều người kiêm là cán bộ giảng dạy tại Đại học Y khoa Hà Nội hoặc Khoa Y Dược
                        - Đại học Quốc gia Hà Nội. Trong số họ nhiều người là chuyên gia đầu ngành và bác sĩ giàu kinh
                        nghiệm ở các chuyên khoa khác nhau.{' '}
                    </p>
                </Section>
                <Section>
                    <h4 className={cx('section-title')}>GIỚI THIỆU</h4>
                    <p className="">
                        Bệnh viện Việt Đức là một trong 5 bệnh viện tuyến Trung ương, hạng đặc biệt của Việt Nam. Bệnh
                        viện có lịch sử trên 100 năm, bề dày truyền thống danh tiếng, là cái nôi của ngành ngoại khoa
                        Việt Nam gắn liền với những thành tựu Y học quan trọng của đất nước. Việt Đức là địa chỉ uy tín
                        hàng đầu về ngoại khoa, tiến hành khám bệnh, chữa bệnh và thực hiện các kỹ thuật chụp chiếu, xét
                        nghiệm, thăm dò chức năng cơ bản và chuyên sâu hàng ngày cho người dân. Bệnh viện có đội ngũ y
                        bác sĩ hùng hậu, nhiều người kiêm là cán bộ giảng dạy tại Đại học Y khoa Hà Nội hoặc Khoa Y Dược
                        - Đại học Quốc gia Hà Nội. Trong số họ nhiều người là chuyên gia đầu ngành và bác sĩ giàu kinh
                        nghiệm ở các chuyên khoa khác nhau.{' '}
                    </p>
                </Section>
                <Section bgColor="gray">
                    <h4 className={cx('section-title')}>GIỚI THIỆU</h4>
                    <p className="">
                        Bệnh viện Việt Đức là một trong 5 bệnh viện tuyến Trung ương, hạng đặc biệt của Việt Nam. Bệnh
                        viện có lịch sử trên 100 năm, bề dày truyền thống danh tiếng, là cái nôi của ngành ngoại khoa
                        Việt Nam gắn liền với những thành tựu Y học quan trọng của đất nước. Việt Đức là địa chỉ uy tín
                        hàng đầu về ngoại khoa, tiến hành khám bệnh, chữa bệnh và thực hiện các kỹ thuật chụp chiếu, xét
                        nghiệm, thăm dò chức năng cơ bản và chuyên sâu hàng ngày cho người dân. Bệnh viện có đội ngũ y
                        bác sĩ hùng hậu, nhiều người kiêm là cán bộ giảng dạy tại Đại học Y khoa Hà Nội hoặc Khoa Y Dược
                        - Đại học Quốc gia Hà Nội. Trong số họ nhiều người là chuyên gia đầu ngành và bác sĩ giàu kinh
                        nghiệm ở các chuyên khoa khác nhau.{' '}
                    </p>
                </Section>
                <Section>
                    <h4 className={cx('section-title')}>GIỚI THIỆU</h4>
                    <p className="">
                        Bệnh viện Việt Đức là một trong 5 bệnh viện tuyến Trung ương, hạng đặc biệt của Việt Nam. Bệnh
                        viện có lịch sử trên 100 năm, bề dày truyền thống danh tiếng, là cái nôi của ngành ngoại khoa
                        Việt Nam gắn liền với những thành tựu Y học quan trọng của đất nước. Việt Đức là địa chỉ uy tín
                        hàng đầu về ngoại khoa, tiến hành khám bệnh, chữa bệnh và thực hiện các kỹ thuật chụp chiếu, xét
                        nghiệm, thăm dò chức năng cơ bản và chuyên sâu hàng ngày cho người dân. Bệnh viện có đội ngũ y
                        bác sĩ hùng hậu, nhiều người kiêm là cán bộ giảng dạy tại Đại học Y khoa Hà Nội hoặc Khoa Y Dược
                        - Đại học Quốc gia Hà Nội. Trong số họ nhiều người là chuyên gia đầu ngành và bác sĩ giàu kinh
                        nghiệm ở các chuyên khoa khác nhau.{' '}
                    </p>
                </Section>
            </div>
            <div className="container mx-auto py-3 border-t border-gray-500">
                <Button type="primary" size="full" className="p-3">
                    Chọn chuyên khoa
                </Button>
            </div>
        </div>
    );
}

export default Hospital;
