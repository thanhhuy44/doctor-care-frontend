import classNames from 'classnames/bind';
import styles from '../../Form.module.scss';
import { useForm } from 'react-hook-form';

const cx = classNames.bind(styles);

function FeildInput(props) {
    const { name, placeholder, required } = props;
    const {
        register,
        getValues,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    return (
        <div className={cx('form-group')}>
            <label className={cx('label')} htmlFor={name}>
                {name}
            </label>
            <input
                {...register(name, { required: required })}
                id={name}
                className={cx('input')}
                placeholder={placeholder}
            />
        </div>
    );
}

export default FeildInput;
