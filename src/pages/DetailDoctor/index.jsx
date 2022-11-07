import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Loading';
import moment from 'moment';
import { Button, DatePicker, notification, Pagination } from 'antd';
import { faCalendar, faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReviewModal from '~/components/Modal/ReviewModal';
import request from '~/utils';

const shifts = [
    { sequence: 1, timeStart: 8, timeEnd: 9 },
    {
        sequence: 2,
        timeStart: 9,
        timeEnd: 10,
    },
    {
        sequence: 3,
        timeStart: 10,
        timeEnd: 11,
    },
    {
        sequence: 4,
        timeStart: 13,
        timeEnd: 14,
    },
    {
        sequence: 5,
        timeStart: 14,
        timeEnd: 15,
    },
    {
        sequence: 6,
        timeStart: 15,
        timeEnd: 16,
    },
];
const Item = ({ name, content }) => {
    return (
        <div className="py-2 border-b-[0.5px] border-gray-300">
            <h4 className="text-base mb-1 font-semibold">{name}</h4>
            <p className="text-sm font-normal text-gray-600">{content}</p>
        </div>
    );
};

function DetailDoctor() {
    const params = useParams();
    const id = params?.id;
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [dateValue, setDateValue] = useState(
        `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() + 1}`,
    );
    const [bookingOnDate, setBookingOnDate] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [pageReviews, setPageReviews] = useState([]);
    const [alreadyBooking, setAlreadyBooking] = useState(shifts);
    const [modalOpen, setModalOpen] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        request.get(`/doctor/${id}`).then((res) => {
            setData(res.data);
            setBookingOnDate(
                res.data.booking.filter((booking) => {
                    return (
                        moment(booking.date).date() === moment(dateValue).date() &&
                        moment(booking.date).month() === moment(dateValue).month() &&
                        moment(booking.date).year() === moment(dateValue).year()
                    );
                }),
            );
            setReviews(res.data.reviews);
            setIsLoading(false);
        });
    }, [dateValue, id]);

    useEffect(() => {
        if (bookingOnDate.length > 0) {
            bookingOnDate.forEach((booking) => {
                alreadyBooking.forEach((alBooking) => {
                    if (booking.time === alBooking.sequence) {
                        setAlreadyBooking(
                            alreadyBooking.filter((item) => {
                                return item.sequence !== alBooking.sequence;
                            }),
                        );
                    }
                });
            });
        }
    }, [dateValue, bookingOnDate, alreadyBooking]);

    useEffect(() => {
        let newPageData = [];
        for (let index = page * 10 - 10; index < page * 10; index++) {
            reviews[index] && newPageData.push(reviews[index]);
        }
        setPageReviews(newPageData);
    }, [page, reviews]);

    const handleSubmitModal = (values) => {
        for (let i = 0; i < data.booking.length; i++) {
            if (values.email === data.booking[i].email || values.phoneNumber === data.booking[i].numberPhone) {
                request
                    .post(
                        '/review/create',
                        {
                            doctor: data._id,
                            ...values,
                        },
                        {
                            headers: { 'Content-Type': 'multipart/form-data' },
                        },
                    )
                    .then((res) => {
                        if (res.errCode === 0) {
                            notification.open({
                                icon: <FontAwesomeIcon icon={faCheckCircle} className="text-green-700" />,
                                message: 'Thành công',
                                description: res.message,
                            });
                            setReviews([...reviews, res.data]);
                            setModalOpen(false);
                            setPage(1);
                        } else {
                            notification.open({
                                icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
                                message: 'Lỗi',
                                description: res.message,
                            });
                        }
                    });
                break;
            }
            if (
                i === data.booking.length - 1 &&
                values.email !== data.booking[i].email &&
                values.phoneNumber !== data.booking[i].numberPhone
            ) {
                notification.open({
                    icon: <FontAwesomeIcon icon={faXmarkCircle} className="text-red-700" />,
                    message: 'Lỗi',
                    description: 'Không thể đánh giá!',
                });
            }
        }
    };

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center flex-col md:flex-row">
                    <div className="text-center max-w-[200px] aspect-square rounded-full overflow-hidden shadow-md object-contain">
                        <img className="block aspect-square object-cover" src={data.image} alt="doctor" />
                    </div>
                    <div className="m-5">
                        <h3 className="mb-3 text-3xl font-semibold">Bác sĩ {data.name}</h3>
                        <p
                            className="text-sm font-normal leading-6"
                            dangerouslySetInnerHTML={{ __html: data.shortDescription }}
                        ></p>
                    </div>
                </div>
                <div className="my-10 flex items-start flex-col lg:flex-row">
                    <div className="flex-1">
                        <DatePicker
                            inputReadOnly={true}
                            defaultValue={moment(dateValue)}
                            format="DD-MM-yyyy"
                            onChange={(e) => {
                                setDateValue(moment(e).format('yyyy-MM-DD'));
                                setAlreadyBooking(shifts);
                                if (
                                    moment(e).unix() >=
                                    moment(
                                        `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
                                            new Date().getDate() + 1
                                        }`,
                                    ).unix()
                                ) {
                                    setBookingOnDate(
                                        data.booking.filter((booking) => {
                                            return (
                                                moment(booking.date).date() === moment(e).date() &&
                                                moment(booking.date).month() === moment(e).month() &&
                                                moment(booking.date).year() === moment(e).year()
                                            );
                                        }),
                                    );
                                }
                            }}
                        />
                        <div className="my-5">
                            <p className="font-semibold uppercase text-xl">
                                <FontAwesomeIcon className="mr-2" icon={faCalendar} />
                                Lịch khám
                            </p>
                            {new Date(dateValue).getTime() > new Date().getTime() ? (
                                <div className="my-2 overflow-x-auto flex items-center flex-wrap justify-center md:justify-start ">
                                    {alreadyBooking.map((shift, index) => (
                                        <Link
                                            state={{
                                                shift,
                                                dateValue,
                                                data,
                                            }}
                                            to="/booking"
                                            key={shift.sequence}
                                            className="mr-4 mb-4 min-w-[150px] text-center bg-gray-200 p-1 hover:bg-yellow-50 duration-500"
                                        >
                                            <p className="font-medium text-lg">Ca {shift.sequence}</p>
                                            <span className="font-normal text-sm">
                                                Từ {shift.timeStart}:00 đến {shift.timeEnd}:00
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <h1 className="font-semibold text-base mt-4 text-red-500">Không có lịch khám</h1>
                            )}
                        </div>
                    </div>
                    <div className="pl-5 lg:border-l-[0.5px] border-gray-500 mt-8 lg:mt-0">
                        <div>
                            <p className="mb-2 uppercase text-xl font-medium">ĐỊA CHỈ KHÁM</p>
                            <p className="font-semibold text-xl">{data.hospital.name}</p>
                            <p className="text-base">{data.hospital.address}</p>
                        </div>
                        <div className="mt-2 flex items-end ">
                            <p className="font-base font-normal">
                                {' '}
                                Giá khám: <span className="font-semibold text-orange-500">{data.price}</span> VNĐ
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="mx-3 text-lg lg:mx-0 border-t border-gray-300 py-4 rich-text"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                ></div>
                <div className="mx-3 lg:mx-0 border-t border-gray-300 py-4">
                    <p className="mb-4 text-2xl font-semibold">Phản hồi của bệnh nhân sau khi đi khám</p>
                    <div className="">
                        {pageReviews.map((review) => (
                            <Item key={review._id} name={review.name} content={review.content} />
                        ))}
                        {reviews.length > 10 && (
                            <div className="flex justify-center my-4">
                                <Pagination
                                    onChange={(page) => {
                                        setPage(page);
                                        let newPageData = [];
                                        for (let index = page * 10 - 10; index < page * 10; index++) {
                                            reviews[index] && newPageData.push(reviews[index]);
                                        }
                                        setPageReviews(newPageData);
                                    }}
                                    current={page}
                                    pageSize={10}
                                    defaultCurrent={1}
                                    total={reviews.length}
                                />
                            </div>
                        )}
                    </div>
                    <Button
                        onClick={() => {
                            setModalOpen(true);
                        }}
                        className="mt-4 w-full"
                        type="primary"
                    >
                        Viết đánh giá
                    </Button>
                </div>
                <ReviewModal
                    id={data._id}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    handleSubmit={handleSubmitModal}
                />
            </div>
        );
    }
}

export default DetailDoctor;
