
const formulario = document.getElementById("formulario");
const mensagem = document.getElementById("mensagem");
const mensagemEmail = document.getElementById("mensagem-email");
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const vizualizar = document.getElementById("vizualizar");
const botaoClaro = document.getElementById("botao-tema-claro");
const botaoEscuro = document.getElementById("botao-tema-escuro");

const SenhaUsuario = "1234"
const LoginUsuario = "teste12@gmail.com"

vizualizar.addEventListener("click", function() {
    if(inputSenha.type === "password"){
        inputSenha.type = "text";
        vizualizar.innerHTML = '<img src="img/olho.png" alt="Ocultar">';


    } else{
        inputSenha.type = "password";
        vizualizar.innerHTML = '<img src="img/estrabismo.png" alt="Ocultar">';
        

    }
});
formulario.addEventListener("input", function() {
    if (email !== "" || senha !== ""){
        mensagem.classList.remove("erro");
    }

});


inputEmail.addEventListener("input", function() {

    let valorEmail = inputEmail.value;

    if (valorEmail.endsWith("@gmail.com")) {

        mensagemEmail.classList.remove("erro-email");

    } else {

        mensagemEmail.innerHTML = "Precisa-se usar '@gmail.com'";
        mensagemEmail.classList.add("erro-email");

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
    }
    else if (
        email === usuarios.email &&
        senha === usuarios.senha
    ) {

        window.location.href = "test.html";


    }else {

        mensagem.innerHTML = "Email ou senha incorretos!";
        mensagem.classList.add("erro");

    }


});

botaoEscuro.addEventListener("click", function() {

    document.body.classList.add("dark-mode");

    botaoEscuro.style.display = "none";
    botaoClaro.style.display = "block";

});

botaoClaro.addEventListener("click", function() {

    document.body.classList.remove("dark-mode");

    botaoClaro.style.display = "none";
    botaoEscuro.style.display = "block";

});