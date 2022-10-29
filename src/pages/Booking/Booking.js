import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faCirclePlus,
    faEnvelope,
    faLocationDot,
    faPhone,
    faUser,
    faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import { useForm, Controller } from 'react-hook-form';
import { emailRegex, phoneNumberRegex } from '~/regex';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { notification } from 'antd';

function Booking() {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const data = location.state;

    const handleClick = (values) => {
        axios
            .post('http://localhost:3030/api/booking/create', {
                name: values.name,
                numberPhone: values.numberPhone,
                email: values.email,
                address: values.address,
                doctor: data.data._id,
                date: data.dateValue,
                time: data.shift.sequence,
                reason: values.reason,
            })
            .then((res) => {
                if (res.data.errCode === 0) {
                    notification.open({
                        icon: <FontAwesomeIcon icon={faCheckCircle} className="text-green-700" />,
                        message: 'Thành công',
                        description: res.data.message,
                    });
                    navigate('/');
                } else {
                    notification.open({
                        icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
                        message: 'Lỗi',
                        description: res.data.message,
                    });
                }
            });
    };

    return (
        <div className="container p-5 max-w-[700px] mx-auto">
            <h2 className="mb-4 font-semibold text-2xl text-center">ĐẶT LỊCH KHÁM</h2>
            <div className="flex items-center flex-col lg:flex-row">
                <div className="">
                    <img
                        className="block max-w-[160px] aspect-square rounded-full overflow-hidden shadow-sm object-cover"
                        src={data.data.image}
                        alt={data.data.alias}
                    />
                </div>
                <div className="py-2 px-4  text-center lg:text-left">
                    <h4 className="text-xl font-semibold mb-2">{data.data.name}</h4>
                    <p className="text-sm font-normal">
                        Thời gian: {data.shift.timeStart}:00 - {data.shift.timeEnd}:00
                    </p>
                    <p className="text-sm font-normal">{`Ngày ${moment(data.dateValue).date()} tháng ${
                        moment(data.dateValue).month() + 1
                    } năm ${moment(data.dateValue).year()}`}</p>
                </div>
            </div>
            <div className="mt-10">
                <Controller
                    control={control}
                    name="name"
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <div>
                            <div
                                className={`flex items-center mt-4 w-full text-base p-[10px] rounded border border-gray-500 overflow-hidden ${
                                    errors.name && 'border border-red-500'
                                }`}
                            >
                                <label htmlFor="name" className="pr-3 text-gray-700">
                                    <FontAwesomeIcon icon={faUser} />
                                </label>
                                <input
                                    id="name"
                                    onChange={onChange}
                                    className="flex-1"
                                    placeholder="Họ và tên bệnh nhân (bắt buộc)"
                                />
                            </div>
                            {errors.name?.type === 'required' && (
                                <p className="error-message">Trường này là bắt buộc</p>
                            )}
                        </div>
                    )}
                />

                <Controller
                    control={control}
                    name="numberPhone"
                    rules={{
                        required: true,
                        pattern: {
                            value: phoneNumberRegex,
                            message: 'Vui lòng nhâp đúng số điện thoại!',
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <div>
                            <div
                                className={`flex items-center mt-4 w-full text-base p-[10px] rounded border border-gray-500 overflow-hidden ${
                                    errors.numberPhone && 'border border-red-500'
                                }`}
                            >
                                <label htmlFor="numberPhone" className="pr-3 text-gray-700">
                                    <FontAwesomeIcon icon={faPhone} />
                                </label>
                                <input
                                    onChange={onChange}
                                    className="flex-1"
                                    id="numberPhone"
                                    placeholder="Số điện thoại liên hệ (bắt buộc)"
                                />
                            </div>
                            {errors.numberPhone?.type === 'required' && (
                                <p className="error-message">Trường này là bắt buộc</p>
                            )}
                            {errors.numberPhone && <p className="error-message">{errors.numberPhone.message}</p>}
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: true,
                        pattern: {
                            value: emailRegex,
                            message: 'Vui lòng nhâp đúng email!',
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <div>
                            <div
                                className={`flex items-center mt-4 w-full text-base p-[10px] rounded border border-gray-500 overflow-hidden ${
                                    errors.numberPhone && 'border border-red-500'
                                }`}
                            >
                                <label htmlFor="email" className="pr-3 text-gray-700">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </label>
                                <input
                                    onChange={onChange}
                                    className="flex-1"
                                    id="email"
                                    placeholder="Email (bắt buộc)"
                                />
                            </div>
                            {errors.email?.type === 'required' && (
                                <p className="error-message">Trường này là bắt buộc</p>
                            )}
                            {errors.email && <p className="error-message">{errors.email.message}</p>}
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name="address"
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <div>
                            <div
                                className={`flex items-center mt-4 w-full text-base p-[10px] rounded border border-gray-500 overflow-hidden ${
                                    errors.address && 'border border-red-500'
                                }`}
                            >
                                <label htmlFor="address" className="pr-3 text-gray-700">
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </label>
                                <input
                                    onChange={onChange}
                                    className="flex-1"
                                    id="address"
                                    placeholder="Địa chỉ (bắt buộc)"
                                />
                            </div>
                            {errors.address?.type === 'required' && (
                                <p className="error-message">Trường này là bắt buộc</p>
                            )}
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name="reason"
                    defaultValue="none"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <div>
                            <div className="flex items-start mt-4 w-full text-base p-[10px] rounded border border-gray-500">
                                <label htmlFor="reason" className="pr-3 text-gray-700">
                                    <FontAwesomeIcon icon={faCirclePlus} />
                                </label>
                                <textarea
                                    className="flex-1 min-h-[150px] focus:outline-none"
                                    id="reason"
                                    placeholder="Lý do khám (Vui lòng điền thông tin thật chi tiết để các y bác sĩ hỗ trợ bạn tốt nhất)"
                                />
                            </div>
                        </div>
                    )}
                />
                <div className="rounded overflow-hidden p-4 mt-3 bg-[#f6f6f6] text-base leading-4 text-gray-900">
                    <p className="my-1 flex items-center justify-between font-semibold">
                        <span>Giá khám</span>
                        <span>{data.data.price} VNĐ</span>
                    </p>
                    <p className="mt-1 mb-3 flex items-center justify-between text-sm">
                        <span>Phí đặt lịch</span>
                        <span>Miễn phí</span>
                    </p>
                    <p className="my-1 flex items-center justify-between pt-3 border-t border-orange-600 text-orange-600 font-semibold">
                        <span>Tổng cộng</span>
                        <span>{data.data.price} VNĐ</span>
                    </p>
                </div>
                <div className="p-3 text-sm text-center text-gray-900">
                    <p>Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian làm thủ tục khám</p>
                </div>
                <div className="p-4 bg-[#d4effc] rounded">
                    <h3 className="text-xl uppercase font-semibold">LƯU Ý</h3>
                    <div>
                        <div className="mt-3 text-sm">
                            1. Thông tin bạn cung cấp sẽ được sử dụng làm hồ sơ khám bệnh. Vì vậy khi điền thông tin,
                            bạn vui lòng lưu ý:
                            <ul>
                                <li>Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ: Trần Văn Phú</li>
                                <li>Điền đầy đủ, đúng và kiểm tra lại thông tin trước khi ấn "Xác nhận đặt khám"</li>
                            </ul>
                        </div>
                        <p className="mt-3 text-sm">
                            2. Tuân thủ quy định phòng chống dịch (đeo khẩu trang, khử khuẩn, khai báo dịch tễ) khi đến
                            khám.
                        </p>
                    </div>
                </div>
                <div className="my-3">
                    <Button onClick={handleSubmit(handleClick)} type="primary" className="table mx-auto">
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
