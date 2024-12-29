import { Text } from "@react-three/drei";
import { useState, useEffect } from "react";
import * as THREE from "three";

export function VideoText(props) {
  // Initialize the video element
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: "/video.mp4",
      crossOrigin: "Anonymous",
      loop: true,
      muted: true,
      playsInline: true,
    })
  );

  
  useEffect(() => {
    video.play();
  }, [video]);

  // Create a video texture
  const videoTexture = new THREE.VideoTexture(video);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.format = THREE.RGBAFormat;

  return (
    <Text
      font="/bootzy.ttf"
      fontSize={9}
      letterSpacing={0}

      {...props}
    >
      COMPLICIT*
      <meshStandardMaterial
        emissiveMap={videoTexture}
        toneMapped={false}
        emissive="#50DDFF"
        emissiveIntensity={2}
      />
    </Text>
  );
}
