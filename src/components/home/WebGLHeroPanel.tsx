"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Environment } from "@react-three/drei";
import { BarChart3, BookOpen, BrainCircuit, FileQuestion } from "lucide-react";

const panelRows = [
  {
    title: "Konu seç",
    body: "Kısa özetlerle başla",
    icon: <BookOpen size={17} />
  },
  {
    title: "Test çöz",
    body: "30 soruluk açıklamalı oturum",
    icon: <FileQuestion size={17} />
  },
  {
    title: "Tekrar et",
    body: "Flashcard ile hızlı hatırla",
    icon: <BrainCircuit size={17} />
  },
  {
    title: "Analiz et",
    body: "Yanlışları ve gelişimi izle",
    icon: <BarChart3 size={17} />
  }
];

function SoftOrb() {
  return (
    <Float speed={1.35} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh scale={1.35}>
        <sphereGeometry args={[1, 96, 96]} />
        <MeshDistortMaterial
          color="#d94b45"
          roughness={0.42}
          metalness={0.08}
          distort={0.28}
          speed={1.05}
        />
      </mesh>
    </Float>
  );
}

export function WebGLHeroPanel() {
  return (
    <div className="relative min-h-[500px] overflow-hidden rounded-[2.75rem] border border-[#e4d8c8] bg-white/72 p-4 shadow-[0_34px_120px_rgba(25,31,52,.12)] backdrop-blur-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(217,75,69,.16),transparent_32rem),radial-gradient(circle_at_80%_80%,rgba(37,99,235,.12),transparent_24rem)]" />

      <div className="absolute right-[-2rem] top-[-3rem] h-[18rem] w-[18rem] opacity-90 md:h-[22rem] md:w-[22rem]">
        <Canvas camera={{ position: [0, 0, 4], fov: 42 }} dpr={[1, 1.5]}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[3, 3, 4]} intensity={1.4} />
          <SoftOrb />
          <Environment preset="city" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
        </Canvas>
      </div>

      <div className="relative z-10 flex min-h-[470px] flex-col justify-between rounded-[2.1rem] border border-white/70 bg-[#fffaf3]/74 p-5 backdrop-blur-xl">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c43136]">Çalışma vitrini</p>
          <h2 className="mt-3 max-w-sm text-4xl font-black leading-[0.95] tracking-[-0.075em] text-[#101828] md:text-5xl">
            Tek ekranda net rota.
          </h2>
          <p className="mt-4 max-w-sm text-sm font-semibold leading-7 text-slate-600">
            Ana sayfa sadece tanıtmaz; kullanıcıyı doğrudan konu, test, tekrar ve analize taşır.
          </p>
        </div>

        <div className="mt-8 grid gap-3">
          {panelRows.map((row) => (
            <div
              key={row.title}
              className="grid grid-cols-[42px_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-[#eadfce] bg-white/78 p-3 shadow-sm"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-[#101828] text-white">
                {row.icon}
              </span>
              <div>
                <p className="text-sm font-black text-[#101828]">{row.title}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">{row.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-[#eadfce] bg-white/78 p-4">
          <div className="mb-3 flex items-center justify-between text-xs font-black uppercase tracking-[0.16em] text-slate-400">
            <span>Oturum akışı</span>
            <span className="text-[#c43136]">Hazır</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#eee2d4]">
            <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-[#c43136] to-[#f59e0b]" />
          </div>
        </div>
      </div>
    </div>
  );
}
