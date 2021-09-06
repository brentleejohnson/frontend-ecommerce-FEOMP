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
        <p class="cart-description">${item.description}</p>
        <p class="cart-price">R${item.price}</p>
      </div>
      `;
  });
}
showCart(cart);
