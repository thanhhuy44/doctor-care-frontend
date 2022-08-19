import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Form.module.scss';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import Button from '../Button/Button';

const cx = classNames.bind(styles);

function Form() {
    const [content, setContent] = useState('');

    return (
        <div className={cx('container')}>
            <h1 className={cx('title')}>Add Doctor</h1>
            <div>
                <SunEditor
                    setOptions={{ buttonList: buttonList.complex }}
                    setContents={content}
                    onChange={setContent}
                />
            </div>
            <Button type="primary" onClick={() => console.log(content)}>
                Submit
            </Button>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}

export default Form;
