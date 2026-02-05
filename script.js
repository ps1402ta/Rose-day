const music = document.getElementById('bgMusic');
const screens = document.querySelectorAll('.screen');
let currentStep = 0;

// --- STEP CONTROLLER ---
function nextStep() {
    if (currentStep < screens.length - 1) {
        screens[currentStep].classList.remove('active');
        currentStep++;
        screens[currentStep].classList.add('active');
        runStepLogic(currentStep);
    }
}

// Sequence Timing (Miliseconds mein)
function startSequence() {
    music.play();
    
    // Step 1 to 2: 4 seconds baad
    setTimeout(() => { nextStep(); }, 4000); 
    
    // Step 2 to 3: 5 seconds baad
    setTimeout(() => { nextStep(); }, 9000); 
    
    // Step 3 to 4: 6 seconds baad
    setTimeout(() => { nextStep(); }, 15000);
    
    // Step 4 to 5: 6 seconds baad
    setTimeout(() => { nextStep(); }, 21000);
    
    // Step 5 to 6: 7 seconds baad
    setTimeout(() => { nextStep(); }, 28000);
}

// User click par music aur sequence start hoga
window.addEventListener('click', () => {
    if (currentStep === 0) startSequence();
}, { once: true });


function runStepLogic(step) {
    switch(step) {
        case 2: initPetals(); break; // Step 3 logic
        case 5: drawRoseSketch(); break; // Step 6 logic
    }
}

// --- STEP 3: FLOATING PETALS LOGIC ---
function initPetals() {
    const canvas = document.getElementById('petalCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let petalArray = [];
    const petalCount = 30;

    class Petal {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 15 + 10;
            this.speed = Math.random() * 2 + 1;
            this.angle = Math.random() * 360;
            this.spin = Math.random() * 2 - 1;
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle * Math.PI / 180);
            ctx.fillStyle = "#ffb6c1";
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size/2, this.size, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
        }
        update() {
            this.y += this.speed;
            this.angle += this.spin;
            if (this.y > canvas.height) {
                this.y = -20;
                this.x = Math.random() * canvas.width;
            }
        }
    }

    for (let i = 0; i < petalCount; i++) {
        petalArray.push(new Petal());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petalArray.forEach(p => {
            p.update();
            p.draw();
        });
        if(currentStep === 2) requestAnimationFrame(animate);
    }
    animate();

    // Mouse/Touch Interaction
    window.addEventListener('mousemove', (e) => {
        petalArray.forEach(p => {
            let dx = e.x - p.x;
            let dy = e.y - p.y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if(dist < 100) {
                p.x -= dx/10;
                p.y -= dy/10;
            }
        });
    });
}

// --- STEP 6: INVISIBLE HAND SKETCH LOGIC ---
function drawRoseSketch() {
    const canvas = document.getElementById('sketchCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#2d5a27'; // Dark green for stem

    let startTime = null;
    const duration = 30000; // 30 seconds drawing

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        let progress = (currentTime - startTime) / duration;

        if (progress > 1) progress = 1;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. Draw Stem (0% to 30% progress)
        if (progress > 0) {
            ctx.beginPath();
            let stemEnd = Math.min(progress / 0.3, 1);
            ctx.moveTo(canvas.width / 2, canvas.height * 0.9);
            ctx.quadraticCurveTo(
                canvas.width / 2 - 30, canvas.height * 0.6, 
                canvas.width / 2, canvas.height * (0.9 - (0.5 * stemEnd))
            );
            ctx.stroke();
        }

        // 2. Draw Leaves (30% to 50% progress)
        if (progress > 0.3) {
            let leafProg = Math.min((progress - 0.3) / 0.2, 1);
            ctx.fillStyle = `rgba(45, 90, 39, ${leafProg})`;
            // Left Leaf
            ctx.beginPath();
            ctx.ellipse(canvas.width/2 - 15, canvas.height * 0.7, 8 * leafProg, 15 * leafProg, -Math.PI/4, 0, 2*Math.PI);
            ctx.fill();
        }

        // 3. Draw Spiral Rose Petals (50% to 100% progress)
        if (progress > 0.5) {
            ctx.strokeStyle = '#ff4d6d'; // Rose Red
            let roseProg = (progress - 0.5) / 0.5; 
            ctx.beginPath();
            let centerX = canvas.width / 2;
            let centerY = canvas.height * 0.4;
            
            for (let i = 0; i < roseProg * 200; i++) {
                let angle = 0.15 * i;
                let x = centerX + (angle * 2.5) * Math.cos(angle);
                let y = centerY + (angle * 2.5) * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        // Final Soft Pink Fill at the end
        if (progress === 1) {
            ctx.globalAlpha = 0.15;
            ctx.fillStyle = '#ffc0cb';
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height * 0.4, 60, 0, Math.PI * 2);
            ctx.fill();
            return; // Animation ends
        }

        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
}
