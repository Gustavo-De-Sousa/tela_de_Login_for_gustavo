const TelaCadastro = document.getElementById("abrir-tela");
const modal = document.getElementById("modal");
const fecharModal = document.getElementById("fecharModal");

TelaCadastro.addEventListener("click", function() {
    modal.classList.add("modal-activo");
});

fecharModal.addEventListener("click", function() {
    modal.classList.remove("modal-activo");
});

modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.classList.remove("modal-activo");
    }
});


const btnCadastrar = document.getElementById("Cadastrar");
btnCadastrar.addEventListener("click", async (event) => {


    event.preventDefault();

    const dados = {

        nome: document.getElementById("cadastro-nome").value,

        email: document.getElementById("cadastro-email").value,

        senha: document.getElementById("cadastro-senha").value

    };

    try {

        const resposta = await fetch("/cadastro", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dados)

        });

        const resultado = await resposta.json();

        alert(resultado.mensagem);

    } catch (erro) {

        console.error("Erro ao cadastrar:", erro);

        alert("Não foi possível realizar o cadastro.");

    }

});
