import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './ObjectItem.module.scss';
import Button from '../Button/Button';

const cx = classNames.bind(styles);

function ObjectItem() {
    return (
        <div className={cx('container')}>
            <div className={cx('info')}>
                <img
                    className={cx('avatar')}
                    src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-1/278175118_674612020411605_4919349129629040580_n.jpg?stp=dst-jpg_p160x160&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=fSq7GG5KlkgAX-r6H-B&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT_aSb84en7iQ093txJPjFwawzcj8VDbbPLXPwr5oe-fHw&oe=6303A6C7"
                    alt="avatar"
                />
                <h5 className={cx('name')}>Thanh Huy </h5>
            </div>
            <div className={cx('setting')}>
                <Button className={cx('setting-btn', 'config')}>
                    <FontAwesomeIcon icon={faFilePen} />
                </Button>
                <Button className={cx('setting-btn', 'remove')}>
                    <FontAwesomeIcon icon={faMinusCircle} />
                </Button>
            </div>
        </div>
    );
}

export default ObjectItem;
