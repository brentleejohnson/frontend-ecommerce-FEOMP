// SHOWS USER INFORMATION
const user = JSON.parse(localStorage.getItem("user"));
document.querySelector("#greeting").innerHTML = `Hello there ${user.full_name}`;
const products = JSON.parse(localStorage.getItem("products"));

// FETCHES ALL THE PRODUCTS
function getProducts() {
  fetch(`https://ecommerce-final-eomp.herokuapp.com/product/`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      const user_products = res.data;

      showProducts(user_products);
    });
}
getProducts();

// DISPLAYS THE PRODUCTS
function showProducts(products) {
  let container = document.querySelector("#products");
  container.innerHTML = ``;

  products.forEach((product) => {
    container.innerHTML += `
        <div class="product-card">
            <img class="product-image" src="${product.image}" alt="" />
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">R${product.price}</p>
            <button onclick="addToCart(${product.product_id})">Add to the cart</button>
        </div>
        `;
  });
}

// LOGS THE USER OUT
function logout() {
  localStorage.clear();
  window.location = "./login.html";
}

// TOGGLES MODAL FOR CREATING A PRODUCT
function toggleCreateProductModal() {
  document.querySelector("#create-product-modal").classList.toggle("active");
}

// CREATES A PRODUCT
function createProduct() {
  const image = document.querySelector("#image").value;
  const name = document.querySelector("#name").value;
  const description = document.querySelector("#description").value;
  const price = document.querySelector("#price").value;

  fetch("https://ecommerce-final-eomp.herokuapp.com/product/", {
    method: "POST",
    body: JSON.stringify({
      user_id: user.user_id,
      image,
      name,
      description,
      price,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      if (res.status_code == 201) {
        window.location.reload();
      }
    });
}

// Code input for products page
// JSON.parse(localStorage.getItem("user"))
// `<button onclick="addToCart(${id})"></button>`
// `<a href="login.html">Login</a>`
