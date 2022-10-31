import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusCircle, faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import ObjectItem from '~/components/ObjectItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { notification, Pagination } from 'antd';
import Loading from '~/pages/Loading';

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

    useEffect(() => {
        axios.get('http://localhost:3030/api/hospitals').then((res) => {
            setHospital(res.data.data);
        });
    }, []);
    useEffect(() => {
        axios.get('http://localhost:3030/api/specialties').then((res) => {
            setSpecialty(res.data.data);
        });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3030/api/doctors').then((res) => {
            setData(res.data.data);
            setPageData(
                res.data.data
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
        axios.post(`http://localhost:3030/api/doctor/delete/${id}`).then((res) => {
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
        axios.get(`http://localhost:3030/api/doctor/search?keyword=${searchValue}`).then((res) => {
            setData(res.data.data);
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

export default ManagementDoctor;
