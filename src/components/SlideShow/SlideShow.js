import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import { Autoplay } from 'swiper';

function SlideShow({ children, numberOfSlide, dots, autoplaySpeed, className, data }) {
    return (
        <Swiper
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            loop={true}
            breakpoints={{
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                },
            }}
        >
            {data.map((slide, index) => (
                <SwiperSlide key={index}>
                    <div className="block">
                        <div>
                            <Link
                                to={slide.link}
                                style={{
                                    boxShadow:
                                        'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
                                }}
                                className="block w-full rounded overflow-hidden"
                            >
                                <img
                                    className="w-full aspect-video block object-cover"
                                    alt={slide.alias}
                                    src={slide.image || slide.banner}
                                />
                            </Link>
                            <div className="mt-3">
                                <Link className="mb-1 text-xl font-semibold hover:text-blue-600" to={slide.link}>
                                    {slide.name || slide.title}
                                </Link>
                                <p
                                    className="cursor-pointer text-base lin"
                                    dangerouslySetInnerHTML={{
                                        __html: slide.shortDescription || slide.summary || slide.address,
                                    }}
                                ></p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default SlideShow;
