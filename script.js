<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>For Shradha | Rose Day</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Poppins:wght@300&display=swap');

        body {
            margin: 0;
            background: radial-gradient(circle at center, #1a0505 0%, #000 100%);
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            color: white;
            font-family: 'Poppins', sans-serif;
        }

        #canvas-container {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        /* The Rose Box */
        .rose {
            position: relative;
            width: 100px;
            height: 100px;
            margin-bottom: 150px;
        }

        .petal {
            position: absolute;
            left: 50%;
            top: 50%;
            background: linear-gradient(45deg, #ff0033, #990011);
            border-radius: 50% 50% 10% 50%;
            transform-origin: bottom right;
            opacity: 0;
            box-shadow: 0 0 15px rgba(255, 0, 50, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stem {
            position: absolute;
            top: 100%;
            left: 100%;
            width: 4px;
            background: linear-gradient(to bottom, #1a4d1a, #051a05);
            height: 0;
            transform: translateX(-50%);
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
        }

        .leaf {
            position: absolute;
            width: 40px;
            height: 20px;
            background: #2d5a27;
            border-radius: 0 100% 0 100%;
            opacity: 0;
        }

        /* Text Styling */
        .text-content {
            text-align: center;
            position: absolute;
            bottom: 15%;
            width: 100%;
            z-index: 10;
        }

        .intro-text {
            font-size: 1.2rem;
            color: #ffcccc;
            letter-spacing: 3px;
            opacity: 0;
            margin-bottom: 10px;
        }

        .main-title {
            font-family: 'Great Vibes', cursive;
            font-size: 4rem;
            background: linear-gradient(to bottom, #fff, #ff6666);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 20px rgba(255, 50, 50, 0.6);
            opacity: 0;
            margin: 0;
        }

        .footer-text {
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.5);
            margin-top: 15px;
            opacity: 0;
        }

        /* Glow Effect for Rose */
        .rose-glow {
            position: absolute;
            width: 150px;
            height: 150px;
            background: radial-gradient(circle, rgba(255,0,51,0.3) 0%, transparent 70%);
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            filter: blur(20px);
            opacity: 0;
        }
    </style>
</head>
<body>

    <div id="canvas-container">
        <div class="rose-glow" id="glow"></div>
        <div class="rose" id="rose-structure">
            <div class="stem" id="stem">
                <div class="leaf" style="left: -35px; top: 40px; transform: rotate(-30deg);"></div>
                <div class="leaf" style="left: 5px; top: 90px; transform: rotate(30deg) scaleX(-1);"></div>
            </div>
            </div>

        <div class="text-content">
            <div class="intro-text" id="intro">Ye aapke liye...</div>
            <h1 class="main-title" id="title">Happy Rose Day Shradha</h1>
            <div class="footer-text" id="footer">With love.</div>
        </div>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const rose = document.getElementById('rose-structure');
            const petalCount = 30; // Zyada petals for realism

            // 1. Generate Petals Dynamically
            for (let i = 0; i < petalCount; i++) {
                const petal = document.createElement('div');
                petal.className = 'petal';
                
                // Varied sizes for natural look
                const size = 40 + (Math.random() * 40);
                petal.style.width = `${size}px`;
                petal.style.height = `${size}px`;
                
                rose.appendChild(petal);
            }

            const petals = document.querySelectorAll('.petal');
            const tl = gsap.timeline();

            // 2. JS Animation Sequence
            
            // Step A: Stem growth
            tl.to("#stem", { height: 250, duration: 2, ease: "power2.out" });
            
            // Step B: Leaves appearing
            tl.to(".leaf", { opacity: 1, duration: 1, stagger: 0.5 }, "-=1");

            // Step C: Petals blooming one by one (The Magic)
            tl.to(petals, {
                opacity: 1,
                duration: 2,
                stagger: 0.1,
                rotation: (i) => i * 15, // Har petal rotate hoga circle banane ke liye
                x: (i) => Math.cos(i) * (i * 0.5),
                y: (i) => Math.sin(i) * (i * 0.5),
                scale: 1.2,
                ease: "back.out(1.7)"
            });

            // Step D: Glow effect
            tl.to("#glow", { opacity: 1, duration: 2 }, "-=1");

            // Step E: Text reveals
            tl.to("#intro", { opacity: 1, y: -10, duration: 1 });
            tl.to("#title", { 
                opacity: 1, 
                scale: 1.1, 
                duration: 1.5,
                ease: "elastic.out(1, 0.3)" 
            }, "-=0.5");
            tl.to("#footer", { opacity: 1, duration: 1 });

            // Subtle pulse animation for the rose to keep it "alive"
            gsap.to(rose, {
                scale: 1.05,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });
    </script>
</body>
</html>
            
