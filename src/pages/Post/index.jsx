import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Loading';

function Post() {
    const params = useParams();
    const [data, setData] = useState();
    useEffect(() => {
        axios.get(`http://localhost:3030/api/post/${params.id}`).then((res) => {
            setData(res.data.data);
        });
    }, []);
    return data ? (
        <div className="container mx-auto my-8">
            <img src={data.banner} alt={data.alias} className="aspect-video mx-auto max-h-[400px]" />
            <h1 className="text-3xl font-semibold my-8">{data.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: data.content }} className="rich-text"></div>
        </div>
    ) : (
        <Loading />
    );
}

export default Post;
