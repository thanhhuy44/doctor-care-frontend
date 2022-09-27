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
            console.log(res.data.data);
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
                <div className={cx('control')}>
                    <div className={cx('filter')}>
                        <div className={cx('group')}>
                            <label htmlFor="specialtySelect" className={cx('label')}>
                                Bệnh viện
                            </label>
                            <select id="specialtySelect">
                                <option>Tất cả</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <div className={cx('group')}>
                            <label htmlFor="hospitalSelect" className={cx('label')}>
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
                    <div className={cx('search')}>
                        <label className={cx('label')} htmlFor="searchInput">
                            Tìm kiếm
                        </label>
                        <div className={cx('search-area')}>
                            <input id="searchInput" className={cx('search-input')} placeholder="Nhập tên bác sĩ..." />
                            <Button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
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
                    <div className={cx('add')}>
                        <Button type="link" to="/admin/doctor/add" className={cx('add-btn')}>
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ManagementDoctor;
