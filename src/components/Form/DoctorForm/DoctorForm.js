import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';
import styles from '../../Form/Form.module.scss';
import { checkEmptyFeild, checkEmptyForm } from '../Validator';

const cx = classNames.bind(styles);

function DoctorForm() {
    const [imageUrl, setImageUrl] = useState('');
    const imageValueRef = useRef();

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [hospital, setHospital] = useState('');
    const [price, setPrice] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const [errors, setErrors] = useState({});
    const formfeilds = [name, phoneNumber, birthDay, email, specialty, hospital, price, shortDescription, description];

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageUrl(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        console.log({
            name,
            phoneNumber,
            birthDay,
            email,
            specialty,
            hospital,
            price,
            shortDescription,
            description,
        });
        if (checkEmptyFeild(name)) {
            return;
        } else {
            console.log('is Empty');
        }
        if (checkEmptyForm(formfeilds)) {
            return;
        } else {
            formfeilds.forEach((value) => {
                setErrors({ ...errors, value });
            });
            console.log(errors);
        }
    };

    return (
        <div className={cx('container')}>
            <h1 className={cx('title')}>Add Doctor</h1>
            <div className={cx('form')}>
                <div className={cx('form-info')}>
                    <div className={cx('form-group')}>
                        <label htmlFor="name" className={cx('label')}>
                            Name
                        </label>
                        <input
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className={cx('input')}
                            id="name"
                            placeholder=""
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="phoneNumber" className={cx('label')}>
                            Phone Number
                        </label>
                        <input
                            name="phoneNumber"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            value={phoneNumber}
                            className={cx('input')}
                            id="phoneNumber"
                            placeholder=""
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="email" className={cx('label')}>
                            Email
                        </label>
                        <input
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className={cx('input')}
                            id="email"
                            placeholder=""
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="birth" className={cx('label')}>
                            Birth Day
                        </label>
                        <input
                            name="birthDay"
                            onChange={(e) => setBirthDay(e.target.value)}
                            value={birthDay}
                            type="date"
                            className={cx('input')}
                            id="birth"
                            placeholder=""
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="specialty" className={cx('label')}>
                            Specialty (chuyen khoa)
                        </label>
                        <select
                            name="specialty"
                            onChange={(e) => setSpecialty(e.target.value)}
                            value={specialty}
                            id="specialty"
                            className={cx('input')}
                        >
                            <option value="">-- Chon chuyen khoa --</option>
                            <option value="1">Chuyen khoa 1</option>
                            <option value="2">Chuyen khoa 2</option>
                            <option value="3">Chuyen khoa 3</option>
                            <option value="4">Chuyen khoa 4</option>
                            <option>Them chuyen khoa</option>
                        </select>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="specialty" className={cx('label')}>
                            Hospital
                        </label>
                        <select
                            name="hospital"
                            onChange={(e) => setHospital(e.target.value)}
                            value={hospital}
                            id="specialty"
                            className={cx('input')}
                        >
                            <option>-- Chon benh vien --</option>
                            <option value="Benh vien 1">Benh vien 1</option>
                            <option value="Benh vien 2">Benh vien 2</option>
                            <option value="Benh vien 3">Benh vien 3</option>
                            <option value="Benh vien 4">Benh vien 4</option>
                            <option>Them Benh vien</option>
                        </select>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="shortDescription" className={cx('label')}>
                            Short Description
                        </label>
                        <input
                            name="shortDescription"
                            onChange={(e) => setShortDescription(e.target.value)}
                            value={shortDescription}
                            id="shortDescription"
                            placeholder="Type description..."
                            className={cx('input')}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="description" className={cx('label')}>
                            Description
                        </label>
                        <input
                            name="description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            id="description"
                            placeholder="Type description..."
                            className={cx('input')}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="price" className={cx('label')}>
                            Price (Gia kham)
                        </label>
                        <input
                            name="price"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            id="price"
                            placeholder="Type description..."
                            className={cx('input')}
                        />
                    </div>
                </div>
                <div className={cx('form-image')}>
                    <input ref={imageValueRef} type="file" hidden id="imageUpload" onChange={imageChange} />
                    <div className={cx('image-upload')}>
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

                    <Button htmlFor="imageUpload" type="primary">
                        Add Image
                    </Button>
                </div>
            </div>
            <Button onClick={handleSubmit} size="full" type="primary">
                Submit
            </Button>
        </div>
    );
}

export default DoctorForm;
