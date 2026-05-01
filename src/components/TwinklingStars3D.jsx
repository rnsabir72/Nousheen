import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function TwinklingStars3D({ count = 350 }) {
  const pointsRef = useRef();

  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const opacities = new Float32Array(count);

  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 120;
    positions[i + 1] = (Math.random() - 0.5) * 120;
    positions[i + 2] = (Math.random() - 0.5) * 120;

    sizes[i / 3] = Math.random() * 2.5 + 0.8;
    opacities[i / 3] = Math.random() * 0.9 + 0.4;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("opacity", new THREE.BufferAttribute(opacities, 1));

  useFrame(() => {
    if (pointsRef.current) {
      const opacityAttr = pointsRef.current.geometry.attributes.opacity;

      for (let i = 0; i < count; i++) {
        // Real twinkling effect
        opacityAttr.array[i] = Math.random() * 0.9 + 0.4;
      }
      opacityAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry attach="geometry" {...geometry} />
      <pointsMaterial
        attach="material"
        size={0.18}
        color="#ffffff"
        sizeAttenuation={true}
        transparent={true}
        opacity={1}
      />
    </points>
  );
}