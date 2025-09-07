/* ========== Menú hamburguesa ========== */
const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("header nav ul");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

/* ========== Smooth Scrolling ========== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ========== Filtro de Proyectos ========== */
function filterProjects(category) {
  const projects = document.querySelectorAll("#projects article");
  projects.forEach((project) => {
    if (category === "all" || project.dataset.category === category) {
      project.style.display = "flex";
    } else {
      project.style.display = "none";
    }
  });
}

// Botones para filtrar
const filterButtons = document.querySelectorAll("[data-filter]");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    filterProjects(category);
  });
});

/* ========== Lightbox para imágenes de proyectos ========== */
const images = document.querySelectorAll("#projects img");
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);

images.forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    const imgElement = document.createElement("img");
    imgElement.src = img.src;
    lightbox.innerHTML = "";
    lightbox.appendChild(imgElement);
  });
});

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

/* ========== Validación de Formulario ========== */
const form = document.querySelector("#contact form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const message = document.querySelector("#message");

    clearErrors();

    if (!name.value.trim()) {
      showError(name, "El nombre es obligatorio.");
      isValid = false;
    }

    if (!validateEmail(email.value)) {
      showError(email, "Por favor ingresa un correo válido.");
      isValid = false;
    }

    if (!message.value.trim()) {
      showError(message, "El mensaje no puede estar vacío.");
      isValid = false;
    }

    if (isValid) {
      alert("¡Mensaje enviado correctamente!");
      form.reset();
    }
  });
}

/* ========== Funciones auxiliares ========== */
function showError(input, message) {
  const error = document.createElement("small");
  error.style.color = "red";
  error.textContent = message;
  input.insertAdjacentElement("afterend", error);
}

function clearErrors() {
  document.querySelectorAll("small").forEach((el) => el.remove());
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}
