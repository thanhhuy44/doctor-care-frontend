import classNames from 'classnames/bind';
import styles from './ManagementAdmin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import ObjectItem from '~/components/ObjectItem';

const cx = classNames.bind(styles);

function ManagementAdmin() {
    return (
        <div className={cx('container')}>
            <div className={cx('control')}>
                <div className={cx('filter')}></div>
                <div className={cx('search')}>
                    <label className={cx('label')} htmlFor="searchInput">
                        Tìm kiếm
                    </label>
                    <div className={cx('search-area')}>
                        <input
                            id="searchInput"
                            className={cx('search-input')}
                            placeholder="Nhập tên quản trị viên..."
                        />
                        <Button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('content')}>
                <div>
                    <ObjectItem />
                    <ObjectItem />
                    <ObjectItem />
                    <ObjectItem />
                </div>
                <div className={cx('add')}>
                    <Button type="link" to="/admin/doctor/add" className={cx('add-btn')}>
                        <FontAwesomeIcon icon={faPlusCircle} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ManagementAdmin;
