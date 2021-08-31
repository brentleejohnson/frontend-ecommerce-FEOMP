function getProducts() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  //   fetch("https://ecommerce-final-eomp.herokuapp.com/product/")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
}
getProducts();
