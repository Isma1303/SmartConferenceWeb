document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("LoginSmart");

    // Lista de usuarios válidos
    const Users = [
        { "usuario": "iliquez", "contraseña": "adminuser" },
        { "usuario": "oCastro", "contraseña": "password1" },
        { "usuario": "anaBriones", "contraseña": "useranaB@smart" },
        { "usuario": "julioMonzon", "contraseña": "userjulioM@smart" },
        { "usuario": "erickBriones", "contraseña": "usererickB@smart" },
        { "usuario": "susyBriones", "contraseña": "usersusyB@smart" },
        { "usuario": "maiteRendon", "contraseña": "usermaiteR@smart" },
        { "usuario": "adauryGranados", "contraseña": "useradauryG@smart" },
        { "usuario": "ericLiquez", "contraseña": "userericL@smart" },
        { "franciscoPerez": "anaBriones", "contraseña": "userfranciscoP@smart" },
    ];

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("user").value;
        const password = document.getElementById("password").value;

        const userFound = Users.find(user => user.usuario === username && user.contraseña === password);

        if (userFound) {
            window.location.href = "../templates/productos.html";
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });
}); 