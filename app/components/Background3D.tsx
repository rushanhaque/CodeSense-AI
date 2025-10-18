'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AnimatedSphere({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() + position[0]) * 0.3;
      meshRef.current.position.x = position[0] + Math.cos(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[scale, 100, 100]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.5}
        speed={2.5}
        roughness={0.1}
        metalness={0.9}
      />
    </Sphere>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlesCount = 1000;
  const positions = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        color="#3b82f6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[10, -10, -5]} intensity={0.5} color="#60a5fa" />
        
        {/* Main spheres with varied sizes */}
        <AnimatedSphere position={[-2.5, 0, -2]} color="#1e40af" scale={1.2} />
        <AnimatedSphere position={[2.5, 1, -3]} color="#3b82f6" scale={0.8} />
        <AnimatedSphere position={[0, -1.5, -1]} color="#60a5fa" scale={1} />
        <AnimatedSphere position={[-1, 2, -4]} color="#2563eb" scale={0.6} />
        <AnimatedSphere position={[3, -2, -2.5]} color="#1d4ed8" scale={0.7} />
        
        <Particles />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
