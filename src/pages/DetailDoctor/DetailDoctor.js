import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Item = () => {
    return (
        <div className="py-2 border-b-[0.5px] border-gray-300">
            <h4 className="text-base mb-1 font-semibold">Trần Duy Thanh</h4>
            <p className="text-sm font-normal text-gray-600">
                {' '}
                Mọi thứ đều rất tốt. Bác sĩ hỏi kỹ càng, chu đáo và nhẹ nhàng
            </p>
        </div>
    );
};

function DetailDoctor() {
    const params = useParams();
    const id = params?.id;
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    console.log(id);
    useEffect(() => {
        axios.get(`http://localhost:3030/api/doctor/${id}`).then((res) => {
            setData(res.data.data);
            setIsLoading(false);
        });
    }, []);
    if (isLoading) {
        return <h1>isLoading</h1>;
    } else {
        return (
            <div className="container mx-auto py-8">
                <div className="flex items-center flex-col md:flex-row">
                    <div className="text-center max-w-[200px] aspect-square rounded-full overflow-hidden shadow-md object-contain">
                        <img className="block aspect-square object-cover" src={data.image} alt="doctor" />
                    </div>
                    <div className="m-5">
                        <h3 className="mb-3 text-3xl font-semibold">Bác sĩ {`${data.firstName} ${data.lastName}`}</h3>
                        <p
                            className="text-sm font-normal leading-6"
                            dangerouslySetInnerHTML={{ __html: data.shortDescription }}
                        ></p>
                    </div>
                </div>
                <div className="my-10 flex items-start flex-col lg:flex-row">
                    <div className="flex-1 mx-5">
                        <h5 className="uppercase text-xl text-blue-700 font-semibold">Lịch khám</h5>
                        <select className="p-2 text-base font-semibold border-b border-gray-700 min-w-[200px]">
                            <option>13/08</option>
                            <option>14/08</option>
                            <option>15/08</option>
                            <option>16/08</option>
                        </select>
                    </div>
                    <div className="pl-5 lg:border-l-[0.5px] border-gray-500 mt-8 lg:mt-0">
                        <div>
                            <p className="mb-2 uppercase text-xl font-medium">ĐỊA CHỈ KHÁM</p>
                            <p className="font-semibold text-xl">Phòng khám Bệnh viện Đại học Y Dược 1</p>
                            <p className="text-base">20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM</p>
                        </div>
                        <div className="mt-2 flex items-end ">
                            <p className="font-base font-normal">
                                {' '}
                                Giá khám: <span className="font-semibold text-orange-500">{data.price}</span> đ
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="mx-3 lg:mx-0 border-t border-gray-300 py-4"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                ></div>
                <div className="mx-3 lg:mx-0 border-t border-gray-300 py-4">
                    <p className="mb-4 text-2xl font-semibold">Phản hồi của bệnh nhân sau khi đi khám</p>
                    <div className="">
                        <Item />
                        <Item />
                        <Item />
                        <Item />
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailDoctor;
