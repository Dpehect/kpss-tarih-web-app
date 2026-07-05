"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Text, Torus, Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group } from "three";

/**
 * Ana WebGL hero sahnesi.
 * Ağır model yüklemek yerine procedural geometri kullanır; bu yüzden Faz 1 için hızlı ve taşınabilir kalır.
 */
export function HeroScene() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[3rem] border border-white/10 bg-[radial-gradient(circle_at_50%_36%,rgba(230,184,92,0.22),transparent_34%),linear-gradient(145deg,rgba(255,248,232,0.08),rgba(0,0,0,0.18))] shadow-[0_40px_120px_rgba(0,0,0,0.42)]">
      <Canvas
        camera={{ position: [0, 0.2, 7.2], fov: 44 }}
        dpr={[1, 1.7]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 4, 6]} intensity={1.8} />
        <pointLight position={[-4, -2, 3]} intensity={2.4} color="#52f2d0" />
        <Environment preset="night" />

        <HistoryAstrolabe />
        <FloatingYears />

        <Sparkles
          count={88}
          speed={0.34}
          size={2.2}
          scale={[7, 4.2, 2.5]}
          color="#f4d48a"
        />
      </Canvas>
    </div>
  );
}

/**
 * Dönen astrolabe/zaman halkası.
 * Tarih temasını modern WebGL objesiyle birleştirir.
 */
function HistoryAstrolabe() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.16;
    group.current.rotation.z += delta * 0.035;
  });

  return (
    <group ref={group} rotation={[0.36, -0.2, 0.08]}>
      <Float speed={1.4} rotationIntensity={0.22} floatIntensity={0.25}>
        <Torus args={[1.78, 0.025, 16, 180]}>
          <meshStandardMaterial color="#e6b85c" metalness={0.72} roughness={0.28} />
        </Torus>
        <Torus args={[2.28, 0.018, 16, 180]} rotation={[0.6, 0.2, 0.4]}>
          <meshStandardMaterial color="#ff8b3d" metalness={0.58} roughness={0.34} />
        </Torus>
        <Torus args={[2.78, 0.014, 16, 180]} rotation={[1.15, -0.1, -0.3]}>
          <meshStandardMaterial color="#52f2d0" metalness={0.44} roughness={0.38} />
        </Torus>

        <mesh>
          <icosahedronGeometry args={[0.94, 2]} />
          <meshStandardMaterial
            color="#5a2a16"
            emissive="#2a1008"
            roughness={0.68}
            metalness={0.18}
          />
        </mesh>
      </Float>
    </group>
  );
}

/**
 * Sahnenin etrafında yüzen tarih yılları.
 * Text objeleri küçük tutulduğu için performans maliyeti düşüktür.
 */
function FloatingYears() {
  const years = useMemo(
    () => [
      { text: "1299", position: [-2.9, 1.35, 0] },
      { text: "1453", position: [2.85, 1.05, -0.3] },
      { text: "1839", position: [-2.45, -1.55, 0.2] },
      { text: "1923", position: [2.35, -1.28, 0.1] }
    ],
    []
  );

  return (
    <>
      {years.map((year) => (
        <Float key={year.text} speed={1.8} rotationIntensity={0.12} floatIntensity={0.4}>
          <Text
            position={year.position as [number, number, number]}
            fontSize={0.28}
            color="#fff2cf"
            anchorX="center"
            anchorY="middle"
          >
            {year.text}
          </Text>
        </Float>
      ))}
    </>
  );
}
