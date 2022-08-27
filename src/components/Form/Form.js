import classNames from 'classnames/bind';
import styles from './Form.module.scss';

const cx = classNames.bind(styles);

function Form() {
    return (
        <div className={cx('container')}>
            <h1>This is form</h1>
        </div>
    );
}

export default Form;
