import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import ObjectItem from '~/components/ObjectItem';
import { useEffect, useState } from 'react';
import { DatePicker, Pagination } from 'antd';
import moment from 'moment';
import Loading from '~/pages/Loading';
import { useSelector } from 'react-redux';
import request from '~/utils';

function ManagementBooking() {
    const roleLogin = useSelector((state) => state.doctorCare.roleLogin);
    const adminInfo = useSelector((state) => state.doctorCare.adminInfo);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [date, setDate] = useState(moment());
    const [pageSize, setPageSize] = useState(1);

    function compare(a, b) {
        if (a.time < b.time) {
            return -1;
        }
        if (a.time > b.time) {
            return 1;
        }
        return 0;
    }

    useEffect(() => {
        if (roleLogin === 'admin') {
            request.get('/bookings').then((res) => {
                setData(
                    res.data.filter((booking) => {
                        return (
                            moment(booking.date).date() === moment(date).date() &&
                            moment(booking.date).month() === moment(date).month() &&
                            moment(booking.date).year() === moment(date).year()
                        );
                    }),
                );
                setPageData(
                    res.data
                        .filter((booking) => {
                            return (
                                moment(booking.date).date() === moment(date).date() &&
                                moment(booking.date).month() === moment(date).month() &&
                                moment(booking.date).year() === moment(date).year()
                            );
                        })
                        .slice(0, 10),
                );
                setIsLoading(false);
            });
        }
        if (roleLogin === 'doctor') {
            request.get(`/doctor/${adminInfo._id}`).then((res) => {
                setData(
                    res.data?.booking.filter((booking) => {
                        return (
                            moment(booking.date).date() === moment(date).date() &&
                            moment(booking.date).month() === moment(date).month() &&
                            moment(booking.date).year() === moment(date).year()
                        );
                    }),
                );
                setPageData(
                    res.data?.booking
                        .filter((booking) => {
                            return (
                                moment(booking.date).date() === moment(date).date() &&
                                moment(booking.date).month() === moment(date).month() &&
                                moment(booking.date).year() === moment(date).year()
                            );
                        })
                        .slice(0, 10),
                );
                setIsLoading(false);
            });
        }
    }, [adminInfo._id, date, roleLogin]);

    const handleSearch = () => {
        request.get(`/doctor/search?keyword=${searchValue}`).then((res) => {
            setData(res.data);
        });
    };

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div>
                <div className="py-3 flex flex-col items-start md:flex-row md:items-center justify-between border-b border-gray-900">
                    <div className="flex items-start md:items-end flex-col md:flex-row  mb-4 md:mb-0 flex-1">
                        <div className="text-base mr-7 mb-2 md:mb-0 flex flex-nowrap items-center">
                            <label htmlFor="specialtySelect" className="font-medium mr-3">
                                Ngày
                            </label>
                            <DatePicker
                                onChange={(e) => {
                                    setDate(e);
                                }}
                                defaultValue={date}
                                format={'DD-MM-YYYY'}
                                allowClear={false}
                            />
                        </div>
                    </div>
                    {roleLogin === 'admin' && (
                        <div className="flex items-center md:justify-end w-full flex-1">
                            <label className="font-medium mr-3  hidden md:block" htmlFor="searchInput">
                                Tìm kiếm
                            </label>
                            <div className="py-1 px-2 bg-gray-50 rounded w-full md:w-[220px] flex items-center flex-nowrap">
                                <input
                                    value={searchValue}
                                    onChange={(e) => {
                                        setSearchValue(e.target.value);
                                    }}
                                    id="searchInput"
                                    className="bg-transparent flex-1"
                                    placeholder="Nhập tên khách hàng..."
                                />
                                <Button onClick={handleSearch} className="bg-transparent">
                                    <FontAwesomeIcon icon={faSearch} />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-5">
                    {roleLogin === 'admin' &&
                        pageData.map(
                            (booking) =>
                                booking.status === 'on-confirm' && (
                                    <ObjectItem
                                        key={booking._id}
                                        data={booking}
                                        phoneNumber={true}
                                        email={true}
                                        select={'admin'}
                                    />
                                ),
                        )}
                    {roleLogin === 'doctor' &&
                        pageData
                            ?.sort(compare)
                            .map(
                                (booking) =>
                                    (booking.status === 'confirm' ||
                                        booking.status === 'done' ||
                                        booking.status === 'cancel') && (
                                        <ObjectItem
                                            key={booking._id}
                                            data={booking}
                                            phoneNumber={true}
                                            email={true}
                                            shift={true}
                                            select={'doctor'}
                                        />
                                    ),
                            )}
                </div>
                {data?.length > 10 && (
                    <div className="my-8 flex justify-center">
                        <Pagination
                            onChange={(page) => {
                                let newPageData = [];
                                for (let index = page * 10 - 10; index < page * 10; index++) {
                                    data[index] && newPageData.push(data[index]);
                                }
                                setPageSize(page);
                                setPageData(newPageData);
                            }}
                            pageSize={10}
                            defaultCurrent={1}
                            total={data.length}
                            current={pageSize}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default ManagementBooking;
