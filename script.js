// Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA-PEvp2reLWNxI_HKPMS2vofxSNOvDzDE",
  authDomain: "playvideos-e2d5d.firebaseapp.com",
  databaseURL: "https://playvideos-e2d5d-default-rtdb.firebaseio.com",
  projectId: "playvideos-e2d5d",
  storageBucket: "playvideos-e2d5d.appspot.com",
  messagingSenderId: "220622211507",
  appId: "1:220622211507:web:920bc3199ffacb5b7963c6",
  measurementId: "G-EJCD4QDK6G"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  database.ref("users/" + username).get().then((snapshot) => {
    if (snapshot.exists()) {
      const userData = snapshot.val();
      if (userData.password === password) {
        alert("Login bem-sucedido!");
        // Redirecionar para outro HTML se quiser
        // window.location.href = "home.html";
      } else {
        alert("Senha incorreta!");
      }
    } else {
      alert("Usuário não encontrado!");
    }
  });
}

function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  database.ref("users/" + username).set({
    password: password
  }).then(() => {
    alert("Usuário registrado com sucesso!");
  });
}
