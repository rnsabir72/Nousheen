import { useEffect } from "react";

export default function Fireworks() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "10000";
    canvas.style.pointerEvents = "none";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d", { alpha: true });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    let isRunning = true;

    const colors = ["#ff4e8b", "#ffd700", "#ff99cc", "#cc66ff", "#00ffff", "#ffffff", "#ff5e8a", "#ffcc00"];

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 3.5 + 2.2;
        this.speedX = (Math.random() - 0.5) * 9;
        this.speedY = (Math.random() - 0.5) * 9 - 2.5;
        this.gravity = 0.13;
        this.life = Math.random() * 55 + 75;
        this.alpha = 1;
      }

      update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        this.alpha = this.life / 90;
        this.radius *= 0.97;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function createBurst(x, y) {
      const particleCount = 120;
      const color = colors[Math.floor(Math.random() * colors.length)];

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color));
      }
    }

    // Heavy initial bursts
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        if (!isRunning) return;
        createBurst(
          Math.random() * canvas.width,
          Math.random() * (canvas.height * 0.65) + 90
        );
      }, i * 80);
    }

    // Continuous bursts (music ke end tak)
    const burstInterval = setInterval(() => {
      if (!isRunning) return;

      // 2 bursts at once for more intensity
      createBurst(
        Math.random() * canvas.width,
        Math.random() * (canvas.height * 0.6) + 80
      );
      createBurst(
        Math.random() * canvas.width,
        Math.random() * (canvas.height * 0.55) + 120
      );
    }, 140);

    function animate() {
      if (!isRunning) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();

        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    // Cleanup function
    return () => {
      isRunning = false;
      clearInterval(burstInterval);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return null;
}