import React, { Suspense, useEffect } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Object3D } from "three/src/core/Object3D";

const randomCoordinate = () => 0.01 + 3 * Math.random();

const start = {
    x: randomCoordinate(),
    y: randomCoordinate(),
    z: randomCoordinate(),
};

const Asset = React.forwardRef((props, ref) => {
    const gltf = useLoader(GLTFLoader, "/models/small_planet/scene.gltf");
    gltf.scene.scale.set(.2, .2, .2);
    gltf.scene.rotation.set(randomCoordinate(), randomCoordinate(), randomCoordinate());
    return <primitive ref={ref} object={gltf.scene}/>;
});

export default function ModelView(
    {play}: { play: boolean }
) {
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => handle({x: event.clientX, y: event.clientY});
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const ref = React.useRef<Object3D>();
    let target: { x: number, y: number, z: number } = start;

    useFrame(() => {
        if (!ref.current) return;
        if (play) {
            ref.current.rotation.x += 0.01;
            ref.current.rotation.y += 0.01;
            ref.current.rotation.z += 0.001;
            return;
        }
        animateTo(ref.current, target);
    });

    const animateTo = (object: Object3D, target: { x: number, y: number, z: number }) => {
        const {x, y, z} = target;
        const speed = 0.08;
        const xDiff = x - object.rotation.x;
        const yDiff = y - object.rotation.y;
        const zDiff = z - object.rotation.z;
        if (xDiff !== 0) object.rotation.x += xDiff * speed;
        if (yDiff !== 0) object.rotation.y += yDiff * speed;
        if (zDiff !== 0) object.rotation.z += zDiff * speed;
    };

    const handle = (mouse: { x: number, y: number }) => {
        if (!ref.current || play) return;
        const base = {
            x: 1.8,
            y: 0,
            z: 0,
        };
        const {x, y} = mouse;
        const width = window.innerWidth;
        const height = window.innerHeight;
        const xRotation = (x / width) * 2 - 1;
        const yRotation = (y / height) * 2 - 1;

        target = {
            x: yRotation + base.x,
            y: base.y,
            z: -xRotation + base.z,
        };
    };

    return (
        <Suspense>
            <Asset ref={ref}/>
        </Suspense>
    );
}
