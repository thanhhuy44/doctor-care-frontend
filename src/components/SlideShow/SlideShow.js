import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const slides = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const Item = ({ type, border }) => {
    return (
        <div className="block mx-4">
            <div className={border && 'p-2 border-[0.2px] border-gray-600'}>
                <Link to="/link" className="block w-full rounded-xl overflow-hidden">
                    <img
                        className="w-full block"
                        alt="item"
                        src="https://cdn.bookingcare.vn/fr/w1000/2022/08/04/151705-uu-dai-benh-vien-bao-son.jpg"
                    />
                </Link>
                <div className="mt-3">
                    <Link className="mb-1 font-semibold hover:text-blue-600" to="/link">
                        Thanh Huy
                    </Link>
                    <p className="cursor-pointer text-base">dep trai nhat vu tru</p>
                </div>
            </div>
        </div>
    );
};

function SlideShow({ children, numberOfSlide, dots, autoplaySpeed, className }) {
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
        <div className={className}>
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <Item key={index} />
                ))}
            </Slider>
        </div>
    );
}

export default SlideShow;
