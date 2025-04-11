//cart
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')
// open cart
cartIcon.onclick = () => {
    cart.classList.add('active')
}
// close cart
closeCart.onclick = () => {
    cart.classList.remove('active')
}
// cart working
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

// function
function ready() {
    // remove items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem, updateTotal())
    }
    // quiantity changes 
    var quiantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quiantityInputs.length; i++) {
        var input = quiantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    // add to cart
    var addCart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i]
        button.addEventListener('click', addCartClicked)
    }
    document
        .getElementsByClassName('btn-buy')[0]
        .addEventListener('click', buyButtonClicked);

}
// pay Button function
function buyButtonClicked() {
    // Obtener el método de pago seleccionado
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    // Obtener el total actual
    let total = parseFloat(document.getElementsByClassName('total-price')[0].innerText.replace("Q", ""));

    // Si el método de pago es tarjeta, agregar el 5%
    if (paymentMethod === 'tarjeta') {
        total += total * 0.05; // Agregar 5% al total
    }

    // Actualizar el total en la interfaz
    document.getElementsByClassName('total-price')[0].innerText = 'Q' + total.toFixed(2);

    // Mostrar el total en el alert
    // alert(`Tu orden ha sido procesada. Total pagado: Q${total.toFixed(2)}`);

    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal()
}
// quiantity changes
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value < + 0) {
        input.value = 1
    }
    updateTotal()
}
function addCartClicked(event) {
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText
    var price = shopProducts.getElementsByClassName('price')[0].innerText
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src
    addProductToCart(title, price, productImg)
    updateTotal()
}
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div")
    cartShopBox.classList.add("cart-box")
    var cartItems = document.getElementsByClassName("cart-content")[0]
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert('Ya esta este producto en el carrito');
            return;
        }
    }

    var cartBoxContent = `

                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <i class='bx bx-trash cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName('cart-remove')[0]
        .addEventListener('click', removeCartItem);
    cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChanged);
    // update total
}
function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = document.getElementsByClassName('cart-box')
    var total = 0
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('cart-price')[0]
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace("Q", ""))
        var quantity = quantityElement.value
        total = total + (price * quantity)

        total = Math.round(total * 100) / 100

        document.getElementsByClassName('total-price')[0].innerText = 'Q' + total


    }
}


        // // Importar las funciones necesarias de Firebase
        // import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
        // import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

        // // Configuración de Firebase
        // const firebaseConfig = {
        //     apiKey: "AIzaSyAfCUIkzmvFID38aezo72XIRB3fVzodC2Q",
        //     authDomain: "smartconference-2024.firebaseapp.com",
        //     databaseURL: "https://smartconference-2024-default-rtdb.firebaseio.com",
        //     projectId: "smartconference-2024",
        //     storageBucket: "smartconference-2024.firebasestorage.app",
        //     messagingSenderId: "495251658201",
        //     appId: "1:495251658201:web:d0a66836866535d773b5c8"
        // };

        // // Inicializar Firebase
        // const app = initializeApp(firebaseConfig);
        // const db = getDatabase(app);

        // // Obtener el botón de compra
        // const buyButtons = document.getElementsByClassName("btn-buy");
        // // Inicializa un array para almacenar los productos seleccionados
        // let selectedProducts = [];

        // // Función para agregar un producto a la lista
        // function addProductToList(productTitle, productPrice) {
        //     const product = {
        //         title: productTitle,
        //         price: parseFloat(productPrice.replace("Q", "")), // Convertir el precio a número
        //         quantity: 1 // Cantidad por defecto
        //     };
        //     selectedProducts.push(product);
        //     console.log('Producto agregado a la lista:', product);
        // }

        // // Función para actualizar el total dinámicamente
        // function updateTotal() {
        //     const quantities = document.querySelectorAll('.cart-quantity');
        //     let total = 0;

        //     quantities.forEach((quantity, index) => {
        //         const quantityValue = parseInt(quantity.value) || 1; // Valor por defecto 1 si el campo está vacío
        //         selectedProducts[index].quantity = quantityValue; // Actualiza la cantidad en el array
        //         total += selectedProducts[index].price * quantityValue; // Calcula el total
        //     });

        //     // Actualizar el total en la interfaz
        //     document.getElementsByClassName('total-price')[0].innerText = 'Q' + total.toFixed(2);
        // }

        // // Función para enviar la lista de productos y el total a Firebase
        // function sendPaymentToFirebase(paymentMethod, total) {
        //     const paymentsRef = ref(db, 'Pagos/' + Date.now()); // Usar timestamp como ID único

        //     // Crear un objeto de pago
        //     const paymentData = {
        //         products: selectedProducts,
        //         total: total,
        //         paymentMethod: paymentMethod,
        //     };

        //     // Almacenar el pago en Firebase
        //     set(paymentsRef, paymentData)
        //         .then(() => {
        //             console.log('Pago enviado correctamente:', paymentData);
        //         })
        //         .catch((error) => {
        //             console.error('Error al enviar el pago:', error);
        //         });

        //     // Limpiar la lista de productos después de enviar
        //     selectedProducts = [];
        // }

        // // Función que se ejecuta al hacer clic en el botón de compra
        // function buyButtonClicked() {
        //     const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;

        //     if (!paymentMethod) {
        //         alert('Por favor, selecciona un método de pago.');
        //         return;
        //     }

        //     // Actualizar el total antes de calcularlo
        //     updateTotal();

        //     // Calcular el total a partir de selectedProducts
        //     let total = selectedProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0);

        //     // Añadir el cargo extra si se paga con tarjeta
        //     if (paymentMethod === 'tarjeta') {
        //         total += total * 0.05; // Agregar 5% al total
        //     }

        //     alert(`Tu orden ha sido procesada. Total a pagar: Q${total.toFixed(2)}`);
        //     sendPaymentToFirebase(paymentMethod, total);

        //     const cartContent = document.getElementsByClassName('cart-content')[0];
        //     while (cartContent.hasChildNodes()) {
        //         cartContent.removeChild(cartContent.firstChild);
        //     }

        //     // Limpiar el array de productos seleccionados
        //     selectedProducts = [];
        // }

        // // Agregar evento a los inputs de cantidad
        // document.addEventListener('input', (event) => {
        //     if (event.target.classList.contains('cart-quantity')) {
        //         updateTotal();
        //     }
        // });

        // // Configurar los botones de agregar al carrito
        // const addCartButtons = document.querySelectorAll('.add-cart');
        // addCartButtons.forEach(button => {
        //     button.addEventListener('click', function () {
        //         const productBox = button.closest('.product-box');
        //         const productTitle = productBox.querySelector('.product-title').innerText;
        //         const productPrice = productBox.querySelector('.price').innerText;

        //         addProductToList(productTitle, productPrice);
        //     });
        // });

        // // Agregar evento al botón de compra
        // const payButton = document.querySelector('.btn-buy');
        // payButton.addEventListener('click', buyButtonClicked);

