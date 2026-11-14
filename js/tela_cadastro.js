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

