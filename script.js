/* ===============================
   GLOBAL VARIABLES
================================ */
let currentStep = 1;
const totalSteps = 6;
const screens = document.querySelectorAll(".screen");

// audio
const bgMusic = new Audio("tara.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.7;

/* ===============================
   STEP HANDLER
================================ */
function showStep(step) {
  screens.forEach(s => s.classList.remove("active"));
  const target = document.getElementById(`step${step}`);
  if (target) target.classList.add("active");
}

/* ===============================
   STEP 1 → STEP 2
================================ */
function startStory() {
  bgMusic.play().catch(()=>{});
  currentStep = 2;
  showStep(2);

  // auto move to step 3 after stem grow
  setTimeout(() => {
    currentStep = 3;
    showStep(3);
    drawRose();
  }, 3200);
}

/* ===============================
   STEP 3 → STEP 4
================================ */
function goToShayari() {
  currentStep = 4;
  showStep(4);
  typeShayari();
}

/* ===============================
   STEP 4 → STEP 5
================================ */
function goToFinal() {
  currentStep = 5;
  showStep(5);
  startPetals();
}

/* ===============================
   STEP 5 → STEP 6
================================ */
function goToMessage() {
  currentStep = 6;
  showStep(6);
}

/* ===============================
   ROSE DRAW (CANVAS – MATH LOGIC)
================================ */
function drawRose() {
  const canvas = document.getElementById("roseCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const w = canvas.width = 360;
  const h = canvas.height = 420;

  ctx.clearRect(0, 0, w, h);

  let t = 0;

  function roseEquation(a) {
    return 120 * Math.sin(a);
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    ctx.save();
    ctx.translate(w / 2, h / 2 - 40);

    ctx.beginPath();
    for (let a = 0; a <= t; a += 0.02) {
      const r = roseEquation(a);
      const x = r * Math.cos(a);
      const y = r * Math.sin(a);
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = "#c9184a";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    t += 0.08;
    if (t < Math.PI * 6) {
      requestAnimationFrame(animate);
    } else {
      setTimeout(goToShayari, 1200);
    }
  }

  animate();
}

/* ===============================
   SHAYARI TYPING EFFECT
================================ */
const shayariText = `
Ek khoobsurat khwaab ho tum, Shraddha,
dil ko chhoo jaane wala ehsaas ho tum, Shraddha.
Tumhe kya dein gulaab hum,
gulaabon mein sabse khoobsurat gulaab ho tum, Shraddha. 🌹
`;

function typeShayari() {
  const el = document.getElementById("shayariText");
  el.innerHTML = "";
  let i = 0;

  function typing() {
    if (i < shayariText.length) {
      el.innerHTML += shayariText.charAt(i);
      i++;
      setTimeout(typing, 40);
    } else {
      startPetals();
      setTimeout(goToFinal, 2500);
    }
  }

  typing();
}

/* ===============================
   PETALS FALLING ANIMATION
================================ */
function startPetals() {
  for (let i = 0; i < 18; i++) {
    createPetal();
  }
}

function createPetal() {
  const petal = document.createElement("div");
  petal.className = "petal";
  petal.innerText = "🌸";

  petal.style.left = Math.random() * window.innerWidth + "px";
  petal.style.top = "-20px";
  petal.style.fontSize = 14 + Math.random() * 14 + "px";

  document.body.appendChild(petal);

  setTimeout(() => {
    petal.style.transform =
      `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;
    petal.style.opacity = 0;
  }, 100);

  setTimeout(() => {
    petal.remove();
  }, 6500);
}

/* ===============================
   FORM SUBMIT (FORMSUBMIT)
================================ */
// HTML form me ye hona chahiye:
// action="https://formsubmit.co/indianeditorps@gmail.com"
// method="POST"
// <input type="hidden" name="_captcha" value="true">
// <input type="hidden" name="_template" value="table">
// <input type="hidden" name="_subject" value="Rose Day Message for Priyanshu">

/* ===============================
   INITIAL LOAD
================================ */
document.addEventListener("DOMContentLoaded", () => {
  showStep(1);
});
