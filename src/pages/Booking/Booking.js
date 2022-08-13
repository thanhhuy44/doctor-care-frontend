import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCirclePlus, faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Booking.module.scss';

const cx = classNames.bind(styles);

function Booking() {
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
                    <input className={cx('input')} id="userName" placeholder="Họ tên bệnh nhân (bắt buộc)" />
                </div>
                <div className={cx('feild')}>
                    <label htmlFor="userName" className={cx('label')}>
                        <FontAwesomeIcon icon={faCalendar} />
                    </label>
                    <input className={cx('input')} id="userName" placeholder="Họ tên bệnh nhân (bắt buộc)" />
                </div>
                <div className={cx('feild')}>
                    <label htmlFor="userName" className={cx('label')}>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </label>
                    <input className={cx('input')} id="userName" placeholder="Họ tên bệnh nhân (bắt buộc)" />
                </div>
                <div className={cx('feild')}>
                    <label htmlFor="userName" className={cx('label')}>
                        <FontAwesomeIcon icon={faCirclePlus} />
                    </label>
                    <input className={cx('input')} id="userName" placeholder="Họ tên bệnh nhân (bắt buộc)" />
                </div>
            </div>
        </div>
    );
}

export default Booking;
