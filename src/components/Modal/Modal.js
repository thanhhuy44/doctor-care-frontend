function Modal({ children }) {
    return (
        <div className="fix top-0 right-0 bottom-0 left-0 flex items-center justify-center">
            <div className="p-2 rounded shadow-xl bg-white">{children}</div>
        </div>
    );
}

export default Modal;
