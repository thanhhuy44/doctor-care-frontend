import classNames from 'classnames/bind';
import styles from '../../Form.module.scss';

const cx = classNames.bind(styles);

function FeildInput(props) {
    const { id, name, type, step, placeholder, onChange, error, defaultValue } = props;

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
                step={step}
                defaultValue={defaultValue}
            />
            {error?.type === 'required' && <p className={cx('err-mess')}>Yêu cầu nhập trường này!!!</p>}
            {error?.message && <p className={cx('err-mess')}>{error.message}</p>}
        </div>
    );
}

export default FeildInput;
