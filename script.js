// --- ROSE DAY 5-STEP ENGINE ---

let currentStep = 1;
const totalSteps = 5;

// Audio setup (Tara.mp3)
const taraMusic = new Audio('tara.mp3');
taraMusic.loop = true;

/**
 * Agle step par jaane ka function
 */
function navigateNext() {
    if (currentStep >= totalSteps) return;

    // 1. Current step ko fade-out karo
    const currentElem = document.getElementById(`step-${currentStep}`);
    currentElem.style.opacity = '0';
    
    setTimeout(() => {
        currentElem.style.display = 'none';
        
        // 2. Step count badhao
        currentStep++;
        
        // 3. Agla step dikhao
        const nextElem = document.getElementById(`step-${currentStep}`);
        nextElem.style.display = 'block';
        
        // Thoda delay taaki animation smooth lage
        setTimeout(() => {
            nextElem.style.opacity = '1';
            executeStepLogic(currentStep);
        }, 50);
        
    }, 500); // 0.5s fade-out time
}

/**
 * Har step ki alag kahani (Logic)
 */
function executeStepLogic(step) {
    switch(step) {
        case 2:
            // Music shuru (Tara.mp3)
            taraMusic.play().catch(e => console.log("User interaction needed for audio"));
            console.log("Step 2: Music Started");
            break;
            
        case 3:
            // Background color thoda deep red ki taraf transition
            document.body.style.transition = "background 2s";
            document.body.style.background = "#1a0505";
            break;
            
        case 4:
            // Vibrations ya small screen shake (Optional vibe)
            console.log("Step 4: Almost there...");
            break;
            
        case 5:
            // FINAL REVEAL: Rose Creation
            createRoseSlowly();
            break;
    }
}

/**
 * Step 5: Rose aur uski Pattiyaan (Leaves) ek-ek karke dikhana
 */
function createRoseSlowly() {
    const petals = document.querySelectorAll('.petal');
    const leaves = document.querySelectorAll('.leaf');

    // Petals ko delay ke saath khilao
    petals.forEach((petal, index) => {
        setTimeout(() => {
            petal.style.opacity = '1';
            petal.style.transform += ' scale(1.1)';
        }, index * 300); // Har pankhudi 0.3s ke baad
    });

    // LAST STEP: Leaves Adjustment (Tera main fix)
    setTimeout(() => {
        leaves.forEach(leaf => {
            leaf.style.opacity = '1';
            leaf.style.transform = leaf.classList.contains('right') 
                ? 'rotate(45deg) scaleX(-1) translateY(0)' 
                : 'rotate(-45deg) translateY(0)';
        });
        console.log("Step 5: All Leaves Adjusted Perfectly!");
    }, petals.length * 350);
}

// Keyboard shortcuts (Spacebar for next step)
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') navigateNext();
});
