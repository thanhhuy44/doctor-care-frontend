import { faCheck, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import images from '~/assets';
import logo from '~/assets/images/logo.png';

function Footer() {
    return (
        <div className="bg-slate-300 border-t-[0.5px] border-black">
            <div className="container mx-auto py-8 px-2 grid grid-cols-1 lg:grid-cols-2 ">
                <div className="mb-8 lg:mb-0">
                    <Link to="/" className="block mb-4">
                        <img className="block w-[200px]" src={logo} alt="logo" />
                    </Link>
                    <h3 className="font-semibold text-xl">Công ty Cổ phần Công nghệ BookingCare</h3>
                    <p>
                        <FontAwesomeIcon className="mr-2" icon={faLocationDot} />
                        222 Hoàng Diệu 2, Phường Linh Chiểu, Thành phố Thủ Đức, Thành phố Hồ Chí Minh
                    </p>
                    <p>
                        <FontAwesomeIcon className="mr-2" icon={faCheck} />
                        ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="mb-8 lg:mb-0">
                        <ul>
                            <li className="footer-menu">Liên hệ hợp tác</li>
                            <li className="footer-menu">Gói chuyển đổi số doanh nghiệp</li>
                            <li className="footer-menu">Tuyển dụng</li>
                            <li className="footer-menu">Câu hỏi thường gặp</li>
                            <li className="footer-menu">Điều khoản sử dụng</li>
                            <li className="footer-menu">Chính sách bảo mật</li>
                            <li className="footer-menu">Quy trình hỗ trợ giải quyết khiếu nại</li>
                            <li className="footer-menu">Quy chế hoạt động</li>
                        </ul>
                    </div>
                    <div>
                        <div className="mb-3">
                            <h4 className="text-base font-semibold">Văn phòng tại quận 1</h4>
                            <p>39 Hàm Nghi, Phường Nguyễn Thái Bình, Quận 1, TP. Hồ Chí Minh</p>
                        </div>
                        <div className="mb-3">
                            <h4 className="text-base font-semibold">Văn phòng tại thành phố Thủ Đức</h4>
                            <p>56 Hoàng Diệu 2, phường Linh Chiểu, Thành phố Thủ Đức, Thành phố Hồ Chí Minh</p>
                        </div>
                        <div className="mb-3">
                            <h4 className="text-base font-semibold">Hỗ trợ khách hàng</h4>
                            <p>030235190050@st.buh.edu.vn (7h30 - 18h)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
