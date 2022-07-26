import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import background from '~/assets/images/bookingcare-cover-4.png';
import images from '~/assets';
import Section from '~/components/Section';
import SlideShow from '~/components/SlideShow';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import { Link } from 'react-router-dom';
import request from '~/utils';

function Home() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        request.get('/home').then((res) => {
            setData(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div>
                <div className="block  relative w-full object-cover">
                    <div className="block">
                        <img className="w-full block max-h-[800px] object-cover" src={background} alt="background" />
                    </div>
                    <div className="absolute top-0 w-full h-full flex flex-col items-center justify-center bg-black/50 ">
                        <h1 className="text-center text-2xl sm:text-4xl font-semibold text-white uppercase drop-shadow sm:mb-5 leading-9">
                            NỀN TẢNG Y TẾ
                            <br />
                            CHĂM SÓC SỨC KHỎE TOÀN DIỆN
                        </h1>
                        <div className="flex items-center mt-3 mx-2 sm:mx-0 rounded-3xl overflow-hidden shadow-2xl bg-white">
                            <Link
                                to={`/search?keyword=${searchValue}`}
                                className="bg-transparent text-xl sm:text-2xl p-2 sm:py-3 sm:px-4  cursor-pointer hover:opacity-75"
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </Link>
                            <input
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="bg-transparent text-xl w-full sm:w-[500px]"
                                placeholder="Tìm kiếm..."
                            />
                        </div>
                        <div className="mt-5 sm:flex items-center hidden ">
                            <a
                                className="mx-9"
                                href="https://play.google.com/store/apps/details?id=vn.bookingcare.bookingcare"
                                target="blank"
                            >
                                <img className="bloc w-[160px]" src={images.googleplay} alt="google-play" />
                            </a>
                            <a
                                className="mx-9"
                                href="https://apps.apple.com/vn/app/bookingcare/id1347700144"
                                target="blank"
                            >
                                <img className="bloc w-[160px]" target="blank" src={images.appstore} alt="app-store" />
                            </a>
                        </div>
                    </div>
                </div>

                {data.map((section, index) => (
                    <Section key={index} numberOfSlide={4}>
                        <h1 className="font-bold text-3xl my-4">{section.title}</h1>
                        <SlideShow numberOfSlide={4} data={section.data} className="-mx-4" />
                    </Section>
                ))}
            </div>
        );
    }
}

export default Home;
