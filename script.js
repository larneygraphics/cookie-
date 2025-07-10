// Cart data store
let cart = [];

// Selectors
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartSection = document.getElementById('cart-section');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

// Create and insert clear/checkout buttons
const clearBtn = document.createElement('button');
clearBtn.textContent = 'Clear Cart';
clearBtn.style.marginRight = '10px';

const checkoutBtn = document.createElement('button');
checkoutBtn.textContent = 'Checkout';

const buttonWrapper = document.createElement('div');
buttonWrapper.appendChild(clearBtn);
buttonWrapper.appendChild(checkoutBtn);
cartSection.appendChild(buttonWrapper);

// Add to Cart Logic
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    updateCartDisplay();
    cartSection.style.display = 'block';
  });
});

// Update Cart Display
function updateCartDisplay() {
  cartItemsList.innerHTML = '';
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x ${item.qty} - Ksh ${item.price * item.qty}`;
    cartItemsList.appendChild(li);

    total += item.price * item.qty;
    count += item.qty;
  });

  cartTotal.textContent = total;
  cartCount.textContent = count;
}

// Clear Cart
clearBtn.addEventListener('click', () => {
  cart = [];
  updateCartDisplay();
  cartSection.style.display = 'none';
});

// Checkout
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  alert('Order placed successfully!');
  cart = [];
  updateCartDisplay();
  cartSection.style.display = 'none';
});
