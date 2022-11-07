import { useEffect, useState } from 'react';
import Loading from '../Loading';
import Item from '~/components/Item';
import request from '~/utils';

function Search() {
    const query = new URLSearchParams(window.location.search).get('keyword');
    const [data, setData] = useState();

    useEffect(() => {
        request.get(`/search${window.location.search}`).then((res) => {
            setData(res.data);
        });
    }, []);

    return data ? (
        <div className="container mx-auto py-5">
            <h1 className="text-3xl font-medium">
                Kết quả tìm kiếm cho từ khóa <span className="text-cyan-900 underline">{query}</span>
            </h1>
            <div className="mt-5">
                {data[0].data.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold ml-4 mb-0">{data[0].name}</h3>
                        {data[0].data.map((doctor) => (
                            <Item key={doctor._id} data={doctor} />
                        ))}
                    </div>
                )}
                {data[1].data.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold ml-4 mb-0">{data[1].name}</h3>
                        {data[1].data.map((doctor) => (
                            <Item key={doctor._id} data={doctor} />
                        ))}
                    </div>
                )}
                {data[2].data.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold ml-4 mb-0">{data[2].name}</h3>
                        {data[2].data.map((doctor) => (
                            <Item key={doctor._id} data={doctor} />
                        ))}
                    </div>
                )}
                {data[3].data.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold ml-4 mb-0">{data[3].name}</h3>
                        {data[3].data.map((doctor) => (
                            <Item key={doctor._id} data={doctor} />
                        ))}
                    </div>
                )}
                {data[4].data.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold ml-4 mb-0">{data[4].name}</h3>
                        {data[4].data.map((doctor) => (
                            <Item key={doctor._id} data={doctor} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    ) : (
        <Loading />
    );
}

export default Search;
