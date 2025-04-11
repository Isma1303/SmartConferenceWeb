const connectionDB = require('/backend/db/db');
const bcrypt = require('bcrypt');

// Create modal HTML structure
const modalHTML = `
<div id="errorModal" class="modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 1000;">
    <div style="position: relative; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 5px; max-width: 400px;">
        <h2 style="color: #dc3545;">Error de Autenticación</h2>
        <p id="modalMessage">Credenciales incorrectas. Por favor, verifique sus datos.</p>
        <button onclick="closeModal()" style="background-color: #dc3545; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Cerrar</button>
    </div>
</div>
`;

// Add modal to document body
document.body.insertAdjacentHTML('beforeend', modalHTML);

// Modal functions
function showModal(message) {
    const modal = document.getElementById('errorModal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('errorModal');
    modal.style.display = 'none';
}

// Password visibility toggle
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.getElementById('togglePassword');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        passwordInput.type = 'password';
        toggleButton.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

// Add password toggle button after password input
const passwordInput = document.getElementById('password');
const toggleButton = document.createElement('button');
toggleButton.id = 'togglePassword';
toggleButton.type = 'button';
toggleButton.innerHTML = '<i class="fas fa-eye"></i>';
toggleButton.className = 'password-toggle-btn';
passwordInput.parentNode.insertBefore(toggleButton, passwordInput.nextSibling);
toggleButton.addEventListener('click', togglePasswordVisibility);

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const userInput = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!userInput || !password) {
        showModal('Por favor, ingrese todos los campos requeridos');
        return;
    }

    try {
        const connection = await connectionDB();
        
        // Get user by username/email
        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            [userInput, userInput]
        );

        if (rows.length > 0) {
            const user = rows[0];
            // Compare hashed password
            const match = await bcrypt.compare(password, user.password);
            
            if (match) {
                // Successful login - redirect to index.ejs
                window.location.href = '/src/templates/index.ejs';
            } else {
                showModal('Usuario/Email o contraseña incorrectos');
            }
        } else {
            showModal('Usuario/Email o contraseña incorrectos');
        }

        // Close the database connection
        await connection.end();
    } catch (error) {
        console.error('Error:', error);
        showModal('Error interno del servidor. Por favor, inténtelo más tarde.');
    }
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('errorModal');
    if (event.target === modal) {
        closeModal();
    }
}
