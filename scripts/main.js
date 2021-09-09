// LOGS THE USER OUT
function logout() {
  localStorage.clear();
  window.location = "./login.html";
}

// SHOWS USER INFORMATION
const user = JSON.parse(localStorage.getItem("user"));
if (user != null) {
  document.querySelector(
    "#greeting"
  ).innerHTML = `Hello there ${user.full_name}`;
}

// FETCHES ALL THE PRODUCTS
const products = JSON.parse(localStorage.getItem("products"));
function getProducts() {
  fetch(`https://ecommerce-final-eomp.herokuapp.com/product/${user.user_id}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      const user_products = res.data;

      // products = user_products;
      // localStorage.setItem("products", JSON.stringify(user_products));
      showProducts(user_products);
    });
}
getProducts();

// DISPLAYS THE PRODUCTS
function showProducts(products) {
  let container = document.querySelector("#products");
  container.innerHTML = "";

  products.forEach((product) => {
    container.innerHTML += `
        <div class="product-card">
            <img class="product-image" src="${product.image}" alt="" />
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">R${product.price}</p>
            <button class="addToCart">Add to the cart</button>
        </div>
        `;
    document.querySelectorAll(".addToCart").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        addToCart(
          e.currentTarget.parentElement.querySelector(".product-title")
            .innerHTML,
          e.currentTarget.parentElement.querySelector(".product-price")
            .innerHTML,
          e.currentTarget.parentElement.querySelector(".product-image").src
        );
      });
    });
  });
}

// TOGGLES MODAL FOR CREATING A PRODUCT
function toggleCreateProductModal() {
  document.querySelector("#create-product-modal").classList.toggle("active");
}

// CREATES A PRODUCT
function createProduct() {
  const image = document.querySelector(".addImage").src;
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

// CODE FOR CLOUDINARY
// ALLOWS ADMIN TO ADD IMAGE FROM THEIR DEVICE INSTEAD OF IMAGE ADDRESS
function previewFile() {
  const image = document.querySelector(".addImage");
  const file = document.querySelector("#image").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      // CONVERT IMAGE FILE TO BASE24 STRING
      image.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}
document.querySelector("#image").addEventListener("change", previewFile);

// CART
var cart = [];
if (window.localStorage["cart"]) {
  cart = JSON.parse(window.localStorage["cart"]);
}

function addToCart(name, price, image) {
  let item = { image: image, name: name, price: price };
  for (let x in cart) {
    if (item.name == cart[x].name) {
      return;
    }
  }
  cart.push(item);
  window.localStorage["cart"] = JSON.stringify(cart);
  console.log(JSON.parse(window.localStorage["cart"]));
}

// HOVER FOR CONTACT PAGE
document.querySelector("#contact").addEventListener("mouseover", contact());

function contact() {
  let contact = document.querySelector("#contact");
  contact.classList.toggle("blur");
}
