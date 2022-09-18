import { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';
import styles from '../../Form/Form.module.scss';
import SunEditor, { buttonList } from 'suneditor-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(styles);

function DoctorForm() {
    const {
        register,
        getValues,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm();
    const [imageUrl, setImageUrl] = useState('');
    const [descValue, setDescValue] = useState('');

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageUrl(e.target.files[0]);
        }
    };

    const handleClickBtn = (data) => {
        console.log(data);
        console.log(data.image[0]);
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };
        axios
            .post(
                'http://localhost:3030/api/doctor/create',
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    birthDay: data.birthDay,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    hospital: data.hospital,
                    specialty: data.specialty,
                    price: data.price,
                    description: data.description,
                    shortDescription: data.shortDescription,
                    image: data.image[0],
                },
                config,
            )
            .then((res) => console.log(res.data.message));
    };
    return (
        <div className={cx('container')}>
            <h1 className={cx('title')}>Add Doctor</h1>
        </div>
    );
}

export default DoctorForm;
