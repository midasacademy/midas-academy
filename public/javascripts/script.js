
const validAdmin = {
    username: "admin",
    password: "admin"
  };
  
  const form = document.getElementById("login-form");
  
  form.addEventListener("submit", function (event) {
    event.preventDefault();
  
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
  
    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;
  
    if (
      enteredUsername === validAdmin.username &&
      enteredPassword === validAdmin.password
    ) {
      alert("Login successful! Redirecting to admin dashboard...");
      // You can redirect to the admin dashboard page here.
    } else {
      alert("Invalid credentials. Please try again.");
    }
  
    // Clear input fields
    usernameInput.value = "";
    passwordInput.value = "";
  });
  