import classNames from 'classnames/bind';
import styles from '../Form.module.scss';

import { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faUpload, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import SunEditor, { buttonList } from 'suneditor-react';
import { Link } from 'react-router-dom';
import Popup from '~/components/Popup/Popup';
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

    const handleDeleteDescImage = (index) => {
        console.log(index);
        let newDescImages = descImages.filter((img) => img !== descImages[index]);
        setDescImages(newDescImages);
    };

    const handleClickBtn = (data) => {
        console.log(data);
    };
    return (
        <div className={cx('container')}>
            <h1 className={cx('title')}>Add Hospital</h1>
            <div className={cx('form')}>
                <div className={cx('form-info')}>
                    <div className={cx('form-group')}>
                        <label htmlFor="name" className={cx('label')}>
                            Name
                        </label>
                        <input
                            name="name"
                            {...register('name', { required: true })}
                            className={cx('input', errors.name && 'error')}
                            id="name"
                            placeholder="Name of doctor..."
                        />
                        {errors.name?.type === 'required' && <p className={cx('err-mess')}>Feild is required!</p>}
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="address" className={cx('label')}>
                            Địa chỉ
                        </label>
                        <input
                            name="adress"
                            {...register('adress', { required: true })}
                            className={cx('input', errors.name && 'error')}
                            id="adress"
                            placeholder="Address..."
                        />
                        {errors.adress?.type === 'required' && <p className={cx('err-mess')}>Feild is required!</p>}
                    </div>

                    <div className={cx('form-group')}>
                        <label htmlFor="description" className={cx('label')}>
                            Giới Thiệu
                        </label>
                        <div className={cx('editor', errors.description && 'error')}>
                            <Controller
                                name="description"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <SunEditor
                                        setDefaultStyle="font-size: 16px;height: 300px; position: relative ;z-index: 9999"
                                        setContents={value}
                                        onChange={(value) => (value === '<p><br></p>' ? onChange('') : onChange(value))}
                                        setOptions={{
                                            buttonList: [
                                                // default
                                                ['undo', 'redo'],
                                                [
                                                    // ':p-More Paragraph-default.more_paragraph',
                                                    // 'font',
                                                    // 'fontSize',
                                                    'formatBlock',
                                                    // 'paragraphStyle',
                                                    // 'blockquote',
                                                ],

                                                ['bold', 'underline', 'italic'],
                                                ['list', 'outdent', 'indent'],
                                                // ['table', 'link'],
                                                // ['fullScreen'],
                                            ],
                                        }}
                                    />
                                )}
                            />
                        </div>
                        {errors.description && <p className={cx('err-mess')}>Feild is required!</p>}
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="strengths" className={cx('label')}>
                            Thế mạnh chuyên môn
                        </label>
                        <div className={cx('editor', errors.strengths && 'error')}>
                            <Controller
                                name="strengths"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <SunEditor
                                        setDefaultStyle="font-size: 16px;height: 90px; position: relative ;z-index: 9999"
                                        setContents={value}
                                        onChange={(value) => (value === '<p><br></p>' ? onChange('') : onChange(value))}
                                        setOptions={{
                                            buttonList: [
                                                // default
                                                ['undo', 'redo'],
                                                ['bold', 'underline', 'italic'],
                                                ['list', 'outdent', 'indent'],
                                                // ['table', 'link'],
                                                // ['fullScreen'],
                                            ],
                                        }}
                                    />
                                )}
                            />
                        </div>

                        {errors.strengths && <p className={cx('err-mess')}>Feild is required!</p>}
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="equipments" className={cx('label')}>
                            Trang thiết bị
                        </label>
                        <div className={cx('editor', errors.equipments && 'error')}>
                            <Controller
                                name="equipments"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <SunEditor
                                        setDefaultStyle="font-size: 16px;height: 90px; position: relative ;z-index: 9999"
                                        setContents={value}
                                        onChange={(value) => (value === '<p><br></p>' ? onChange('') : onChange(value))}
                                        setOptions={{
                                            buttonList: [
                                                // default
                                                ['undo', 'redo'],
                                                ['bold', 'underline', 'italic'],
                                                ['list', 'outdent', 'indent'],
                                                // ['table', 'link'],
                                                // ['fullScreen'],
                                            ],
                                        }}
                                    />
                                )}
                            />
                        </div>

                        {errors.equipments && <p className={cx('err-mess')}>Feild is required!</p>}
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="procedure" className={cx('label')}>
                            Quy trình khám bệnh
                        </label>
                        <div className={cx('editor', errors.procedure && 'error')}>
                            <Controller
                                name="procedure"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <SunEditor
                                        setDefaultStyle="font-size: 16px;height: 90px; position: relative ;z-index: 9999"
                                        setContents={value}
                                        onChange={(value) => (value === '<p><br></p>' ? onChange('') : onChange(value))}
                                        setOptions={{
                                            buttonList: [
                                                // default
                                                ['undo', 'redo'],
                                                ['bold', 'underline', 'italic'],
                                                ['list', 'outdent', 'indent'],
                                                // ['table', 'link'],
                                                // ['fullScreen'],
                                            ],
                                        }}
                                    />
                                )}
                            />
                        </div>

                        {errors.procedure && <p className={cx('err-mess')}>Feild is required!</p>}
                    </div>
                </div>
                <div className={cx('form-image')}>
                    <div className={cx('avatar')}>
                        <input
                            name="avatar"
                            type="file"
                            accept="image/png, image/jpeg"
                            hidden
                            id="avatar"
                            {...register('image', {
                                onChange: (e) => {
                                    imageChange(e);
                                },
                                required: true,
                            })}
                        />
                        <div className={cx('image-upload', errors.image && 'error')}>
                            <label className={cx('upload-label')} htmlFor="avatar">
                                <FontAwesomeIcon icon={faUpload} />
                            </label>
                            {imageUrl !== '' && (
                                <img
                                    onError={(event) => (event.target.style.display = 'none')}
                                    src={URL.createObjectURL(imageUrl)}
                                    className={cx('image-preview')}
                                />
                            )}
                        </div>
                        {errors.image && <p className={cx('err-mess')}>Image is required!</p>}

                        <Button className={cx('add-image-btn')} htmlFor="imageUpload" type="primary">
                            Add Image
                        </Button>
                    </div>

                    <div className={cx('image-desc')}>
                        <input
                            type="file"
                            name="filefield"
                            multiple="multiple"
                            id="imageDesc"
                            hidden
                            accept="image/png, image/jpeg"
                            onChange={(e) => descImageChange(e)}
                        />
                        {/* {imageUrl !== '' && (
                            <img
                                onError={(event) => (event.target.style.display = 'none')}
                                src={URL.createObjectURL(imageUrl)}
                                className={cx('image-preview')}
                            />
                        )} */}
                        <div className={cx('image-desc-preview-list')}>
                            <label htmlFor="imageDesc" className={cx('image-desc-label')}>
                                <FontAwesomeIcon icon={faSquarePlus} />
                            </label>
                            {descImages.map((img, index) => (
                                <div key={index} className={cx('desc-image-preview')} style={{ position: 'relative' }}>
                                    <img
                                        onError={(event) => (event.target.style.display = 'none')}
                                        src={URL.createObjectURL(img)}
                                        className={cx('image-desc-img')}
                                    />
                                    <FontAwesomeIcon
                                        onClick={() => handleDeleteDescImage(index)}
                                        className={cx('desc-img-delete')}
                                        icon={faCircleXmark}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Button onClick={handleSubmit(handleClickBtn)} size="full" type="primary">
                Submit
            </Button>
        </div>
    );
}

export default HospitalForm;
