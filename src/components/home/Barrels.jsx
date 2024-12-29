import * as THREE from "three";
import { useRef, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { BlackEnvMat } from "../materials/BlackEnvMat";

export function Barrels({ nodes }) {
	const positions = [
		[4.096, 0.26, 2.804],
		[-4.166, 0, -2.097],
		[4.71, -0.072, 2.272],
		[-5.309, 0.35, -2.303],
	];
	const rotations = [
		[0, 0, -0.379],
		[0, 1.105, -1.536],
		[0, -0.849, -1.961],
		[0, 0, 0.262],
	];
	const scales = [0.597, 0.597, 0.597, 0.597];

	// Per-instance data for floating + tilting
	const instanceData = positions.map((_, i) => ({
		phase: i * Math.PI / 2, // random offset for the sine wave
		floatSpeed: 2.0, // random float speed
		// We'll store each barrel's original rotation as an Euler
		originalEuler: new THREE.Euler(...rotations[i]),
	}));

	const instancedRef = useRef();
	const material = BlackEnvMat();

	// Set up each instance's base transform (position, rotation, scale)
	useLayoutEffect(() => {
		const dummyMatrix = new THREE.Matrix4();

		for (let i = 0; i < positions.length; i++) {
			const pos = new THREE.Vector3(...positions[i]);
			const rot = new THREE.Euler(...rotations[i]);
			const scl = new THREE.Vector3(scales[i], scales[i], scales[i]);

			dummyMatrix.compose(pos, new THREE.Quaternion().setFromEuler(rot), scl);
			instancedRef.current.setMatrixAt(i, dummyMatrix);
		}

		instancedRef.current.instanceMatrix.needsUpdate = true;
	}, []);

	useFrame((state, delta) => {
		if (!instancedRef.current) return;

		const dummyMatrix = new THREE.Matrix4();
		const dummyPos = new THREE.Vector3();
		const dummyQuat = new THREE.Quaternion();
		const dummyScale = new THREE.Vector3();
		const euler = new THREE.Euler();

		for (let i = 0; i < positions.length; i++) {
			instancedRef.current.getMatrixAt(i, dummyMatrix);
			dummyMatrix.decompose(dummyPos, dummyQuat, dummyScale);

			const data = instanceData[i];

			data.phase += delta * data.floatSpeed;

			const floatOffset = Math.sin(data.phase * 1.25) * 0.04;
			dummyPos.y = positions[i][1] + floatOffset;

			euler.copy(data.originalEuler);

			const tiltAmplitude = 0.04; // how strong you want the tilt
			euler.x += Math.sin(data.phase * 0.5) * tiltAmplitude;
			dummyQuat.setFromEuler(euler);

			dummyMatrix.compose(dummyPos, dummyQuat, dummyScale);
			instancedRef.current.setMatrixAt(i, dummyMatrix);
		}

		instancedRef.current.instanceMatrix.needsUpdate = true;
	});

	return (
		<instancedMesh
			ref={instancedRef}
			args={[nodes.Barrel.geometry, material, positions.length]}
		/>
	);
}
