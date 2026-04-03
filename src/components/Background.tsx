import { useRef, useMemo, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Text, Instances, Instance, PerspectiveCamera, Environment, ContactShadows, useScroll, Cloud, Float as FloatDrei } from '@react-three/drei';
import * as THREE from 'three';

function PhysicalShelf({ row, col, depth, color = "#3b82f6", isWarping = false }: { row: number, col: number, depth: number, color?: string, isWarping?: boolean }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      if (isWarping) {
        ref.current.position.z += 1.2;
        if (ref.current.position.z > 30) ref.current.position.z = -70;
      } else {
        const t = state.clock.getElapsedTime();
        ref.current.position.y += Math.sin(t * 0.2 + row + col) * 0.002;
      }
    }
  });

  // Architectural arrangement: Circular/Vaulted
  const angle = (col * Math.PI) / 4; // 8 pillars around
  const radius = 12 + depth * 6;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  return (
    <group ref={ref} position={[x, row * 6 - 3, z]} rotation={[0, -angle + Math.PI / 2, 0]}>
      {/* Main Shelf Structure - Heavy Architectural Feel */}
      <mesh position={[0, -2.5, 0]} receiveShadow>
        <boxGeometry args={[5, 0.3, 2.5]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 2.5, 0]} receiveShadow>
        <boxGeometry args={[5, 0.3, 2.5]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[-2.5, 0, 0]} castShadow>
        <boxGeometry args={[0.3, 5.3, 2.5]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[2.5, 0, 0]} castShadow>
        <boxGeometry args={[0.3, 5.3, 2.5]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Back Panel with subtle pattern */}
      <mesh position={[0, 0, -1.2]} receiveShadow>
        <boxGeometry args={[5, 5, 0.1]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.9} />
      </mesh>

      {/* Physical Books - Varied heights and colors */}
      <Instances range={30}>
        <boxGeometry args={[0.15, 1.8, 1.1]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={isWarping ? 10 : 0.8} 
          transparent 
          opacity={0.9} 
        />
        {Array.from({ length: 30 }).map((_, i) => {
          const h = 1.2 + Math.random() * 0.6;
          return (
            <Instance 
              key={i} 
              position={[i * 0.16 - 2.3, (h - 1.8) / 2, (Math.random() - 0.5) * 0.3]} 
              rotation={[0, (Math.random() - 0.5) * 0.1, 0]}
              scale={[1, h / 1.8, 1]}
            />
          );
        })}
      </Instances>

      {/* Floating Parchment/Data Fragments */}
      <FloatDrei speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 0, 1.5]}>
          <planeGeometry args={[0.4, 0.6]} />
          <meshStandardMaterial color="#fff" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      </FloatDrei>

      {/* Technical Label */}
      <Text
        position={[0, -2.7, 1.3]}
        fontSize={0.15}
        color="#ffffff"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
        fillOpacity={0.4}
      >
        {`NEXUS_ARCHIVE // SEC_${row}_${col}_${depth}`}
      </Text>
    </group>
  );
}

function VaultedCeiling({ color = "#3b82f6" }) {
  return (
    <group position={[0, 15, 0]}>
      {/* Large structural arches */}
      {Array.from({ length: 8 }).map((_, i) => (
        <group key={i} rotation={[0, (i * Math.PI) / 4, 0]}>
          <mesh position={[15, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[20, 0.5, 2]} />
            <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}
      <pointLight intensity={2} color={color} distance={30} />
    </group>
  );
}

function EquationCloud({ isWarping = false, isGodMode = false, activeColor = "#3b82f6" }) {
  const { mouse } = useThree();
  const count = 200;
  const symbols = ['Ψ', '∇', '∫', '∂', 'Σ', '∞', 'λ', 'ħ', 'Ω', 'Δ', 'φ', 'π', '≈', '≠', '≡', '√', '⊗', '⊕', 'ℵ', '℘', 'ℏ', 'μ', 'ν', 'ρ'];
  
  const fragments = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 150 - 75
      ],
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      speed: Math.random() * 0.5 + 0.2,
      rotationSpeed: Math.random() * 0.1,
      scale: Math.random() * 0.8 + 0.2,
      orbitRadius: Math.random() * 15 + 5,
      orbitSpeed: Math.random() * 0.8 + 0.3,
      phase: Math.random() * Math.PI * 2
    }));
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.children.forEach((child, i) => {
        const frag = fragments[i];
        if (isWarping) {
          child.position.z += 3.0;
          if (child.position.z > 40) child.position.z = -110;
          child.rotation.z += 0.4;
        } else if (isGodMode) {
          // God Mode: Hyper-speed infinite loops
          const angle = t * frag.orbitSpeed * 2 + frag.phase;
          child.position.x = Math.cos(angle) * frag.orbitRadius;
          child.position.y = Math.sin(angle) * frag.orbitRadius;
          child.position.z = Math.sin(angle * 0.5) * 30;
          child.rotation.x += 0.1;
          child.rotation.y += 0.1;
          child.scale.setScalar(frag.scale * (1 + Math.sin(t * 5) * 0.2));
        } else {
          child.position.z += frag.speed;
          if (child.position.z > 40) child.position.z = -110;
          child.rotation.z += frag.rotationSpeed;
          
          // Mouse interaction
          child.position.x += (mouse.x * 10 - child.position.x) * 0.005;
          child.position.y += (-mouse.y * 10 - child.position.y) * 0.005;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {fragments.map((frag, i) => (
        <Text
          key={i}
          position={frag.position as [number, number, number]}
          fontSize={frag.scale}
          color={isGodMode ? activeColor : "#ffffff"}
          fillOpacity={isGodMode ? 0.6 : 0.1}
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
        >
          {frag.symbol}
        </Text>
      ))}
    </group>
  );
}

function VolumetricFog({ color = "#3b82f6" }) {
  const fogRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (fogRef.current) {
      fogRef.current.rotation.y += 0.0005;
      fogRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 1;
    }
  });

  return (
    <group ref={fogRef}>
      <Cloud
        opacity={0.2}
        speed={0.5} 
        bounds={[40, 10, 20]}
        segments={30} 
        color={color}
        position={[0, -5, -15]}
      />
      <Cloud
        opacity={0.15}
        speed={0.3} 
        bounds={[50, 15, 30]}
        segments={20} 
        color={color}
        position={[0, 10, -30]}
      />
    </group>
  );
}

function LibraryFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial 
        color="#050505" 
        metalness={0.8} 
        roughness={0.2} 
      />
    </mesh>
  );
}

function InfiniteLibrary({ color = "#3b82f6", isWarping = false }: { color?: string, isWarping?: boolean }) {
  const shelves = useMemo(() => {
    const temp = [];
    // Architectural grid: 8 pillars around
    for (let d = -1; d <= 2; d++) {
      for (let c = 0; c < 8; c++) { 
        for (let r = -1; r <= 1; r++) {
          temp.push({ row: r, col: c, depth: d });
        }
      }
    }
    return temp;
  }, []);

  return (
    <group>
      {shelves.map((s, i) => (
        <PhysicalShelf key={i} row={s.row} col={s.col} depth={s.depth} color={color} isWarping={isWarping} />
      ))}
      <VaultedCeiling color={color} />
      <LibraryFloor />
    </group>
  );
}

function DustParticles({ count = 500 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 50;
      p[i * 3 + 1] = (Math.random() - 0.5) * 50;
      p[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.001;
      ref.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.2}
        sizeAttenuation
      />
    </points>
  );
}

export default function Background({ activeColor = "#3b82f6", isWarping = false, isGodMode = false }: { activeColor?: string, isWarping?: boolean, isGodMode?: boolean }) {
  const fogColor = useMemo(() => new THREE.Color(activeColor).lerp(new THREE.Color("#000000"), 0.85), [activeColor]);

  return (
    <div className="fixed inset-0 -z-10 bg-[#010204] overflow-hidden">
      <div className="absolute inset-0 z-10 pointer-events-none cinematic-vignette opacity-80" />
      
      <Suspense fallback={<div className="absolute inset-0 bg-[#010204]" />}>
        <Canvas dpr={[1, 2]} shadows gl={{ antialias: true, alpha: false, stencil: false }}>
          <PerspectiveCamera makeDefault position={[0, 0, isGodMode ? 20 : 10]} fov={isWarping ? 130 : isGodMode ? 100 : 60} />
          
          <Suspense fallback={null}>
            <ambientLight intensity={0.1} />
            <pointLight position={[0, 5, 0]} intensity={5} color={activeColor} castShadow shadow-mapSize={[2048, 2048]} />
            <spotLight position={[20, 30, 20]} angle={0.3} penumbra={1} intensity={6} color={activeColor} castShadow />
            <spotLight position={[-20, -30, -20]} angle={0.3} penumbra={1} intensity={3} color="#ffffff" />
            
            <InfiniteLibrary color={activeColor} isWarping={isWarping} />
            <EquationCloud isWarping={isWarping} isGodMode={isGodMode} activeColor={activeColor} />
            
            <VolumetricFog color={activeColor} />
            <DustParticles />
            
            <Stars radius={250} depth={200} count={12000} factor={10} saturation={0} fade speed={isWarping ? 25 : 1} />
            
            <fog attach="fog" args={[fogColor.getStyle(), 1, isWarping ? 40 : isGodMode ? 80 : 60]} />
            
            <Environment preset="night" />
            <ContactShadows opacity={0.7} scale={50} blur={1.5} far={15} color="#000000" />
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  );
}
