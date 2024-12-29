import { EXRLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export function BlackEnvMat() {
	const exrTexture = useLoader(EXRLoader, "/hdri.exr");
	exrTexture.mapping = THREE.EquirectangularReflectionMapping;
	const material = new THREE.MeshPhysicalMaterial({
		metalness: 0.6,
		roughness: 0.4,
		color: "black",
		envMap: exrTexture,
        envMapIntensity: 0.6
	});

	return material;
}
