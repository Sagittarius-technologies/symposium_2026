import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, RoundedBox, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Clock3DProps {
    selectedHour: number;
    onHourSelect: (hour: number) => void;
}

// Clock face component
function ClockFace({ selectedHour, onHourSelect }: Clock3DProps) {
    const clockRef = useRef<THREE.Group>(null);
    const hourHandRef = useRef<THREE.Mesh>(null);
    const minuteHandRef = useRef<THREE.Mesh>(null);

    // Calculate proper rotation for hour hand (clockwise from 12)
    // 12 o'clock = 0°, 3 o'clock = 90°, 6 o'clock = 180°, 9 o'clock = 270°
    const getHourRotation = (hour: number): number => {
        const h = hour > 12 ? hour - 12 : hour;
        // Each hour = 30 degrees (360/12)
        return -((h / 12) * Math.PI * 2);
    };

    // Calculate minute hand rotation
    const getMinuteRotation = (hour: number): number => {
        const minutes = (hour % 1) * 60;
        return -((minutes / 60) * Math.PI * 2);
    };

    // Animate clock hands smoothly
    useFrame(() => {
        if (hourHandRef.current) {
            const targetRotation = getHourRotation(selectedHour);
            hourHandRef.current.rotation.z = THREE.MathUtils.lerp(
                hourHandRef.current.rotation.z,
                targetRotation,
                0.1
            );
        }
        if (minuteHandRef.current) {
            const targetRotation = getMinuteRotation(selectedHour);
            minuteHandRef.current.rotation.z = THREE.MathUtils.lerp(
                minuteHandRef.current.rotation.z,
                targetRotation,
                0.1
            );
        }
    });

    // Time slot mappings
    const hourMap: Record<number, number> = {
        10: 10, 11: 10.5, 12: 11, 1: 12, 2: 14, 3: 15, 4: 15.5, 5: 16
    };

    return (
        <group ref={clockRef}>
            {/* Clock body - main face */}
            <mesh position={[0, 0, -0.1]}>
                <cylinderGeometry args={[2.2, 2.2, 0.2, 64]} />
                <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Clock outer ring */}
            <mesh position={[0, 0, 0]}>
                <torusGeometry args={[2.1, 0.12, 16, 100]} />
                <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Inner ring */}
            <mesh position={[0, 0, 0.01]}>
                <torusGeometry args={[1.9, 0.03, 16, 100]} />
                <meshStandardMaterial color="#374151" metalness={0.5} roughness={0.5} />
            </mesh>

            {/* Clock numbers */}
            {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
                const angle = ((i - 3) * 30) * (Math.PI / 180); // Adjusted so 12 is at top
                const radius = 1.6;
                const x = Math.cos(-angle + Math.PI / 2) * radius;
                const y = Math.sin(-angle + Math.PI / 2) * radius;
                const mappedHour = hourMap[num];
                const isClickable = mappedHour !== undefined;
                const isActive = mappedHour === selectedHour;

                return (
                    <group key={num} position={[x, y, 0.1]}>
                        {/* Number background circle for active state */}
                        {isActive && (
                            <mesh>
                                <circleGeometry args={[0.25, 32]} />
                                <meshStandardMaterial 
                                    color="#F59E0B" 
                                    emissive="#F59E0B"
                                    emissiveIntensity={0.5}
                                />
                            </mesh>
                        )}
                        <Text
                            fontSize={0.3}
                            color={isActive ? "#000000" : isClickable ? "#F59E0B" : "#6B7280"}
                            anchorX="center"
                            anchorY="middle"
                            position={[0, 0, 0.05]}
                            font="/fonts/Inter-Bold.woff"
                            onClick={() => isClickable && onHourSelect(mappedHour)}
                            onPointerOver={(e) => {
                                if (isClickable) {
                                    document.body.style.cursor = 'pointer';
                                    e.stopPropagation();
                                }
                            }}
                            onPointerOut={() => {
                                document.body.style.cursor = 'auto';
                            }}
                        >
                            {num.toString()}
                        </Text>
                    </group>
                );
            })}

            {/* Hour markers (small dots) */}
            {Array.from({ length: 60 }).map((_, i) => {
                if (i % 5 === 0) return null; // Skip where numbers are
                const angle = (i * 6) * (Math.PI / 180);
                const radius = 1.85;
                const x = Math.cos(angle - Math.PI / 2) * radius;
                const y = Math.sin(angle - Math.PI / 2) * radius;
                return (
                    <mesh key={i} position={[x, y, 0.05]}>
                        <circleGeometry args={[0.02, 16]} />
                        <meshStandardMaterial color="#4B5563" />
                    </mesh>
                );
            })}

            {/* Center hub */}
            <mesh position={[0, 0, 0.15]}>
                <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
                <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Hour hand */}
            <group ref={hourHandRef} position={[0, 0, 0.12]}>
                <mesh position={[0, 0.5, 0]}>
                    <RoundedBox args={[0.12, 1, 0.05]} radius={0.02}>
                        <meshStandardMaterial color="#F59E0B" metalness={0.7} roughness={0.3} />
                    </RoundedBox>
                </mesh>
            </group>

            {/* Minute hand */}
            <group ref={minuteHandRef} position={[0, 0, 0.14]}>
                <mesh position={[0, 0.7, 0]}>
                    <RoundedBox args={[0.08, 1.4, 0.04]} radius={0.02}>
                        <meshStandardMaterial color="#EF4444" metalness={0.7} roughness={0.3} />
                    </RoundedBox>
                </mesh>
            </group>

            {/* Decorative gears */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.2}>
                <group position={[-2.5, 0, -0.1]}>
                    <mesh rotation={[0, 0, 0]}>
                        <torusGeometry args={[0.4, 0.08, 8, 12]} />
                        <meshStandardMaterial color="#991B1B" metalness={0.8} roughness={0.2} />
                    </mesh>
                </group>
            </Float>

            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.15}>
                <group position={[2.5, 0.5, -0.1]}>
                    <mesh>
                        <torusGeometry args={[0.3, 0.06, 8, 10]} />
                        <meshStandardMaterial color="#B45309" metalness={0.8} roughness={0.2} />
                    </mesh>
                </group>
            </Float>

            <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.1}>
                <group position={[2.3, -0.8, -0.1]}>
                    <mesh>
                        <torusGeometry args={[0.25, 0.05, 8, 8]} />
                        <meshStandardMaterial color="#7F1D1D" metalness={0.8} roughness={0.2} />
                    </mesh>
                </group>
            </Float>
        </group>
    );
}

