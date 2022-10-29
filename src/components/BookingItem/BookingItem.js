import { faCalendar, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button/Button';

const shifts = [
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

function BookingItem({ data }) {
    const [dateValue, setDateValue] = useState(
        `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() + 1}`,
    );
    console.log(data);

    return (
        <div className="flex flex-col md:flex-row md:items-start shadow-lg rounded-md mb-4">
            <div className="flex-1 flex items-center flex-col sm:flex-row sm:items-start p-4">
                <div className=" flex flex-col items-center min-w-[120px] ">
                    <img className="block aspect-square rounded-full mb-4" src={data.image} alt={data.link} />
                    <Link
                        to={data.link}
                        className="p-2 text-xl font-medium text-cyan-900 hidden sm:block hover:border-b border-cyan-900"
                    >
                        Xem thêm
                    </Link>
                </div>
                <div className="sm:pl-5 text-gray-900 text-center sm:text-left">
                    <h3 className="mb-4 sm:mb-0 text-xl font-medium text-cyan-700">{data.name}</h3>
                    <div
                        className="mt-1 text-justify sm:text-left"
                        dangerouslySetInnerHTML={{ __html: data.shortDescription }}
                    ></div>
                    <p className="mt-2 font-normal text-left">
                        <FontAwesomeIcon icon={faLocationDot} /> {data.hospital.location.province}
                    </p>
                </div>
            </div>
            <div className="booking flex-1 px-4 my-4 md:border-l-[0.5px] border-gray-700 text-gray-900 text-base">
                <DatePicker
                    inputReadOnly={true}
                    defaultValue={moment(dateValue)}
                    format="DD-MM-yyyy"
                    onChange={(e) => {
                        setDateValue(moment(e).format('yyyy-MM-DD'));
                    }}
                />
                <div className="my-5">
                    <p className="font-semibold uppercase text-xl">
                        <FontAwesomeIcon className="mr-2" icon={faCalendar} />
                        Lịch khám
                    </p>
                    {new Date(dateValue).getTime() > new Date().getTime() ? (
                        <div className="my-2 overflow-x-auto flex items-center flex-wrap justify-start ">
                            {shifts.map((shift) => (
                                <Link
                                    state={{
                                        shift,
                                        dateValue,
                                        data,
                                    }}
                                    to="/booking"
                                    key={shift.sequence}
                                    className="mr-4 mb-4 min-w-[150px] text-center bg-gray-200 p-1 hover:bg-yellow-50 duration-500"
                                >
                                    <p className="font-medium text-lg">Ca {shift.sequence}</p>
                                    <span className="font-normal text-sm">
                                        Từ {shift.timeStart}:00 đến {shift.timeEnd}:00
                                    </span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <h1 className="font-semibold text-base mt-4 text-red-500">Không có lịch khám</h1>
                    )}
                </div>
                <div className="border-t border-gray-500 py-2">
                    <h4 className="text-lg font-semibold uppercase">Địa chỉ khám</h4>
                    <p>{data.hospital.name}</p>
                    <p>{data.hospital.address}</p>
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
