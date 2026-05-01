import { useEffect, useState } from "react";

export default function Countdown() {
  const birthDate = new Date("1978-05-02");
  const [age, setAge] = useState(0);

  useEffect(() => {
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();

    const hasHadBirthday =
      today.getMonth() > 4 ||
      (today.getMonth() === 4 && today.getDate() >= 2);

    if (!hasHadBirthday) calculatedAge--;

    setAge(calculatedAge);
  }, []);

  return (
    <p style={{ textAlign: "center", fontSize: "22px" }}>
      Celebrating {age} Beautiful Years of Love ❤️✨
    </p>
  );
}