// Rotating gears animation
function RotatingGear({ position, size, color, speed }: { position: [number, number, number], size: number, color: string, speed: number }) {
    const gearRef = useRef<THREE.Mesh>(null);
    
    useFrame((state) => {
        if (gearRef.current) {
            gearRef.current.rotation.z = state.clock.elapsedTime * speed;
        }
    });

    return (
        <mesh ref={gearRef} position={position}>
            <torusGeometry args={[size, size * 0.15, 6, 8]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} transparent opacity={0.7} />
        </mesh>
    );
}

interface ThreeClockProps {
    selectedHour: number;
    onHourSelect: (hour: number) => void;
}

export default function ThreeClock({ selectedHour, onHourSelect }: ThreeClockProps) {
    return (
        <div className="w-72 h-72 md:w-80 md:h-80">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, 5]} intensity={0.5} color="#F59E0B" />
                <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={0.8} />
                
                <ClockFace selectedHour={selectedHour} onHourSelect={onHourSelect} />
                
                {/* Rotating decorative gears */}
                <RotatingGear position={[-2.8, -0.5, -0.2]} size={0.35} color="#DC2626" speed={0.5} />
                <RotatingGear position={[2.7, -0.3, -0.2]} size={0.28} color="#B45309" speed={-0.7} />
                
                <OrbitControls 
                    enableZoom={false} 
                    enablePan={false}
                    minPolarAngle={Math.PI / 2.5}
                    maxPolarAngle={Math.PI / 1.8}
                    minAzimuthAngle={-Math.PI / 8}
                    maxAzimuthAngle={Math.PI / 8}
                />
            </Canvas>
        </div>
    );
}
