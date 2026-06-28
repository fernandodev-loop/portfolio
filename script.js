// ================================
// Seleção dos elementos da página
// ================================

// Botão que abre e fecha o menu mobile
const navToggle = document.getElementById("navToggle");

// Container que contém os links do menu
const navLinks = document.getElementById("navLinks");

// Interruptor responsável por alternar o tema claro/escuro
const themeToggle = document.getElementById("themeToggle");


// ================================
// Tema Claro / Escuro
// ================================

// Recupera o tema salvo no navegador
const temaSalvo = localStorage.getItem("tema");

// Caso o tema salvo seja escuro...
if (temaSalvo === "dark") {

    // Adiciona a classe dark ao body
    document.body.classList.add("dark");

    // Marca o interruptor
    themeToggle.checked = true;
}

// Sempre que o usuário alterar o interruptor...
themeToggle.addEventListener("change", () => {

    // Se estiver marcado
    if (themeToggle.checked) {

        // Ativa o tema escuro
        document.body.classList.add("dark");

        // Salva a preferência
        localStorage.setItem("tema", "dark");

    } else {

        // Remove o tema escuro
        document.body.classList.remove("dark");

        // Salva o tema claro
        localStorage.setItem("tema", "light");

    }

});


// ================================
// Menu Mobile
// ================================

// Quando clicar no botão do menu
navToggle.addEventListener("click", () => {

    // Mostra ou esconde os links
    navLinks.classList.toggle("active");

    // Verifica se o menu já estava aberto
    const expanded =
        navToggle.getAttribute("aria-expanded") === "true";

    // Atualiza o atributo de acessibilidade
    navToggle.setAttribute(
        "aria-expanded",
        !expanded
    );

});


// ================================
// Formulário de Contato
// ================================

// Seleciona o formulário
const form = document.getElementById("formContato");

// Seleciona o modal de confirmação
const modal = document.getElementById("modal");

// Evento disparado ao enviar o formulário
form.addEventListener("submit", function(e){

    // Impede o recarregamento da página
    e.preventDefault();

    // Obtém o nome digitado
    const nome = document
        .getElementById("nome")
        .value
        .trim();

    // Obtém o e-mail
    const email = document
        .getElementById("email")
        .value
        .trim();

    // Obtém a mensagem
    const mensagem = document
        .getElementById("mensagem")
        .value
        .trim();

    // Verifica se algum campo ficou vazio
    if(
        nome === "" ||
        email === "" ||
        mensagem === ""
    ){

        alert("Preencha todos os campos.");
        return;
    }

    // Expressão regular para validar e-mail
    const emailValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Caso o e-mail seja inválido
    if(!emailValido.test(email)){

        alert("Digite um e-mail válido.");
        return;

    }

    // Limpa o formulário
    form.reset();

    // Exibe o modal de sucesso
    modal.classList.add("active");

});


// ================================
// Fechar Modal
// ================================

// Função responsável por fechar o modal
function fecharModal(){

    modal.classList.remove("active");

}


// ================================
// Fecha o modal clicando fora dele
// ================================

window.addEventListener("click", (e) => {

    // Se o clique foi na área escura do modal
    if(e.target === modal){

        fecharModal();

    }

});


// ================================
// Fecha o menu mobile após clicar
// em um dos links
// ================================

document
.querySelectorAll(".nav-links a")
.forEach(link => {

    link.addEventListener("click", () => {

        // Remove a classe active
        navLinks.classList.remove("active");

    });

});
