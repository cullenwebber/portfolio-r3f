import { shaderMaterial } from "@react-three/drei";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";

export function Wires({ nodes }) {
	useFrame((state) => {
		state.scene.traverse((child) => {
			if (child.material && child.material.uniforms?.time) {
				child.material.uniforms.time.value += 0.01;
			}
		});
	});
	return (
		<>
			<mesh geometry={nodes.Wiresmall.geometry} position={[9.5, -0.2, -5]}>
				<wireShaderMaterialSmall />
			</mesh>
			<mesh
				geometry={nodes.Wiresmall001.geometry}
				position={[-5.196, -0.291, -2.13]}
			>
				<wireShaderMaterialSmall />
			</mesh>
			<mesh
				geometry={nodes.Wire001.geometry}
				position={[8.543, 0.047, -3.157]}
				rotation={[0, 0, -Math.PI / 2]}
			>
				<wireShaderMaterial />
			</mesh>
			<mesh
				geometry={nodes.Wire.geometry}
				position={[-2.085, 0.116, -1.067]}
				rotation={[0, 0, -Math.PI / 2]}
			>
				<wireShaderMaterial />
			</mesh>
		</>
	);
}

// Define the custom shader material
const WireShaderMaterial = shaderMaterial(
	// Uniforms
	{
		time: 0, // To animate the emission
		speed: 1, // Speed of the emission flow
		stripWidth: 0.1, // Width of the emission strip
		baseColor: new THREE.Color(0x010101), // Dark gray-black base color
		emissionColor: new THREE.Color(0x50ddff), // Cool blue emission color
		metallic: 0.9, // High metallic factor
		roughness: 0.3, // Slightly rough surface
		tint: new THREE.Color(0x020202), // Subtle blue tint for the reflections
	},
	// Vertex Shader
	`
    varying vec2 vUv; // Pass UV coordinates to the fragment shader
    varying vec3 vNormal; // Pass normal to the fragment shader
    varying vec3 vViewDir; // View direction for fresnel effect

    void main() {
      vUv = uv; // Assign the mesh's UV coordinates
      vNormal = normal; // Assign the vertex normal
      vViewDir = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
	// Fragment Shader
	`
    uniform float time;
    uniform float speed;
    uniform float stripWidth;
    uniform vec3 baseColor;
    uniform vec3 emissionColor;
    uniform float metallic;
    uniform float roughness;
    uniform vec3 tint;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;

    void main() {
      // Compute the flow for the first strip
      float flow1 = mod(vUv.y + time * speed, 1.0);

      // Compute the flow for the second strip, offset by 0.5
      float flow2 = mod(vUv.y + time * speed + 0.5, 1.0);

      // Create the emission strips
      float strip1 = smoothstep(0.5 - stripWidth, 0.5, flow1) - smoothstep(0.5, 0.5 + stripWidth, flow1);
      float strip2 = smoothstep(0.5 - stripWidth, 0.5, flow2) - smoothstep(0.5, 0.5 + stripWidth, flow2);

      // Combine the strips
      float combinedStrip = max(strip1, strip2);

      // Fresnel effect for metallic look
      float fresnel = pow(1.0 - dot(vNormal, vViewDir), 8.0);

      // Add roughness-based shading
      float roughnessFactor = 1.0 - roughness;

      // Metallic blending with tint
      vec3 tintedBaseColor = mix(baseColor, tint, fresnel * roughnessFactor);
      vec3 finalBaseColor = mix(baseColor, tintedBaseColor, metallic);

      vec3 amplifiedEmission = emissionColor * 4.0 * combinedStrip;
      // Combine base color and emission
      vec3 finalColor = mix(finalBaseColor, amplifiedEmission, combinedStrip);

      // Output the final color
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

// Define the custom shader material
const WireShaderMaterialSmall = shaderMaterial(
	// Uniforms
	{
		time: 0, // To animate the emission
		speed: 0.5, // Speed of the emission flow
		stripWidth: 0.01, // Width of the emission strip
		baseColor: new THREE.Color(0x010101), // Dark gray-black base color
		emissionColor: new THREE.Color(0x50ddff), // Cool blue emission color
		metallic: 0.9, // High metallic factor
		roughness: 0.3, // Slightly rough surface
		tint: new THREE.Color(0x0e131c), // Subtle blue tint for the reflections
	},
	// Vertex Shader
	`
    varying vec2 vUv; // Pass UV coordinates to the fragment shader
    varying vec3 vNormal; // Pass normal to the fragment shader
    varying vec3 vViewDir; // View direction for fresnel effect

    void main() {
      vUv = uv; // Assign the mesh's UV coordinates
      vNormal = normal; // Assign the vertex normal
      vViewDir = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
	// Fragment Shader
	`
    uniform float time;
    uniform float speed;
    uniform float stripWidth;
    uniform vec3 baseColor;
    uniform vec3 emissionColor;
    uniform float metallic;
    uniform float roughness;
    uniform vec3 tint;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;

    void main() {
      // Compute the flow for the first strip
      float flow1 = mod(vUv.x + time * speed, 1.0);

      // Compute the flow for the second strip, offset by 0.5
      float flow2 = mod(vUv.x + time * speed + 0.5, 1.0);

      // Create the emission strips
      float strip1 = smoothstep(0.5 - stripWidth, 0.5, flow1) - smoothstep(0.5, 0.5 + stripWidth, flow1);
      float strip2 = smoothstep(0.5 - stripWidth, 0.5, flow2) - smoothstep(0.5, 0.5 + stripWidth, flow2);

      // Combine the strips
      float combinedStrip = max(strip1, strip2);

      // Fresnel effect for metallic look
      float fresnel = pow(1.0 - dot(vNormal, vViewDir), 1.0);

      // Add roughness-based shading
      float roughnessFactor = 1.0 - roughness;

      // Metallic blending with tint
      vec3 tintedBaseColor = mix(baseColor, tint, fresnel * roughnessFactor);
      vec3 finalBaseColor = mix(baseColor, tintedBaseColor, metallic);

      vec3 amplifiedEmission = emissionColor * 4.0 * combinedStrip;
      // Combine base color and emission
      vec3 finalColor = mix(finalBaseColor, amplifiedEmission, combinedStrip);

      // Output the final color
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

// Extend the material so it can be used in JSX
extend({ WireShaderMaterial });
extend({ WireShaderMaterialSmall });
