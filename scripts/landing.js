const user = JSON.parse(localStorage.getItem("user"));
document.querySelector("#greeting").innerHTML = `Hello there ${user.full_name}`;

function getProducts() {
  fetch(`https://ecommerce-final-eomp.herokuapp.com/product/${user.user_id}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      const products = res.data;

      if (products.length == 0) {
        document.querySelector("#products").innerHTML =
          "You have no products yet, please create one.";
      } else {
        showProducts(products);
      }
    });
}

getProducts();

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
        </div>
        `;
  });
}

function logout() {
  localStorage.clear();
  window.location = "./index.html";
}

function toggleCreateProductModal() {
  document.querySelector("#create-product-modal").classList.toggle("active");
}

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
    });
}

// Code input for products page
// JSON.parse(localStorage.getItem("user"))
// `<button onclick="addToCart(${id})"></button>`
// `<a href="login.html">Login</a>`
