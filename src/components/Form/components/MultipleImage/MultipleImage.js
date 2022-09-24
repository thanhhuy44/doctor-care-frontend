import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from '../../Form.module.scss';

const cx = classNames.bind(styles);

function MultipleImage(props) {
    const { id, name, error, onChange, className } = props;
    const [previewImg, setPreviewImg] = useState([]);

    const handleDelImage = (item) => {
        const newPreviewImg = previewImg.filter((img) => img !== item);
        setPreviewImg(newPreviewImg);
        onChange(newPreviewImg);
    };

    return (
        <div className={cx('form-group') + ' flex items-center justify-center'}>
            <label className={cx('label') + ' block w-full text-left'} htmlFor={id}>
                {name}
            </label>
            <div className={cx('container', className, error && 'error')}>
                <div className={cx('descImage-label')}>
                    <label htmlFor={id}>
                        <FontAwesomeIcon icon={faSquarePlus} />
                    </label>
                    <input
                        onChange={(e) => {
                            setPreviewImg([...previewImg, ...e.target.files]);
                            onChange([...previewImg, ...e.target.files]);
                        }}
                        id={id}
                        accept="image/png, image/gif, image/jpeg"
                        hidden
                        multiple
                        type="file"
                        name={name}
                    />
                </div>
                {previewImg.map((item, index) => (
                    <div key={index} className={cx('descImage-preview')}>
                        <img
                            onError={(e) => (e.target.style.display = 'none')}
                            onLoad={(event) => (event.target.style.display = 'block')}
                            alt="preview-img"
                            className={cx('descImage-preview-img')}
                            src={URL.createObjectURL(item)}
                        />
                        <span onClick={() => handleDelImage(item)} className={cx('del-btn')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MultipleImage;
