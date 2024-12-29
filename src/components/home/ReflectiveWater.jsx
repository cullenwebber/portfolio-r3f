import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";

export function ReflectiveWater() {
	const waterBump = useLoader(THREE.TextureLoader, "/waterbump.png");

	const meshRef = useRef();
	// A ref to store the original (base) positions
	const basePositionsRef = useRef();

	useEffect(() => {
		// Once the geometry is created, store the original positions
		const geometry = meshRef.current?.geometry;
		if (geometry && !basePositionsRef.current) {
			// Keep a copy of the geometry attributes
			basePositionsRef.current = Float32Array.from(
				geometry.attributes.position.array
			);
		}
	}, []);

	useFrame((state) => {
		const time = state.clock.getElapsedTime();

		// 1) Update reflection distortion (as you already do)
		if (meshRef.current?.material) {
			meshRef.current.material.distortion =
				1 + 2.0 * (1 + Math.sin(time + Math.PI / 4));
		}

		// 2) Update vertex positions for a wavy effect, but never go below base Z
		const geometry = meshRef.current?.geometry;
		if (geometry && basePositionsRef.current) {
			const position = geometry.attributes.position;
			for (let i = 0; i < position.count; i++) {
				// Get original (base) position from our stored array
				const baseX = basePositionsRef.current[i * 3 + 0];
				const baseY = basePositionsRef.current[i * 3 + 1];
				const baseZ = basePositionsRef.current[i * 3 + 2];

				// Calculate some small wave amplitude
				const waveZ =
					// Lower frequencies from 2.5 to something like 1.5
					Math.sin(baseX * 1.5 - time * 1.5) * 0.05 +
					Math.cos(baseY * 1.5 - time * 1.5) * 0.05 +
					// Lower frequencies from 10.5 to something like 3.0
					Math.sin(baseX * 3.0 - time * 3.0) * 0.01 +
					Math.cos(baseY * 3.0 - time * 3.0) * 0.01;

				// Only move upward, clamp negative offsets to 0
				position.setZ(i, baseZ + Math.max(0, waveZ));
			}
			position.needsUpdate = true;
		}
	});

	return (
		<mesh
			ref={meshRef}
			receiveShadow
			rotation={[-Math.PI / 2, 0, 0]}
			position={[0, -0.18, 0]}
		>
			{/* Provide enough segments for a smooth wave */}
			<planeGeometry args={[20, 20, 128, 128]} />
			<MeshReflectorMaterial
				blur={[100, 100]}
				mixBlur={1.0}
				mixStrength={180}
				resolution={2048}
				roughness={1.0}
				depthScale={12}
				minDepthThreshold={0.5}
				maxDepthThreshold={0.6}
				color="#555555"
				metalness={0.6}
				distortionMap={waterBump}
				distortion={0.3}
			/>
		</mesh>
	);
}
