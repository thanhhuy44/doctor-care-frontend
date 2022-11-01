import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import ObjectItem from '~/components/ObjectItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DatePicker, Pagination } from 'antd';
import moment from 'moment';
import Loading from '~/pages/Loading';

function ManagementBooking() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [date, setDate] = useState(moment());
    useEffect(() => {
        setIsLoading(true);
        axios.get('http://localhost:3030/api/bookings').then((res) => {
            setData(
                res.data.data.filter((booking) => {
                    return (
                        moment(booking.date).date() === moment(date).date() &&
                        moment(booking.date).month() === moment(date).month() &&
                        moment(booking.date).year() === moment(date).year()
                    );
                }),
            );
            setPageData(
                res.data.data
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
    }, [date]);

    const handleUpdate = (id) => {
        navigate(`/admin/doctor/update/${id}`);
    };

    const handleRemove = (id) => {
        axios.post(`http://localhost:3030/api/doctor/delete/${id}`).then((res) => {
            if (res.data.errCode === 0) {
                alert(res.data.message);
                const newData = data.filter((doctor) => {
                    return doctor._id !== id;
                });
                setData(newData);
            } else {
                alert(res.data.message);
            }
        });
    };

    const handleSearch = () => {
        axios.get(`http://localhost:3030/api/doctor/search?keyword=${searchValue}`).then((res) => {
            setData(res.data.data);
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
                </div>
                <div className="mt-5">
                    {pageData.map((booking) => (
                        <ObjectItem
                            update={() => {
                                handleUpdate(booking._id);
                            }}
                            remove={() => {
                                handleRemove(booking._id);
                            }}
                            key={booking._id}
                            data={booking}
                        />
                    ))}
                </div>
                <div className="my-8 flex justify-center">
                    <Pagination
                        onChange={(page) => {
                            let newPageData = [];
                            for (let index = page * 10 - 10; index < page * 10; index++) {
                                data[index] && newPageData.push(data[index]);
                            }
                            setPageData(newPageData);
                        }}
                        pageSize={10}
                        defaultCurrent={1}
                        total={data.length}
                    />
                </div>
            </div>
        );
    }
}

export default ManagementBooking;
