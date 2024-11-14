document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("LoginSmart");

    // Lista de usuarios válidos
    const Users = [
        { "usuario": "iLiquez", "contraseña": "password0" },
        { "usuario": "oCastro", "contraseña": "password1" },
        { "usuario": "eMejia", "contraseña": "password2" }
    ];

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("user").value;
        const password = document.getElementById("password").value;

        const userFound = Users.find(user => user.usuario === username && user.contraseña === password);

        if (userFound) {
            window.location.href = "/Public/Templates/productos.html"; // Asegúrate de que esta ruta sea correcta
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });
});