import React, { useContext } from "react";
import {
	useGLTF,
	Text,
	useVideoTexture,
	useDepthBuffer,
} from "@react-three/drei";
import { Logo } from "@/components/home/Logo";
import { RefContext } from "@/components/home/RefContext";
export default function AboutScene() {
	const { nodes, materials } = useGLTF("/rock-scene-2.glb");

	const context = useContext(RefContext);

	return (
		<>

			<UnderWaterLight
				intensity={1}
				angle={0.6}
				penumbra={1}
				position={[0, 0, 10]}
				color={"#50DDFF"}
			/>
			<Logo
				ref={context.logoAbout}
				nodes={nodes}
				position={[0, -6, 0]}
				scale={[2, 2, 2]}
			/>

			<Text
				font="/bootzy.ttf"
				fontSize={3}
				letterSpacing={0}
				position={[0, 3, -3]}
				maxWidth={15}
				textAlign={"justify"}
				anchorY={"top"}
				receiveShadow
			>
				full-stack creative developer with a passion for blending technology and
				design to craft meaningful digital experiences.
				<meshStandardMaterial color={"white"} />
			</Text>
		</>
	);
}

useGLTF.preload("/rock-scene-2.glb");

function UnderWaterLight(props) {
	const texture = useVideoTexture("/caustics.mp4");
	return <spotLight decay={0} map={texture} castShadow {...props} />;
}
