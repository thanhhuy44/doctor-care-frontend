import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button(props) {
    const { type, size, className, to, href, onClick, disable, title, htmlFor, ...passProps } = props;
    const handle = { onClick, disable, title, ...passProps };
    var Comp = 'button';
    if (to) {
        Comp = Link;
        handle.to = to;
    } else if (href) {
        Comp = 'a';
        handle.href = href;
    } else if (htmlFor) {
        Comp = 'label';
        handle.htmlFor = htmlFor;
    }
    return (
        <Comp className={cx('button', type, size, className)} {...handle}>
            {props.children}
        </Comp>
    );
}

export default Button;
