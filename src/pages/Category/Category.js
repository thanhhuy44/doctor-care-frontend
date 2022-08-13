import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Category.module.scss';

const cx = classNames.bind(styles);

const Item = ({ type, data }) => {
    return (
        <Link className={cx('item', type)} to="/detaildoctor">
            <div className={cx('thumb')}>
                <img
                    src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
                    alt="chuyen-khoa"
                    className={cx('thumb-img')}
                />
            </div>
            <div className={cx('info')}>
                <h4 className={cx('name')}>Category</h4>
            </div>
        </Link>
    );
};

function Category() {
    return (
        <div className={cx('container')}>
            <h1 className={cx('title')}>Chuyen khoa</h1>
            <div className={cx('content')}>
                <Item type="doctor" />
                <Item />
                <Item />
                <Item />
            </div>
        </div>
    );
}

export default Category;
