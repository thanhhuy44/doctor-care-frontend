import classNames from 'classnames/bind';
import styles from './Item.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Item = ({ type, data }) => {
    return (
        <div>
            <Link className={cx('item', type)} to="/detaildoctor">
                <div className={cx('thumb')}>
                    <img src={data.image} alt="chuyen-khoa" className={cx('thumb-img')} />
                </div>
                <div className={cx('info')}>
                    <h4 className={cx('name')}>{data.name}</h4>
                </div>
            </Link>
        </div>
    );
};

export default Item;
