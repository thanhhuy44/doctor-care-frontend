import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleCheck,
    faQuestionCircle,
    faTriangleExclamation,
    faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Button from '../Button/Button';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ isHide, btn, type, message, onClick }) {
    return (
        <div style={isHide ? { display: 'none' } : { display: 'flex' }} className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('info', type)}>
                    <p className={cx('icon')}>
                        {type === 'error' && <FontAwesomeIcon icon={faXmarkCircle} />}
                        {type === 'warning' && <FontAwesomeIcon icon={faTriangleExclamation} />}
                        {type === 'success' && <FontAwesomeIcon icon={faCircleCheck} />}
                        {type === 'question' && <FontAwesomeIcon icon={faQuestionCircle} />}
                    </p>
                    <p className={cx('message')}>{message || 'User Not found!'}</p>
                </div>
                <div className={cx('button')}>
                    {btn === 'YesNo' && (
                        <div>
                            <Button className={cx('btn')} type="primary">
                                No
                            </Button>
                            <Button className={cx('btn')} type="primary">
                                Yes
                            </Button>
                        </div>
                    )}
                    {btn === 'OkCancel' && (
                        <div>
                            <Button onClick={onClick.handleClick} className={cx('btn')} type="primary">
                                Cancel
                            </Button>
                            <Button onClick={onClick.handleExit} className={cx('btn')} type="primary">
                                OK
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Modal;
