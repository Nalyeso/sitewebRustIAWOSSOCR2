const fileInput = document.getElementById("file-input");
const generateBtn = document.getElementById("generate-btn");
const statusText = document.getElementById("status");
const spectrogramImg = document.getElementById("spectrogram-img");

generateBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (!file) {
        alert("Choisissez d'abord un fichier WAV.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    statusText.textContent = "Génération du spectrogramme...";
    spectrogramImg.style.display = "none";

    try {
        const response = await fetch("http://localhost:3000/api/spectrogram", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la génération.");
        }
const contentType = response.headers.get("content-type");
console.log("Content-Type reçu :", contentType);

const blob = await response.blob();
console.log("Blob reçu :", blob);

if (!contentType || !contentType.includes("image")) {
    const text = await blob.text();
    console.log("Réponse texte du serveur :", text);
    statusText.textContent = "Erreur : le serveur n'a pas renvoyé une image.";
    return;
}

const imageUrl = URL.createObjectURL(blob);

spectrogramImg.src = imageUrl;
spectrogramImg.style.display = "block";
statusText.textContent = "Spectrogramme généré !";

    } catch (error) {
        console.error(error);
        statusText.textContent = "Erreur : impossible de générer le spectrogramme.";
    }
});
