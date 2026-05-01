import { useEffect } from "react";

export default function FloatingHearts() {
  useEffect(() => {
    const colors = ["#ff4e8b", "#ff99cc", "#ffd700", "#ff69b4", "#cc66ff"];

    const createFloatingHeart = () => {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.innerHTML = "❤️";

      heart.style.left = Math.random() * window.innerWidth + "px";
      heart.style.bottom = "-30px";
      heart.style.fontSize = Math.random() * 18 + 14 + "px";
      heart.style.color = colors[Math.floor(Math.random() * colors.length)];
      heart.style.opacity = Math.random() * 0.5 + 0.4;

      document.body.appendChild(heart);

      const duration = Math.random() * 8000 + 12000;

      heart.animate([
        { transform: "translateY(0)", opacity: heart.style.opacity },
        { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 }
      ], {
        duration: duration,
        easing: "ease-out"
      }).onfinish = () => heart.remove();
    };

    const interval = setInterval(() => {
      createFloatingHeart();
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return null;
}