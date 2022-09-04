import classNames from 'classnames/bind';
import styles from '../../Form.module.scss';

const cx = classNames.bind(styles);

function FileInput(props) {
    const { id, name, multiple, error, onChange } = props;
    return (
        <div className={cx('form-group')}>
            <label className={cx('label')} htmlFor={id}>
                {name}
            </label>
            <input
                multiple={multiple}
                type="file"
                onChange={onChange}
                id={id}
                className={cx('input', error && 'error')}
            />
            {error?.type === 'required' && <p className={cx('err-mess')}>Yêu cầu nhập trường này!!!</p>}
            {error?.message && <p className={cx('err-mess')}>{error.message}</p>}
        </div>
    );
}

export default FileInput;
