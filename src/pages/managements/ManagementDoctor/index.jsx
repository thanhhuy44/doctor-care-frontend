import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusCircle, faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import ObjectItem from '~/components/ObjectItem';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification, Pagination } from 'antd';
import Loading from '~/pages/Loading';
import request from '~/utils';

function ManagementDoctor() {
    const navigate = useNavigate();
    const [hospital, setHospital] = useState([]);
    const [specialty, setSpecialty] = useState([]);
    const [curHospital, setCurHospital] = useState('');
    const [curSpecialty, setCurSpecialty] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [pageSize, setPageSize] = useState(1);

    useEffect(() => {
        request.get('/hospitals').then((res) => {
            setHospital(res.data);
        });
    }, []);
    useEffect(() => {
        request.get('/specialties').then((res) => {
            setSpecialty(res.data);
        });
    }, []);

    useEffect(() => {
        request.get('/doctors').then((res) => {
            setData(res.data);
            setPageData(
                res.data
                    .filter((doctor) => {
                        if (curHospital === '' && curSpecialty === '') {
                            return doctor;
                        }
                        if (curHospital !== '' && curSpecialty === '') {
                            return doctor.hospital._id === curHospital;
                        }
                        if (curHospital === '' && curSpecialty !== '') {
                            return doctor.specialty._id === curSpecialty;
                        }
                        if (curHospital !== '' && curSpecialty !== '') {
                            return doctor.specialty._id === curSpecialty && doctor.hospital._id === curHospital;
                        }
                    })
                    .slice(0, 10),
            );
            setIsLoading(false);
        });
    }, [curHospital, curSpecialty]);

    const handleUpdate = (id) => {
        navigate(`/admin/doctor/update/${id}`);
    };

    const handleRemove = (id) => {
        request.post(`/doctor/delete/${id}`).then((res) => {
            if (res.errCode === 0) {
                notification.open({
                    icon: <FontAwesomeIcon icon={faCheckCircle} className="text-green-700" />,
                    message: 'Thành công',
                    description: res.message,
                });
                const newData = data.filter((doctor) => {
                    return doctor._id !== id;
                });
                setData(newData);
                setPageData(newData.slice(0, 10));
            } else {
                notification.open({
                    icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
                    message: 'Lỗi',
                    description: res.message,
                });
            }
        });
    };

    const handleSearch = () => {
        request.get(`/doctor/search?keyword=${searchValue}`).then((res) => {
            setData(res.data);
            setPageData(res.data.slice(0, 10));
            setPageSize(1);
        });
        setCurHospital('');
        setCurSpecialty('');
    };

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div>
                <div className="py-3 flex flex-col items-start md:flex-row md:items-center justify-between border-b border-gray-900">
                    <div className="flex items-start md:items-end flex-col md:flex-row  mb-4 md:mb-0 flex-1">
                        <div className="text-base mr-7 mb-2 md:mb-0 flex flex-nowrap">
                            <label htmlFor="hospitalSelect" className="font-medium mr-3">
                                Bệnh viện
                            </label>
                            <select
                                value={curHospital}
                                onChange={(e) => {
                                    setCurHospital(e.target.value);
                                    setSearchValue('');
                                }}
                                id="hospitalSelect"
                                style={{
                                    width: '200px',
                                }}
                            >
                                <option value="">Tất cả</option>
                                {hospital &&
                                    hospital.map((option) => <option value={option._id}>{option.name}</option>)}
                            </select>
                        </div>
                        <div className="text-base mr-7 mb-2 md:mb-0 flex flex-nowrap">
                            <label htmlFor="specialtySelect" className="font-medium mr-3">
                                Chuyên khoa
                            </label>
                            <select
                                value={curSpecialty}
                                onChange={(e) => {
                                    setCurSpecialty(e.target.value);
                                    setSearchValue('');
                                }}
                                id="specialtySelect"
                                style={{
                                    width: '200px',
                                }}
                            >
                                <option value="">Tất cả</option>
                                {specialty &&
                                    specialty.map((option) => <option value={option._id}>{option.name}</option>)}
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
                                placeholder="Nhập tên bác sĩ..."
                            />
                            <Button onClick={handleSearch} className="bg-transparent">
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    {pageData.map((doctor) => (
                        <ObjectItem
                            update={() => {
                                handleUpdate(doctor._id);
                            }}
                            remove={() => {
                                handleRemove(doctor._id);
                            }}
                            key={doctor._id}
                            data={doctor}
                        />
                    ))}
                    <div className="py-3 flex">
                        <Button
                            type="link"
                            to="/admin/doctor/add"
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
                                setPageSize(page);
                                let newPageData = [];
                                for (let index = page * 10 - 10; index < page * 10; index++) {
                                    data[index] && newPageData.push(data[index]);
                                }
                                setPageData(newPageData);
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

export default ManagementDoctor;
