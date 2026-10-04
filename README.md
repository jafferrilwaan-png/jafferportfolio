# ZERO — Interactive 3D WebGL Experience (Local Replica)

This is a complete, bit-for-bit local deployment of the awards-level 3D WebGL experience from [https://why.zero.university/](https://why.zero.university/).

## 🚀 How to Run

### Instant Launch:
```bash
node server.js
```
Open **[http://localhost:3000](http://localhost:3000)** in Chrome, Edge, or Brave.

### Custom Port (Optional):
```powershell
$env:PORT=8080; node server.js
```

---

## 📂 Project Structure & Customization Guide

### 1. 🎨 Swapping Images & Textures
All images and visual textures live in `public/assets/`:
- **Backgrounds**: `public/assets/textures/stage2_background2.webp` and `stage3_background1.webp`
- **UI & Cards**: `public/assets/ui/share-card_congrats.webp`, `zero_icon.jpg`, `plant.webp`
- **Logos**: `public/assets/brand/nav_logo.svg` and `nav_logo_white.svg`
- **MatCap Hand Shader**: `public/assets/textures/matcap-hand.webp`

*To replace any image, simply drop your new image into the respective folder with the same name, or update the asset paths.*

### 2. 🏙️ Modifying or Injecting Your 3D City Model
All 3D models live in `public/assets/models/`:
- **Stage 1 (Hands)**: `loader_hand.glb`, `human_hand_1.glb`, `fancy_hand_2.glb`
- **Stage 2 (Shatter)**: `stage2_glass-shatter.glb`, `glass_shards.glb`, `human_hand_2.glb`
- **Stage 3 (Tunnel / Environment)**: `tunnel_new_new.glb`
- **Origami Animals**: `public/assets/origami/*.glb`

*To integrate your 3D City:*
- You can replace `tunnel_new_new.glb` with your city model, or inject your city model directly into the Three.js stage sequence!

### 3. 🎵 Audio & Sound Effects
All audio tracks live in `public/assets/audio/`:
- **Music**: `amb_stage1.mp3`, `amb_stage2-3.mp3`
- **Interactions**: `fx_loader-drag.mp3`, `fx_hand-entry.mp3`, `fx_glass-shatter.mp3`, `fx_tunnel.mp3`, `fx_xp-topup.mp3`, `fx_click.mp3`, `fx_whoosh.mp3`

### 4. ⚙️ WebGL Engine Components
- **Draco Geometry Decoders**: `public/vendor/draco/`
- **Basis/KTX2 Transcoders**: `public/vendor/basis/`
- **Texture Atlases**: `public/assets/atlases/*.ktx2`
