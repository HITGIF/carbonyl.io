import React, {useRef, Suspense, useState} from 'react'
import {useFrame, useLoader} from 'react-three-fiber'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import './res/styles.css'

const Asset = React.forwardRef((props, ref) => {
  const gltf = useLoader(GLTFLoader, '/models/small_planet/scene.gltf');
  gltf.scene.scale.set(.2, .2, .2);
  return <primitive ref={ref} object={gltf.scene}/>
});

export default function ModelView () {
  let [gltf, set] = useState();
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });
  if (!gltf) set(
    <Suspense fallback={<mesh ref={ref}/>}>
      <Asset ref={ref} url="scene.gltf"/>
    </Suspense>
  );
  return gltf;
}
