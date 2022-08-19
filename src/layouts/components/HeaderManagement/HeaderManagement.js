import classNames from 'classnames/bind';
import styles from './HeaderManagement.module.scss';
import images from '~/assets';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function HeaderManagement() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container') + ' grid wide'}>
                <Link to="/" className={cx('logo')}>
                    <img className={cx('img')} src={images.logo} alt="logo" />
                </Link>
                <div className={cx('info')}>
                    <div className={cx('avatar')}>
                        <img
                            className={cx('avatar-img')}
                            src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-1/278175118_674612020411605_4919349129629040580_n.jpg?stp=dst-jpg_p160x160&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=fSq7GG5KlkgAX-r6H-B&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT_aSb84en7iQ093txJPjFwawzcj8VDbbPLXPwr5oe-fHw&oe=6303A6C7"
                            alt="avatar"
                        />
                    </div>
                    <h3 className={cx('name')}>Thanh Huy</h3>
                </div>
            </div>
        </div>
    );
}

export default HeaderManagement;
