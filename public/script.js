// Base de datos ficticia de celulares
const products = [
    { id: 1, name: "iPhone 15 Pro", price: 999, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300" },
    { id: 2, name: "Samsung Galaxy S23", price: 799, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300" },
    { id: 3, name: "Xiaomi 13T", price: 499, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300" },
    { id: 4, name: "Google Pixel 8", price: 699, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300" }
];

let cart = [];

// Elementos del DOM
const productsContainer = document.getElementById("products-container");
const cartBtn = document.getElementById("cart-btn");
const closeCartBtn = document.getElementById("close-cart");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotalPrice = document.getElementById("cart-total-price");
const checkoutBtn = document.getElementById("checkout-btn");

// Cargar productos en la pantalla
function renderProducts() {
    productsContainer.innerHTML = "";
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <button class="btn" onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Agregar producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartUI();
}

// Actualizar la interfaz del carrito
function updateCartUI() {
    cartCount.textContent = cart.length;
    cartItemsContainer.innerHTML = "";
    
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement("li");
        li.classList.add("cart-item");
        li.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price} <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none; cursor:pointer;">❌</button></span>
        `;
        cartItemsContainer.appendChild(li);
    });

    cartTotalPrice.textContent = total.toFixed(2);
}

// Eliminar producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Event Listeners para abrir y cerrar el Modal
cartBtn.addEventListener("click", () => {
    cartModal.style.display = "flex";
});

closeCartBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
});

checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
    } else {
        alert("¡Gracias por tu compra!");
        cart = [];
        updateCartUI();
        cartModal.style.display = "none";
    }
});

// Inicializar
renderProducts();