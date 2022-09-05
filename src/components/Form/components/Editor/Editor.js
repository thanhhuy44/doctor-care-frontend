import classNames from 'classnames/bind';
import SunEditor from 'suneditor-react';
import styles from '../../Form.module.scss';

const cx = classNames.bind(styles);

function Editor(props) {
    const { id, name, type, placeholder, onChange, error, className } = props;
    return (
        <div className={cx('form-group')}>
            <label className={cx('label')} htmlFor={id}>
                {name}
            </label>
            <div className={cx('editor', className, error && 'error')}>
                <SunEditor
                    type={type}
                    onChange={(e) => (e === '<p><br></p>' ? onChange('') : onChange(e))}
                    setOptions={{
                        buttonList: [
                            ['undo', 'redo'],
                            ['formatBlock', 'list', 'outdent', 'indent'],
                        ],
                        resizingBar: false,
                    }}
                    id={id}
                    placeholder={placeholder}
                />
            </div>
            {error?.type === 'required' && <p className={cx('err-mess')}>Yêu cầu nhập trường này!!!</p>}
            {error?.message && <p className={cx('err-mess')}>{error.message}</p>}
        </div>
    );
}

export default Editor;
