import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import ObjectItem from '~/components/ObjectItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ManagementHospital() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3030/api/hospitals').then((res) => {
            setData(res.data.data);
            setIsloading(false);
        });
    }, []);

    const handleUpdateDoctor = (id) => {
        navigate(`/admin/hospital/update/${id}`);
    };
    const handleDeleteDoctor = () => {
        console.log('delete');
    };

    if (isLoading) {
        <h1>Is Loading</h1>;
    } else {
        return (
            <div>
                <div className="py-3 flex flex-col items-start md:flex-row md:items-center justify-between border-b border-gray-900">
                    <div className="flex items-start md:items-end flex-col md:flex-row  mb-4 md:mb-0 flex-1">
                        <div className="text-base mr-7 mb-2 md:mb-0 flex flex-nowrap">
                            <label htmlFor="specialtySelect" className="text-base font-medium mr-3">
                                Địa điểm
                            </label>
                            <select id="specialtySelect">
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
                                placeholder="Nhập tên bệnh viện..."
                            />
                            <Button className="bg-transparent">
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    {data.map((hospital) => (
                        <ObjectItem
                            data={hospital}
                            key={hospital._id}
                            update={() => {
                                handleUpdateDoctor(hospital._id);
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
            </div>
        );
    }
}

export default ManagementHospital;
