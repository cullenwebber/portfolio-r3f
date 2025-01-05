"use client";

import { Canvas } from "@react-three/fiber";
import { BlendFunction } from "postprocessing";

import {
	Bloom,
	EffectComposer,
	Noise,
	Scanline,
} from "@react-three/postprocessing";
import HomeScene from "@/components/home/HomeScene";
import { RefProvider } from "@/components/home/RefProvider";

export default function Home() {
	return (
		<div className="h-lvh w-full relative">
			<RefProvider>
				<Canvas className="h-lvh canvas-container">
					<EffectComposer disableNormalPass>
						<Bloom
							luminanceThreshold={0.6}
							mipmapBlur
							luminanceSmoothing={0}
							intensity={0.4}
						/>
						<Noise opacity={0.6} blendFunction={BlendFunction.SOFT_LIGHT} />
						<Scanline opacity={0.4} blendFunction={BlendFunction.SOFT_LIGHT} />
					</EffectComposer>
					<HomeScene />
				</Canvas>
			</RefProvider>
		</div>
	);
}
