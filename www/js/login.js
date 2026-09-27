const LOGIN_API_URL = 'http://localhost:3000/api/login';

document.addEventListener('DOMContentLoaded', () => {
    const existingToken = localStorage.getItem('authToken');

    if (existingToken) {
        window.location.href = 'index.html';
        return;
    }

    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const identifier = document.getElementById('identifier').value.trim();
        const password = document.getElementById('password').value;

        loginMessage.textContent = 'Logging in...';

        try {
            const response = await fetch(LOGIN_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    identifier,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                loginMessage.textContent =
                    data.message || 'Login failed';
                return;
            }

            localStorage.setItem('authToken', data.token);
            localStorage.setItem('studentId', data.student_id);

            window.location.href = 'index.html';

        } catch (error) {
            loginMessage.textContent =
                'Unable to connect to the server.';
        }
    });
});