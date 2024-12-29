import { Text } from "@react-three/drei";
import { useState, useEffect } from "react";
import * as THREE from "three";

export function VideoText(props) {
	const [video] = useState(() =>
		Object.assign(document.createElement("video"), {
			src: "/video.mp4",
			crossOrigin: "Anonymous",
			loop: true,
			muted: true,
			playsInline: true, // Add this attribute
		})
	);
	useEffect(() => void video.play(), [video]);

	const videoTexture = new THREE.VideoTexture(video);
	videoTexture.encoding = THREE.sRGBEncoding;

	return (
		<Text
			font="/bootzy.ttf"
			fontSize={9}
			letterSpacing={0}
			geometryArgs={{ uvGenerator: null }} // Ensure proper UV mapping
			{...props}
		>
			COMPLICIT*
			<meshStandardMaterial
				toneMapped={false}
				emissive={"#50DDFF"}
				emissiveIntensity={2}
				emissiveMap={videoTexture}
			/>
		</Text>
	);
}
