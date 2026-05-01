import { useEffect } from "react";

export default function Sparkle() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    const colors = [
      "#ff4e8b",
      "#ffd700",
      "#00ffff",
      "#ff99cc",
      "#cc66ff",
      "#ffcc00",
      "#ffffff"
    ];

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.life = 40;
        this.alpha = 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        this.alpha = this.life / 40;
        this.size *= 0.96;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const handleMouseMove = (e) => {
      for (let i = 0; i < 6; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    function animate() {
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

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return null;
}