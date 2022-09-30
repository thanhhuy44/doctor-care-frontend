import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Hospital.module.scss';
import Button from '~/components/Button/Button';
import Section from '~/components/Section';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Hospital() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        axios.get(`http://localhost:3030/api/hospital/${id}`).then((res) => {
            console.log(res.data.data);
            setData(res.data.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <h1>Is Loading</h1>;
    } else {
        return (
            <div className="block">
                <div className="container mx-auto block">
                    <div className="flex items-center">
                        <div className="py-3 mr-3">
                            <img className="block max-w-[120px] h-[60px]" src={data.image} alt={data.alias} />
                        </div>
                        <div className="block">
                            <h3 className="mb-3 text-xl">{data.name}</h3>
                            <p className="text-base">
                                <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                                <span className={cx('address-text')}>{data.address}</span>
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
                        <div className="" dangerouslySetInnerHTML={{ __html: data.description }}></div>
                    </Section>
                    <Section>
                        <h4 className={cx('section-title')}>Lợi thế chuyên môn</h4>
                        <div className="" dangerouslySetInnerHTML={{ __html: data.strengths }}></div>
                    </Section>
                    <Section bgColor="gray">
                        <h4 className={cx('section-title')}>Trang thiết bị</h4>
                        <div className="" dangerouslySetInnerHTML={{ __html: data.equipments }}></div>
                    </Section>
                    <Section>
                        <h4 className={cx('section-title')}>quy trình khám bệnh</h4>
                        <div className="" dangerouslySetInnerHTML={{ __html: data.procedure }}></div>
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
}

export default Hospital;
