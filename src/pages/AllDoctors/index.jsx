import { useEffect, useState } from 'react';
import axios from 'axios';
import Item from '~/components/Item';
import { Pagination } from 'antd';

function AllDoctors() {
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3030/api/doctors').then((res) => {
            setData(res.data.data);
            setPageData(res.data.data.slice(0, 10));
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
                    {pageData.map((item) => (
                        <Item key={item._id} data={item} />
                    ))}
                </div>
                <div className="my-4 flex justify-center">
                    {data.length > 10 && (
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

export default AllDoctors;
