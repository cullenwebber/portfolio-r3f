import React from "react";
import { useGLTF, Float } from "@react-three/drei";
import { VideoText } from "@/components/home/VideoText";
import { Logo } from "@/components/home/Logo";
import { ReflectiveWater } from "@/components/home/ReflectiveWater";
import { Wires } from "@/components/home/Wires";
import { Teleporter } from "@/components/home/Teleporter";
import { Barrels } from "@/components/home/Barrels";

export function Model(props) {
	const { nodes, materials } = useGLTF("/rock-scene-2.glb");

	return (
		<group {...props} dispose={null}>
			<mesh
				geometry={nodes.Rock.geometry}
				material={materials.Rock_baked}
				position={[0, 0.189, 0]}
			/>
			<ReflectiveWater />
			<VideoText position={[0, 3, -8]} />
			<Teleporter nodes={nodes} />
			<Wires nodes={nodes} />
			<Barrels nodes={nodes} />

			<mesh geometry={nodes.Light.geometry} position={[0, 0.3, 0]}>
				<meshPhysicalMaterial
					color={"#50DDFF"}
					roughness={0.5}
					metalness={0.2}
					emissive={"#50DDFF"}
					emissiveIntensity={1}
				/>
			</mesh>
			<mesh geometry={nodes.Light.geometry} position={[0, 0.1, 0]}>
				<meshBasicMaterial color={"#000000"} />
			</mesh>

			<Float
				speed={3}
				rotationIntensity={1}
				floatIntensity={1}
				floatingRange={[-0.25, 0.25]}
			>
				<Logo nodes={nodes} />
			</Float>
		</group>
	);
}

useGLTF.preload("/rock-scene-2.glb");
