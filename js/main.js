async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

async function pedirContrasena() {
  const contrasenaCorrectaHash = "c34b6e82a357c32a4332997f81a5a1f253725f46452a23395c898517ea0d27a4"; // SHA-256 of "LOMITA"
  const input = prompt("pon la contraseña:");

  if (input) {
    const inputHash = await digestMessage(input.toUpperCase());

    if (inputHash === contrasenaCorrectaHash) {
      const videoSecreto = document.getElementById("video-secreto");
      videoSecreto.style.display = "block";
      videoSecreto.play();
      document.getElementById("error").textContent = "";
    } else {
      document.getElementById("error").textContent = "";
      
      const errorVideo = document.getElementById("error-video");
      errorVideo.style.display = "block";
      errorVideo.play();
      
      setTimeout(function() {
        errorVideo.pause();
        errorVideo.currentTime = 0;
        errorVideo.style.display = "none";
      }, 28000);
    }
  }
} 