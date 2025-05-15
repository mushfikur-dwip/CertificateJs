const canvas = document.getElementById("certificateCanvas");
const ctx = canvas.getContext("2d");

const bgImage = new Image();
bgImage.src = "static/CertificateAIBAITCLUB.png"; // ✅ ছবিটি এই ফোল্ডারে থাকতে হবে

bgImage.onload = () => {
  // Initially hide preview until generated
};

function showToast(message, type = "info") {
  Toastify({
    text: message,
    duration: 2500,
    gravity: "top",
    position: "center",
    style: {
      background:
        type === "success"
          ? "#16a34a"
          : type === "error"
          ? "#dc2626"
          : "#2563eb",
    },
  }).showToast();
}

function generateCertificate() {
  const name = document.getElementById("nameInput").value.trim();
  if (!name) {
    showToast("⚠️ দয়া করে নাম দিন", "error");
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

  ctx.font = '58px "Pinyon Script", cursive';
  ctx.fillStyle = "#1e3a8a";
  ctx.textAlign = "center";
  ctx.fillText(name, canvas.width / 2, 400);

  canvas.classList.remove("hidden");
  showToast("✅ সার্টিফিকেট তৈরি হয়েছে", "success");
}

function downloadAsPDF() {
  const name =
    document.getElementById("nameInput").value.trim() || "certificate";
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: [canvas.width, canvas.height],
  });

  const imageData = canvas.toDataURL("image/png");
  pdf.addImage(imageData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save(`${name}_certificate.pdf`);

  showToast("📄 PDF ডাউনলোড হয়েছে", "success");
}
