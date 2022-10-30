import images from '~/assets';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { Popover } from 'antd';
import { setAdminInfo, setLogIn } from '~/redux/features/doctorCareSlice';

function HeaderManagement({ displaySidebar }) {
    const isLogin = useSelector((state) => state.doctorCare.isLogin);
    const adminInfo = useSelector((state) => state.doctorCare.adminInfo);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(setLogIn(false));
        dispatch(setAdminInfo({}));
    };

    return (
        <div className="bg-sky-900 border-b border-gray-500 h-[80px]">
            <div className="h-full flex items-center justify-between px-2">
                <div className="md:hidden p-4 text-2xl text-white" onClick={displaySidebar}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <Link to="/admin" className="block w-[200px]">
                    <img className="block w-full" src={images.logo} alt="logo" />
                </Link>
                <div>
                    {isLogin ? (
                        <div className="flex items-center cursor-pointer">
                            <Popover
                                content={
                                    <div className="cursor-pointer hover:text-cyan-700" onClick={handleLogout}>
                                        <p>
                                            <FontAwesomeIcon icon={faRightFromBracket} />
                                            <span className="ml-2 text-base font-semibold">Đăng xuất</span>
                                        </p>
                                    </div>
                                }
                                className="rounded-[50%] overflow-hidden shadow-sm m-4 md:m-0"
                            >
                                <img className="block aspect-square w-[50px]" src={adminInfo.image} alt="avatar" />
                            </Popover>
                            <h3 className="ml-3 text-xl font-semibold text-white hidden md:block">{adminInfo.name}</h3>
                        </div>
                    ) : (
                        <img className="block aspect-square w-[50px]" src={images.defaultAvt} alt="avatar" />
                    )}
                </div>
            </div>
        </div>
    );
}

export default HeaderManagement;
