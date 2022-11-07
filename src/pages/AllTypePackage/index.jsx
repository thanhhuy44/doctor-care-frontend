import { useEffect, useState } from 'react';
import Item from '~/components/Item';
import Loading from '../Loading';
import { Pagination } from 'antd';
import request from '~/utils';

function AllTypePackages() {
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        request.get('/type-packages').then((res) => {
            setData(res.data);
            setPageData(res.data.slice(0, 10));
            setIsLoading(false);
        });
    }, []);
    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className="container mx-auto">
                <h1 className="p-5 mb-3 leading-5 text-3xl font-semibold">Gói khám</h1>
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

export default AllTypePackages;
