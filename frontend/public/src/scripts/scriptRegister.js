// Create modal HTML structure
const modalHTML = `
<div id="messageModal" class="modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 1000;">
    <div style="position: relative; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 5px; max-width: 400px;">
        <h2 id="modalTitle" style="margin-bottom: 15px;">Mensaje</h2>
        <p id="modalMessage"></p>
        <div style="text-align: center; margin-top: 15px;">
            <button id="modalCloseBtn" style="background-color: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Cerrar</button>
        </div>
    </div>
</div>
`;

// Add modal to document body only if it doesn't exist
if (!document.getElementById('messageModal')) {
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    // Add click handler for modal close button
    document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
}

// Modal functions
function showModal(title, message, isError = false) {
    const modal = document.getElementById('messageModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    
    modalTitle.textContent = title;
    modalTitle.style.color = isError ? '#dc3545' : '#28a745';
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('messageModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form submission handler
document.getElementById('registerform').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const lastname = document.getElementById('lastname').value.trim();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Get submit button and disable while processing
    const btnRegister = document.getElementById('btnRegister');
    if (btnRegister) {
        btnRegister.disabled = true;
    }

    try {
        // Validate form inputs
        if (!name || !lastname || !username || !email || !password) {
            showModal('Error de Validación', 'Por favor, complete todos los campos.', true);
            btnRegister.disabled = false;
            return;
        }

        if (!isValidEmail(email)) {
            showModal('Error de Validación', 'Por favor, ingrese un email válido.', true);
            btnRegister.disabled = false;
            return;
        }

        if (password.length < 6) {
            showModal('Error de Validación', 'La contraseña debe tener al menos 6 caracteres.', true);
            btnRegister.disabled = false;
            return;
        }

        // Send registration data to server
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                lastname,
                email,
                username,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            showModal('Registro Exitoso', 'Usuario registrado correctamente. Redirigiendo al login...', false);
            
            // Clear form
            event.target.reset();
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } else {
            showModal('Error de Registro', data.message || 'Error al registrar usuario.', true);
        }

    } catch (error) {
        console.error('Error:', error);
        showModal('Error', 'Error al registrar usuario. Por favor, inténtelo más tarde.', true);
    } finally {
        // Re-enable submit button
        const btnRegister = document.getElementById('btnRegister');
        if (btnRegister) {
            btnRegister.disabled = false;
        }
    }
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('messageModal');
    if (event.target === modal) {
        closeModal();
    }
}

