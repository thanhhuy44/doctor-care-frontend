import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faFilePen,
    faMailBulk,
    faMinusCircle,
    faPhone,
    faUser,
    faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import { notification, Popconfirm, Select } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function ObjectItem({ data, update, remove, status, phoneNumber, email, shift }) {
    const roleLogin = useSelector((state) => state.doctorCare.roleLogin);
    const [statusBooking, setStatusBooking] = useState(data?.status);

    const handleChangeStatus = (value) => {
        if (value === 'delete') {
            axios
                .post(`http://localhost:3030/api/booking/delete/${data._id}`, {
                    status: value,
                })
                .then((res) => {
                    if (res.data.errCode === 0) {
                        notification.open({
                            icon: <FontAwesomeIcon icon={faCheckCircle} className="text-green-700" />,
                            message: 'Thành công',
                            description: res.data.message,
                        });
                    } else {
                        notification.open({
                            icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
                            message: 'Lỗi',
                            description: res.data.message,
                        });
                    }
                });
        } else {
            axios
                .post(`http://localhost:3030/api/booking/update/${data._id}`, {
                    status: value,
                })
                .then((res) => {
                    if (res.data.errCode === 0) {
                        notification.open({
                            icon: <FontAwesomeIcon icon={faCheckCircle} className="text-green-700" />,
                            message: 'Thành công',
                            description: res.data.message,
                        });
                    } else {
                        notification.open({
                            icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
                            message: 'Lỗi',
                            description: res.data.message,
                        });
                    }
                });
        }
    };

    return (
        <div
            className={`p-2 border ${statusBooking === 'waiting' && 'border-yellow-500 bg-yellow-100'}  ${
                statusBooking === 'done' && 'border-green-500 bg-green-100'
            } ${
                statusBooking === 'cancel' && 'border-red-500 bg-red-100'
            } rounded-lg mb-3 flex items-center justify-between`}
        >
            <div className="flex items-center">
                {data.image ? (
                    <img className="block w-[50px] aspect-square rounded-full mr-3" src={data.image} alt={data.alias} />
                ) : (
                    <FontAwesomeIcon icon={faUser} className="mr-2 text-base" />
                )}
                <h5 className="text-base font-semibold">{data.name || data.firstName + ' ' + data.lastName}</h5>
            </div>
            {phoneNumber && (
                <div className="hidden md:flex items-center">
                    <p>
                        <FontAwesomeIcon icon={faPhone} /> {data?.numberPhone}
                    </p>
                </div>
            )}
            {email && (
                <div className="hidden md:flex items-center">
                    <p>
                        <FontAwesomeIcon icon={faMailBulk} /> {data?.email}
                    </p>
                </div>
            )}
            {shift && (
                <div className="flex items-center font-medium text-base">
                    <p>Ca: {data?.time}</p>
                </div>
            )}
            <div>
                {roleLogin === 'doctor' && (
                    <Select
                        style={{
                            width: 120,
                        }}
                        defaultValue={data.status}
                        onChange={(value) => {
                            setStatusBooking(value);
                            handleChangeStatus(value);
                        }}
                    >
                        <Select.Option value="waiting">Đang đợi</Select.Option>
                        <Select.Option value="done">Đã khám</Select.Option>
                        <Select.Option value="cancel">Không đến</Select.Option>
                        <Select.Option value="delete">Từ chối</Select.Option>
                    </Select>
                )}
                {update && (
                    <Button onClick={update} className="bg-transparent text-yellow-600">
                        <FontAwesomeIcon icon={faFilePen} />
                    </Button>
                )}

                {remove && (
                    <Popconfirm
                        placement="right"
                        title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={remove}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button className="bg-transparent text-red-600">
                            <FontAwesomeIcon icon={faMinusCircle} />
                        </Button>
                    </Popconfirm>
                )}
            </div>
        </div>
    );
}

export default ObjectItem;
