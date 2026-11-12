
const formulario = document.getElementById("formulario");
const mensagem = document.getElementById("mensagem");
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");



const SenhaUsuario = "1234"
const LoginUsuario = "teste12@gmail.com"

formulario.addEventListener("submit", function(event){

    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    mensagem.className = "";
    if (email === "" && senha === "") {

        mensagem.innerHTML = "Preencha todos os campos!";
        mensagem.classList.add("erro");

    } else if (email === LoginUsuario && senha === SenhaUsuario ) {

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
    let contador = 5;
    function validarSenha (){
        if(senha !== SenhaUsuario){

                contador--;
                mensagem.innerHTML = 'voce tem ' + contador;
                mensagem.classList.add("erro");

        }
    }
});


