import { EXRLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export function BlackEnvMat() {
	const exrTexture = useLoader(EXRLoader, "/hdri.exr");
	exrTexture.mapping = THREE.EquirectangularReflectionMapping;
	const material = new THREE.MeshPhysicalMaterial({
		metalness: 0.5,
		roughness: 0.1,
		color: "#666666",
		envMap: exrTexture,
		envMapIntensity: 0.8,
	});

	return material;
}
