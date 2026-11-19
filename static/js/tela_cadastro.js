const TelaCadastro = document.getElementById("abrir-tela");
const modal = document.getElementById("modal");
const fecharModal = document.getElementById("fecharModal");
const campoEmail = document.getElementById("cadastro-email");
const mensagemEmailCadastro = document.getElementById("mensagem-email-cadastro",);
const campoNome = document.getElementById("cadastro-nome");
const campoSenha = document.getElementById("cadastro-senha");
const ConfirmarSenha = document.getElementById("confirmar-senha");
const btnCadastrar = document.getElementById("Cadastrar");
const mensagemSenhaCadastro = document.getElementById("mensagem-senha-cadastro");


TelaCadastro.addEventListener("click", function () {
  modal.classList.add("modal-activo");
});

fecharModal.addEventListener("click", function () {
  modal.classList.remove("modal-activo");
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.classList.remove("modal-activo");
  }
});

function validarFormulario() {

    const nomeValido = campoNome.value.trim() !== "";

    const emailValido = campoEmail.value.trim().endsWith("@gmail.com");

    const senha = campoSenha.value;

    const senhaValida =
        /[A-Z]/.test(senha) &&
        /[0-9]/.test(senha) &&
        /[^A-Za-z0-9]/.test(senha);

    if (nomeValido && emailValido && senhaValida) {
        btnCadastrar.disabled = false;
    } else {
        btnCadastrar.disabled = true;
    }
}

campoEmail.addEventListener("input", function () {

    let valorEmail = campoEmail.value.trim();

    if (valorEmail === "" || valorEmail.endsWith("@gmail.com")) {

        mensagemEmailCadastro.innerHTML = "";
        mensagemEmailCadastro.classList.remove("erro-email");

    } else {

        mensagemEmailCadastro.innerHTML = "Precisa-se usar @gmail.com";
        mensagemEmailCadastro.classList.add("erro-email");

    }

    validarFormulario();

});

campoNome.addEventListener("input", validarFormulario);

campoSenha.addEventListener("input", function () {

    const senha = campoSenha.value;

    const temMaiuscula = /[A-Z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    const temCaractere = /[^A-Za-z0-9]/.test(senha);

    if (temMaiuscula && temNumero && temCaractere) {

        mensagemSenhaCadastro.innerHTML = "";
        mensagemSenhaCadastro.classList.remove("erro-senha");

    } else if (!temMaiuscula) {

        mensagemSenhaCadastro.innerHTML = "Adicione uma letra maiúscula.";
        mensagemSenhaCadastro.classList.add("erro-senha");

    } else if (!temNumero) {

        mensagemSenhaCadastro.innerHTML = "Adicione um número.";
        mensagemSenhaCadastro.classList.add("erro-senha");

    } else if (!temCaractere) {

        mensagemSenhaCadastro.innerHTML = "Adicione um caractere especial.";
        mensagemSenhaCadastro.classList.add("erro-senha");

    }

    validarFormulario();

});


btnCadastrar.addEventListener("click", async (event) => {
  event.preventDefault();

  const dados = {
    nome: document.getElementById("cadastro-nome").value,

    email: document.getElementById("cadastro-email").value,

    senha: document.getElementById("cadastro-senha").value,
  };

  // Verificar se todos os campos foram preenchidos
  if (!dados.nome || !dados.email || !dados.senha) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    const resposta = await fetch("/cadastro", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(dados),
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      alert(resultado.mensagem);
      modal.classList.remove("modal-activo");
    } else {
      alert(resultado.mensagem);
    }
  } catch (erro) {
    console.error("Erro ao cadastrar:", erro);

    alert("Não foi possível realizar o cadastro.");
  }
});
