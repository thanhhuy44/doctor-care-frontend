import { Link } from 'react-router-dom';

const Item = ({ type, data }) => {
    return (
        <div>
            <Link
                className={`p-2 flex items-start rounded-lg border-b-[0.5px] border-gray-500 cursor-pointer`}
                to="/detaildoctor"
            >
                <div className="max-w-[160px] aspect-video rounded-lg overflow-hidden shadow-xl ">
                    <img src={data.image} alt="chuyen-khoa" className="w-full" />
                </div>
                <div className="m-4">
                    <h4 className="text-xl font-normal">{data.name || data.firstName}</h4>
                </div>
            </Link>
        </div>
    );
};

export default Item;
