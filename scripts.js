document.addEventListener("DOMContentLoaded", () => {
    // Starfield and Cosmic Animation
    const canvas = document.getElementById("starfield");
    const ctx = canvas.getContext("2d");
    let stars = [];
    let meteors = [];
    let blackHoles = [];
    const numStars = 800; // Increased number of stars for a denser field
    const numMeteors = 15; // Increased number of meteors
    const numBlackHoles = 2; // Number of black holes

    // Function to set the canvas size to fill the entire screen
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Set canvas size initially
    resizeCanvas();

    // Create Starfield (Stars) - Brighter stars with increased size and opacity
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 1, // Bigger stars
            speed: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.7 + 0.3 // Make stars more visible
        });
    }

    // Create Meteors (Meteor Shower) with bright glowing tails
    for (let i = 0; i < numMeteors; i++) {
        meteors.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speed: Math.random() * 3 + 3, // Faster meteors
            length: Math.random() * 25 + 15, // Longer meteor tails
            opacity: Math.random() * 0.8 + 0.3,
            angle: Math.random() * Math.PI * 2 // Random angle for direction
        });
    }

    // Create Black Holes with bright swirling energy
    for (let i = 0; i < numBlackHoles; i++) {
        blackHoles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 150 + 100, // Radius of black holes
            color: "rgba(0, 0, 0, 1)", // The core is black
            glowColor: "rgba(255, 255, 255, 0.8)", // Glowing white energy around the black hole
            swirlSpeed: Math.random() * 0.1 + 0.05, // Speed of swirling effect
            angle: Math.random() * 2 * Math.PI // Random starting angle
        });
    }

    // Draw Stars with brighter, more visible appearance
    function drawStars() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // Draw Meteors with bright glowing tails
    function drawMeteors() {
        meteors.forEach(meteor => {
            const tailLength = meteor.length;
            const tailX = meteor.x - Math.cos(meteor.angle) * tailLength;
            const tailY = meteor.y - Math.sin(meteor.angle) * tailLength;
            
            // Meteor Tail (gradient effect for glow)
            const gradient = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${meteor.opacity})`);
            gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

            ctx.beginPath();
            ctx.moveTo(meteor.x, meteor.y);
            ctx.lineTo(tailX, tailY);
            ctx.lineWidth = 3;
            ctx.strokeStyle = gradient;
            ctx.stroke();
        });
    }

    // Draw Black Holes with bright swirling cosmic energy
    function drawBlackHoles() {
        blackHoles.forEach(blackHole => {
            // Draw the black hole's dark core
            ctx.beginPath();
            ctx.arc(blackHole.x, blackHole.y, blackHole.radius, 0, Math.PI * 2);
            ctx.fillStyle = blackHole.color;
            ctx.fill();

            // Swirling effect (Accretion Disk) around the black hole
            for (let i = 0; i < 50; i++) {
                const radius = blackHole.radius + i * 4;
                const angle = blackHole.angle + i * blackHole.swirlSpeed;
                const x = blackHole.x + Math.cos(angle) * radius;
                const y = blackHole.y + Math.sin(angle) * radius;

                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fillStyle = blackHole.glowColor;
                ctx.fill();
            }

            // Rotate the angle for the next frame to simulate swirling motion
            blackHole.angle += blackHole.swirlSpeed;
        });
    }

    // Update Stars to simulate movement
    function updateStars() {
        stars.forEach(star => {
            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });
    }

    // Animate Meteors to simulate their motion across the canvas
    function updateMeteors() {
        meteors.forEach(meteor => {
            meteor.x += Math.cos(meteor.angle) * meteor.speed;
            meteor.y += Math.sin(meteor.angle) * meteor.speed;

            // Reset meteor position when it goes off-screen
            if (meteor.x > canvas.width || meteor.y > canvas.height || meteor.x < 0 || meteor.y < 0) {
                meteor.x = Math.random() * canvas.width;
                meteor.y = Math.random() * canvas.height;
            }
        });
    }

    // Animate Gravitational Lensing and Distortions (light bending near black holes)
    function addGravitationalLensing() {
        blackHoles.forEach(blackHole => {
            stars.forEach(star => {
                const distance = Math.sqrt((star.x - blackHole.x) ** 2 + (star.y - blackHole.y) ** 2);
                if (distance < blackHole.radius * 2) {
                    const distortion = (blackHole.radius * 2 - distance) / (blackHole.radius * 2);
                    star.x += Math.sin(Math.random() * Math.PI * 2) * distortion * 10;
                    star.y += Math.cos(Math.random() * Math.PI * 2) * distortion * 10;
                }
            });
        });
    }

    // Animate All Elements: Stars, Meteors, Black Holes
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas for fresh drawing

        drawStars();
        drawMeteors();
        drawBlackHoles();
        updateStars();
        updateMeteors();
        addGravitationalLensing();
        
        requestAnimationFrame(animate);
    }

    animate();

    // Adjust the canvas size when the window is resized
    window.addEventListener('resize', resizeCanvas);

    // Typing Animation (AI Text Effect)
    const headerText = document.querySelector('.neon-text');
    const text = "Welcome to the Future of AI & Data Science!";
    let textIndex = 0;

    function typeText() {
        if (textIndex < text.length) {
            headerText.textContent += text.charAt(textIndex);
            textIndex++;
            setTimeout(typeText, 100);
        }
    }
    typeText();

    // Handle active link highlighting
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', () => {
            links.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
        });
    });
});
