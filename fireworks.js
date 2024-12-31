const canvas = document.getElementById('fireworksCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const fireworks = [];
        const stars = [];
        const textQueue = "HAPPY NEW YEAR".split(""); // Text to display in sequence
        let currentTextIndex = 0;
        let isDisplayingFinalText = false;
        let isFinalTextDisplayed = false;

        const colors = ['#ff4444', '#44ff44', '#4444ff', '#ffcc44', '#ff44cc'];

        // Create stars across the entire screen
        function createStars() {
            for (let i = 0; i < 200; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height; // Covers the full screen
                stars.push({ x, y, radius: Math.random() * 2 });
            }
        }

        function drawStars() {
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#ddd';
                ctx.fill();
                ctx.closePath();
            });
        }

        // Create a gradient moon
        function drawGradientMoon() {
            const gradient = ctx.createLinearGradient(canvas.width - 200, 50, canvas.width - 100, 150);
            gradient.addColorStop(0, '#cccccc'); // Grey
            gradient.addColorStop(1, 'grey'); // Orange

            ctx.beginPath();
            ctx.arc(canvas.width - 150, 100, 50, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.closePath();
        }

        // Fireworks logic
        class Particle {
            constructor(x, y, color, size, velocityX, velocityY) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.size = size;
                this.velocityX = velocityX;
                this.velocityY = velocityY;
                this.life = 0;
            }

            update() {
                this.x += this.velocityX;
                this.y += this.velocityY;
                this.size *= 0.96; // Shrink effect
                this.life++;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            }
        }

        class Firework {
            constructor(x, y, color, text = "") {
                this.x = x;
                this.y = y;
                this.color = color;
                this.velocityY = -(Math.random() * 3 + 6); // Speed to move upward
                this.exploded = false;
                this.text = text;
            }

            update() {
                if (this.y < canvas.height / 3 && !this.exploded) {
                    this.explode();
                    this.exploded = true;
                } else if (!this.exploded) {
                    this.y += this.velocityY;
                }
            }

            draw() {
                if (!this.exploded) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                    ctx.closePath();
                }
            }

            explode() {
                // Create particles for explosion
                for (let i = 0; i < 100; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 6 + 2;
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    particles.push(new Particle(
                        this.x,
                        this.y,
                        color,
                        Math.random() * 3 + 2,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed
                    ));
                }

                // Display text
                if (this.text) {
                    ctx.font = "50px Arial";
                    ctx.fillStyle = "#ffffff";
                    ctx.textAlign = "center";
                    ctx.fillText(this.text, this.x, this.y - 50);
                }
            }
        }

        function createFireworkWithText() {
            if (currentTextIndex < textQueue.length) {
                const x = (canvas.width / textQueue.length) * currentTextIndex + 50;
                const color = colors[Math.floor(Math.random() * colors.length)];
                const text = textQueue[currentTextIndex];
                fireworks.push(new Firework(x, canvas.height, color, text));
                currentTextIndex++;
            } else if (!isDisplayingFinalText) {
                createFinalExplosion();
                isDisplayingFinalText = true;
            }
        }

        function createFinalExplosion() {
            const x = canvas.width / 2;
            const y = canvas.height / 3;
            const color = colors[Math.floor(Math.random() * colors.length)];
            fireworks.push(new Firework(x, canvas.height, color, ""));

            // Stop further text animation after final text is displayed
            setTimeout(() => {
                isFinalTextDisplayed = true;
            }, 3100);
        }

        const christmasLights = [];

function createChristmasLights() {
    for (let i = 0; i < 100; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 150 + 100; // Radius around the text
        const x = canvas.width / 2 + Math.cos(angle) * radius;
        const y = canvas.height / 3 + Math.sin(angle) * radius;
        const color = colors[Math.floor(Math.random() * colors.length)];
        christmasLights.push({ x, y, color, blink: Math.random() * Math.PI * 2 });
    }
}

function drawChristmasLights() {
    christmasLights.forEach(light => {
        light.blink += 0.1; // Adjust blink speed
        const opacity = Math.abs(Math.sin(light.blink)); // Blinking effect
        ctx.beginPath();
        ctx.arc(light.x, light.y, 5, 0, Math.PI * 2); // Lights size
        ctx.fillStyle = `rgba(${parseInt(light.color.slice(1, 3), 16)}, ${parseInt(light.color.slice(3, 5), 16)}, ${parseInt(light.color.slice(5), 16)}, ${opacity})`;
        ctx.fill();
        ctx.closePath();
    });
}

function stop_text() {
    
    // Create a gradient for the text
    const gradient = ctx.createLinearGradient(0, canvas.height / 3 - 50, canvas.width, canvas.height / 3 + 50);
    gradient.addColorStop(0, "#ff4444"); // Red
    gradient.addColorStop(0.5, "#44ff44"); // Green
    gradient.addColorStop(1, "#4444ff"); // Blue

    // Draw the text with gradient and outline
    ctx.font = "70px Arial";
    ctx.fillStyle = gradient; // Fill with gradient
    ctx.textAlign = "center";
    ctx.fillText("HAPPY NEW YEAR 2025", canvas.width / 2, canvas.height / 3);

    // Add an outline to the text
    ctx.strokeStyle = "#ffffff"; // White outline
    ctx.lineWidth = 2;
    ctx.strokeText("HAPPY NEW YEAR 2025", canvas.width / 2, canvas.height / 3);

    // Add sparkling Christmas lights around the text
    drawChristmasLights();
    // Link to redirect to

}

        function animate() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawStars();
            drawGradientMoon();

            if (isFinalTextDisplayed) {
                stop_text(); // Keep the final text visible
            } else {
                fireworks.forEach((firework, index) => {
                    firework.update();
                    firework.draw();
                    if (firework.exploded) {
                        fireworks.splice(index, 1);
                    }
                });

                particles.forEach((particle, index) => {
                    particle.update();
                    particle.draw();
                    if (particle.size < 0.2) {
                        particles.splice(index, 1);
                    }
                });
            }

            requestAnimationFrame(animate);
        }

        // Trigger fireworks for each text in sequence
        setInterval(() => {
            if (!isFinalTextDisplayed) createFireworkWithText();
        }, 800); // 3-second interval for each letter
        createStars(); // Initialize stars
createChristmasLights(); // Initialize Christmas lights
animate();
