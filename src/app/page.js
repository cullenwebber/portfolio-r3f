"use client";

import { useRef } from "react";
import { Model } from "@/components/models/Rock-scene";
import { Canvas, useFrame } from "@react-three/fiber";
import { BlendFunction } from "postprocessing";

import { easing } from "maath";
import {
	Bloom,
	EffectComposer,
	Noise,
	Scanline,
} from "@react-three/postprocessing";
import { Environment } from "@react-three/drei";

function SpotLightWithHelper() {
	const lightRef = useRef();

	return (
		<spotLight
			ref={lightRef}
			decay={0}
			position={[0, 60, 10]}
			angle={0.12}
			penumbra={1}
			intensity={0.5}
			castShadow
			shadow-mapSize={1024}
			color={"#50DDFF"}
		/>
	);
}

export default function Home() {
	return (
		<div className="h-lvh w-full">
			<Canvas className="h-lvh">
				<color attach="background" args={["black"]} />
				<SpotLightWithHelper />
				<EffectComposer disableNormalPass>
					<Bloom
						luminanceThreshold={0.6}
						mipmapBlur
						luminanceSmoothing={0}
						intensity={0.6}
					/>
					<Noise opacity={0.6} blendFunction={BlendFunction.SOFT_LIGHT} />
					<Scanline opacity={0.4} blendFunction={BlendFunction.SOFT_LIGHT} />
				</EffectComposer>
				<Model />
				<CameraRig />
			</Canvas>
		</div>
	);
}

function CameraRig() {
	useFrame((state, delta) => {
		easing.damp3(
			state.camera.position,
			[
				-1 + (state.pointer.x * state.viewport.width) / 6,
				(3 + state.pointer.y) / 2,
				6,
			],
			0.25,
			delta
		);
		state.camera.lookAt(0, 2, 0);
	});
}
