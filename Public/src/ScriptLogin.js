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
<<<<<<< HEAD
            window.location.href = "../templates/productos.html";
=======
            window.location.href = "../Public/Templates/productos.html";
>>>>>>> b2219171d777dfb611a57fb0396d4e84e254b4d7
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });
}); 