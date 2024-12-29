import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";

// Suppose `nodes.logobottom.geometry` (and the others) are truly identical.
// You can pick one of them (e.g. `nodes.logobottom.geometry`) and re-use it everywhere.

export function Logo({ geometry }) {
  const logoRef = useRef();
  const instancedMeshRef = useRef();

  useFrame(() => {
    if (logoRef.current) {
      logoRef.current.rotation.y += 0.02;
    }
  });

  // After the component mounts, configure each instance's transform
  useEffect(() => {
    const dummy = new THREE.Object3D();
    // Example transforms for each piece
    const transforms = [
      { position: [0, -1, 0], rotation: [0, 0, 0] }, // bottom
      { position: [-1, 0, 0], rotation: [0, 0, Math.PI / 2] }, // left
      { position: [1, 0, 0], rotation: [0, 0, -Math.PI / 2] }, // right
      { position: [0, 1, 0], rotation: [0, 0, Math.PI] }, // top
    ];

    transforms.forEach((t, i) => {
      dummy.position.set(...t.position);
      dummy.rotation.set(...t.rotation);
      dummy.updateMatrix();
      instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
    });

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group ref={logoRef}>
      <instancedMesh ref={instancedMeshRef} args={[geometry, null, 4]}>
        <MeshTransmissionMaterial
          backside
          backsideThickness={5}
          thickness={2}
        />
      </instancedMesh>
    </group>
  );
}