import { faCalendar, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import Button from '../Button/Button';

const shirfts = [
    { sequence: 1, timeStart: 8, timeEnd: 9 },
    {
        sequence: 2,
        timeStart: 9,
        timeEnd: 10,
    },
    {
        sequence: 3,
        timeStart: 10,
        timeEnd: 11,
    },
    {
        sequence: 4,
        timeStart: 13,
        timeEnd: 14,
    },
    {
        sequence: 5,
        timeStart: 14,
        timeEnd: 15,
    },
    {
        sequence: 6,
        timeStart: 15,
        timeEnd: 16,
    },
];

function BookingItem() {
    const [dateValue, setDateValue] = useState(new Date());

    return (
        <div className="flex flex-col md:flex-row md:items-start shadow-lg rounded-md mb-4">
            <div className="flex-1 flex items-center flex-col sm:flex-row sm:items-start p-4">
                <div className=" flex flex-col items-center min-w-[120px] ">
                    <img
                        className="block aspect-square rounded-full mb-4"
                        src="https://cdn.bookingcare.vn/fr/w200/2018/04/09/151800292142135730131997187173031663525568184320n.jpg"
                        alt="avatar"
                    />
                    <Button className="text-cyan-900 hidden sm:block">Xem thêm</Button>
                </div>
                <div className="sm:pl-5 text-gray-900 text-center sm:text-left">
                    <h3 className="mb-4 sm:mb-0 text-xl font-medium text-cyan-700">
                        Giáo sư, Tiến sĩ, Bác sĩ Trần Ngọc Ân
                    </h3>
                    <div className="mt-1 text-justify sm:text-left">
                        Nguyên Trưởng khoa Cơ xương khớp, Bệnh viện Bạch Mai Chủ tịch Hội Thấp khớp học Việt Nam Giáo sư
                        đầu ngành với gần 50 năm kinh nghiệm điều trị các bệnh lý liên quan đến Cơ xương khớp Bác sĩ
                        khám cho người bệnh từ 14 tuổi trở lên
                    </div>
                    <p className="mt-2 font-normal text-left">
                        <FontAwesomeIcon icon={faLocationDot} /> Gia Lai
                    </p>
                </div>
            </div>
            <div className="booking flex-1 px-4 md:px-10 my-4 md:border-l-[0.5px] border-gray-700 text-gray-900 text-base">
                <DatePicker
                    inputReadOnly={true}
                    defaultValue={moment(new Date())}
                    format="DD-MM-yyyy"
                    onChange={(e) => {
                        setDateValue(moment(e).format('yyyy-MM-DD'));
                        console.log(new Date().getFullYear());
                    }}
                />
                <div className="my-5">
                    <p className="font-semibold uppercase text-xl">
                        <FontAwesomeIcon className="mr-2" icon={faCalendar} />
                        Lịch khám
                    </p>
                    {new Date(dateValue).getDate() >= new Date().getDate() &&
                        new Date(dateValue).getMonth() >= new Date().getMonth() &&
                        new Date(dateValue).getFullYear() >= new Date().getFullYear() && (
                            <div className="my-2 overflow-x-auto flex items-center flex-wrap justify-start ">
                                {shirfts.map((shirft) => (
                                    <Button
                                        key={shirft.sequence}
                                        className=" min-w-[160px] text-center bg-gray-200 p-2 rounded-[0px] hover:text-cyan-700"
                                    >
                                        <p>Ca {shirft.sequence}</p>
                                        <span>
                                            Từ {shirft.timeStart}:00 đến {shirft.timeEnd}:00
                                        </span>
                                    </Button>
                                ))}
                            </div>
                        )}
                </div>
                <div className="border-t border-gray-500 py-2">
                    <h4 className="text-lg font-semibold uppercase">Địa chỉ khám</h4>
                    <p>Bệnh viện Đa khoa Hồng Phát</p>
                    <p>Số 219 Lê Duẩn - Hai Bà Trưng - Hà Nội</p>
                </div>
                <div className="border-t border-gray-500 py-2 flex items-center">
                    <h4 className="font-semibold mr-2 uppercase">Giá khám</h4>
                    <p>500000 đ</p>
                </div>
            </div>
        </div>
    );
}

export default BookingItem;
