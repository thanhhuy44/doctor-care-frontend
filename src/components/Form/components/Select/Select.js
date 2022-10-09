import classNames from 'classnames/bind';
import styles from '../../Form.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Select(props) {
    const navigate = useNavigate();
    const { id, name, options, type, placeholder, onChange, error, defaultValue } = props;
    return (
        <div className={cx('form-group')}>
            <label className={cx('label')} htmlFor={id}>
                {name}
            </label>
            <select
                className={cx('input', error && 'error')}
                onChange={(e) => {
                    e.target.value.startsWith('/') ? navigate(e.target.value) : onChange(e.target.value);
                }}
                id={id}
                name={name}
                defaultValue={defaultValue}
            >
                {options.map((option, index) => (
                    <option
                        key={index}
                        value={type === 'address' ? option.name : option.value || option._id || option.id}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
            {error?.type === 'required' && <p className={cx('err-mess')}>Yêu cầu nhập trường này!!!</p>}
        </div>
    );
}

export default Select;
