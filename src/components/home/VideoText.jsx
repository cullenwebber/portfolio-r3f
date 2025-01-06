import { Text } from "@react-three/drei";
import { useState, useEffect } from "react";
import * as THREE from "three";

export function VideoText(props) {
	// Initialize the video element
	const [video] = useState(() =>
		Object.assign(document.createElement("video"), {
			src: "/videoColor.mp4",
			crossOrigin: "Anonymous",
			loop: true,
			muted: true,
			playsInline: true,
		})
	);

	useEffect(() => {
		video.play();
	}, [video]);

	return (
		<Text font="/bootzy.ttf" fontSize={9} letterSpacing={0} {...props}>
			COMPLICIT*
			<meshBasicMaterial toneMapped={false}>
				<videoTexture
					attach="map"
					args={[video]}
					encoding={THREE.sRGBEncoding}
				/>
			</meshBasicMaterial>
		</Text>
	);
}
