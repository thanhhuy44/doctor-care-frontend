import { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';
import styles from '../../Form/Form.module.scss';
import SunEditor, { buttonList } from 'suneditor-react';
import { Link } from 'react-router-dom';
import Popup from '~/components/Popup/Popup';
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
            <form onSubmit={handleSubmit(handleClickBtn)} className={cx('form')}>
                <div className={cx('form-info')}>
                    <div className={cx('form-group')}>
                        <label htmlFor="firstName" className={cx('label')}>
                            First Name
                        </label>
                        <input
                            name="firstName"
                            {...register('firstName', { required: true })}
                            className={cx('input', errors.name && 'error')}
                            id="firstName"
                            placeholder="Name of doctor..."
                        />
                        {errors.firstName?.type === 'required' && <p className={cx('err-mess')}>Feild is required!</p>}
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="lastName" className={cx('label')}>
                            Last Name
                        </label>
                        <input
                            name="lastName"
                            {...register('lastName', { required: true })}
                            className={cx('input', errors.name && 'error')}
                            id="lastName"
                            placeholder="Name of doctor..."
                        />
                        {errors.lastName?.type === 'required' && <p className={cx('err-mess')}>Feild is required!</p>}
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="phoneNumber" className={cx('label')}>
                            Phone Number
                        </label>
                        <input
                            name="phoneNumber"
                            {...register('phoneNumber', {
                                required: true,
                                pattern: {
                                    value: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                                    message: 'Please enter valid number phone!',
                                },
                            })}
                            className={cx('input', errors.phoneNumber && 'error')}
                            id="phoneNumber"
                            placeholder="Phone number..."
                        />
                        {errors.phoneNumber?.type === 'required' && (
                            <p className={cx('err-mess')}>Feild is required!</p>
                        )}
                        {errors.phoneNumber?.message && <p className={cx('err-mess')}>{errors.phoneNumber.message}</p>}
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="email" className={cx('label')}>
                            Email
                        </label>
                        <input
                            name="email"
                            {...register('email', {
                                required: true,
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Please enter valid email!',
                                },
                            })}
                            className={cx('input', errors.email && 'error')}
                            id="email"
                            placeholder="email..."
                        />
                        {errors.email?.type === 'required' && <p className={cx('err-mess')}>Feild is required!</p>}
                        {errors.email?.message && <p className={cx('err-mess')}>{errors.email.message}</p>}
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="birth" className={cx('label')}>
                            Birth Day
                        </label>
                        <input
                            name="birthDay"
                            {...register('birthDay', {
                                required: true,
                            })}
                            type="date"
                            className={cx('input', errors.birthDay && 'error')}
                            id="birth"
                            placeholder=""
                        />
                        {errors.birthDay?.type === 'required' && <p className={cx('err-mess')}>Feild is required!</p>}
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="specialty" className={cx('label')}>
                            Specialty (chuyen khoa)
                        </label>
                        <select
                            name="specialty"
                            {...register('specialty', {
                                required: true,
                            })}
                            id="specialty"
                            className={cx('input', errors.specialty && 'error')}
                        >
                            <option value="">-- Chon chuyen khoa --</option>
                            <option value="6308bd86a8c5328bb7300f87">Chuyen khoa 1</option>
                            <option value="6308bd86a8c5328bb7300f87">Chuyen khoa 2</option>
                            <option value="6308bd86a8c5328bb7300f87">Chuyen khoa 3</option>
                            <option value="6308bd86a8c5328bb7300f87">Chuyen khoa 4</option>
                            <option>Them chuyen khoa</option>
                        </select>
                        {errors.specialty?.type === 'required' && <p className={cx('err-mess')}>Feild is required!</p>}
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="hospital" className={cx('label')}>
                            Hospital
                        </label>
                        <select
                            name="hospital"
                            {...register('hospital', {
                                required: true,
                                onChange: (e) => {
                                    if (e.target.value.startsWith('/')) {
                                        window.open(e.target.value);
                                    } else {
                                        return;
                                    }
                                },
                            })}
                            id="hospital"
                            className={cx('input', errors.hospital && 'error')}
                        >
                            <option value="">-- Chon benh vien --</option>
                            <option value="6308bd86a8c5328bb7300f87">Benh vien 1</option>
                            <option value="6308bd86a8c5328bb7300f87">Benh vien 2</option>
                            <option value="6308bd86a8c5328bb7300f87">Benh vien 3</option>
                            <option value="6308bd86a8c5328bb7300f87">Benh vien 4</option>
                            <option value="/admin">
                                <Link to="/admin">Them Benh vien</Link>
                            </option>
                        </select>
                        {errors.hospital?.type === 'required' && <p className={cx('err-mess')}>Feild is required!</p>}
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="shortDescription" className={cx('label')}>
                            Short Description
                        </label>
                        <div className={cx('editor', errors.shortDescription && 'error')}>
                            <Controller
                                name="shortDescription"
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
                        {/* <input
                            name="shortDescription"
                            {...register('shortDescription', {
                                required: true,
                            })}
                            id="shortDescription"
                            placeholder="Type description..."
                            className={cx('input', errors.shortDescription && 'error')}
                        /> */}
                        {errors.shortDescription && <p className={cx('err-mess')}>Feild is required!</p>}
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="description" className={cx('label')}>
                            Description
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
                        {/* <input
                            value={descValue}
                            name="description"
                            {...register('description', {
                                required: true,
                            })}
                            hidden
                            id="description"
                            placeholder="Type description..."
                            className={cx('input', errors.description && 'error')}
                        /> */}
                        {errors.description && <p className={cx('err-mess')}>Feild is required!</p>}
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="price" className={cx('label')}>
                            Price (Gia kham)
                        </label>
                        <input
                            defaultValue={200000}
                            name="price"
                            type="number"
                            step={50000}
                            {...register('price', { required: true })}
                            id="price"
                            placeholder="Type description..."
                            className={cx('input', errors.price && 'error')}
                        />
                        {errors.price?.type === 'required' && <p className={cx('err-mess')}>Feild is required!</p>}
                    </div>
                </div>
                <div className={cx('form-image')}>
                    <input
                        name="image"
                        type="file"
                        accept="image/png, image/jpeg"
                        hidden
                        id="imageUpload"
                        {...register('image', {
                            onChange: (e) => {
                                imageChange(e);
                            },
                            required: true,
                        })}
                    />
                    <div className={cx('image-upload', errors.image && 'error')}>
                        <label className={cx('upload-label')} htmlFor="imageUpload">
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
            </form>
            <Button onClick={handleSubmit(handleClickBtn)} size="full" type="primary">
                Submit
            </Button>
        </div>
    );
}

export default DoctorForm;
