const checkEmptyForm = (valueform) => {
    valueform.forEach((value) => {
        return value.trim() === '' ? false : true;
    });
};

const checkEmptyFeild = (value) => {
    return value.trim() === '' ? false : true;
};

const checkIsEmail = (email) => {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        email,
    );
};

const checkIsPhoneNumber = (phoneNumber) => {
    return /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/g.test(phoneNumber);
};

export { checkEmptyFeild, checkEmptyForm, checkIsEmail, checkIsPhoneNumber };
