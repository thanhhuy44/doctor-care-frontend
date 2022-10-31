import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import { Popconfirm } from 'antd';

function ObjectItem({ data, update, remove }) {
    return (
        <div className="p-2 border border-gray-500 rounded-lg mb-3 flex items-center justify-between">
            <div className="flex items-center">
                {data.image && (
                    <img className="block w-[50px] aspect-square rounded-full mr-3" src={data.image} alt={data.alias} />
                )}
                <h5 className="text-base font-semibold">{data.name || data.firstName + ' ' + data.lastName}</h5>
            </div>
            <div>
                <Button onClick={update} className="bg-transparent text-yellow-600">
                    <FontAwesomeIcon icon={faFilePen} />
                </Button>

                <Popconfirm
                    placement="right"
                    title="Bạn có chắc chắn muốn xóa?"
                    onConfirm={remove}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button className="bg-transparent text-red-600">
                        <FontAwesomeIcon icon={faMinusCircle} />
                    </Button>
                </Popconfirm>
            </div>
        </div>
    );
}

export default ObjectItem;
