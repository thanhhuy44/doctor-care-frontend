import { faCheckCircle, faSearch, faWarning, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { notification, Pagination } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '~/components/Button/Button';
import ObjectItem from '~/components/ObjectItem';
import Loading from '~/pages/Loading';
import request from '~/utils';

function ManagementRating() {
    const adminInfo = useSelector((state) => state.doctorCare.adminInfo);
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState();
    const [pageData, setPageData] = useState([]);
    const [page, setPage] = useState(1);

    const handleSearch = () => {
        if (searchValue.trim() !== '') {
            request.post(`/review/search?keyword=${searchValue}&&doctor=${adminInfo._id}`).then((res) => {
                if (res.errCode === 0) {
                    if (res.data.length > 0) {
                        setData(res.data);
                        setPageData(res.data.slice(0, 10));
                        setPage(1);
                        notification.open({
                            icon: <FontAwesomeIcon icon={faCheckCircle} className="text-green-700" />,
                            message: 'Thành công',
                            description: res.message,
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
                        description: res.message,
                    });
                }
            });
        }
    };

    useEffect(() => {
        request.get(`/doctor/${adminInfo._id}`).then((res) => {
            setData(res.data.reviews);
            setPageData(res.data?.reviews.slice(0, 10));
        });
    }, [adminInfo._id]);

    return data ? (
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
                            setPage(page);
                            let newPageData = [];
                            for (let index = page * 10 - 10; index < page * 10; index++) {
                                data[index] && newPageData.push(data[index]);
                            }
                            setPageData(newPageData);
                        }}
                        current={page}
                        pageSize={10}
                        defaultCurrent={1}
                        total={data.length}
                    />
                </div>
            )}
        </div>
    ) : (
        <Loading />
    );
}

export default ManagementRating;
