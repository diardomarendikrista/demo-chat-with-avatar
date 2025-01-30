// import { Box, CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import Avatar from "models/Avatar";

export default function Component3D() {
  const canvasRef = useRef();

  // helperku buat liat & nyesuaiin posisi kamera three js
  // const cameraControlsRef = useRef();
  // const getCameraPosition = () => {
  //   if (cameraControlsRef.current) {
  //     const position = cameraControlsRef.current.camera.position;
  //     console.log("Camera Position:", position);
  //   }
  // };

  return (
    <Canvas
      ref={canvasRef}
      shadows
      camera={{ position: [-0.056, 0.36, 4.376], fov: 30 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <directionalLight
          position={[10, 0, 50]}
          castShadow
          intensity={2}
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera
            attach={"shadow-camera"}
            args={[-10, 10, 10, -10]}
            far={20 + 2}
          />
        </directionalLight>

        {/* kalo ini di open, nanti kalian bisa gerak2in kamera di canvas sebelah kiri */}
        {/* <CameraControls
            ref={cameraControlsRef}
            minPolarAngle={0}
            // maxPolarAngle={Math.PI / 2 - 0.05}
            // minDistance={options.isFreeCamera ? 0 : 5}
            // maxDistance={options.isFreeCamera ? 9999999 : 20}
          /> */}

        <Avatar />
      </Suspense>
    </Canvas>
  );
}
