import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';
import styles from './ManagementDoctor.module.scss';
import ObjectItem from '~/components/ObjectItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ManagementDoctor() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3030/api/doctors').then((res) => {
            setData(res.data.data);
            setIsLoading(false);
        });
    }, []);

    const handleUpdate = (id) => {
        console.log('update');
        navigate(`/admin/doctor/update/${id}`);
    };

    const handleRemove = () => {
        console.log('remove');
    };

    if (isLoading) {
        return <h1>Is Loading</h1>;
    } else {
        return (
            <div className={cx('container')}>
                <div className="py-3 flex flex-col items-start md:flex-row md:items-center justify-between border-b border-gray-900">
                    <div className="flex items-start md:items-end flex-col md:flex-row  mb-4 md:mb-0 flex-1">
                        <div className="text-base mr-7 mb-2 md:mb-0 flex flex-nowrap">
                            <label htmlFor="specialtySelect" className="font-medium mr-3">
                                Bệnh viện
                            </label>
                            <select id="specialtySelect">
                                <option>Tất cả</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <div className="text-base mr-7 mb-2 md:mb-0 flex flex-nowrap">
                            <label htmlFor="hospitalSelect" className="font-medium mr-3">
                                Chuyên khoa
                            </label>
                            <select id="hospitalSelect">
                                <option>Tất cả</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center md:justify-end w-full flex-1">
                        <label className="font-medium mr-3  hidden md:block" htmlFor="searchInput">
                            Tìm kiếm
                        </label>
                        <div className="py-1 px-2 bg-gray-50 rounded w-full md:w-[220px] flex items-center flex-nowrap">
                            <input
                                id="searchInput"
                                className="bg-transparent flex-1"
                                placeholder="Nhập tên bác sĩ..."
                            />
                            <Button className="bg-transparent">
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    {data.map((doctor) => (
                        <ObjectItem
                            update={() => {
                                handleUpdate(doctor._id);
                            }}
                            remove={handleRemove}
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
            </div>
        );
    }
}

export default ManagementDoctor;
