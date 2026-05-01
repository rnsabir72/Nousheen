import { useEffect } from "react";

export default function TwinklingStars() {
  useEffect(() => {
    const colors = ["#ffffff", "#ffcc00", "#ff99cc", "#ffddaa"];

    const createStar = () => {
      const star = document.createElement("div");
      star.className = "twinkle-star";

      const size = Math.random() * 3 + 1.5;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * window.innerWidth}px`;
      star.style.top = `${Math.random() * window.innerHeight}px`;
      star.style.background = colors[Math.floor(Math.random() * colors.length)];
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;

      document.body.appendChild(star);

      // Remove after some time and recreate
      setTimeout(() => {
        if (star.parentNode) star.parentNode.removeChild(star);
      }, 8000);
    };

    // Create initial stars
    for (let i = 0; i < 80; i++) {
      createStar();
    }

    // Keep adding new stars
    const interval = setInterval(() => {
      createStar();
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return null;
}