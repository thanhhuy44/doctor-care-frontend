import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingItem from '~/components/BookingItem';
import Loading from '../Loading';
import locations from '~/assets/location/local.json';
import { Pagination } from 'antd';
import request from '~/utils';

function AllPackages() {
    const params = useParams();
    const [isLoading, setIsloading] = useState(true);
    const [location, setLocation] = useState('');
    const [data, setData] = useState();
    const [pageData, setPageData] = useState([]);

    useEffect(() => {
        request.get(`/type-package/${params.id}`).then((res) => {
            setData(res.data);
            setIsloading(false);
            setPageData(res.data.healthPackages.slice(0, 10));
        });
    }, []);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className="container mx-auto pt-5 px-4 md:px-10">
                <div className="">
                    <h1 className="my-3 lg:my-5 text-3xl font-bold">{data.name}</h1>
                    <div className="my-4 rich-text" dangerouslySetInnerHTML={{ __html: data.description }}></div>
                </div>
                <div>
                    <select
                        onChange={(e) => setLocation(e.target.value)}
                        className="border border-gray-400 p-2 text-base focus:outline-none cursor-pointer hover:border-cyan-900"
                    >
                        <option key={'TC'} value={''}>
                            Tất cả
                        </option>
                        {locations.map((location) => (
                            <option key={location.code} value={location.name}>
                                {location.name}
                            </option>
                        ))}
                    </select>
                    {location !== ''
                        ? pageData.map(
                              (doctor) =>
                                  doctor.hospital.location.province === location && (
                                      <BookingItem key={doctor._id} data={doctor} />
                                  ),
                          )
                        : pageData.map((healthPackage) => <BookingItem key={healthPackage._id} data={healthPackage} />)}
                </div>
                <div className="my-4 flex justify-center">
                    {data.healthPackages.length > 10 && (
                        <Pagination
                            onChange={(page) => {
                                let newPageData = [];
                                for (let index = page * 10 - 10; index < page * 10; index++) {
                                    data[index] && newPageData.push(data[index]);
                                }
                                setPageData(newPageData);
                            }}
                            pageSize={10}
                            defaultCurrent={1}
                            total={data.length}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default AllPackages;
