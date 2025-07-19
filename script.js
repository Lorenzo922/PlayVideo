const usuario = localStorage.getItem("usuario");
document.getElementById("user-info").innerText = usuario ? `Olá, ${usuario}` : "Não logado";

function uploadVideo() {
  const titulo = document.getElementById("videoTitle").value;
  const file = document.getElementById("videoFile").files[0];
  if (!file || !titulo || !usuario) {
    alert("Preencha tudo!");
    return;
  }

  const videoRef = firebase.storage().ref("videos/" + Date.now() + "_" + file.name);
  videoRef.put(file).then(snapshot => {
    return snapshot.ref.getDownloadURL();
  }).then(url => {
    const id = Date.now();
    firebase.database().ref("videos/" + id).set({
      titulo,
      url,
      autor: usuario
    });
    alert("Vídeo enviado!");
    carregarVideos();
  });
}

function carregarVideos() {
  firebase.database().ref("videos").on("value", snap => {
    const lista = document.getElementById("video-list");
    lista.innerHTML = "";
    snap.forEach(child => {
      const vid = child.val();
      lista.innerHTML += `
        <div>
          <h3>${vid.titulo} (por ${vid.autor})</h3>
          <video width="320" height="240" controls>
            <source src="${vid.url}" type="video/mp4">
            Seu navegador não suporta vídeo.
          </video>
        </div>
      `;
    });
  });
}

if (window.location.pathname.includes("index.html")) carregarVideos();
