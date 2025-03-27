const connectionDB = require('../../../../backend/db/db');

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Por favor, ingrese usuario y contraseña');
        return;
    }

    try {
        const connection = await connectionDB();
        const [rows] = await connection.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

        if (rows.length > 0) {
            window.location.href = '../../templates/index.html';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error interno del servidor. Inténtalo más tarde.');
    }
});
