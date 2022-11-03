import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pagination } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '~/components/Button/Button';
import ObjectItem from '~/components/ObjectItem';

function ManagementRating() {
    const adminInfo = useSelector((state) => state.doctorCare.adminInfo);

    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);

    const handleSearch = () => {
        console.log(searchValue);
    };

    useEffect(() => {
        axios.get(`http://localhost:3030/api/doctor/${adminInfo._id}`).then((res) => {
            setData(res.data.data);
            setPageData(res.data.data?.reviews.slice(0, 10));
        });
    }, [adminInfo._id]);

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
                            placeholder="Nhập tên khách hàng..."
                        />
                        <Button onClick={handleSearch} className="bg-transparent">
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                {pageData.map((review) => (
                    <ObjectItem key={review._id} data={review} comment={true} />
                ))}
            </div>
            {data.length > 10 && (
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
            )}
        </div>
    );
}

export default ManagementRating;
