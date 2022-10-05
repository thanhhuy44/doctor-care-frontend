import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from '../../Form.module.scss';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function Input(props) {
    const { id, name, multiple, error, onChange, defaultValue } = props;
    const [previewSrc, setPreviewSrc] = useState('');

    return (
        <div className={cx('form-group') + ' flex items-center justify-center'}>
            <div className={cx('preview', error && 'error')}>
                <label className={cx('label-img')} htmlFor={id}>
                    <FontAwesomeIcon icon={faFileUpload} />
                </label>
                <img
                    onError={(e) => (e.target.style.display = 'none')}
                    onLoad={(event) => (event.target.style.display = 'block')}
                    className={cx('preview-img')}
                    alt="preview-img"
                    src={previewSrc || defaultValue}
                />
            </div>
            <input
                name="name"
                accept="image/png, image/gif, image/jpeg"
                hidden
                multiple={multiple}
                type="file"
                onChange={(e) => {
                    setPreviewSrc(URL.createObjectURL(e.target.files[0]));
                    onChange(e.target.files[0]);
                }}
                id={id}
                className={cx('input', error && 'error')}
            />
            {error?.type === 'required' && <p className={cx('err-mess')}>Yêu cầu nhập trường này!!!</p>}
            {error?.message && <p className={cx('err-mess')}>{error.message}</p>}
            <Button type="primary" className={cx('add-image-btn')} htmlFor={id}>
                Thêm ảnh đại diện
            </Button>
        </div>
    );
}

export default Input;
