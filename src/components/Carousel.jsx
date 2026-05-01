import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const images = import.meta.glob("../assets/*.{jpg,jpeg,png,JPG,JPEG,PNG}", { eager: true });

export default function Carousel() {
  const group = useRef();

  const imageUrls = useMemo(() => 
    Object.values(images).map((img) => img.default), 
  []);

  const textures = useLoader(TextureLoader, imageUrls);

  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.008;
  });

  return (
    <group ref={group}>
      {textures.map((texture, i) => {
        const angle = (i / textures.length) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.sin(angle) * 3, 0, Math.cos(angle) * 3]}
          >
            {/* Square shape for all pictures */}
            <boxGeometry args={[2, 2, 0.2]} />
            <meshStandardMaterial map={texture} />
          </mesh>
        );
      })}
    </group>
  );
}