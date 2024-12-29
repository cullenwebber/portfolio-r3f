import { useRef } from "react";
import * as THREE from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";

export function ReflectiveWater() {
	const waterBump = useLoader(THREE.TextureLoader, "/waterbump.png");
	const materialRef = useRef();

	// Scale and animate the distortion
	useFrame((state) => {
		const time = state.clock.getElapsedTime();
		if (materialRef.current) {
			materialRef.current.distortion =
				1 + 2.0 * (1 + Math.sin(time + Math.PI / 4));
		}
	});

	return (
		<mesh
			receiveShadow
			rotation={[-Math.PI / 2, 0, 0]}
			position={[0, -0.18, 0]}
		>
			<planeGeometry args={[20, 20]} />
			<MeshReflectorMaterial
				ref={materialRef}
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
