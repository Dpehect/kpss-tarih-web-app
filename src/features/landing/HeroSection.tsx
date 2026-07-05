"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      {/* Basit WebGL obje - tarih temalı küre / parşömen efekti */}
      <mesh>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial 
          color="#c79a35" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#87bfff"
          emissiveIntensity={0.1}
        />
      </mesh>
      <Environment preset="warehouse" />
    </>
  );
}

export function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(".hero-bg", 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.8, ease: "power4.out" }
    )
    .fromTo(titleRef.current, 
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, ease: "power4.out" }, "-=1.2"
    )
    .fromTo(subtitleRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }, "-=1"
    );
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden hero-bg">
      {/* WebGL Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }} className="opacity-70">
          <Scene />
          <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.2} />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div ref={titleRef}>
          <h1 className="text-6xl md:text-8xl font-semibold tracking-[-0.07em] text-neutral-950 mb-6">
            Tarih <span className="text-[#c79a35]">Mastery</span>'ine<br />Ulaş
          </h1>
        </div>

        <div ref={subtitleRef}>
          <p className="text-2xl md:text-3xl text-neutral-600 max-w-3xl mx-auto mb-12">
            KPSS Tarih'te Apple kalitesinde, adaptif ve sinematik bir öğrenme deneyimi.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-10 py-7 rounded-2xl bg-neutral-950 hover:bg-black text-white transition-all hover:scale-105">
              Hemen Başla
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="text-lg px-10 py-7 rounded-2xl border-2">
            Nasıl Çalışır?
          </Button>
        </div>

        <p className="mt-8 text-sm text-neutral-500">Zaten 1200+ aday katıldı</p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-neutral-400 rounded-full flex items-center justify-center">
          <div className="w-1 h-3 bg-neutral-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}