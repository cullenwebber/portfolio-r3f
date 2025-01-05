import React, { useRef, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";

export const Logo = forwardRef((props, ref) => {
	const { nodes, ...restProps } = props;
	const internalRef = useRef();

	// Use either the forwarded ref or the internal ref
	const resolvedRef = ref || internalRef;

	useFrame(() => {
		if (resolvedRef.current) {
			resolvedRef.current.rotation.y += 0.02;
		}
	});

	return (
        <Float
        speed={3}
        rotationIntensity={1}
        floatIntensity={1}
        floatingRange={[-0.25, 0.25]}
    >
		<group ref={resolvedRef} {...restProps}>
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
        </Float>
	);
});