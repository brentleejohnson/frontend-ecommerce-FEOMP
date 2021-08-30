function register() {
  // GETTING DATA FROM FORM
  let full_name = document.querySelector("#full_name").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  console.log(full_name, email, password);

  //   SEND DATA TO API
  fetch("https://ecommerce-final-eomp.herokuapp.com/users/", {
    method: "POST",
    body: JSON.stringify({
      full_name,
      email,
      password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.status_code == 201);
      {
        document.querySelector("#error").innerHTML =
          "You have successfully registered, please sign in to continue";
        setTimeout(function () {
          window.location = "./index.html";
        }, 3000);
      }
    });
}
