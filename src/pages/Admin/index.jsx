import { faCakeCandles } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { message } from 'antd';

function Admin() {
    const adminInfo = useSelector((state) => state.doctorCare.adminInfo);
    const birthDay = new Date(adminInfo.birth);
    return (
        <div className="mt-4 flex justify-center min-h-full ">
            <div className="content flex flex-col items-center">
                <img
                    src={adminInfo.image}
                    alt={adminInfo.link}
                    className="block aspect-square w-[200px] h-[200px] object-cover rounded-full"
                />
                <h2 className="mt-4 text-3xl font-semibold">{adminInfo.name}</h2>
                <p className="mt-2 flex items-center">
                    <FontAwesomeIcon icon={faCakeCandles} />
                    <span className="ml-2 text-base">{`Ngày ${birthDay.getDate()} tháng ${birthDay.getMonth()} năm ${birthDay.getFullYear()}`}</span>
                </p>
                <div
                    onClick={() => {
                        navigator.clipboard.writeText(adminInfo.email);
                        message.success('Đã copy email vào clipboard!');
                    }}
                    className="mt-2 p-2 bg-cyan-600 border-[2px] border-cyan-200 rounded-xl cursor-pointer active:text-gray-300"
                >
                    <p>{adminInfo.email}</p>
                </div>
            </div>
        </div>
    );
}

export default Admin;
