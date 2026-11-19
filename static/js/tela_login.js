const formularioLogin = document.getElementById("formulario");
const mensagem = document.getElementById("mensagem");
const mensagemEmail = document.getElementById("mensagem-email");
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const vizualizar = document.getElementById("vizualizar");
const botaoClaro = document.getElementById("botao-tema-claro");
const botaoEscuro = document.getElementById("botao-tema-escuro");

// Mostrar / Ocultar senha
vizualizar.addEventListener("click", function () {
  if (inputSenha.type === "password") {
    inputSenha.type = "text";
    vizualizar.innerHTML = '<img src="/static/img/olho.png" alt="Ocultar">';
  } else {
    inputSenha.type = "password";
    vizualizar.innerHTML =
      '<img src="/static/img/estrabismo.png" alt="Mostrar">';
  }
});

// Limpar mensagem geral e erros nos inputs ao digitar
formularioLogin.addEventListener("input", function () {
  if (inputEmail.value !== "" || inputSenha.value !== "") {
    mensagem.innerHTML = "";
    mensagem.classList.remove("erro");
  }
  inputEmail.classList.remove("erro");
  inputSenha.classList.remove("erro");
});

// Validação visual do @gmail.com
inputEmail.addEventListener("input", function () {
  let valorEmail = inputEmail.value.trim();
  if (valorEmail === "" || valorEmail.endsWith("@gmail.com")) {
    mensagemEmail.innerHTML = "";
    mensagemEmail.classList.remove("erro-email");
  } else {
    mensagemEmail.innerHTML = "Precisa-se usar @gmail.com";
    mensagemEmail.classList.add("erro-email");
  }
});

// Envio do login para o Flask (/login)
formularioLogin.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = inputEmail.value.trim();
  const senha = inputSenha.value;

  mensagem.className = "";
  mensagem.innerHTML = "";

  // Validações antes do envio
  if (email === "" && senha === "") {
    mensagem.innerHTML = "Preencha todos os campos!";
    mensagem.classList.add("erro");
    return;
  }

  if (email === "") {
    inputEmail.placeholder = "Digite seu email!";
    inputEmail.classList.add("erro");
    return;
  }

  // Impede o envio se o email não terminar com @gmail.com
  if (!email.endsWith("@gmail.com")) {
    mensagemEmail.innerHTML = "Precisa-se usar @gmail.com";
    mensagemEmail.classList.add("erro-email");
    inputEmail.focus();
    return;
  }

  if (senha === "") {
    inputSenha.placeholder = "Digite sua senha!";
    inputSenha.classList.add("erro");
    return;
  }

  try {
    const resposta = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    // Verifica se o servidor retornou JSON antes de fazer o parse
    const contentType = resposta.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Erro no servidor (Status ${resposta.status})`);
    }

    const resultado = await resposta.json();

    if (resposta.ok) {
      mensagem.innerHTML = resultado.mensagem;
      mensagem.classList.add("sucesso");
      window.location.href = resultado.redirecionar; // Vai para /inicio
    } else {
      mensagem.innerHTML = resultado.mensagem;
      mensagem.classList.add("erro");
    }
  } catch (erro) {
    console.error("Erro ao fazer login:", erro);
    mensagem.innerHTML = "Erro de conexão com o servidor.";
    mensagem.classList.add("erro");
  }
});

// Alternar tema escuro e claro
botaoEscuro.addEventListener("click", function () {
  document.body.classList.add("dark-mode");
  botaoEscuro.style.display = "none";
  botaoClaro.style.display = "block";
});

botaoClaro.addEventListener("click", function () {
  document.body.classList.remove("dark-mode");
  botaoClaro.style.display = "none";
  botaoEscuro.style.display = "block";
});
