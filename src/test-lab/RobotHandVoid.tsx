import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export default function RobotHandVoid() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [, setScrollProgress] = useState(0);
  const [currentWeapon, setCurrentWeapon] = useState<'rifle' | 'pocket'>('rifle');
  const [isFiringUI, setIsFiringUI] = useState(false);

  // References for imperative control
  const triggerShootRef = useRef<() => void>(() => {});
  const setWeaponRef = useRef<(w: 'rifle' | 'pocket') => void>(() => {});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ─── 1. HIGH-GRAPHICS SCENE SETUP ──────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x010309, 0.005);

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.05,
      100
    );
    camera.position.set(0, 0.15, 5.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // ─── 2. REALTIME METALLIC REFLECTIONS (IBL) ───────────────────
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv).texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // ─── 3. DEEP COSMIC STARFIELD ──────────────────────────────────
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(2600 * 3);
    for (let i = 0; i < 2600; i++) {
      starPos[i * 3]     = (Math.random() - 0.5) * 65;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 65;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 35 - 6;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starfield = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({
        size: 0.024,
        color: 0xe2e8f0,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(starfield);

    // ─── 4. CINEMATIC STUDIO LIGHTING ──────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 2.8));

    const keyLight = new THREE.DirectionalLight(0xffffff, 6.5);
    keyLight.position.set(0, 4, 9);
    scene.add(keyLight);

    const fillL = new THREE.DirectionalLight(0xffffff, 2.8);
    fillL.position.set(-7, 1, 4);
    scene.add(fillL);

    const fillR = new THREE.DirectionalLight(0xffffff, 2.8);
    fillR.position.set(7, 1, 4);
    scene.add(fillR);

    const bounce = new THREE.DirectionalLight(0xffffff, 2.0);
    bounce.position.set(0, -6, 3);
    scene.add(bounce);

    // Cyan Tactical Rim
    const cyanRim = new THREE.DirectionalLight(0x00f0ff, 5.5);
    cyanRim.position.set(-5, 4, -6);
    scene.add(cyanRim);

    // Amber Rim
    const amberRim = new THREE.DirectionalLight(0xffb700, 5.5);
    amberRim.position.set(5, 4, -6);
    scene.add(amberRim);

    // ─── 5. CLEAN RIFLE & POCKET WEAPON MUZZLE FLASH ────────────────
    const muzzleLight = new THREE.PointLight(0xffcc44, 0, 4.0);
    scene.add(muzzleLight);

    const muzzleGeo = new THREE.RingGeometry(0.01, 0.04, 8);
    const muzzleMat = new THREE.MeshBasicMaterial({
      color: 0xffdd66,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    const muzzleMesh = new THREE.Mesh(muzzleGeo, muzzleMat);
    scene.add(muzzleMesh);

    // ─── 6. LOAD HIGH-DETAIL SCI-FI SOLDIER WITH WEAPONS ───────────
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    let mixer: THREE.AnimationMixer | null = null;
    const actionsMap: Record<string, THREE.AnimationAction> = {};
    let activeActionName = 'Idle';

    let headBone: THREE.Bone | null = null;
    let gunBone: THREE.Bone | null = null;

    const _wp = new THREE.Vector3();
    const _wq = new THREE.Quaternion();

    const loader = new GLTFLoader();
    loader.load(
      '/assets/soldier.glb',
      (gltf) => {
        const robot = gltf.scene;

        const box  = new THREE.Box3().setFromObject(robot);
        const size = box.getSize(new THREE.Vector3());
        const ctr  = box.getCenter(new THREE.Vector3());
        const sf   = 2.7 / (Math.max(size.x, size.y, size.z) || 1);

        robot.scale.set(sf, sf, sf);
        robot.position.set(-ctr.x * sf, -ctr.y * sf, -ctr.z * sf);

        robot.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.material) {
              const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
              mats.forEach((m) => {
                if ('metalness' in m) (m as THREE.MeshStandardMaterial).metalness = 0.82;
                if ('roughness' in m) (m as THREE.MeshStandardMaterial).roughness = 0.2;
                if ('envMapIntensity' in m) (m as THREE.MeshStandardMaterial).envMapIntensity = 1.4;
              });
            }
          }

          if ((child as THREE.Bone).isBone) {
            const bone = child as THREE.Bone;
            const bn   = bone.name.toLowerCase();
            if (bn.includes('head')) headBone = bone;
            if (bn.includes('gun') || bn.includes('weapon') || bn.includes('r_hand') || bn.includes('hand_r')) {
              gunBone = bone;
            }
          }
        });

        // Face front towards camera natively
        robot.rotation.y = Math.PI;
        robotGroup.add(robot);

        if (gltf.animations?.length) {
          mixer = new THREE.AnimationMixer(robot);
          gltf.animations.forEach((clip) => {
            actionsMap[clip.name] = mixer!.clipAction(clip);
          });

          if (actionsMap['Idle']) {
            actionsMap['Idle'].play();
            activeActionName = 'Idle';
          } else if (actionsMap['idle']) {
            actionsMap['idle'].play();
            activeActionName = 'idle';
          } else {
            mixer.clipAction(gltf.animations[0]).play();
          }
        }
      },
      undefined,
      (err) => console.error('Soldier load error:', err)
    );

    // ─── 7. ANIMATION ACTION SWITCHER ──────────────────────────────
    const playAction = (name: string, dur = 0.25) => {
      const target = actionsMap[name] ?? actionsMap[name.toLowerCase()] ?? actionsMap[name.toUpperCase()];
      if (!target || activeActionName === name) return;
      Object.values(actionsMap).forEach((a) => a.fadeOut(dur));
      target.reset().fadeIn(dur).play();
      activeActionName = name;
    };

    // ─── 8. WEAPON SELECTION & POCKET WEAPON SYSTEM ─────────────────
    let weaponType: 'rifle' | 'pocket' = 'rifle';
    let isShooting = false;
    let shotTimer = 0;

    const keys: Record<string, boolean> = {};

    const triggerShoot = () => {
      isShooting = true;
      shotTimer = 1.0;
      setIsFiringUI(true);
      setTimeout(() => setIsFiringUI(false), 200);
    };

    triggerShootRef.current = triggerShoot;

    const setWeapon = (w: 'rifle' | 'pocket') => {
      weaponType = w;
      setCurrentWeapon(w);
    };

    setWeaponRef.current = setWeapon;

    let tX = 0, tY = 0, cX = 0, cY = 0;
    let tProg = 0, cProg = 0;
    let actionTO: ReturnType<typeof setTimeout> | null = null;

    const onKeyDown = (e: KeyboardEvent) => {
      const code = e.code;
      const key  = e.key.toLowerCase();

      keys[code] = true;
      keys[key]  = true;

      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(code)) {
        e.preventDefault();
      }

      // Weapon Fire (Space, F, Enter)
      if (code === 'Space' || code === 'KeyF' || key === ' ' || key === 'f') {
        e.preventDefault();
        triggerShoot();
      }

      // Weapon Switch 1: Primary Rifle (Digit1, KeyQ, '1', 'q')
      if (code === 'Digit1' || code === 'KeyQ' || key === '1' || key === 'q') {
        setWeapon('rifle');
      }

      // Weapon Switch 2: Pocket Weapon (Digit2, KeyE, '2', 'e')
      if (code === 'Digit2' || code === 'KeyE' || key === '2' || key === 'e') {
        setWeapon('pocket');
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keys[e.code] = false;
      keys[e.key.toLowerCase()] = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      tX = (e.clientX / window.innerWidth)  * 2 - 1;
      tY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onMouseDown = (e: MouseEvent) => {
      // Don't shoot if clicking UI buttons
      if ((e.target as HTMLElement).closest('button')) return;
      triggerShoot();
    };

    const onWheel = (e: WheelEvent) => {
      tProg = Math.max(0, Math.min(1, tProg + e.deltaY * 0.002));
      setScrollProgress(tProg);
      if (actionTO) clearTimeout(actionTO);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // ─── 9. 60FPS RENDER LOOP ─────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    const MOVE_SPEED = 0.045;
    const TURN_SPEED = 0.035;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time  = clock.getElapsedTime();

      if (mixer) mixer.update(delta);

      cProg += (tProg - cProg) * 0.08;
      cX    += (tX - cX) * 0.07;
      cY    += (tY - cY) * 0.07;

      camera.position.z = 5.0 - cProg * 0.5;

      const moveForward = keys['KeyW'] || keys['w'] || keys['ArrowUp'];
      const moveBack    = keys['KeyS'] || keys['s'] || keys['ArrowDown'];
      const turnLeft    = keys['KeyA'] || keys['a'] || keys['ArrowLeft'];
      const turnRight   = keys['KeyD'] || keys['d'] || keys['ArrowRight'];

      const moving = moveForward || moveBack || turnLeft || turnRight;

      if (turnLeft)  robotGroup.rotation.y += TURN_SPEED;
      if (turnRight) robotGroup.rotation.y -= TURN_SPEED;

      if (moveForward) {
        robotGroup.position.x -= Math.sin(robotGroup.rotation.y) * MOVE_SPEED;
        robotGroup.position.z -= Math.cos(robotGroup.rotation.y) * MOVE_SPEED;
      }
      if (moveBack) {
        robotGroup.position.x += Math.sin(robotGroup.rotation.y) * MOVE_SPEED;
        robotGroup.position.z += Math.cos(robotGroup.rotation.y) * MOVE_SPEED;
      }

      robotGroup.position.x = Math.max(-3.5, Math.min(3.5, robotGroup.position.x));
      robotGroup.position.z = Math.max(-3.0, Math.min(3.0, robotGroup.position.z));

      if (moving) {
        playAction((keys['ShiftLeft'] || keys['ShiftRight'] || keys['shift']) ? 'Run' : 'Walk', 0.2);
      } else if (activeActionName !== 'Idle') {
        playAction('Idle', 0.3);
      }

      if (!moving) {
        robotGroup.rotation.y += (cX * 0.6 - robotGroup.rotation.y) * 0.05;
      }

      robotGroup.position.y = Math.sin(time * 1.4) * 0.025;

      if (headBone) { headBone.rotation.y = cX * 0.42; headBone.rotation.x = -cY * 0.3; }

      // Weapon Fire Logic
      if (isShooting) {
        const fireSpeed = weaponType === 'pocket' ? 7.0 : 4.5;
        shotTimer -= delta * fireSpeed;

        if (shotTimer <= 0) {
          isShooting = false;
          shotTimer = 0;
          muzzleLight.intensity = 0;
          muzzleMat.opacity = 0;
        } else {
          const shotPulse = Math.sin(shotTimer * Math.PI);
          muzzleLight.intensity = weaponType === 'pocket' ? shotPulse * 4.0 : shotPulse * 7.5;
          muzzleMat.opacity   = shotPulse * 0.95;

          const recoilKick = weaponType === 'pocket' ? 0.006 : 0.015;
          robotGroup.position.z += shotPulse * recoilKick;

          if (gunBone) {
            gunBone.getWorldPosition(_wp);
            gunBone.getWorldQuaternion(_wq);
          } else {
            _wp.copy(robotGroup.position).add(new THREE.Vector3(0.3, 1.2, 0.4));
            _wq.copy(robotGroup.quaternion);
          }

          const offsetZ = weaponType === 'pocket' ? 0.35 : 0.65;
          const tipOffset = new THREE.Vector3(0, 0, offsetZ).applyQuaternion(_wq);
          muzzleMesh.position.copy(_wp).add(tipOffset);
          muzzleMesh.quaternion.copy(_wq);
          muzzleLight.position.copy(_wp).add(tipOffset);
        }
      }

      cyanRim.intensity = 5.5 + cProg * 4.0;
      amberRim.intensity = 5.5 + cProg * 4.0;

      starfield.rotation.y = time * 0.012;
      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      if (actionTO) clearTimeout(actionTO);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#010309] select-none cursor-pointer">
      <div ref={mountRef} className="absolute inset-0 h-full w-full pointer-events-auto" />

      {/* Interactive HUD Control Panel */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-cyan-500/30 z-50 shadow-2xl">
        <button
          onClick={() => setWeaponRef.current('rifle')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 ${
            currentWeapon === 'rifle'
              ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.6)] scale-105'
              : 'bg-white/10 text-white/80 hover:bg-white/20'
          }`}
        >
          🔫 RIFLE [1]
        </button>

        <button
          onClick={() => setWeaponRef.current('pocket')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 ${
            currentWeapon === 'pocket'
              ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.6)] scale-105'
              : 'bg-white/10 text-white/80 hover:bg-white/20'
          }`}
        >
          💼 POCKET GUN [2]
        </button>

        <div className="h-4 w-px bg-white/20 mx-1" />

        <button
          onClick={() => triggerShootRef.current()}
          className={`px-5 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all active:scale-95 ${
            isFiringUI
              ? 'bg-red-500 text-white scale-110 shadow-[0_0_20px_rgba(239,68,68,0.9)]'
              : 'bg-red-600 text-white hover:bg-red-500 shadow-[0_0_10px_rgba(220,38,38,0.5)]'
          }`}
        >
          💥 FIRE [SPACE]
        </button>
      </div>
    </div>
  );
}
