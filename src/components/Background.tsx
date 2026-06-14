import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { Object3D } from "three";

const randomCoordinate = () => 0.01 + 3 * Math.random();

function Planet({ play }: { play: boolean }) {
  const ref = useRef<Object3D>(null);
  const target = useRef({
    x: randomCoordinate(),
    y: randomCoordinate(),
    z: randomCoordinate(),
  });
  const pausedRef = useRef(false);
  const { scene } = useGLTF("/models/small_planet/scene.gltf");

  // Apply scale/initial rotation during render so first paint is correct.
  useMemo(() => {
    scene.scale.setScalar(0.2);
    scene.rotation.set(
      randomCoordinate(),
      randomCoordinate(),
      randomCoordinate(),
    );
  }, [scene]);

  useEffect(() => {
    if (play) return;
    const onMove = (e: MouseEvent) => {
      const xNorm = (e.clientX / window.innerWidth) * 2 - 1;
      const yNorm = (e.clientY / window.innerHeight) * 2 - 1;
      target.current = { x: yNorm + 1.8, y: 0, z: -xNorm };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [play]);

  // Pause rotation while navigating away. The browser captures a paint
  // snapshot of the page at this moment (for back-gesture previews and
  // bfcache); pausing makes the resumed live state match that snapshot, so
  // there's no visible "jump" when the user returns.
  useEffect(() => {
    const pause = () => {
      pausedRef.current = true;
    };
    const resume = () => {
      pausedRef.current = false;
    };
    document.addEventListener("astro:before-preparation", pause);
    document.addEventListener("astro:after-swap", resume);
    document.addEventListener("astro:page-load", resume);
    window.addEventListener("pagehide", pause);
    window.addEventListener("pageshow", resume);
    return () => {
      document.removeEventListener("astro:before-preparation", pause);
      document.removeEventListener("astro:after-swap", resume);
      document.removeEventListener("astro:page-load", resume);
      window.removeEventListener("pagehide", pause);
      window.removeEventListener("pageshow", resume);
    };
  }, []);

  useFrame(() => {
    const obj = ref.current;
    if (!obj || pausedRef.current) return;
    if (play) {
      obj.rotation.x += 0.01;
      obj.rotation.y += 0.01;
      obj.rotation.z += 0.001;
      return;
    }
    const speed = 0.08;
    const { x, y, z } = target.current;
    obj.rotation.x += (x - obj.rotation.x) * speed;
    obj.rotation.y += (y - obj.rotation.y) * speed;
    obj.rotation.z += (z - obj.rotation.z) * speed;
  });

  return <primitive ref={ref} object={scene} />;
}

useGLTF.preload("/models/small_planet/scene.gltf");

export default function Background() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  return (
    <Canvas
      linear
      flat
      style={{
        width: "100vw",
        height: "100%",
        position: "absolute",
        inset: 0,
      }}
    >
      <directionalLight intensity={3 * Math.PI} />
      <ambientLight intensity={Math.PI} />
      <Suspense fallback={null}>
        <Planet play={play} />
      </Suspense>
    </Canvas>
  );
}
