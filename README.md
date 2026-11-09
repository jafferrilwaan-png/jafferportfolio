<div align="center">

<!-- NEO-BRUTALIST HARDWARE-STYLE REPO BANNER -->
```text
+==================================================================================================+
|  [ NEO-BRUTALIST UI DESIGN SYSTEM & 3D RUNTIME ENGINE ]                                          |
|  SPEC: 4PX SOLID #000000 // 8PX 8PX HARD SHADOW // ZERO GRADIENTS // EXPOSED STRUCTURAL GRIDS    |
+==================================================================================================+
```

<br />

<!-- HARD-EDGED FLAT-SQUARE TELEMETRY BADGES (ZERO EMOJIS) -->
<img src="https://img.shields.io/badge/DESIGN_SYSTEM-NEO--BRUTALISM-FFE600?style=flat-square&labelColor=000000&color=FFE600" alt="DESIGN SYSTEM: NEO-BRUTALISM" />
<img src="https://img.shields.io/badge/3D_RUNTIME-GLTF_%2F_GLB_%2F_SPLINE_%2F_RIVE-FF2A85?style=flat-square&labelColor=000000&color=FF2A85" alt="3D RUNTIME: GLTF GLB SPLINE RIVE" />
<img src="https://img.shields.io/badge/COMPONENT_LAYER-REACT_18_%2F_CSS_TOKENS-00F5D4?style=flat-square&labelColor=000000&color=00F5D4" alt="COMPONENT LAYER: REACT 18" />
<img src="https://img.shields.io/badge/SCROLL_PHYSICS-PARALLAX_TRIPLE_PLANE-FF5E00?style=flat-square&labelColor=000000&color=FF5E00" alt="SCROLL PHYSICS: PARALLAX" />
<img src="https://img.shields.io/badge/AUDIT_STATUS-ZERO_EMOJIS_VERIFIED-00E676?style=flat-square&labelColor=000000&color=00E676" alt="AUDIT STATUS: ZERO EMOJIS" />

</div>

<br />

---

## [ 01 // INTERFACE SCREENSHOTS & VIEWPORT MOCKUPS ]

### 1.1 PRIMARY NEO-BRUTALIST VIEWPORT CAPTURE (LIGHT THEME)
> High-saturation `#FFE600` canvas, `4px solid #000` grid framing, asymmetric display blocks, and hard offset drop shadows.

<div align="center">
  <img src="./assets/screenshots/01-light-theme-viewport.jpg" width="100%" alt="Neo-Brutalist Light Theme Viewport Screenshot" />
</div>

<br />

### 1.2 INTERACTIVE 3D WEBGL & GLB RUNTIME CONSOLE (DARK THEME)
> Real-time 3D model viewport supporting `.glb`, `.gltf`, and `.riv` assets with hard-edge wireframe shaders and viewport telemetry.

<div align="center">
  <img src="./assets/screenshots/02-dark-theme-3d-console.jpg" width="100%" alt="Interactive 3D WebGL and GLB Runtime Viewport Screenshot" />
</div>

---

## [ 02 // 3D MODEL PIPELINE: GLB, RIVE (.RIV), SPLINE & GITHUB STL ]

This UI system natively ingests and renders interactive 3D assets across both GitHub Markdown and web client runtimes.

```text
+==================================================================================================+
| [ PIPELINE ARCHITECTURE ]                                                                        |
| BLENDER (.blend) ----> EXPORT (.glb / .gltf / .stl) ----> WEBGL THREE.JS / GITHUB 3D VIEWPORT    |
| RIVE STUDIO ---------> EXPORT (.riv STATE MACHINE)   ----> @rive-app/react-canvas RUNTIME       |
| SPLINE 3D -----------> EXPORT (.splinecode SCENE)    ----> FOREGROUND PARALLAX PLANE (1.6x)     |
+==================================================================================================+
```

