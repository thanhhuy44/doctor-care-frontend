import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCirclePlus, faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import { useState } from 'react';

function Booking() {
    return (
        <div className="py-5 max-w-[700px] mx-auto">
            <div className="flex items-start">
                <div className="block max-w-[200px] aspect-square rounded-full overflow-hidden">
                    <img
                        className=""
                        src="https://cdn.bookingcare.vn/fr/w100/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg"
                        alt="alt"
                    />
                </div>
                <div className="py-2 px-4">
                    <p className="text-base leading-4">ĐẶT LỊCH KHÁM</p>
                    <h4 className="text-xl mb-2">Bác sĩ Chuyên khoa II Trần Minh Khuyên</h4>
                    <p className="text-sm font-normal lowercase">08:30 - 09:00 - Thứ 2 - 15/08/2022</p>
                </div>
            </div>
            <div className="mt-10">
                <div>
                    <span className="mr-4">
                        <input type="radio" value="HI" name="type" /> Đặt cho chính mình
                    </span>
                    <span className="mr-4">
                        <input type="radio" value="hi 1" name="type" /> Đặt cho người thân
                    </span>
                </div>
                <div className="flex items-center mt-4 w-full text-base p-[10px] rounded border border-gray-500">
                    <label htmlFor="userName" className="pr-3 text-gray-700">
                        <FontAwesomeIcon icon={faUser} />
                    </label>
                    <input className="flex-1" id="userName" placeholder="Họ tên bệnh nhân (bắt buộc)" />
                </div>
                <div className="flex items-center mt-4 w-full text-base p-[10px] rounded border border-gray-500">
                    <label htmlFor="userName" className="pr-3 text-gray-700">
                        <FontAwesomeIcon icon={faPhone} />
                    </label>
                    <input className="flex-1" id="userName" placeholder="Số điện thoại liên hệ (bắt buộc)" />
                </div>
                <div className="flex items-center mt-4 w-full text-base p-[10px] rounded border border-gray-500">
                    <label htmlFor="userName" className="pr-3 text-gray-700">
                        <FontAwesomeIcon icon={faCalendar} />
                    </label>
                    <input className="flex-1" id="userName" placeholder="Ngày/tháng/năm sinh (bắt buộc)" />
                </div>
                <div className="flex items-center mt-4 w-full text-base p-[10px] rounded border border-gray-500">
                    <label htmlFor="userName" className="pr-3 text-gray-700">
                        <FontAwesomeIcon icon={faLocationDot} />
                    </label>
                    <input className="flex-1" id="userName" placeholder="Địa chỉ (bắt buộc)" />
                </div>
                <div className="flex items-center mt-4 w-full text-base p-[10px] rounded border border-gray-500">
                    <label htmlFor="userName" className="pr-3 text-gray-700">
                        <FontAwesomeIcon icon={faCirclePlus} />
                    </label>
                    <input className="flex-1" id="userName" placeholder="Lý do khám" />
                </div>
                <div className="rounded overflow-hidden p-4 mt-3 bg-[#f6f6f6] text-base leading-4 text-gray-900">
                    <p className="my-1 flex items-center justify-between">
                        <span>Giá khám</span>
                        <span>250.000đ</span>
                    </p>
                    <p className="my-1 flex items-center justify-between">
                        <span>Phí đặt lịch</span>
                        <span>Miễn phí</span>
                    </p>
                    <p className="my-1 flex items-center justify-between pt-3 border-t border-red-600 text-red-600 font-semibold">
                        <span>Tổng cộng</span>
                        <span>250.000đ</span>
                    </p>
                </div>
                <div className="p-3 text-sm text-center text-gray-900">
                    <p>Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian làm thủ tục khám</p>
                </div>
                <div className="p-4 bg-[#d4effc] rounded">
                    <h3 className="text-xl uppercase font-semibold">LƯU Ý</h3>
                    <div>
                        <p className="mt-3 text-sm">
                            1. Thông tin bạn cung cấp sẽ được sử dụng làm hồ sơ khám bệnh. Vì vậy khi điền thông tin,
                            bạn vui lòng lưu ý:
                            <ul>
                                <li>Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ: Trần Văn Phú</li>
                                <li>Điền đầy đủ, đúng và kiểm tra lại thông tin trước khi ấn "Xác nhận đặt khám"</li>
                            </ul>
                        </p>
                        <p className="mt-3 text-sm">
                            2. Tuân thủ quy định phòng chống dịch (đeo khẩu trang, khử khuẩn, khai báo dịch tễ) khi đến
                            khám.
                        </p>
                    </div>
                </div>
                <div className="my-3">
                    <Button type="primary" className="table mx-auto">
                        Xác nhận đặt khám
                    </Button>
                </div>
                <p className="text-sm">
                    Bằng việc xác nhận đặt khám, bạn đã hoàn toàn đồng ý với{' '}
                    <a
                        className="inline-block font-medium text-blue-600"
                        href="https://bookingcare.vn/thong-tin/dieu-khoan-su-dung-p7"
                        target="blank"
                    >
                        Điều khoản sử dụng dịch vụ
                    </a>{' '}
                    của chúng tôi.
                </p>
            </div>
        </div>
    );
}

export default Booking;
