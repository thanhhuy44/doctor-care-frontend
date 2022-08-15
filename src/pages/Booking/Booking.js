import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCirclePlus, faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Booking.module.scss';
import Button from '~/components/Button/Button';
import Modal from '~/components/Modal';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Booking() {
    const [hideModal, setHideModal] = useState(true);
    const funcs = {
        handleClick: () => {
            setHideModal(!hideModal);
            console.log(hideModal);
        },
        handleExit: () => {
            setHideModal(!hideModal);
            console.log(hideModal);
        },
    };
    return (
        <div className={cx('container')}>
            <div className={cx('intro')}>
                <div className={cx('thumb')}>
                    <img
                        className={cx('thumb-img')}
                        src="https://cdn.bookingcare.vn/fr/w100/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg"
                        alt="alt"
                    />
                </div>
                <div className={cx('info')}>
                    <p className={cx('title')}>ĐẶT LỊCH KHÁM</p>
                    <h4 className={cx('name')}>Bác sĩ Chuyên khoa II Trần Minh Khuyên</h4>
                    <p className={cx('time')}>08:30 - 09:00 - Thứ 2 - 15/08/2022</p>
                </div>
            </div>
            <div className={cx('form')}>
                <div className={cx('type')}>
                    <span>
                        <input type="radio" value="HI" name="type" /> Đặt cho chính mình
                    </span>
                    <span>
                        <input type="radio" value="hi 1" name="type" /> Đặt cho người thân
                    </span>
                </div>
                <div className={cx('feild')}>
                    <label htmlFor="userName" className={cx('label')}>
                        <FontAwesomeIcon icon={faUser} />
                    </label>
                    <input className={cx('input')} id="userName" placeholder="Họ tên bệnh nhân (bắt buộc)" />
                </div>
                <div className={cx('feild')}>
                    <label htmlFor="userName" className={cx('label')}>
                        <FontAwesomeIcon icon={faPhone} />
                    </label>
                    <input className={cx('input')} id="userName" placeholder="Số điện thoại liên hệ (bắt buộc)" />
                </div>
                <div className={cx('feild')}>
                    <label htmlFor="userName" className={cx('label')}>
                        <FontAwesomeIcon icon={faCalendar} />
                    </label>
                    <input className={cx('input')} id="userName" placeholder="Ngày/tháng/năm sinh (bắt buộc)" />
                </div>
                <div className={cx('feild')}>
                    <label htmlFor="userName" className={cx('label')}>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </label>
                    <input className={cx('input')} id="userName" placeholder="Địa chỉ (bắt buộc)" />
                </div>
                <div className={cx('feild')}>
                    <label htmlFor="userName" className={cx('label')}>
                        <FontAwesomeIcon icon={faCirclePlus} />
                    </label>
                    <input className={cx('input')} id="userName" placeholder="Lý do khám" />
                </div>
                <div className={cx('payment')}>
                    <span>
                        <input type="radio" value="payment" name="type" checked /> Thanh toán sau tại cơ sở y tế
                    </span>
                </div>
                <div className={cx('cost')}>
                    <p className={cx('line', 'price')}>
                        <span>Giá khám</span>
                        <span>250.000đ</span>
                    </p>
                    <p className={cx('line', 'extra-fee')}>
                        <span>Phí đặt lịch</span>
                        <span>Miễn phí</span>
                    </p>
                    <p className={cx('line', 'total-cost')}>
                        <span>Tổng cộng</span>
                        <span>250.000đ</span>
                    </p>
                </div>
                <div className={cx('warning')}>
                    <p>Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian làm thủ tục khám</p>
                </div>
                <div className={cx('notice')}>
                    <h3 className={cx('title-notice')}>LƯU Ý</h3>
                    <div className={cx('content-notice')}>
                        <p className={cx('rule')}>
                            1. Thông tin bạn cung cấp sẽ được sử dụng làm hồ sơ khám bệnh. Vì vậy khi điền thông tin,
                            bạn vui lòng lưu ý:
                            <ul>
                                <li>Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ: Trần Văn Phú</li>
                                <li>Điền đầy đủ, đúng và kiểm tra lại thông tin trước khi ấn "Xác nhận đặt khám"</li>
                            </ul>
                        </p>
                        <p className={cx('rule')}>
                            2. Tuân thủ quy định phòng chống dịch (đeo khẩu trang, khử khuẩn, khai báo dịch tễ) khi đến
                            khám.
                        </p>
                    </div>
                </div>
                <div className={cx('submit')}>
                    <Button onClick={funcs.handleClick} type="primary" className={cx('submit-btn')}>
                        Xác nhận đặt khám
                    </Button>
                </div>
                <p className={cx('confirm')}>
                    Bằng việc xác nhận đặt khám, bạn đã hoàn toàn đồng ý với{' '}
                    <a
                        className={cx('confirm-link')}
                        href="https://bookingcare.vn/thong-tin/dieu-khoan-su-dung-p7"
                        target="blank"
                    >
                        Điều khoản sử dụng dịch vụ
                    </a>{' '}
                    của chúng tôi.
                </p>
            </div>
            <Modal btn="OkCancel" onClick={funcs} isHide={hideModal} type="success" message="Are you sure?" />
        </div>
    );
}

export default Booking;
