function loginUser() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  // Make API call to user login endpoint
  fetch(`/user/login?email=${email}&password=${password}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Login failed. Please check your credentials.");
      }
    })
    .then((user) => {
      // If login is successful, create session
      createSession(user);
    })
    .catch((error) => alert(error));
}

function createSession(user) {
  // Make API call to create session endpoint
  fetch("/user/create-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: user._id,
      username: user.username,
      email: user.email,
    }),
  })
    .then((response) => {
      if (response.ok) {
        // Redirect to home page or desired location upon successful login
        window.location.href = "/";
        alert("Login successful");
      } else {
        throw new Error("Session creation failed.");
      }
    })
    .catch((error) => alert(error));
}
