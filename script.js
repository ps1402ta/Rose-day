/* ===============================
   GLOBAL STATE
================================ */
let currentStep = 0;
const audio = document.getElementById("bgMusic");

/* ===============================
   STEP CONTROL
================================ */
function startExperience() {
  audio.volume = 0.4;
  audio.play().catch(() => {});
  goStep(1);
}

function goStep(n) {
  const prev = document.getElementById("step" + currentStep);
  const next = document.getElementById("step" + n);

  if (prev) prev.classList.remove("active");
  if (next) next.classList.add("active");

  currentStep = n;

  if (n === 6) {
    setTimeout(drawMathematicalRose, 300);
  }
}

/* ===============================
   STEP 6 – MATHEMATICAL ROSE
   Slow sketch animation
================================ */
function drawMathematicalRose() {
  const canvas = document.getElementById("roseCanvas");
  const ctx = canvas.getContext("2d");

  const dpr = window.devicePixelRatio || 1;
  const size = Math.min(window.innerWidth, 420);

  canvas.style.width = size + "px";
  canvas.style.height = size + "px";
  canvas.width = size * dpr;
  canvas.height = size * dpr;

  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;

  const a = size * 0.35; // rose size
  const k = 6;           // number of petals

  let t = 0;
  let prevX = null;
  let prevY = null;

  ctx.lineWidth = 1.2;
  ctx.strokeStyle = "#c9184a";

  function animate() {
    for (let i = 0; i < 6; i++) {
      const r = a * Math.cos(k * t);
      const x = cx + r * Math.cos(t);
      const y = cy + r * Math.sin(t);

      if (prevX !== null) {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      prevX = x;
      prevY = y;
      t += 0.01;
    }

    if (t < Math.PI * 2 * 6) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

/* ===============================
   OPTIONAL: PETALS FALL (LIGHT)
================================ */
function createPetal() {
  const petal = document.createElement("div");
  petal.innerText = "🌸";
  petal.style.position = "fixed";
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.top = "-10px";
  petal.style.fontSize = "16px";
  petal.style.opacity = Math.random();
  petal.style.pointerEvents = "none";
  petal.style.transition = "transform 6s linear, opacity 6s";

  document.body.appendChild(petal);

  setTimeout(() => {
    petal.style.transform = `translateY(110vh) translateX(${Math.random() * 60 - 30}px) rotate(360deg)`;
    petal.style.opacity = 0;
  }, 50);

  setTimeout(() => petal.remove(), 6500);
}

/* ===============================
   PETALS DURING SHAYARI
================================ */
const shayariStep = document.getElementById("step4");
const observer = new MutationObserver(() => {
  if (shayariStep.classList.contains("active")) {
    const petalInterval = setInterval(createPetal, 700);
    setTimeout(() => clearInterval(petalInterval), 6000);
  }
});

observer.observe(shayariStep, { attributes: true });

/* ===============================
   SAFETY: AUTOPAUSE ON TAB HIDE
================================ */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    audio.pause();
  }
});
