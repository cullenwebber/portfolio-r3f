import { shaderMaterial } from "@react-three/drei";

export const TransitionMaterial = shaderMaterial(
  {
    progression: 0,
    tex: undefined,
    tex2: undefined,
    time: 0, // Add time uniform for animated effect
  },
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  /* glsl */ `
    varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform float progression;
    uniform float time;

    void main() {
      vec2 uv = vUv;

      // Add ripple distortion for underwater effect
      float waveIntensity = 0.004; // Control intensity of the waves
      float waveFrequency = 40.0;  // Control frequency of the waves
      float waveSpeed = 1.0;      // Control speed of the wave animation

      float frequency = 10.0;      // Number of waves along the x-axis
      float amplitude = 0.03;      // Height of the wave
      float speed = 1.0;           // Animation speed of the wave
      float edgeSoftness = 0.0;   // Softness of the wave edges

      vec2 ripple = vec2(
        sin(uv.y * waveFrequency + time * waveSpeed),
        cos(uv.x * waveFrequency * 2.0 + time * waveSpeed)
      ) * waveIntensity;

      vec2 distortedUv = uv + ripple;

      vec4 _texture = texture2D(tex, uv);
      vec4 _texture2 = texture2D(tex2, distortedUv); // Apply distortion to tex2

      vec4 finalTexture;
      float wave = (sin(-uv.x * frequency + time * speed) + sin(uv.x * frequency * 1.5 + time * 0.5 * speed * 0.75))  * amplitude * 0.5;
      float transition = smoothstep(progression + wave - edgeSoftness, progression + wave + edgeSoftness, uv.y);
      finalTexture = mix(_texture2, _texture, transition);

      gl_FragColor = finalTexture;
    }`
);