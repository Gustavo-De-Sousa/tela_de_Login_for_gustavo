
const formulario = document.getElementById("formulario");
const mensagem = document.getElementById("mensagem");
const mensagemEmail = document.getElementById("mensagem-email");
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");



const SenhaUsuario = "1234"
const LoginUsuario = "teste12@gmail.com"


formulario.addEventListener("input", function() {
    if (email !== "" || senha !== ""){
        mensagem.classList.remove("erro");
    }

});


email.addEventListener("input", function() {

    let valorEmail = email.value;

    if (valorEmail.endsWith("@gmail.com")) {

        mensagemEmail.innerHTML = "E-mail válido!";
        mensagemEmail.classList.remove("erro");

    } else {

        mensagemEmail.innerHTML = "Precisa-se usar @gmail.com";
        mensagemEmail.classList.add("erro");

    }

});

formulario.addEventListener("submit", function(event){

    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    mensagem.className = "";
    if (email === "" && senha === "") {

        mensagem.innerHTML = "Preencha todos os campos!";
        mensagem.classList.add("erro");

    } 

    else if (email === LoginUsuario && senha === SenhaUsuario ) {

        mensagem.innerHTML = "Login realizado com sucesso!";
        mensagem.classList.add("sucesso");

    } 

    else if (email === "") {

        inputEmail.placeholder = "Digite seu email!";
        inputEmail.classList.add("erro");
    }
    else if (senha === "") {

        inputSenha.placeholder = "Digite sua senha!";
        inputSenha.classList.add("erro");
    }else {

        mensagem.innerHTML = "Email ou senha incorretos!";
        mensagem.classList.add("erro");

    }

});