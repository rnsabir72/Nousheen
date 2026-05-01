import { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Crown from "./components/Crown";
import Carousel from "./components/Carousel";
import Sparkle from "./components/Sparkle";
import HeartConfetti from "./components/HeartConfetti";
import FloatingHearts from "./components/FloatingHearts";
import CountdownTimer from "./components/CountdownTimer";
import Countdown from "./components/Countdown";
import RoyalLetter from "./components/RoyalLetter";
import Fireworks from "./components/Fireworks";
import TwinklingStars from "./components/TwinklingStars";
import TwinklingStars3D from "./components/TwinklingStars3D";
import music from "./assets/birthday-music.mp3";

export default function App() {
  const [showLetter, setShowLetter] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [lockTimeLeft, setLockTimeLeft] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });

  const audioRef = useRef(null);

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const currentYear = now.getFullYear();

      let targetDate = new Date(currentYear, 4, 2, 0, 0, 0); // 2nd May

      if (now > targetDate) {
        targetDate.setFullYear(targetDate.getFullYear() + 1);
      }

      const diff = targetDate - now;

      const isToday =
        now.getMonth() === 4 && now.getDate() === 2;

      setIsUnlocked(isToday);

      if (!isToday) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (diff % (1000 * 60 * 60)) /
            (1000 * 60)
        );
        const seconds = Math.floor(
          (diff % (1000 * 60)) / 1000
        );

        setLockTimeLeft({
          d: days,
          h: hours,
          m: minutes,
          s: seconds,
        });
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOpenLetter = () => {
    if (!isUnlocked) return;

    setShowLetter(true);
    setShowFireworks(true);

    if (audioRef.current) {
      audioRef.current.play().catch((e) => console.log(e));
    }
  };

  return (
    <div>
      <Sparkle />
      <HeartConfetti />
      <FloatingHearts />
      <TwinklingStars />

      <audio ref={audioRef} loop>
        <source src={music} type="audio/mpeg" />
      </audio>

      <Canvas style={{ height: "450px" }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <TwinklingStars3D count={400} />
        <OrbitControls enableZoom={false} />
        <Crown />
        <Carousel />
      </Canvas>

      <h1 className="title">
        ❤️ Happy Birthday My Beautiful Wife ❤️
      </h1>

      <CountdownTimer />
      <Countdown />

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        {isUnlocked ? (
          <button
            className="button"
            onClick={handleOpenLetter}
          >
            Open My Heart 💌
          </button>
        ) : (
          <button
            className="button"
            onClick={() =>
              alert(
                `Please wait ❤️\n\nRemaining Time:\n${lockTimeLeft.d} Days\n${lockTimeLeft.h} Hours\n${lockTimeLeft.m} Minutes\n${lockTimeLeft.s} Seconds`
              )
            }
            style={{ opacity: 0.7 }}
          >
            Click Here ❤️
          </button>
        )}
      </div>

      {showLetter && <RoyalLetter />}
      {showFireworks && <Fireworks />}
    </div>
  );
}