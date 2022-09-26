import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faEnvelope, faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import { useForm, Controller } from 'react-hook-form';
import ErrorMessage from '~/components/Form/components/ErrorMessage';
import { emailRegex, phoneNumberRegex } from '~/regex';
import axios from 'axios';

function Booking() {
    const [isMySelf, setIsMySelf] = useState(true);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const handleClick = (data) => {
        console.log(data);
        axios
            .post('http://localhost:3030/api/booking/create', {
                name: data.name,
                numberPhone: data.numberPhone,
                email: data.email,
                address: data.address,
                doctor: '6315c744071e0cfcc3396e52',
                time: '2022-09-15T00:00:00.000Z',
                shift: 1,
                reason: data.reason,
            })
            .then((res) => {
                alert(res.data.message);
            });
    };

    return (
        <div className="container p-5 max-w-[700px] mx-auto">
            <h2 className="mb-4 font-semibold text-2xl text-center">ĐẶT LỊCH KHÁM</h2>
            <div className="flex items-center flex-col lg:flex-row">
                <div className="block max-w-[200px] aspect-square rounded-full overflow-hidden shadow-sm">
                    <img
                        className="block"
                        src="https://cdn.bookingcare.vn/fr/w100/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg"
                        alt="alt"
                    />
                </div>
                <div className="py-2 px-4  text-center lg:text-left">
                    <h4 className="text-xl mb-2">Bác sĩ Chuyên khoa II Trần Minh Khuyên</h4>
                    <p className="text-sm font-normal lowercase">08:30 - 09:00 - Thứ 2 - 15/08/2022</p>
                </div>
            </div>
            <div className="mt-10">
                <Controller
                    control={control}
                    name="self"
                    rules={{
                        required: true,
                    }}
                    defaultValue={isMySelf}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <div className="flex flex-col md:flex-row">
                            <span className="mr-4">
                                <input
                                    defaultChecked
                                    type="radio"
                                    onChange={(e) => {
                                        console.log(isMySelf);
                                        setIsMySelf(true);
                                        onChange(e);
                                    }}
                                    value={true}
                                    name="isMySelf"
                                />{' '}
                                Đặt cho chính mình
                            </span>
                            <span className="mr-4">
                                <input
                                    type="radio"
                                    onChange={(e) => {
                                        console.log(isMySelf);
                                        setIsMySelf(false);
                                        onChange(e);
                                    }}
                                    value={false}
                                    name="isMySelf"
                                />{' '}
                                Đặt cho người thân
                            </span>
                        </div>
                    )}
                />
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
                                    placeholder={
                                        isMySelf ? 'Họ và tên bệnh nhân (bắt buộc)' : 'Họ và tên người thân (bắt buộc)'
                                    }
                                />
                            </div>
                            {errors.name?.type === 'required' && <ErrorMessage message="Trường này là bắt buộc" />}
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
                                <ErrorMessage message="Trường này là bắt buộc" />
                            )}
                            {errors.numberPhone && <ErrorMessage message={errors.numberPhone.message} />}
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
                            {errors.email?.type === 'required' && <ErrorMessage message="Trường này là bắt buộc" />}
                            {errors.email && <ErrorMessage message={errors.email.message} />}
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
                            {errors.address?.type === 'required' && <ErrorMessage message="Trường này là bắt buộc" />}
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
                                    placeholder="Lý do khám"
                                />
                            </div>
                        </div>
                    )}
                />
                <div className="rounded overflow-hidden p-4 mt-3 bg-[#f6f6f6] text-base leading-4 text-gray-900">
                    <p className="my-1 flex items-center justify-between font-semibold">
                        <span>Giá khám</span>
                        <span>250.000đ</span>
                    </p>
                    <p className="mt-1 mb-3 flex items-center justify-between text-sm">
                        <span>Phí đặt lịch</span>
                        <span>Miễn phí</span>
                    </p>
                    <p className="my-1 flex items-center justify-between pt-3 border-t border-orange-600 text-orange-600 font-semibold">
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
