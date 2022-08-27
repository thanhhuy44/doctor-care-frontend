import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from '~/components/Button/Button';
import styles from '../Form.module.scss';
import Popup from '~/components/Popup/Popup';

const cx = classNames.bind(styles);

function DoctorForm() {
    const [displayPopup, setDisplayPopup] = useState(false);
    return (
        <div className={cx('container')}>
            <div className={cx('avatar')}>
                <div className={cx('info')}>
                    <img
                        className={cx('avatar-img')}
                        alt="avatar"
                        src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/278175118_674612020411605_4919349129629040580_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=P23574XRG7oAX_aAPPA&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT80lvhGW_4E7qVJzDpm2TCmSs8fm13N5csFR5IJnh5beA&oe=630F0C81"
                    />
                    <Button
                        onClick={() => setDisplayPopup(!displayPopup)}
                        title="Thay đổi ảnh đại diện"
                        className={cx('btn')}
                    >
                        <FontAwesomeIcon icon={faFilePen} />
                    </Button>
                    <Popup display={displayPopup}>
                        <input type="file" />
                        <div>
                            <Button onClick={() => setDisplayPopup(!displayPopup)}>Hủy</Button>
                            <Button
                                onClick={() => {
                                    alert('hi');
                                    setDisplayPopup(!displayPopup);
                                }}
                            >
                                Lưu
                            </Button>
                        </div>
                    </Popup>
                </div>
            </div>
        </div>
    );
}

export default DoctorForm;
