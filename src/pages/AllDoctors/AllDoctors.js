import { useEffect, useState } from 'react';
import axios from 'axios';
import Item from '~/components/Item';

function AllDoctors() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3030/api/doctors').then((res) => {
            const result = res.data.data;

            setData(result);
        });
    }, []);
    useEffect(() => {
        setIsLoading(false);
    }, [data]);
    if (isLoading) {
        return <h1>Loading</h1>;
    } else {
        return (
            <div className="container mx-auto">
                <h1 className="p-5 mb-3 leading-5 text-3xl font-semibold">Bác sĩ</h1>
                <div>
                    {data.map((item) => (
                        <Item key={item._id} data={item} />
                    ))}
                </div>
            </div>
        );
    }
}

export default AllDoctors;