### 2.1 NATIVE GITHUB README 3D STL VIEWER (INTERACTIVE WEBOBJECT)

GitHub natively renders an interactive, rotatable 3D canvas directly inside Markdown when given an `stl` mesh definition:

```stl
solid NeoBrutalistMonolith
  facet normal 0.0 0.0 1.0
    outer loop
      vertex 0.0 0.0 12.0
      vertex 12.0 0.0 12.0
      vertex 12.0 12.0 12.0
    endloop
  endfacet
  facet normal 0.0 0.0 1.0
    outer loop
      vertex 0.0 0.0 12.0
      vertex 12.0 12.0 12.0
      vertex 0.0 12.0 12.0
    endloop
  endfacet
  facet normal 0.0 0.0 -1.0
    outer loop
      vertex 0.0 0.0 0.0
      vertex 12.0 12.0 0.0
      vertex 12.0 0.0 0.0
    endloop
  endfacet
  facet normal 0.0 0.0 -1.0
    outer loop
      vertex 0.0 0.0 0.0
      vertex 0.0 12.0 0.0
      vertex 12.0 12.0 0.0
    endloop
  endfacet
  facet normal 0.0 1.0 0.0
    outer loop
      vertex 0.0 12.0 0.0
      vertex 12.0 12.0 12.0
      vertex 12.0 12.0 0.0
    endloop
  endfacet
  facet normal 0.0 1.0 0.0
    outer loop
      vertex 0.0 12.0 0.0
      vertex 0.0 12.0 12.0
      vertex 12.0 12.0 12.0
    endloop
  endfacet
  facet normal 0.0 -1.0 0.0
    outer loop
      vertex 0.0 0.0 0.0
      vertex 12.0 0.0 0.0
      vertex 12.0 0.0 12.0
    endloop
  endfacet
  facet normal 0.0 -1.0 0.0
    outer loop
      vertex 0.0 0.0 0.0
      vertex 12.0 0.0 12.0
      vertex 0.0 0.0 12.0
    endloop
  endfacet
  facet normal 1.0 0.0 0.0
    outer loop
      vertex 12.0 0.0 0.0
      vertex 12.0 12.0 0.0
      vertex 12.0 12.0 12.0
    endloop
  endfacet
  facet normal 1.0 0.0 0.0
    outer loop
      vertex 12.0 0.0 0.0
      vertex 12.0 12.0 12.0
      vertex 12.0 0.0 12.0
    endloop
  endfacet
  facet normal -1.0 0.0 0.0
    outer loop
      vertex 0.0 0.0 0.0
      vertex 0.0 0.0 12.0
      vertex 0.0 12.0 12.0
    endloop
  endfacet
  facet normal -1.0 0.0 0.0
    outer loop
      vertex 0.0 0.0 0.0
      vertex 0.0 12.0 12.0
      vertex 0.0 12.0 0.0
    endloop
  endfacet
endsolid NeoBrutalistMonolith
```

### 2.2 PRODUCTION GLB / THREE.JS STAGE COMPONENT (`<BrutalGLBViewer />`)

Mounts binary `.glb` or `.gltf` 3D models with a strict neo-brutalist cel-shading outline pass and responsive camera controls:

```jsx
// src/components/BrutalGLBViewer.jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function BrutalGLBViewer({
  modelPath = '/assets/models/brutal-monolith.glb',
  accentColor = '#FFE600'
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1.5, 4.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Hard ambient light + directional ink key light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(5, 10, 7);
    scene.add(keyLight);

    // GLTF / GLB Loader
    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      const model = gltf.scene;
      model.traverse((child) => {
        if (child.isMesh) {
          // Hard neo-brutalist ink edge outline
          const edges = new THREE.EdgesGeometry(child.geometry);
          const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 }));
          child.add(line);
        }
      });
      scene.add(model);
    });

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [modelPath]);

  return (
    <div className="brutal-card" style={{ padding: '20px', backgroundColor: accentColor }}>
      <div style={{ borderBottom: '4px solid #000', paddingBottom: '8px', marginBottom: '12px', fontWeight: 'bold' }}>
        [ 3D GLB VIEWPORT CONSOLE ]
      </div>
      <div ref={mountRef} style={{ width: '100%', height: '380px', border: '4px solid #000', backgroundColor: '#FFFDF7' }} />
    </div>
  );
}
```

