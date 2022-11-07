import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Hospital.module.scss';
import Section from '~/components/Section';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Loading';
import BookingItem from '~/components/BookingItem';
import { Pagination } from 'antd';
import request from '~/utils';

const cx = classNames.bind(styles);

function Hospital() {
    const [data, setData] = useState([]);
    const [doctorData, setDoctorData] = useState([]);
    const [packageData, setPackageData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        request.get(`/hospital/${id}`).then((res) => {
            setData(res.data);
            setDoctorData(res.data.doctors);
            setPackageData(res.data.healthPackages);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className="block pt-10">
                <div className="container mx-auto block">
                    <div className="mx-3 flex items-center flex-wrap justify-center lg:justify-start">
                        <div className="py-3 md:mr-8">
                            <img className="block w-[400px] rounded" src={data.image} alt={data.alias} />
                        </div>
                        <div className="block text-center md:text-left">
                            <h3 className="mb-3 text-xl">{data.name}</h3>
                            <p className="text-base">
                                <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                                <span className={cx('address-text')}>{data.address}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-7">
                    <Section>
                        <h4 className={cx('section-title')}>GIỚI THIỆU</h4>
                        <div
                            className="rich-text mt-2 text-base "
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        ></div>
                    </Section>
                    <Section>
                        <h4 className={cx('section-title')}>Lợi thế chuyên môn</h4>
                        <div
                            className="rich-text mt-2 text-base "
                            dangerouslySetInnerHTML={{ __html: data.strengths }}
                        ></div>
                    </Section>
                    <Section>
                        <h4 className={cx('section-title')}>Trang thiết bị</h4>
                        <div
                            className="rich-text mt-2 text-base "
                            dangerouslySetInnerHTML={{ __html: data.equipments }}
                        ></div>
                    </Section>
                    <Section>
                        <h4 className={cx('section-title')}>quy trình khám bệnh</h4>
                        <div
                            className="rich-text mt-2 text-base "
                            dangerouslySetInnerHTML={{ __html: data.procedure }}
                        ></div>
                    </Section>
                </div>
                {doctorData.length > 0 && (
                    <div className="container mx-auto py-4 px-3">
                        <h4 className="text-xl font-semibold uppercase block pb-[10px] border-b border-gray-500 my-4">
                            Bác sĩ
                        </h4>
                        {doctorData.slice(0, 10).map((doctor) => (
                            <BookingItem key={doctor._id} data={doctor} />
                        ))}
                        {doctorData.length > 10 && (
                            <div className="flex justify-center">
                                <Pagination
                                    onChange={(page) => {
                                        let newPageData = [];
                                        for (let index = page * 10 - 10; index < page * 10; index++) {
                                            data.doctors[index] && newPageData.push(data[index]);
                                        }
                                        setDoctorData(newPageData);
                                    }}
                                    pageSize={10}
                                    defaultCurrent={1}
                                    total={data.length}
                                />
                            </div>
                        )}
                    </div>
                )}
                {packageData.length > 0 && (
                    <div className="container mx-auto py-4 px-3">
                        <h4 className="text-xl font-semibold uppercase block pb-[10px] border-b border-gray-500 my-4">
                            Gói khám
                        </h4>
                        {packageData.slice(0, 10).map((doctor) => (
                            <BookingItem key={doctor._id} data={doctor} />
                        ))}
                        {packageData.length > 10 && (
                            <div className="flex justify-center">
                                <Pagination
                                    onChange={(page) => {
                                        let newPageData = [];
                                        for (let index = page * 10 - 10; index < page * 10; index++) {
                                            data.healthPackages[index] && newPageData.push(data[index]);
                                        }
                                        setPackageData(newPageData);
                                    }}
                                    pageSize={10}
                                    defaultCurrent={1}
                                    total={data.length}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default Hospital;
