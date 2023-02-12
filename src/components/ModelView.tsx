import React, { Suspense } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Asset = React.forwardRef((props, ref) => {
    // @ts-ignore
    const gltf = useLoader(GLTFLoader, "/models/small_planet/scene.gltf");
    gltf.scene.scale.set(.2, .2, .2);
    return <primitive ref={ref} object={gltf.scene}/>;
});

export default function ModelView() {
    const ref = React.useRef();
    useFrame(() => {
        if (!ref.current) return;
        // @ts-ignore
        ref.current.rotation.x += 0.01;
        // @ts-ignore
        ref.current.rotation.y += 0.01;
        // @ts-ignore
        ref.current.rotation.z += 0.001;
    });
    return (
        <Suspense fallback={null}>
            <Asset ref={ref}/>
        </Suspense>
    );
}
