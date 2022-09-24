import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import background from '~/assets/images/bookingcare-cover-4.jpg';
import images from '~/assets';
import Section from '~/components/Section';
import SlideShow from '~/components/SlideShow';

function Home() {
    return (
        <div>
            <div className="block  relative w-full object-cover">
                <div className="block">
                    <img className="w-full block" src={background} alt="background" />
                </div>
                <div className="absolute top-0 w-full h-full flex flex-col items-center justify-center bg-black/30 ">
                    <h1 className="text-center text-2xl sm:text-4xl leading-6 font-semibold text-white uppercase drop-shadow sm:mb-5 leading-16">
                        NỀN TẢNG Y TẾ
                        <br />
                        CHĂM SÓC SỨC KHỎE TOÀN DIỆN
                    </h1>
                    <div className="flex items-center mt-3 mx-2 sm:mx-0  bg-yellow-400 rounded-3xl overflow-hidden shadow-2xl">
                        <button className="bg-transparent text-xl sm:text-2xl p-2 sm:py-3 sm:px-4  cursor-pointer hover:opacity-75">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                        <input className="bg-transparent text-xl w-full sm:w-[500px]" placeholder="Search..." />
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
            <Section bgColor="#ccc" numberOfSlide={4}>
                <SlideShow className="-mx-4" />
            </Section>
            <Section dots={true} />
            <Section autoplaySpeed={1000} />
            <Section />
            <Section />
            <Section />
        </div>
    );
}

export default Home;
