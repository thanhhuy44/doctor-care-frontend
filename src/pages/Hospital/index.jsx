import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Hospital.module.scss';
import Button from '~/components/Button/Button';
import Section from '~/components/Section';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../Loading';

const cx = classNames.bind(styles);

function Hospital() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        axios.get(`http://localhost:3030/api/hospital/${id}`).then((res) => {
            setData(res.data.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <Loading />;
    } else {
        return (
            <div className="block">
                <div className="container mx-auto block">
                    <div className="flex items-center">
                        <div className="py-3 mr-3">
                            <img className="block max-w-[120px] h-[60px]" src={data.image} alt={data.alias} />
                        </div>
                        <div className="block">
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
                        <div className="" dangerouslySetInnerHTML={{ __html: data.description }}></div>
                    </Section>
                    <Section>
                        <h4 className={cx('section-title')}>Lợi thế chuyên môn</h4>
                        <div className="" dangerouslySetInnerHTML={{ __html: data.strengths }}></div>
                    </Section>
                    <Section>
                        <h4 className={cx('section-title')}>Trang thiết bị</h4>
                        <div className="" dangerouslySetInnerHTML={{ __html: data.equipments }}></div>
                    </Section>
                    <Section>
                        <h4 className={cx('section-title')}>quy trình khám bệnh</h4>
                        <div className="" dangerouslySetInnerHTML={{ __html: data.procedure }}></div>
                    </Section>
                </div>
            </div>
        );
    }
}

export default Hospital;
