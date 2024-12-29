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

export default function Home() {
	return (
		<div className="h-lvh w-full relative">
			<div className="absolute top-4 left-4">
				<div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 border-white border-t border-r z-30 border-solid h-3 w-[1px]"></div>
				<div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 border-white border-t border-r z-30 border-solid w-3 h-[1px]"></div>
			</div>
			<div className="absolute bottom-4 left-4">
				<div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 border-white border-t border-r z-30 border-solid h-3 w-[1px]"></div>
				<div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 border-white border-t border-r z-30 border-solid w-3 h-[1px]"></div>
			</div>
			<div className="absolute bottom-4 right-4">
				<div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 border-white border-t border-r z-30 border-solid h-3 w-[1px]"></div>
				<div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 border-white border-t border-r z-30 border-solid w-3 h-[1px]"></div>
			</div>
			<div className="absolute top-4 right-4">
				<div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 border-white border-t border-r z-30 border-solid h-3 w-[1px]"></div>
				<div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 border-white border-t border-r z-30 border-solid w-3 h-[1px]"></div>
			</div>
			<Canvas className="h-lvh">
				<color attach="background" args={["black"]} />
				<spotLight
					decay={0}
					position={[0, 60, 10]}
					angle={0.12}
					penumbra={1}
					intensity={0.5}
					castShadow
					shadow-mapSize={1024}
					color={"#50DDFF"}
				/>
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
