import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusCircle, faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import ObjectItem from '~/components/ObjectItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import Loading from '~/pages/Loading';

function ManagementTypePackage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    useEffect(() => {
        axios.get('http://localhost:3030/api/type-packages').then((res) => {
            setData(res.data.data);
            setIsLoading(false);
        });
    }, []);

    const handleSearch = () => {
        console.log(searchValue);
    };

    const handleUpdate = (id) => {
        navigate(`/admin/type-package/update/${id}`);
    };

    const handleRemove = (id) => {
        axios.post(`http://localhost:3030/api/type-package/delete/${id}`).then((res) => {
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

    if (isLoading) {
        return Loading;
    } else {
        return (
            <div>
                <div className="py-3 flex flex-col items-start md:flex-row md:items-center justify-between border-b border-gray-900">
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
                                placeholder="Nhập tên loại gói khám..."
                            />
                            <Button onClick={handleSearch} className="bg-transparent">
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    {data.map((typePackage) => (
                        <ObjectItem
                            update={() => {
                                handleUpdate(typePackage._id);
                            }}
                            remove={() => {
                                handleRemove(typePackage._id);
                            }}
                            key={typePackage._id}
                            data={typePackage}
                        />
                    ))}
                    <div className="py-3 flex">
                        <Button
                            type="link"
                            to="/admin/type-package/add"
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

export default ManagementTypePackage;
