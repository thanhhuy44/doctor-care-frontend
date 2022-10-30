import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingItem from '~/components/BookingItem';
import Loading from '../Loading';
import locations from '~/assets/location/local.json';

function Specialty() {
    const params = useParams();
    const [isLoading, setIsloading] = useState(true);
    const [location, setLocation] = useState('');
    const [data, setData] = useState();

    useEffect(() => {
        axios.get(`http://localhost:3030/api/specialty/${params.id}`).then((res) => {
            setData(res.data.data);
            setIsloading(false);
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
                        ? data.doctors.map(
                              (doctor) =>
                                  doctor.hospital.location.province === location && (
                                      <BookingItem key={doctor._id} data={doctor} />
                                  ),
                          )
                        : data.doctors.map((doctor) => <BookingItem key={doctor._id} data={doctor} />)}
                </div>
            </div>
        );
    }
}

export default Specialty;
