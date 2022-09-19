import { useEffect, useState } from 'react';
import axios from 'axios';
import Item from '~/components/Item';

function AllSpecialties() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3030/api/specialties').then((res) => {
            const result = res.data.data;

            setData(result);
        });
    }, []);
    useEffect(() => {
        setIsLoading(false);
        console.log(data);
    }, [data]);
    if (isLoading) {
        return <h1>Loading</h1>;
    } else {
        return (
            <div className="container mx-auto">
                <h1 className="mb-5">Chuyen khoa</h1>
                <div>
                    {data.map((item) => (
                        <Item key={item._id} data={item} />
                    ))}
                </div>
            </div>
        );
    }
}

export default AllSpecialties;
