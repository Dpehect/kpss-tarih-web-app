"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";

function OrbMesh() {
  return (
    <Float speed={1.2} rotationIntensity={0.55} floatIntensity={0.75}>
      <mesh scale={1.35}>
        <sphereGeometry args={[1, 96, 96]} />
        <MeshDistortMaterial
          color="#d24b42"
          roughness={0.38}
          metalness={0.12}
          distort={0.24}
          speed={0.85}
        />
      </mesh>
    </Float>
  );
}

export function SoftbridgeOrb() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas camera={{ position: [0, 0, 4], fov: 38 }} dpr={[1, 1.35]}>
        <ambientLight intensity={1.25} />
        <directionalLight position={[3, 3, 4]} intensity={1.2} />
        <OrbMesh />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
