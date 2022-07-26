import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusCircle, faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import ObjectItem from '~/components/ObjectItem';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification, Pagination } from 'antd';
import location from '~/assets/location/local.json';
import Loading from '~/pages/Loading';
import request from '~/utils';

function ManagementHospital() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsloading] = useState(true);
    const [province, setProvince] = useState('');
    const [pageSize, setPageSize] = useState(1);

    useEffect(() => {
        request.get('/hospitals').then((res) => {
            setData(res.data);
            setPageData(
                res.data
                    .filter((hospital) => {
                        if (province === '') {
                            return hospital;
                        } else {
                            return hospital.location.province === province;
                        }
                    })
                    .slice(0, 10),
            );
            setIsloading(false);
        });
    }, [province]);

    const handleSearchHospital = (keyword) => {
        request.post(`/hospital/search?keyword=${keyword}`).then((res) => {
            setData(res.data);
            setPageData(res.data.slice(0, 10));
            setPageSize(1);
        });
    };

    const handleUpdateHospital = (id) => {
        navigate(`/admin/hospital/update/${id}`);
    };
    const handleDeleteHospital = (id) => {
        request.post(`/hospital/delete/${id}`).then((res) => {
            if (res.errCode === 0) {
                notification.open({
                    icon: <FontAwesomeIcon icon={faCheckCircle} className="text-green-700" />,
                    message: 'Thành công',
                    description: res.message,
                });
                const newData = data.filter((hospital) => {
                    return hospital._id !== id;
                });
                setData(newData);
                setPageData(newData);
            } else {
                notification.open({
                    icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
                    message: 'Lỗi',
                    description: res.message,
                });
            }
        });
    };

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div>
                <div className="py-3 flex flex-col items-start md:flex-row md:items-center justify-between border-b border-gray-900">
                    <div className="flex items-start md:items-end flex-col md:flex-row  mb-4 md:mb-0 flex-1">
                        <div className="text-base mr-7 mb-2 md:mb-0 flex flex-nowrap">
                            <label htmlFor="specialtySelect" className="text-base font-medium mr-3">
                                Địa điểm
                            </label>
                            <select
                                id="specialtySelect"
                                onChange={(e) => {
                                    setProvince(e.target.value);
                                    setSearchValue('');
                                }}
                            >
                                <option key={1256} value="">
                                    Tất cả
                                </option>
                                {location.map((location) => (
                                    <option key={location.id} value={location.name}>
                                        {location.name}
                                    </option>
                                ))}
                            </select>
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
                                placeholder="Nhập tên bệnh viện..."
                            />
                            <Button
                                onClick={() => {
                                    handleSearchHospital(searchValue);
                                }}
                                className="bg-transparent"
                            >
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    {pageData.map((hospital) => (
                        <ObjectItem
                            data={hospital}
                            key={hospital._id}
                            update={() => {
                                handleUpdateHospital(hospital._id);
                            }}
                            remove={() => {
                                handleDeleteHospital(hospital._id);
                            }}
                        />
                    ))}
                    <div className="py-3 flex">
                        <Button
                            type="link"
                            to="/admin/hospital/add"
                            className="bg-transparent mx-auto text-[40px] text-orange-900 hover:text-cyan-700"
                        >
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </Button>
                    </div>
                </div>
                <div className="my-4 flex justify-center">
                    {data.length > 10 && (
                        <Pagination
                            onChange={(page) => {
                                let newPageData = [];
                                for (let index = page * 10 - 10; index < page * 10; index++) {
                                    data[index] && newPageData.push(data[index]);
                                }
                                setPageData(newPageData);
                                setPageSize(page);
                            }}
                            current={pageSize}
                            pageSize={10}
                            defaultCurrent={1}
                            total={data.length}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default ManagementHospital;