### 2.3 RIVE ANIMATION ENGINE INTEGRATION (`.RIV`)

For state-machine vector animation files (`.riv`):

```jsx
// src/components/BrutalRiveAsset.jsx
import React from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export default function BrutalRiveAsset({ src = '/assets/rive/brutal-stickers.riv' }) {
  const { rive, RiveComponent } = useRive({
    src,
    stateMachines: 'STATE_MACHINE_1',
    autoplay: true,
  });

  const triggerHover = useStateMachineInput(rive, 'STATE_MACHINE_1', 'isHovered');

  return (
    <div 
      className="brutal-border brutal-shadow" 
      style={{ width: '100%', height: '300px', backgroundColor: '#00F5D4' }}
      onMouseEnter={() => triggerHover && (triggerHover.value = true)}
      onMouseLeave={() => triggerHover && (triggerHover.value = false)}
    >
      <RiveComponent />
    </div>
  );
}
```

---

## [ 03 // COMPLETE NEO-BRUTALIST UI COMPONENT CATALOG ]

Every visual element strictly enforces high-contrast ink boundaries, geometric layout rules, and zero rounded fluff:

<table width="100%">
  <thead>
    <tr>
      <th width="25%" align="left">COMPONENT</th>
      <th width="35%" align="left">VISUAL PRIMITIVES</th>
      <th width="40%" align="left">CSS SPECIFICATION</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>01. DISPLAY CONTAINER</b><br /><code>&lt;BrutalCard /&gt;</code></td>
      <td>Unrounded rectangular box, high-saturation color field, structural 4px black frame.</td>
      <td><code>border: 4px solid #000;<br />box-shadow: 8px 8px 0px #000;<br />border-radius: 0px;</code></td>
    </tr>
    <tr>
      <td><b>02. TACTILE ACTION BUTTON</b><br /><code>&lt;BrutalButton /&gt;</code></td>
      <td>High-contrast text, 3px solid ink border, mechanical active click depression.</td>
      <td><code>box-shadow: 5px 5px 0px #000;<br />active: translate(4px, 4px);<br />active-shadow: 1px 1px 0px #000;</code></td>
    </tr>
    <tr>
      <td><b>03. STICKER BADGE / PILL</b><br /><code>&lt;StickerTag /&gt;</code></td>
      <td>Sharp rotated badge stamp, monospaced typography, solid background fill.</td>
      <td><code>transform: rotate(-3deg);<br />border: 2px solid #000;<br />box-shadow: 3px 3px 0px #000;</code></td>
    </tr>
    <tr>
      <td><b>04. MULTI-PLANE PARALLAX</b><br /><code>&lt;ParallaxDeck /&gt;</code></td>
      <td>Three stacked scroll planes separating along the Z-axis during scrolling.</td>
      <td><code>Back (0.2x depth)<br />Mid (0.8x depth)<br />Front (1.6x depth)</code></td>
    </tr>
    <tr>
      <td><b>05. CONTINUOUS MARQUEE</b><br /><code>&lt;MarqueeRibbon /&gt;</code></td>
      <td>Full-bleed high-contrast ticker band cycling uppercase status strings infinitely.</td>
      <td><code>animation: marquee 20s linear infinite;<br />border-top: 4px solid #000;<br />border-bottom: 4px solid #000;</code></td>
    </tr>
    <tr>
      <td><b>06. HARD PROGRESS METER</b><br /><code>&lt;BrutalMeter /&gt;</code></td>
      <td>Divided capacity track with solid color fill and no rounded caps.</td>
      <td><code>border: 3px solid #000;<br />fill: #FFE600 / #FF2A85 / #00F5D4;<br />divider: 2px solid #000;</code></td>
    </tr>
    <tr>
      <td><b>07. INTERACTIVE ACCORDION</b><br /><code>&lt;BrutalAccordion /&gt;</code></td>
      <td>Hard-bordered drawer cards with bold plus/minus indicators.</td>
      <td><code>border-bottom: 3px solid #000;<br />transition: height 120ms ease;</code></td>
    </tr>
  </tbody>
