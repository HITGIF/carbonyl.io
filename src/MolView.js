import React, {useRef, Suspense, useState} from 'react'
import {useFrame, useLoader} from 'react-three-fiber'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import './styles.css'
import {TorusKnotGeometry, MeshNormalMaterial} from "three";

const Asset = React.forwardRef((props, ref) => {
  const gltf = useLoader(GLTFLoader, '/models/small_planet/scene.gltf');
  gltf.scene.scale.set(.2, .2, .2);
  return <primitive ref={ref} object={gltf.scene}/>
});

const Box = React.forwardRef((props, ref) => {
  return (
    <mesh
      ref={ref}
      geometry={new TorusKnotGeometry(1, .3, 100, 16)}
      material={new MeshNormalMaterial()}
    />
  )
});

export default function MolView () {
  let [gltf, set] = useState();
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });
  if (!gltf) set(
    <Suspense fallback={<Box ref={ref}/>}>
      <Asset ref={ref} url="scene.gltf"/>
    </Suspense>
  );
  return gltf;
}
