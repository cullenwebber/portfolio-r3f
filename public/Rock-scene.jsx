/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 rock-scene.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/rock-scene.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Rock.geometry} material={materials.Rock_baked} position={[0, 0.189, 0]} />
      <mesh geometry={nodes.Water.geometry} material={materials['Water_baked.001']} position={[0, -0.276, 0]} scale={[10, 0.1, 10]} />
      <mesh geometry={nodes.Text.geometry} material={materials.Text_baked} position={[0, 0.723, -4.156]} rotation={[Math.PI / 2, 0, 0]} scale={1.481} />
      <mesh geometry={nodes.Teleporter.geometry} material={materials.Wire} position={[0, -0.175, 0]} />
      <mesh geometry={nodes.Wire001.geometry} material={materials.Wire} position={[7.543, 0.047, -0.157]} rotation={[0, 0, -Math.PI / 2]} />
      <mesh geometry={nodes.Wire.geometry} material={materials.Wire} position={[-2.085, 0.116, -1.067]} rotation={[0, 0, -Math.PI / 2]} />
      <mesh geometry={nodes.Light.geometry} material={materials.eye_low_baked} />
      <mesh geometry={nodes.Wiresmall.geometry} material={materials.Wire} position={[8.622, -0.207, -2.237]} />
      <mesh geometry={nodes.Wiresmall001.geometry} material={materials.Wire} position={[-5.196, -0.291, -2.13]} />
      <mesh geometry={nodes.logobottom.geometry} material={materials['logo.bottom_baked']} />
      <mesh geometry={nodes.logoleft.geometry} material={materials['logo.left_baked']} />
      <mesh geometry={nodes.logoright.geometry} material={materials['logo.right_baked']} />
      <mesh geometry={nodes.logotop.geometry} material={materials['logo.top_baked']} />
    </group>
  )
}

useGLTF.preload('/rock-scene.glb')