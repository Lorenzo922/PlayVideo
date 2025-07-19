import { db, ref, set, get, child } from "./firebase.js";

// CADASTRO
function registrar() {
  const nome = document.getElementById("nome").value;
  const senha = document.getElementById("senha").value;

  const userRef = ref(db, "users/" + nome);

  set(userRef, {
    senha: senha
  }).then(() => {
    alert("Usuário cadastrado com sucesso!");
  }).catch((error) => {
    console.error(error);
  });
}

// LOGIN
function logar() {
  const nome = document.getElementById("nome").value;
  const senha = document.getElementById("senha").value;

  const dbRef = ref(db);

  get(child(dbRef, `users/${nome}`)).then((snapshot) => {
    if (snapshot.exists()) {
      if (snapshot.val().senha === senha) {
        alert("Login bem-sucedido!");
        // aqui pode redirecionar para a página principal
      } else {
        alert("Senha incorreta.");
      }
    } else {
      alert("Usuário não encontrado.");
    }
  }).catch((error) => {
    console.error(error);
  });
}

// Torna funções globais se precisar usar no HTML
window.registrar = registrar;
window.logar = logar;
