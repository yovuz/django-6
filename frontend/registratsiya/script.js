const API_URL = "http://127.0.0.1:8000/api/";


document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const response = await fetch(API_URL + "register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful! You can now log in.");
        window.location.href = "login.html";
      } else {
        alert("Error: " + JSON.stringify(data));
      }
    });
  }


  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const username = document.getElementById("loginUsername").value;
      const password = document.getElementById("loginPassword").value;

      const response = await fetch(API_URL + "login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("access_token", data.access);
        alert("Login successful!");
        window.location.href = "../profil/profile-form.html";
      } else {
        alert("Invalid credentials!");
      }
    });
  }


  if (window.location.pathname.endsWith("index.html")) {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("You are not logged in!");
      window.location.href = "login.html";
    } else {
      document.getElementById("welcomeText").innerText =
        "Welcome to the Dashboard!";
    }

   
    document.getElementById("logout").addEventListener("click", function () {
      localStorage.removeItem("access_token");
      alert("Logged out!");
      window.location.href = "login.html";
    });
  }

  async function fetchImages(token) {
    const response = await fetch(API_URL + "pictures/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const imageDisplay = document.getElementById("imageDisplay");
      imageDisplay.innerHTML = ""; 
      data.forEach((picture) => {
        const img = document.createElement("img");
        img.src = API_URL.replace("/api/", "") + picture.image; 
        img.style.maxWidth = "200px";
        img.style.margin = "10px";
        imageDisplay.appendChild(img);
      });
    } else {
      console.error("Failed to fetch images:", response);
    }
  }

  async function uploadImage(file, token) {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(API_URL + "pictures/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      alert("Image uploaded successfully!");
      fetchImages(token); 
    } else {
      alert("Image upload failed.");
      console.error("Image upload failed:", response);
    }
  }

  if (window.location.pathname.endsWith("index.html")) {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("You are not logged in!");
      window.location.href = "login.html";
    } else {
      document.getElementById("welcomeText").innerText =
        "Welcome to the Dashboard!";
      fetchImages(token); 
    }

  
    document.getElementById("logout").addEventListener("click", function () {
      localStorage.removeItem("access_token");
      alert("Logged out!");
      window.location.href = "login.html";
    });


    document
      .getElementById("uploadButton")
      .addEventListener("click", function () {
        const fileInput = document.getElementById("imageUpload");
        const file = fileInput.files[0];
        if (file) {
          uploadImage(file, token);
        } else {
          alert("Please select an image.");
        }
      });
  }
});
