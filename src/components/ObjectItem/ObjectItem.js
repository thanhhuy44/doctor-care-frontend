import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './ObjectItem.module.scss';
import Button from '../Button/Button';

const cx = classNames.bind(styles);

function ObjectItem({ data, update, remove }) {
    return (
        <div className={cx('container')}>
            <div className={cx('info')}>
                <img className={cx('avatar')} src={data.image} alt={data.alias} />
                <h5 className={cx('name')}>{data.name || data.firstName + ' ' + data.lastName}</h5>
            </div>
            <div className={cx('setting')}>
                <Button onClick={update} className={cx('setting-btn', 'config')}>
                    <FontAwesomeIcon icon={faFilePen} />
                </Button>
                <Button onClick={remove} className={cx('setting-btn', 'remove')}>
                    <FontAwesomeIcon icon={faMinusCircle} />
                </Button>
            </div>
        </div>
    );
}

export default ObjectItem;
