const firebaseConfig = {
  apiKey: "AIzaSyA-PEvp2reLWNxI_HKPMS2vofxSNOvDzDE",
  authDomain: "playvideos-e2d5d.firebaseapp.com",
  databaseURL: "https://playvideos-e2d5d-default-rtdb.firebaseio.com",
  projectId: "playvideos-e2d5d",
  storageBucket: "playvideos-e2d5d.appspot.com",
  messagingSenderId: "220622211507",
  appId: "1:220622211507:web:920bc3199ffacb5b7963c6"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const emailFake = username + "@exemplo.com";

  auth.createUserWithEmailAndPassword(emailFake, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      db.ref("users/" + uid).set({
        username: username
      });
      alert("Cadastrado com sucesso!");
    })
    .catch((error) => {
      alert("Erro ao cadastrar: " + error.message);
    });
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const emailFake = username + "@exemplo.com";

  auth.signInWithEmailAndPassword(emailFake, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      db.ref("users/" + uid).once("value").then((snapshot) => {
        const data = snapshot.val();
        alert("Bem-vindo, " + data.username + "!");
        // Aqui você pode redirecionar para outra página se quiser
      });
    })
    .catch((error) => {
      alert("Erro ao logar: " + error.message);
    });
}