</table>

---

## [ 04 // NEO-BRUTALIST DESIGN TOKENS & CSS VARIABLES ]

```css
:root {
  /* RAW INK & CANVAS SURFACES */
  --ink-black: #000000;
  --surface-paper: #FFFDF7;
  --surface-card: #FFFFFF;

  /* HIGH-SATURATION ACCENT PALETTE */
  --acid-yellow: #FFE600;
  --brutal-pink: #FF2A85;
  --signal-orange: #FF5E00;
  --cyber-mint: #00F5D4;
  --neon-lime: #00E676;

  /* HARD STRUCTURAL BORDERS */
  --border-thick: 4px solid #000000;
  --border-mid: 3px solid #000000;
  --border-thin: 2px solid #000000;

  /* HARD OFFSET DROP SHADOWS (ZERO BLUR) */
  --shadow-heavy: 8px 8px 0px #000000;
  --shadow-mid: 5px 5px 0px #000000;
  --shadow-light: 3px 3px 0px #000000;
  --shadow-active: 1px 1px 0px #000000;

  /* MECHANICAL MOTION */
  --transition-snap: cubic-bezier(0.16, 1, 0.3, 1) 100ms;
}

/* DARK MODE THEME INVERSION */
body.dark-theme {
  --ink-black: #000000;
  --surface-paper: #0E0E10;
  --surface-card: #18181C;
  --border-thick: 4px solid #FFFDF7;
  --shadow-heavy: 8px 8px 0px #FFE600;
}
```

---

## [ 05 // DIRECTORY ARCHITECTURE FOR UI REPOSITORY ]

```text
neo-brutalist-ui/
├── public/
│   ├── assets/
│   │   ├── screenshots/
│   │   │   ├── 01-light-theme-viewport.jpg
│   │   │   └── 02-dark-theme-3d-console.jpg
│   │   └── stickers/
│   │       ├── badge-warning.svg
│   │       └── star-vector.svg
│   ├── models/
│   │   ├── brutal-monolith.glb        # Binary GLTF 3D model
│   │   └── viewport-mesh.stl          # Native GitHub Markdown 3D mesh
│   └── rive/
│       └── brutal-stickers.riv        # Interactive Rive state-machine asset
├── src/
│   ├── components/
│   │   ├── BrutalCard.jsx
│   │   ├── BrutalButton.jsx
│   │   ├── BrutalGLBViewer.jsx        # 3D GLB/Three.js interactive stage
│   │   ├── BrutalRiveAsset.jsx        # Rive runtime animation wrapper
│   │   ├── ParallaxDeck.jsx           # 0.2x / 0.8x / 1.6x scroll engine
│   │   ├── MarqueeRibbon.jsx          # Infinite keyframe ticker
│   │   ├── BrutalMeter.jsx            # High-contrast percentage bar
│   │   └── BrutalAccordion.jsx        # Collapsible drawer console
│   ├── styles/
│   │   ├── tokens.css                 # Color tokens, borders & 8px shadows
│   │   ├── brutal-grid.css            # 32px structural background grid
│   │   └── typography.css             # Grotesque display & mono fonts
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

---

<div align="center">
  <b>STRICT NEO-BRUTALIST UI ENGINE // ZERO EMOJIS // HARD STRUCTURAL GRIDS</b>
</div>
