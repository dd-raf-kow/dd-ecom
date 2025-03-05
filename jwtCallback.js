window.JWTcallback = async function (email) {
    console.log('email from JWTcallback', email.email);

    if (!window.isValidEmail(email.email)) {
        console.log('JWT: Invalid email address');
        return null;
    }

    try {
        const response = await fetch(
            `http://d0wwkg40woc80ck04g0kk84w.138.199.158.65.sslip.io:3000/get-jwt?email=${email.email}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }
        );

        const data = await response.json();

        if (data.token) {
            console.log('JWT: successfully generated', data.token);
            return data.token.toString();
        } else {
            console.log('Error:', data.error);
            return null;
        }
    } catch (error) {
        console.error('Error fetching JWT:', error);
        return null;
    }
};