import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusCircle, faCheckCircle, faXmarkCircle, faWarning } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import ObjectItem from '~/components/ObjectItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { notification, Pagination } from 'antd';
import Loading from '~/pages/Loading';

function ManagementSpecialty() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    useEffect(() => {
        axios.get('http://localhost:3030/api/specialties').then((res) => {
            setData(res.data.data);
            setPageData(res.data.data.slice(0, 10));
            setIsLoading(false);
        });
    }, []);

    const handleSearch = () => {
        if (searchValue.trim() !== '') {
            axios.post(`http://localhost:3030/api/specialty/search?keyword=${searchValue}`).then((res) => {
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
        }
    };

    const handleUpdate = (id) => {
        navigate(`/admin/specialty/update/${id}`);
    };

    const handleRemove = (id) => {
        axios.post(`http://localhost:3030/api/specialty/delete/${id}`).then((res) => {
            if (res.data.errCode === 0) {
                notification.open({
                    icon: <FontAwesomeIcon icon={faCheckCircle} className="text-green-700" />,
                    message: 'Thành công',
                    description: res.data.message,
                });
                const newData = data.filter((specialty) => {
                    return specialty._id !== id;
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
                                placeholder="Nhập tên loại chuyên khoa..."
                            />
                            <Button onClick={handleSearch} className="bg-transparent">
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    {pageData.map((specialty) => (
                        <ObjectItem
                            update={() => {
                                handleUpdate(specialty._id);
                            }}
                            remove={() => {
                                handleRemove(specialty._id);
                            }}
                            key={specialty._id}
                            data={specialty}
                        />
                    ))}
                    <div className="py-3 flex">
                        <Button
                            type="link"
                            to="/admin/specialty/add"
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

export default ManagementSpecialty;
