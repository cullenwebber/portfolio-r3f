import { useRef } from "react";
import * as THREE from "three";
import { shaderMaterial, MeshReflectorMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";

export function Teleporter({ nodes }) {
	const materialRef = useRef(null);
	useFrame((state, delta) => {
		materialRef.current.uTime += delta * 2.0;
	});
	return (
		<>
			<mesh position={[0, 0.85, 0]}>
				<cylinderGeometry attach="geometry" args={[1.6, 1.6, 1, 32]} />
				<cylinderShader
					ref={materialRef}
					transparent
					side={THREE.FrontSide}
					uMinY={1}
					uMaxY={0}
					uColor="#50DDFF"
				/>
			</mesh>
			<mesh geometry={nodes.Teleporter.geometry} position={[0, -0.1, 0]}>
				<meshStandardMaterial
					color={"#414141"}
					roughness={0.6}
					metalness={0.8}
				/>
			</mesh>
		</>
	);
}

const CylinderShader = shaderMaterial(
	/* Uniforms */
	{
		uColor: new THREE.Color("#50DDFF"), // Base color
		uMinY: 0.0,
		uMaxY: 1.0,
		uTime: 0.0,
	},

	/* Vertex Shader */
	/* glsl */ `
    uniform float uTime;
    uniform float uAmplitude;
    uniform float uFrequency;
    uniform float uPixelation;

    varying float vY;

    void main() {
      // Pass original Y value to fragment shader
      vY = position.y;

	  float bowFactor = 1.2 + 0.4 * vY ;

	  vec3 newPosition = position;
    newPosition.x *= bowFactor;
    newPosition.z *= bowFactor;

      // Standard MVP transform
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,

	/* Fragment Shader */
	/* glsl */ `
    uniform vec3 uColor;
    uniform float uMinY;
    uniform float uMaxY;
    uniform float uTime;
    varying float vY;

    void main() {

      float t = (vY - uMinY) / (uMaxY - uMinY);

      // Base alpha fade from 0.1 at uMinY to 0.0 at uMaxY
		float alphaBase = 1.0 * sqrt(t) - 1.0;
      alphaBase = clamp(alphaBase, 0.0, 1.0);

      // Combine the two alpha contributions
      float alpha = alphaBase * abs(sin(uTime * 0.5));

      gl_FragColor = vec4(uColor, alpha);
    }
  `
);

extend({ CylinderShader });