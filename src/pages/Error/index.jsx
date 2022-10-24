import { Link } from 'react-router-dom';
import images from '~/assets';

function Error() {
    return (
        <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0">
            <div className="content text-center px-4">
                <img src={images.error} alt="error-img" className="block w-full" />
                <h1 className="mt-8 text-4xl font-semibold">Không tìm thấy trang này!</h1>
                <p className="mt-2 text-2xl">
                    Quay về{' '}
                    <Link to="/" className="inline">
                        <span className="underline hover:underline font-semibold hover:text-blue-500">trang chủ</span>
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Error;
