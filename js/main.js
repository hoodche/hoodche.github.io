async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

async function pedirContrasena() {
  const contrasenaCorrectaHash = "87129e1b1d2870c5e6743b81bcae28ec83c27fc660e4ba78d95d00d2bfc0afdb";
  const errorElement = document.getElementById("error");
  const videoSecreto = document.getElementById("video-secreto");
  const youtubeVideo = document.getElementById("youtube-video");

  errorElement.textContent = "";
  const input = prompt("pon la contraseña:");

  if (input === null) {
    return;
  }

  const inputHash = await digestMessage(input.toUpperCase());

  if (inputHash === contrasenaCorrectaHash) {
    // Set your YouTube embed URL here
    youtubeVideo.src = "https://www.youtube.com/embed/HFojlF1wS2o?si=JiYBslyphxdfC-T-";
    videoSecreto.style.display = "block";
  } else {
    errorElement.textContent = "Contraseña incorrecta. Inténtalo de nuevo";
  }
}