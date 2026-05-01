import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Crown() {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={ref} position={[0, 2, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#ff4e8b" />
    </mesh>
  );
}