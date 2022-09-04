import classNames from 'classnames/bind';
import styles from '../../Form.module.scss';
import { useForm } from 'react-hook-form';

const cx = classNames.bind(styles);

function FeildInput(props) {
    const { id, name, type, placeholder, onChange, error } = props;

    return (
        <div className={cx('form-group')}>
            <label className={cx('label')} htmlFor={id}>
                {name}
            </label>
            <input
                type={type}
                onChange={onChange}
                id={id}
                className={cx('input', error && 'error')}
                placeholder={placeholder}
            />
            {error?.type === 'required' && <p className={cx('err-mess')}>Yêu cầu nhập trường này!!!</p>}
            {error?.message && <p className={cx('err-mess')}>{error.message}</p>}
        </div>
    );
}

export default FeildInput;
