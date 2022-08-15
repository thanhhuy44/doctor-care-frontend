import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button(props) {
    const { type, size, className, to, href, onClick, ...passProps } = props;
    const handle = { onClick, ...passProps };
    var Comp = 'button';
    if (to) {
        Comp = Link;
        handle.to = to;
    } else if (href) {
        Comp = 'a';
        handle.href = href;
    }
    return (
        <Comp className={cx('button', type, size, className)} {...handle}>
            This is Button
        </Comp>
    );
}

export default Button;
