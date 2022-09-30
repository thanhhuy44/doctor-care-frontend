import classNames from 'classnames/bind';
import styles from './ManagementHospital.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import ObjectItem from '~/components/ObjectItem';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function ManagementHospital() {
    const [data, setData] = useState([]);
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3030/api/hospitals').then((res) => {
            setData(res.data.data);
            setIsloading(false);
        });
    }, []);

    if (isLoading) {
        <h1>Is Loading</h1>;
    } else {
        return (
            <div className={cx('container')}>
                <div className={cx('control')}>
                    <div className={cx('filter')}>
                        <div className={cx('group')}>
                            <label htmlFor="specialtySelect" className={cx('label')}>
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
                    <div className={cx('search')}>
                        <label className={cx('label')} htmlFor="searchInput">
                            Tìm kiếm
                        </label>
                        <div className={cx('search-area')}>
                            <input
                                id="searchInput"
                                className={cx('search-input')}
                                placeholder="Nhập tên bệnh viện..."
                            />
                            <Button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    {data.map((hospital) => (
                        <ObjectItem data={hospital} key={hospital._id} />
                    ))}
                    <div className={cx('add')}>
                        <Button type="link" to="/admin/hospital/add" className={cx('add-btn')}>
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ManagementHospital;
