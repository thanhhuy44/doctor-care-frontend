import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Button from '~/components/Button/Button';
import ObjectItem from '~/components/ObjectItem';

function ManagementRating() {
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);

    const handleSearch = () => {
        console.log(searchValue);
    };

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
                {pageData.map((comments) => (
                    <ObjectItem key={comments._id} data={comments} phoneNumber={true} email={true} shift={true} />
                ))}
            </div>
        </div>
    );
}

export default ManagementRating;
