import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import { isTalkingAtom } from "pages/Home/store";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { SkeletonUtils } from "three-stdlib";

const avatarUrl = "/models/man-model.glb";

const Avatar = memo(() => {
  const [isTalking] = useAtom(isTalkingAtom);
  const group = useRef();
  const avatarRef = useRef();

  const [animation, setAnimation] = useState("M_Standing_Idle_001");

  const { scene } = useGLTF(avatarUrl);
  const { animations: idleAnimation } = useGLTF(
    "/animations/M_Standing_Idle_001.glb"
  );
  const { animations: talkAnimation } = useGLTF(
    "/animations/M_Talking_Variations_007.glb"
  );

  // Memoize the cloned model and actions (optional, kalau cuman mau 1 model aja yang di render, ini mestinya gaperlu, pakai scene aja cukup)
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { actions } = useAnimations(
    [idleAnimation[0], talkAnimation[0]],
    avatarRef
  );

  // Apply animation transition smoothly
  useEffect(() => {
    if (actions && actions[animation]) {
      actions[animation]?.fadeOut(0);
      actions[animation]?.fadeIn(0).play();
    }

    return () => {
      if (actions && actions[animation]) {
        actions[animation]?.fadeOut(0.5);
      }
    };
  }, [animation, actions]);

  // hati2 ya, ini render per frame, bukan kaya useEffect
  useFrame(() => {
    // Reset the position of the hips bone for fix bug from model (bug dari readyplayer me)
    const hips = avatarRef.current?.getObjectByName("Hips");
    if (hips) hips.position.set(0, hips.position.y, 0);

    if (isTalking) {
      setAnimation("M_Talking_Variations_007");
    } else {
      setAnimation("M_Standing_Idle_001");
    }
  });

  return (
    <group
      ref={group}
      position={[0, -1.2, 0]}
      dispose={null}
      name={`character-1`}
    >
      <primitive
        object={clone}
        ref={avatarRef}
      />
    </group>
  );
});

export default Avatar;

useGLTF.preload(avatarUrl);
useGLTF.preload("/animations/M_Standing_Idle_001.glb");
useGLTF.preload("/animations/M_Talking_Variations_007.glb");
