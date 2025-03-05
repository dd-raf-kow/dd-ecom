window.isValidEmail = function (email) {
    console.log('email from isValidEmail', email);
    if (typeof email !== 'string') {
        console.log('Invalid email: not a string');
        return;
    }
    const trimmedEmail = email.trim();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (regex.test(trimmedEmail)) {
        return trimmedEmail;
    } else {
        console.log('Invalid email format:', email);
        return;
    }
};