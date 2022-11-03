import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusCircle, faCheckCircle, faXmarkCircle, faWarning } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import ObjectItem from '~/components/ObjectItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { notification, Pagination } from 'antd';
import Loading from '~/pages/Loading';

function ManagementPackage() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const [hospitals, setHospitals] = useState([]);
    const [typePackages, setTypePackages] = useState([]);
    const [hospitalFilter, setHospitalFilter] = useState('');
    const [typePackageFilter, setTypePackageFilter] = useState('');
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3030/api/hospitals').then((res) => {
            setHospitals(res.data.data);
        });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3030/api/type-packages').then((res) => {
            setTypePackages(res.data.data);
        });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3030/api/packages').then((res) => {
            setData(res.data.data);
            setPageData(
                res.data.data
                    .filter((item) => {
                        if (hospitalFilter === '' && typePackageFilter === '') {
                            return item;
                        }
                        if (hospitalFilter !== '' && typePackageFilter === '') {
                            return item.hospital._id === hospitalFilter;
                        }
                        if (hospitalFilter === '' && typePackageFilter !== '') {
                            return item.typePackage === typePackageFilter;
                        }
                        if (hospitalFilter === '' && typePackageFilter !== '') {
                            return item.hospital._id === hospitalFilter && item.typePackage === typePackageFilter;
                        }
                    })
                    .slice(0, 10),
            );
            setIsloading(false);
        });
    }, [hospitalFilter, typePackageFilter]);

    const handleUpdatePackage = (id) => {
        navigate(`/admin/package/update/${id}`);
    };

    const handleRemove = (id) => {
        axios.post(`http://localhost:3030/api/package/delete/${id}`).then((res) => {
            if (res.data.errCode === 0) {
                notification.open({
                    icon: <FontAwesomeIcon icon={faCheckCircle} className="text-green-700" />,
                    message: 'Thành công',
                    description: res.data.message,
                });
                const newData = data.filter((doctor) => {
                    return doctor._id !== id;
                });
                setData(newData);
            } else {
                notification.open({
                    icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
                    message: 'Lỗi',
                    description: res.data.message,
                });
            }
        });
    };

    const handleSearch = () => {
        axios.post(`http://localhost:3030/api/package/search?keyword=${searchValue}`).then((res) => {
            if (res.data.errCode === 0) {
                if (res.data.data.length > 0) {
                    setData(res.data.data);
                    setPageData(res.data.data.slice(0, 10));
                    notification.open({
                        icon: <FontAwesomeIcon icon={faCheckCircle} className="text-green-700" />,
                        message: 'Thành công',
                        description: res.data.message,
                    });
                } else {
                    notification.open({
                        icon: <FontAwesomeIcon icon={faWarning} className="text-yellow-700" />,
                        message: 'Thông báo',
                        description: 'Không có kết quả trùng khớp với tìm kiếm',
                    });
                }
            } else {
                notification.open({
                    icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
                    message: 'Lỗi',
                    description: res.data.message,
                });
            }
        });
    };

    if (isLoading) {
        <Loading />;
    } else {
        return (
            <div>
                <div className="py-3 flex flex-col items-start md:flex-row md:items-center justify-between border-b border-gray-900">
                    <div className="flex items-start md:items-end flex-col md:flex-row  mb-4 md:mb-0 flex-1">
                        <div className="text-base mr-7 mb-2 md:mb-0 flex flex-nowrap">
                            <label htmlFor="hospitalSelect" className="text-base font-medium mr-3">
                                Cơ sở y tế
                            </label>
                            <select
                                id="hospitalSelect"
                                onChange={(e) => {
                                    setHospitalFilter(e.target.value);
                                    setSearchValue('');
                                }}
                            >
                                <option key={11111} value={''}>
                                    Tất cả
                                </option>
                                {hospitals.map((hospital) => (
                                    <option value={hospital._id} key={hospital._id}>
                                        {hospital.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="text-base mr-7 mb-2 md:mb-0 flex flex-nowrap">
                            <label htmlFor="typePackageSelect" className="text-base font-medium mr-3">
                                Loại gói khám
                            </label>
                            <select
                                id="typePackageSelect"
                                onChange={(e) => {
                                    setTypePackageFilter(e.target.value);
                                    setSearchValue('');
                                }}
                            >
                                <option key={1111123} value={''}>
                                    Tất cả
                                </option>
                                {typePackages.map((typePackage) => (
                                    <option value={typePackage._id} key={typePackage._id}>
                                        {typePackage.name}
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
                                onChange={(e) => setSearchValue(e.target.value)}
                                id="searchInput"
                                className="bg-transparent flex-1"
                                placeholder="Nhập tên gói khám..."
                            />
                            <Button
                                className="bg-transparent"
                                onClick={() => {
                                    handleSearch();
                                }}
                            >
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    {pageData.map((item) => (
                        <ObjectItem
                            data={item}
                            key={item._id}
                            update={() => {
                                handleUpdatePackage(item._id);
                            }}
                            remove={() => {
                                handleRemove(item._id);
                            }}
                        />
                    ))}
                    <div className="py-3 flex">
                        <Button
                            type="link"
                            to="/admin/package/add"
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
                            }}
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

export default ManagementPackage;
