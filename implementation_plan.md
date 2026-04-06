# Radical Experimental UI/UX Overhaul: TKD AI Coach

This plan documents a complete paradigm shift for the UI. We will abandon standard grids, "safe" symmetry, and generic rounded cards in favor of a highly experimental, bespoke, and aggressive aesthetic that will immediately wow the hackathon judges.

## User Review Required

> [!IMPORTANT]  
> **Breaking Symmetry & Standard Navigation:** This design abandons standard grid layouts and top navbars. Navigation and layout will be non-traditional (e.g., floating slanted pills, skewed perspective panels). Are you comfortable completely abandoning traditional web layout standards for this experimental concept?

> [!WARNING]  
> **Heavy CSS Effects:** We will heavily employ `clip-path` (slanted geometry), `backdrop-filter`, and CSS `perspective` to create 3D tilt/hover physics and glowing atmospheric bleeds. This requires a modern browser and may have minor performance hits on older devices, though we will optimize with hardware acceleration (`transform: translateZ(0)`).

## Proposed Changes

---

### Global Aesthetics & Theming (`src/index.css`)

We will introduce a bespoke CSS styling layer that breaks the generic Tailwind mold without uninstalling Tailwind.
*   **Custom Shapes:** Introduce `.slanted-panel` and `.cyber-border` utility classes utilizing complex `clip-path` polygons to create angled, chamfered edges instead of basic rounded corners.
*   **Atmospheric Lighting:** Introduce "glow leaks"—large, intensely blurred absolute elements (`filter: blur(150px)`) that follow or interact with the layout to simulate volumetric lighting.
*   **Dynamic Scanning Lines:** A persistent, extremely subtle CRT/scanner overlay traversing the UI.

#### [MODIFY] [index.css](file:///c:/Users/Harsh/Desktop/TKD%20AI%20Coach/src/index.css)
*   Add keyframes for glitch effects, floating geometry, and magnetic hover physics.
*   Define global skewed geometries.

---

### Landing Page (`src/pages/LandingPage.tsx`)

Abandoning the standard hero text + 3 feature cards below layout.
*   **Split Asymmetry:** The viewport is sliced dynamically down an angle. The background features liquid-like, slow-moving plasma gradients.
*   **Overlapping Typography:** The title "COMBAT IQ" will be massive, absolute-positioned, and partially clipped by the UI panels. 
*   **Magnetic floating actions:** The "Start Training" button will be a glowing, multi-layered geometric shard that pulses with a heartbeat animation.
*   **Glitch Loaders:** We will simulate a "system boot" glitch effect on initial load before the UI settles.

#### [MODIFY] [LandingPage.tsx](file:///c:/Users/Harsh/Desktop/TKD%20AI%20Coach/src/pages/LandingPage.tsx)

---

### Mode Selection (`src/pages/ModeSelection.tsx`)

Abandoning the basic 3-column grid.
*   **Perspective Fan Layout:** The three modes (Live, Fight, Analytics) will be presented as gigantic, overlapping, glowing vertical shards skewed in 3D perspective (`transform: rotateY(-15deg)`). On hover, the selected card scales forward while the others recede and dim.
*   **Data-Stream Aesthetics:** Background streams of raw binary or hex data mask effects layered under the mode cards.

#### [MODIFY] [ModeSelection.tsx](file:///c:/Users/Harsh/Desktop/TKD%20AI%20Coach/src/pages/ModeSelection.tsx)

---

### Dashboard Layout (`src/layouts/DashboardLayout.tsx`)

Abandoning the static top navbar.
*   **Floating Command Deck:** A decoupled, floating asymmetrical command pill anchored dynamically (perhaps at the bottom or side). It features glowing gradient strokes tracing its border constantly.
*   **Animated State Switches:** When tracking toggles ON/OFF, an electric "surge" animation ripples across the borders instead of just changing a button color.
*   **Real-time Stat Streams:** Visual mock "data streams" connecting UI segments, reinforcing the "AI brain" analyzing high-speed motion data.

#### [MODIFY] [DashboardLayout.tsx](file:///c:/Users/Harsh/Desktop/TKD%20AI%20Coach/src/layouts/DashboardLayout.tsx)

## Open Questions

1.  **3D Tilt Libraries:** Would you prefer I implement pure CSS 3D physics for card hover, or can I install `framer-motion` for physics-based spring animations? (I will proceed with pure CSS to avoid new dependencies unless instructed otherwise).
2.  **Sound Design:** A highly experimental UI sometimes benefits from UI sound effects (blips on hover, swoosh on transition). Would you like audio feedback implemented, or should we stick purely to visual flair?

## Verification Plan

*   Manually review the UI on the local development server to ensure clip-paths and transforms map correctly across standard desktop resolutions.
*   Test the hover transition states and the 3D perspective to guarantee zero stuttering or repaints by forcing GPU acceleration.
