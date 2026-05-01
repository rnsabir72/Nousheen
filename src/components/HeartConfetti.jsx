import { useEffect } from "react";

export default function HeartConfetti() {
  useEffect(() => {
    const colors = [
      "#ff4e8b", "#ff99cc", "#ffd700", "#ff69b4", 
      "#ffffff", "#cc66ff", "#00ffff", "#ffcc00", "#ff5e8a"
    ];

    const createHeart = () => {
      const heart = document.createElement("div");
      heart.className = "heart";

      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 18 + 14; // 14px to 32px

      heart.style.left = Math.random() * window.innerWidth + "px";
      heart.style.top = "-60px";
      heart.style.width = size + "px";
      heart.style.height = size + "px";
      heart.style.opacity = Math.random() * 0.6 + 0.6;

      // Exact Heart SVG
      heart.innerHTML = `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      `;

      document.body.appendChild(heart);

      const duration = Math.random() * 5500 + 6500;

      heart.animate(
        [
          { 
            transform: "translateY(0) rotate(0deg)",
            opacity: parseFloat(heart.style.opacity)
          },
          { 
            transform: `translateY(${window.innerHeight + 120}px) rotate(${Math.random() * 180 + 90}deg)`,
            opacity: 0
          }
        ],
        {
          duration: duration,
          easing: "linear",
        }
      ).onfinish = () => {
        if (heart.parentNode) heart.parentNode.removeChild(heart);
      };
    };

    const interval = setInterval(() => {
      createHeart();
    }, 140);

    return () => clearInterval(interval);
  }, []);

  return null;
}