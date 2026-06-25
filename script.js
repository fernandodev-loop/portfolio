const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");

const temaSalvo = localStorage.getItem("tema");

if (temaSalvo === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const modoEscuro =
        document.body.classList.contains("dark");

    if (modoEscuro) {
        themeToggle.textContent = "🌙";
        localStorage.setItem("tema", "dark");
    } else {
        themeToggle.textContent = "☀️";
        localStorage.setItem("tema", "light");
    }

});

navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const expanded =
        navToggle.getAttribute("aria-expanded") === "true";

    navToggle.setAttribute(
        "aria-expanded",
        !expanded
    );
});

const form = document.getElementById("formContato");
const modal = document.getElementById("modal");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const nome = document
        .getElementById("nome")
        .value
        .trim();

    const email = document
        .getElementById("email")
        .value
        .trim();

    const mensagem = document
        .getElementById("mensagem")
        .value
        .trim();

    if(
        nome === "" ||
        email === "" ||
        mensagem === ""
    ){
        alert("Preencha todos os campos.");
        return;
    }

    const emailValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailValido.test(email)){
        alert("Digite um e-mail válido.");
        return;
    }

    form.reset();

    modal.classList.add("active");
});

function fecharModal(){
    modal.classList.remove("active");
}

window.addEventListener("click", (e) => {
    if(e.target === modal){
        fecharModal();
    }
});

document
.querySelectorAll(".nav-links a")
.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});
