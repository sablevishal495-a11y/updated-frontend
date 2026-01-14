/* ================= CART STORAGE ================= */

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ================= CART COUNT ================= */

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = count;
  });
}

/* ================= ADD TO CART ================= */

function addToCart(name, price, image) {
  const cart = getCart();
  const item = cart.find(p => p.name === name);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({
      name,
      price,
      image,
      qty: 1
    });
  }

  saveCart(cart);
  updateCartCount();

  alert(`${name} added to cart`);
}

/* ================= RENDER CART ================= */

function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total-amount");

  if (!container || !totalEl) return;

  const cart = getCart();
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `
      <p style="text-align:center; margin-top:40px;">
        🛒 Your cart is empty
      </p>
    `;
    totalEl.textContent = "₹0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-info">
          <h3>${item.name}</h3>
          <p class="price">₹${item.price}</p>

          <div class="quantity">
            <button onclick="changeQty(${index}, -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>
      </div>
    `;
  });

  totalEl.textContent = "₹" + total;
}


/* ================= CHANGE QUANTITY ================= */

function changeQty(index, delta) {
  const cart = getCart();

  cart[index].qty += delta;
  if (cart[index].qty < 1) cart[index].qty = 1;

  saveCart(cart);
  renderCart();
  updateCartCount();
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
});
