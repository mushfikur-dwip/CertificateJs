const canvas = document.getElementById("certificateCanvas");
const ctx = canvas.getContext("2d");

// Load background image
const bgImage = new Image();
bgImage.src = "static/CertificateAIBAITCLUB.png";

bgImage.onload = () => {
  ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
};

function generateCertificate() {
  const name = document.getElementById("nameInput").value;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

  ctx.font = '58px "Pinyon Script", cursive';
  ctx.fillStyle = "#1e3a8a";
  ctx.textAlign = "center";
  ctx.fillText(name, canvas.width / 2, 285);
}

function downloadAsPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: [canvas.width, canvas.height],
  });

  const imageData = canvas.toDataURL("image/png");
  pdf.addImage(imageData, "PNG", 0, 0, canvas.width, canvas.height);
  const name = document.getElementById("nameInput").value || "certificate";
  pdf.save(`${name}_certificate.pdf`);
}
