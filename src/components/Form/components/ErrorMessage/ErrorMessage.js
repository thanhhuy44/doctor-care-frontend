function ErrorMessage({ className, message }) {
    return <p className={`${className} text-sm text-red-500 mt-1`}>{message}</p>;
}

export default ErrorMessage;
