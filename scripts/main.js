fetch("http://127.0.0.1:5000/")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });

function login() {
  // GETTING DATA FROM FORM
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  console.log(email, password);

  //   SEND DATA TO API
  fetch("http://127.0.0.1:5000/users/", {
    method: "PATCH",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
