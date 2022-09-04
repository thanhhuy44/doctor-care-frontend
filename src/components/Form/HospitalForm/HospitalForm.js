import classNames from 'classnames/bind';
import styles from '../Form.module.scss';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faUpload, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import SunEditor, { buttonList } from 'suneditor-react';
import axios from 'axios';

const cx = classNames.bind(styles);

function HospitalForm() {
    const {
        register,
        getValues,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm();
    const [imageUrl, setImageUrl] = useState('');
    const [descImages, setDescImages] = useState([]);
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageUrl(e.target.files[0]);
        }
    };
    const descImageChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            let fileList = [...e.target.files];
            await setDescImages([...descImages, ...fileList]);
            console.log(descImages);
        }
    };

    const handleDeleteDescImage = async (index) => {
        await setDescImages(() => descImages.filter((img) => img !== descImages[index]));
    };

    const handleClickBtn = (data) => {
        console.log(data);
    };
    return (
        <div className={cx('container')}>
            <h1 className={cx('title')}>Add Hospital</h1>
        </div>
    );
}

export default HospitalForm;
