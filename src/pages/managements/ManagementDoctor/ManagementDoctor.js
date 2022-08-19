import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';
import styles from './ManagementDoctor.module.scss';
import ObjectItem from '~/components/ObjectItem';

const cx = classNames.bind(styles);

function ManagementDoctor() {
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

export default ManagementDoctor;
