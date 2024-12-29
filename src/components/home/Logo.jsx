import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";

export function Logo({ nodes }) {
	const logoRef = useRef();

	useFrame(() => {
		if (logoRef.current) {
			logoRef.current.rotation.y += 0.02;
		}
	});

	return (
		<group ref={logoRef}>
			<mesh geometry={nodes.logobottom.geometry}>
				<MeshTransmissionMaterial
					backside
					backsideThickness={5}
					thickness={2}
				/>
			</mesh>
			<mesh geometry={nodes.logoleft.geometry}>
				<MeshTransmissionMaterial
					backside
					backsideThickness={5}
					thickness={2}
				/>
			</mesh>
			<mesh geometry={nodes.logoright.geometry}>
				<MeshTransmissionMaterial
					backside
					backsideThickness={5}
					thickness={2}
				/>
			</mesh>
			<mesh geometry={nodes.logotop.geometry}>
				<MeshTransmissionMaterial
					backside
					backsideThickness={5}
					thickness={2}
				/>
			</mesh>
		</group>
	);
}
