const MODEL_URL = "./tm-my-image-model/";
const CONFIDENCE_THRESHOLD = 0.9;

const students = {
    "Erika Leal": { age: 17, grade: "3° A", initials: "EL", label: "Erika Leal" },
    "Jeremy Torres": { age: 18, grade: "1° C", initials: "JT", label: "Jeremy Torres" },
    "Carolina Elias": { age: 18, grade: "2° B", initials: "CE", label: "Carolina Elías" }
};

const startButton = document.getElementById("start-button");
const cameraPlaceholder = document.getElementById("camera-placeholder");
const scannerMessage = document.getElementById("scanner-message");
const errorMessage = document.getElementById("error-message");
const liveIndicator = document.getElementById("live-indicator");
const studentBadge = document.getElementById("student-badge");
const emptyBadge = document.getElementById("empty-badge");
const confidenceFill = document.getElementById("confidence-fill");
const confidenceMeter = document.getElementById("confidence-meter");
const bestMatchLabel = document.getElementById("best-match-label");

let model;
let webcam;
let animationFrame;
let isRunning = false;

startButton.addEventListener("click", startRecognition);

async function startRecognition() {
    if (isRunning) {
        stopRecognition();
        return;
    }

    startButton.disabled = true;
    startButton.textContent = "Cargando reconocimiento…";
    errorMessage.hidden = true;

    try {
        if (!model) {
            const modelURL = `${MODEL_URL}model.json`;
            const metadataURL = `${MODEL_URL}metadata.json`;
            model = await tmImage.load(modelURL, metadataURL);
        }

        webcam = new tmImage.Webcam(480, 360, true);
        await webcam.setup();
        await webcam.play();

        const webcamContainer = document.getElementById("webcam-container");
        webcamContainer.replaceChildren(webcam.canvas);
        webcam.canvas.setAttribute("aria-label", "Live webcam video");
        cameraPlaceholder.hidden = true;
        isRunning = true;
        liveIndicator.classList.add("is-live");
        liveIndicator.innerHTML = "<span></span> EN VIVO";
        scannerMessage.textContent = "Buscando estudiantes registrados…";
        startButton.disabled = false;
        startButton.classList.add("is-stop");
        startButton.innerHTML = '<span aria-hidden="true">■</span> Stop recognition';
        animationFrame = window.requestAnimationFrame(scanFrame);
    } catch (error) {
        if (webcam) {
            webcam.stop();
            webcam = null;
        }
        startButton.disabled = false;
        startButton.innerHTML = '<span aria-hidden="true">◎</span> Intentar de nuevo';
        scannerMessage.textContent = "No se pudo iniciar el reconocimiento.";
        errorMessage.textContent = getStartupErrorMessage(error);
        errorMessage.hidden = false;
    }
}

function stopRecognition() {
    isRunning = false;
    window.cancelAnimationFrame(animationFrame);
    if (webcam) {
        webcam.stop();
        webcam = null;
    }

    document.getElementById("webcam-container").replaceChildren();
    cameraPlaceholder.hidden = false;
    liveIndicator.classList.remove("is-live");
    liveIndicator.innerHTML = "<span></span> INACTIVA";
    scannerMessage.textContent = "Cámara apagada. El video permanece en este dispositivo.";
    startButton.classList.remove("is-stop");
    startButton.innerHTML = '<span aria-hidden="true">◎</span> Iniciar reconocimiento';
    clearMatch();
}

async function scanFrame() {
    if (!isRunning) return;

    try {
        webcam.update();
        const predictions = await model.predict(webcam.canvas);
        updateMatch(predictions);
        if (isRunning) animationFrame = window.requestAnimationFrame(scanFrame);
    } catch (error) {
        console.error("Student recognition failed:", error);
        errorMessage.textContent = "El reconocimiento se detuvo porque el modelo no pudo analizar la imagen. Inténtalo de nuevo.";
        errorMessage.hidden = false;
        stopRecognition();
    }
}

function updateMatch(predictions) {
    const bestPrediction = predictions.reduce((best, prediction) =>
        prediction.probability > best.probability ? prediction : best
    );
    const percentage = Math.round(bestPrediction.probability * 100);
    const isStudentMatch = Object.hasOwn(students, bestPrediction.className);
    const isConfident = bestPrediction.probability >= CONFIDENCE_THRESHOLD;

    confidenceFill.style.width = `${percentage}%`;
    confidenceMeter.setAttribute("aria-valuenow", String(percentage));
    bestMatchLabel.textContent = `${bestPrediction.className} · ${percentage}%`;
    scannerMessage.textContent = isStudentMatch && isConfident
        ? "Estudiante identificado correctamente."
        : "Buscando estudiantes registrados…";

    for (const card of document.querySelectorAll(".roster-card")) {
        const cardStudent = card.dataset.student;
        const matched = isStudentMatch && isConfident && cardStudent === bestPrediction.className;
        card.classList.toggle("is-detected", matched);
        card.querySelector(".roster-status span").textContent = matched ? "Identificado" : "Sin identificar";
    }

    if (isStudentMatch && isConfident) {
        showBadge(students[bestPrediction.className], percentage);
    } else {
        clearBadge();
    }
}

function showBadge(student, percentage) {
    emptyBadge.hidden = true;
    studentBadge.hidden = false;
    document.getElementById("badge-name").textContent = student.label;
    document.getElementById("badge-avatar").textContent = student.initials;
    document.getElementById("badge-age").textContent = `${student.age} años`;
    document.getElementById("badge-grade").textContent = student.grade;
    document.getElementById("badge-confidence").textContent = `COINCIDENCIA ${percentage}%`;
}

function clearBadge() {
    studentBadge.hidden = true;
    emptyBadge.hidden = false;
}

function clearMatch() {
    clearBadge();
    confidenceFill.style.width = "0%";
    confidenceMeter.setAttribute("aria-valuenow", "0");
    bestMatchLabel.textContent = "Esperando cámara";
    document.querySelectorAll(".roster-card").forEach((card) => {
        card.classList.remove("is-detected");
        card.querySelector(".roster-status span").textContent = "Sin identificar";
    });
}

function getStartupErrorMessage(error) {
    console.error("Unable to start student recognition:", error);
    if (error && (error.name === "NotAllowedError" || error.name === "PermissionDeniedError")) {
        return "Se denegó el acceso a la cámara. Permite el acceso en la configuración del navegador e inténtalo de nuevo.";
    }
    if (error && (error.name === "NotFoundError" || error.name === "DevicesNotFoundError")) {
        return "No se encontró ninguna cámara. Conecta una cámara e inténtalo de nuevo.";
    }
    if (error instanceof TypeError && !window.isSecureContext) {
        return "El acceso a la cámara requiere una página segura. Abre el sitio en localhost o mediante HTTPS.";
    }
    return "No se pudo cargar el modelo o acceder a la cámara. Revisa tu conexión, los permisos y que el sitio esté alojado en localhost o HTTPS.";
}