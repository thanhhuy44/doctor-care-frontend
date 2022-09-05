import classNames from 'classnames/bind';
import styles from '../../Form.module.scss';

const cx = classNames.bind(styles);

function Select(props) {
    const { id, name, options, type, placeholder, onChange, error } = props;
    return (
        <div className={cx('form-group')}>
            <label className={cx('label')} htmlFor={id}>
                {name}
            </label>
            <select className={cx('input', error && 'error')} onChange={onChange} id={id} name={name}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error?.type === 'required' && <p className={cx('err-mess')}>Yêu cầu nhập trường này!!!</p>}
        </div>
    );
}

export default Select;
