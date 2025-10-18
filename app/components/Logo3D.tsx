'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function FuturisticLogo() {
  const braceLeft = useRef<THREE.Mesh>(null);
  const braceRight = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Animate left brace
    if (braceLeft.current) {
      braceLeft.current.rotation.y = Math.sin(t * 0.5) * 0.2;
      braceLeft.current.position.x = -1.2 + Math.sin(t) * 0.05;
    }
    
    // Animate right brace
    if (braceRight.current) {
      braceRight.current.rotation.y = Math.sin(t * 0.5) * 0.2;
      braceRight.current.position.x = 1.2 + Math.sin(t) * 0.05;
    }
    
    // Animate core sphere
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.5;
      coreRef.current.rotation.z = Math.sin(t) * 0.1;
    }
    
    // Animate rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t;
      ring1Ref.current.rotation.y = t * 0.5;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.7;
      ring2Ref.current.rotation.z = t * 0.3;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.8;
      ring3Ref.current.rotation.z = -t * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        {/* Left Curly Brace { */}
        <mesh ref={braceLeft} position={[-1.2, 0, 0]}>
          <torusGeometry args={[0.4, 0.08, 16, 32, Math.PI]} />
          <meshStandardMaterial
            color="#3b82f6"
            metalness={0.9}
            roughness={0.1}
            emissive="#1e40af"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[-1.2, 0.4, 0]}>
          <boxGeometry args={[0.08, 0.3, 0.08]} />
          <meshStandardMaterial
            color="#3b82f6"
            metalness={0.9}
            roughness={0.1}
            emissive="#1e40af"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[-1.2, -0.4, 0]}>
          <boxGeometry args={[0.08, 0.3, 0.08]} />
          <meshStandardMaterial
            color="#3b82f6"
            metalness={0.9}
            roughness={0.1}
            emissive="#1e40af"
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Right Curly Brace } */}
        <mesh ref={braceRight} position={[1.2, 0, 0]} rotation={[0, Math.PI, 0]}>
          <torusGeometry args={[0.4, 0.08, 16, 32, Math.PI]} />
          <meshStandardMaterial
            color="#3b82f6"
            metalness={0.9}
            roughness={0.1}
            emissive="#1e40af"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[1.2, 0.4, 0]}>
          <boxGeometry args={[0.08, 0.3, 0.08]} />
          <meshStandardMaterial
            color="#3b82f6"
            metalness={0.9}
            roughness={0.1}
            emissive="#1e40af"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[1.2, -0.4, 0]}>
          <boxGeometry args={[0.08, 0.3, 0.08]} />
          <meshStandardMaterial
            color="#3b82f6"
            metalness={0.9}
            roughness={0.1}
            emissive="#1e40af"
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Central AI Brain Core */}
        <Sphere ref={coreRef} args={[0.35, 32, 32]}>
          <MeshDistortMaterial
            color="#60a5fa"
            metalness={1}
            roughness={0}
            emissive="#3b82f6"
            emissiveIntensity={0.8}
            distort={0.3}
            speed={2}
          />
        </Sphere>
        
        {/* Orbiting Rings */}
        <Torus ref={ring1Ref} args={[0.6, 0.03, 16, 32]}>
          <meshStandardMaterial
            color="#60a5fa"
            metalness={0.9}
            roughness={0.1}
            emissive="#3b82f6"
            emissiveIntensity={0.6}
            transparent
            opacity={0.7}
          />
        </Torus>
        
        <Torus ref={ring2Ref} args={[0.7, 0.02, 16, 32]}>
          <meshStandardMaterial
            color="#93c5fd"
            metalness={0.9}
            roughness={0.1}
            emissive="#60a5fa"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </Torus>
        
        <Torus ref={ring3Ref} args={[0.8, 0.015, 16, 32]}>
          <meshStandardMaterial
            color="#dbeafe"
            metalness={0.9}
            roughness={0.1}
            emissive="#93c5fd"
            emissiveIntensity={0.4}
            transparent
            opacity={0.5}
          />
        </Torus>
        
        {/* Glow Sphere */}
        <Sphere args={[1.2, 32, 32]}>
          <meshBasicMaterial
            color="#3b82f6"
            transparent
            opacity={0.05}
          />
        </Sphere>
      </group>
    </Float>
  );
}

export default function Logo3D() {
  return (
    <div className="w-24 h-24 md:w-32 md:h-32">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#60a5fa" />
        <spotLight
          position={[0, 5, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#93c5fd"
        />
        <FuturisticLogo />
      </Canvas>
    </div>
  );
}
