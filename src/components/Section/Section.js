import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classNames from 'classnames/bind';
import Slider from 'react-slick';
import styles from './Section.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const slides = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const Item = ({ type, border }) => {
    return (
        <div className={cx('item', type) + ' col'}>
            <div className={cx(border && 'border')}>
                <Link to="/link" className={cx('thumb')}>
                    <img
                        className={cx('thumb-img')}
                        alt="item"
                        src="https://cdn.bookingcare.vn/fr/w1000/2022/08/04/151705-uu-dai-benh-vien-bao-son.jpg"
                    />
                </Link>
                <div className={cx('info')}>
                    <Link className={cx('name')} to="/link">
                        Thanh Huy
                    </Link>
                    <p className={cx('desc')}>dep trai nhat vu tru</p>
                </div>
            </div>
        </div>
    );
};

function Section({ numberOfSlide, dots, autoplaySpeed }) {
    const settings = {
        dots: dots || false,
        infinite: true,
        slidesToShow: numberOfSlide || 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: autoplaySpeed || 4000,
    };
    return (
        <div className={cx('container') + ' row'}>
            <h3 className={cx('title') + ' col '}>This is Section</h3>
            <div className={cx('content')}>
                <Slider {...settings}>
                    {slides.map((slide, index) => (
                        <Item key={index} />
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Section;
