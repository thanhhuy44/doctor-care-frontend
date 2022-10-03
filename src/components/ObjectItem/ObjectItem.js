import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';

function ObjectItem({ data, update, remove }) {
    return (
        <div className="p-2 border border-gray-500 rounded-lg mb-3 flex items-center justify-between">
            <div className="flex items-center">
                <img className="block w-[50px] aspect-square rounded-full mr-3" src={data.image} alt={data.alias} />
                <h5 className="text-base font-semibold">{data.name || data.firstName + ' ' + data.lastName}</h5>
            </div>
            <div>
                <Button onClick={update} className="bg-transparent text-yellow-600">
                    <FontAwesomeIcon icon={faFilePen} />
                </Button>
                <Button onClick={remove} className="bg-transparent text-red-600">
                    <FontAwesomeIcon icon={faMinusCircle} />
                </Button>
            </div>
        </div>
    );
}

export default ObjectItem;
