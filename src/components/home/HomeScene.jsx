import React, { useContext, useRef, useState } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { TransitionMaterial } from "@/components/materials/TransitionMaterial";
import { Model } from "@/components/models/Rock-scene";
import { useFBO } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { easing } from "maath";
import * as THREE from "three";
import AboutScene from "@/components/about/AboutScene";
import { RefContext } from "./RefContext";

gsap.registerPlugin(ScrollTrigger);

extend({ TransitionMaterial });

export default function HomeScene() {
	const context = useContext(RefContext);

	const { viewport, gl, size } = useThree();
	const renderTarget1 = useFBO();
	const renderTarget2 = useFBO();
	const renderMaterial = useRef();
	const scene1Group = useRef();
	const scene2Group = useRef();
	const camera1Ref = useRef();
	const camera2Ref = useRef();
	const yRef = useRef(1.75);
	const aspect = size.width / size.height;

	let lookatY = useRef(2);

	// GSAP for scene transitions
	useGSAP(() => {
		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".canvas-container",
				start: "top top",
				end: "+=100%",
				scrub: true,
				pin: true,
			},
			defaults: {
				ease: "power2.out",
			},
		});

		tl.to(
			{},
			{
				onUpdate: function () {
					const progress = this.progress();
					const startValue = 1.75;
					const endValue = -2;

					const lerpedValue = THREE.MathUtils.lerp(
						startValue,
						endValue,
						progress
					);

					camera1Ref.current.position.y = lerpedValue;

					const startValue2 = 4;
					const endValue2 = 0;

					const lerpedValue2 = THREE.MathUtils.lerp(
						startValue2,
						endValue2,
						progress
					);

					camera2Ref.current.position.y = lerpedValue2;

					const lookatYLerp = THREE.MathUtils.lerp(2, -2, progress);

					lookatY.current = lookatYLerp;
				},
			}
		)
			.to(
				{},
				{
					onUpdate: function () {
						const progress = this.progress();

						const startValue = 0;
						const endValue = 1;

						const lerpedValue = THREE.MathUtils.lerp(
							startValue,
							endValue,
							progress
						);

						renderMaterial.current.progression = lerpedValue;
					},
				},
				"<"
			)
			.to(
				{},
				{
					onUpdate: function () {
						const progress = this.progress();
						const startValueHero = 0;
						const endValueHero = -3;

						const lerpedValueHero = THREE.MathUtils.lerp(
							startValueHero,
							endValueHero,
							progress
						);

						context.logoHero.current.position.y = lerpedValueHero;

						const startValueAbout = 0;
						const endValueAbout = -4.5;

						const lerpedValueAbout = THREE.MathUtils.lerp(
							startValueAbout,
							endValueAbout,
							progress
						);

						context.logoAbout.current.position.y = lerpedValueAbout;
					},
				},
				"<"
			);
	});

	useFrame(() => {
		camera1Ref.current.aspect = aspect;
		camera1Ref.current.updateProjectionMatrix();

		camera2Ref.current.aspect = aspect;
		camera2Ref.current.updateProjectionMatrix();

		gl.setClearColor("black", 1); // Ensure the clear color is black
		gl.setClearAlpha(1); // Opaque alpha

		// Render Scene 1
		scene1Group.current.visible = true;
		scene2Group.current.visible = false;
		gl.setRenderTarget(renderTarget1);
		gl.clear(); // Clear framebuffer
		gl.render(scene1Group.current, camera1Ref.current);

		// Render Scene 2
		scene1Group.current.visible = false;
		scene2Group.current.visible = true;
		gl.setRenderTarget(renderTarget2);
		gl.clear(); // Clear framebuffer
		gl.render(scene2Group.current, camera2Ref.current);

		// Reset render target
		gl.setRenderTarget(null);
		gl.clear(); // Clear the default framebuffer
		scene1Group.current.visible = false;
		scene2Group.current.visible = false;
	});

	useFrame((state, delta) => {
		const targetX = (state.pointer.x * state.viewport.width) / 6;

		// Create a target position
		const targetPosition = new THREE.Vector3(
			targetX,
			camera1Ref.current.position.y,
			camera1Ref.current.position.z
		);

		// Apply dampening to the position
		easing.damp3(camera1Ref.current.position, targetPosition, 0.25, delta);

		// Ensure the camera looks at the target
		camera1Ref.current.lookAt(0, lookatY.current, 0);

		renderMaterial.current.uniforms.time.value = state.clock.getElapsedTime();
	});

	return (
		<>
			<color attach="background" args={["black"]} />
			<mesh>
				<planeGeometry args={[viewport.width, viewport.height]} />
				<transitionMaterial
					ref={renderMaterial}
					tex={renderTarget1.texture}
					tex2={renderTarget2.texture}
				/>
			</mesh>

			{/* Scene 1 */}
			<perspectiveCamera
				ref={camera1Ref}
				fov={75}
				aspect={aspect}
				position={[0, yRef.current, 6]}
			/>
			<group ref={scene1Group}>
				<spotLight
					decay={0}
					position={[0, 60, 10]}
					angle={0.1}
					penumbra={1}
					intensity={0.35}
					color={"#50DDFF"}
				/>
				<Model />
			</group>

			{/* Scene 2 */}
			<perspectiveCamera ref={camera2Ref} fov={75} position={[0, 4, 6]} />
			<group ref={scene2Group}>
				<AboutScene />
			</group>
		</>
	);
}
