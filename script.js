// script.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, set, get, push, onValue } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

const path = window.location.pathname;

// --- FUNÇÕES LOGIN.HTML ---

if (path.endsWith("login.html")) {

  window.registrar = function() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value;

    if (!user || !pass) {
      alert("Preencha usuário e senha!");
      return;
    }

    set(ref(db, 'users/' + user), { senha: pass })
      .then(() => alert("Conta criada!"))
      .catch(e => alert("Erro: " + e.message));
  };

  window.login = function() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value;

    if (!user || !pass) {
      alert("Preencha usuário e senha!");
      return;
    }

    get(ref(db, 'users/' + user))
      .then(snapshot => {
        if (snapshot.exists() && snapshot.val().senha === pass) {
          alert("Login OK!");
          window.location.href = "index.html";
        } else {
          alert("Usuário ou senha incorretos!");
        }
      })
      .catch(e => alert("Erro: " + e.message));
  };

}

// --- FUNÇÕES INDEX.HTML ---

else if (path.endsWith("index.html") || path === "/" || path === "") {
  const videoListDiv = document.getElementById("video-list");

  async function uploadVideo() {
    const titleInput = document.getElementById("videoTitle");
    const fileInput = document.getElementById("videoFile");

    const title = titleInput.value.trim();
    const file = fileInput.files[0];

    if (!title || !file) {
      alert("Por favor, informe título e selecione um arquivo de vídeo.");
      return;
    }

    try {
      const storageRef = sRef(storage, 'videos/' + Date.now() + "_" + file.name);
      await uploadBytes(storageRef, file);

      const url = await getDownloadURL(storageRef);

      const videosRef = ref(db, 'videos');
      await push(videosRef, {
        titulo: title,
        url: url,
        criadoEm: Date.now()
      });

      alert("Vídeo enviado com sucesso!");
      titleInput.value = "";
      fileInput.value = "";

    } catch (error) {
      alert("Erro ao enviar vídeo: " + error.message);
    }
  }

  function listarVideos() {
    const videosRef = ref(db, 'videos');
    onValue(videosRef, (snapshot) => {
      videoListDiv.innerHTML = "";

      snapshot.forEach((childSnapshot) => {
        const videoData = childSnapshot.val();

        const videoEl = document.createElement("video");
        videoEl.controls = true;
        videoEl.src = videoData.url;
        videoEl.width = 320;

        const titleEl = document.createElement("div");
        titleEl.textContent = videoData.titulo;

        const container = document.createElement("div");
        container.appendChild(titleEl);
        container.appendChild(videoEl);

        videoListDiv.appendChild(container);
      });
    });
  }

  listarVideos();

  window.uploadVideo = uploadVideo;
}
