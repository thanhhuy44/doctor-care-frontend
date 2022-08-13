import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import styles from './DetailDoctor.module.scss';

const cx = classNames.bind(styles);

const Item = () => {
    return (
        <div className={cx('item')}>
            <h4 className={cx('user-name')}>Trần Duy Thanh</h4>
            <p className={cx('feedback-content')}> Mọi thứ đều rất tốt. Bác sĩ hỏi kỹ càng, chu đáo và nhẹ nhàng</p>
        </div>
    );
};

function DetailDoctor() {
    return (
        <div className={cx('container')}>
            <div className={cx('intro')}>
                <div className={cx('thumb')}>
                    <img
                        className={cx('thumb-img')}
                        src="https://cdn.bookingcare.vn/fr/w200/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg"
                        alt="doctor"
                    />
                </div>
                <div className={cx('info')}>
                    <h3 className={cx('name')}>Bác sĩ Chuyên khoa II Trần Minh Khuyên</h3>
                    <p className={cx('short-desc')}>
                        Nguyên Trưởng khoa lâm sàng, Bệnh tâm thần Thành phố Hồ Chí Minh <br /> Tốt nghiệp Tâm lý trị
                        liệu, trường Tâm lý Thực hành Paris (Psychology practique de Paris) <br /> Bác sĩ nhận khám từ
                        16 tuổi trở lên
                    </p>
                </div>
            </div>
            <div className={cx('booking')}>
                <div className={cx('schedule')}>
                    <h5 className={cx('schedule-title')}>Lịch khám</h5>
                    <select className={cx('date')}>
                        <option>13/08</option>
                        <option>14/08</option>
                        <option>15/08</option>
                        <option>16/08</option>
                    </select>
                    <div className={cx('time')}></div>
                </div>
                <div className={cx('booking-info')}>
                    <div className={cx('address')}>
                        <h4 className={cx('title')}>ĐỊA CHỈ KHÁM</h4>
                        <p className={cx('hospital')}>Phòng khám Bệnh viện Đại học Y Dược 1</p>
                        <p className={cx('hospital-address')}>20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM</p>
                    </div>
                    <div className={cx('price')}>
                        <h4 className={cx('title')}>GIÁ KHÁM: </h4>
                        <p className={cx('price-detail')}> 250.000đ - 500.000đ</p>
                    </div>
                </div>
            </div>
            <div className={cx('desc')}>
                Bác sĩ Chuyên khoa II Trần Minh Khuyên Nguyên Trưởng khoa lâm sàng, Bệnh tâm thần Thành phố Hồ Chí Minh
                Tốt nghiệp Tâm lý trị liệu, trường Tâm lý Thực hành Paris (Psychology practique de Paris) Bác sĩ nhận
                khám từ 16 tuổi trở lên Quá trình đào tạo Tốt nghiệp Bác sĩ Đa khoa, Trường Đại học y dược thành phố Hồ
                Chí Minh Học chuyên khoa cấp I và chuyên khoa cấp II Chuyên ngành Tâm thần, Đại học Y khoa Huế Tốt
                nghiệp Tâm lý trị liệu, trường Tâm lý thực Hành Paris (Psychology practique de Paris) Quá trình công tác
                Nguyên Trưởng phòng Kế hoạch Nghiệp vụ, Trưởng phòng khám Tâm thần Quận 3, thành phố Hồ Chí Minh Nguyên
                Trưởng khoa lâm sàng Bệnh tâm thần thành phố Hồ Chí Minh Giám định viên tư pháp chuyên ngành Tâm thần
                giám định các trường hợp trọng án, các trường hợp có liên quan pháp lý do cảnh sát điều tra, tòa án các
                cấp trưng cầu. Khám và điều trị Các rối loạn giấc ngủ không thực tổn: mất ngủ, ngủ nhiều, ngủ ngày quá
                mức, rối loạn nhịp thức ngủ, hoảng sợ khi ngủ, ác mộng, ngủ rũ,... Các rối loạn lo âu: lo lắng, sợ hãi
                về tương lai, cảm giác cáu gắt, căng thẳng, vận động, bồn chồn, hồi hộp, vã mồ hôi tay chân, cồn cào,...
                Rối loạn trầm cảm: buồn chán, bi quan, mệt mỏi, giảm hoạt động,... Hưng cảm: vui vẻ quá mức, suồng sã,
                tăng hoạt động, đứng ngồi không yên,... Rối loạn hoang tưởng: hoang tưởng bị hại, bị theo dõi, liên hệ,
                bị tội,... Rối loạn ảo giác Các rối loạn liên quan đến stress Rối loạn khí sắc Rối loạn cảm xúc phân
                liệt Rối loạn đa nhân cách Các bệnh lý loạn thần do sử dụng chất (ma túy đá, cần sa, heroin..)...
            </div>
            <div className={cx('comments')}>
                <h3 className={cx('comments-title')}>Phản hồi của bệnh nhân sau khi đi khám</h3>
                <div className={cx('comments-list')}>
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                </div>
            </div>
        </div>
    );
}

export default DetailDoctor;
