// LOGS THE USER OUT
function logout() {
  localStorage.clear();
  window.location = "./login.html";
}

cart = JSON.parse(window.localStorage["cart"]);
function showCart(cart) {
  console.log(cart);
  var total = 0;
  document.querySelector(".container").innerHTML = "";
  cart.forEach((item) => {
    document.querySelector(".container").innerHTML += `
      <div class="item">
        <img class="cart-image" src="${item.image}" alt="" />
        <h3 class="cart-name">${item.name}</h3>
        <p class="cart-price">${item.price}</p>
        <button onclick="removeFromCart(this)" class="cart-button">Delete</button>
      </div>
      `;
  });
}
showCart(cart);

// REMOVE FROM CART
function removeFromCart(e) {
  itemName = e.parentElement.querySelector(".cart-name").innerHTML;
  console.log(itemName);
  for (let x in cart) {
    if (itemName == cart[x].name) {
      cart.splice(x, 1);
      console.log(cart);
      window.localStorage["cart"] = JSON.stringify(cart);
    }
  }
  showCart(cart);
}
