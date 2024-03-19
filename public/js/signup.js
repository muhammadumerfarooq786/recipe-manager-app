function registerUser() {
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  // Make a POST API call to user registration endpoint
  fetch("/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          "Registration failed or Email Already Exist. Please check your information."
        );
      }
    })
    .then((user) => {
      // Redirect to login page or desired location upon successful registration
      window.location.href = "/login";
    })
    .catch((error) => alert(error));
}
