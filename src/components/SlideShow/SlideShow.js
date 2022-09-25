import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const Item = ({ border, data }) => {
    return (
        <div className="block mx-4">
            <div className={border && 'p-2 border-[0.2px] border-gray-600'}>
                <Link to={data.link} className="block w-full rounded overflow-hidden shadow-sm">
                    <img
                        className="w-full block h-[240px] object-cover"
                        alt={data.alias}
                        src={data.image || data.banner}
                    />
                </Link>
                <div className="mt-3">
                    <Link className="mb-1 text-xl font-semibold hover:text-blue-600" to={data.link}>
                        {data.name || data.title || `${data.lastName} ${data.firstName}`}
                    </Link>
                    <p className="cursor-pointer text-base">{data.shortDescription || data.summary}</p>
                </div>
            </div>
        </div>
    );
};

function SlideShow({ children, numberOfSlide, dots, autoplaySpeed, className, data }) {
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
                {data.map((slide, index) => (
                    <Item key={index} data={slide} />
                ))}
            </Slider>
        </div>
    );
}

export default SlideShow;
