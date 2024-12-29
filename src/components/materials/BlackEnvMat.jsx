import { EXRLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export function BlackEnvMat() {
	const exrTexture = useLoader(EXRLoader, "/hdri.exr");
	exrTexture.mapping = THREE.EquirectangularReflectionMapping;
	const material = new THREE.MeshPhysicalMaterial({
		metalness: 1.0,
		roughness: 0.2,
		color: "black",
		envMap: exrTexture,
		envMapIntensity: 0.8,
	});

	return material;
}
