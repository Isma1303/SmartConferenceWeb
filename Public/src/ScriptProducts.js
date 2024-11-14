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
    alert(`Tu orden ha sido procesada. Total pagado: Q${total.toFixed(2)}`);

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
