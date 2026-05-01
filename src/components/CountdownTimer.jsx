import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(new Date().getFullYear(), 4, 2); // 2nd May

    const updateCountdown = () => {
      const now = new Date();
      let target = new Date(targetDate);

      if (now > target) {
        target.setFullYear(target.getFullYear() + 1);
      }

      const diff = target - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      textAlign: "center",
      margin: "15px 10px",
      fontSize: "clamp(12px, 3vw, 18px)",
      letterSpacing: "1px"
    }}>
      <p style={{ marginBottom: "6px", opacity: 0.9 }}>Next Birthday in</p>
      <div style={{ fontSize: "clamp(18px, 6vw, 26px)", fontWeight: "bold", color: "#ffd700" }}>
        {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
      </div>
    </div>
  );
}