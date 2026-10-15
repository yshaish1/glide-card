import { html, svg, type TemplateResult } from "lit";

/** Built-in outdoor views a cover tile shows behind its blind. */
export const SCENES = ["garden", "sky", "city", "sea", "mountains", "beach", "forest", "desert", "snow", "field", "pool"] as const;
export type SceneName = (typeof SCENES)[number];
export const isScene = (v: unknown): v is SceneName => SCENES.includes(v as SceneName);

/*
 * Flat shapes only, in a 200x120 box anchored to the bottom (`xMidYMax slice`), so the ground stays
 * in view at any tile size. The sky itself is a CSS gradient on the container, so there are no SVG
 * ids to collide when many tiles share a page.
 */

const cloud = (x: number, y: number, s: number, cls: string) => svg`
  <g class="cloud ${cls}" transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="4" rx="16" ry="6" />
    <circle cx="-6" cy="0" r="7" />
    <circle cx="5" cy="-2" r="9" />
  </g>`;

const STARS: [number, number, number][] = [
  [18, 14, 1], [44, 30, 0.8], [70, 10, 1.1], [96, 26, 0.7], [118, 8, 0.9], [140, 34, 0.8], [186, 18, 1], [30, 46, 0.6], [104, 46, 0.7], [176, 44, 0.6],
];

function sky(night: boolean) {
  return night
    ? svg`
      <g class="stars">${STARS.map(([x, y, r], i) => svg`<circle class="star" style="animation-delay:${(i % 5) * 0.7}s" cx=${x} cy=${y} r=${r} />`)}</g>
      <circle class="moon" cx="150" cy="50" r="10" />
      <circle class="moon-cut" cx="155" cy="46" r="9" />`
    : svg`
      <circle class="halo" cx="150" cy="50" r="18" />
      <circle class="sun" cx="150" cy="50" r="10" />
      ${cloud(42, 24, 1, "c1")}
      ${cloud(112, 16, 0.75, "c2")}`;
}

const roundTree = (x: number, y: number, s: number) => svg`
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect class="trunk" x="-1.5" y="-4" width="3" height="10" />
    <circle class="leaf" cx="0" cy="-10" r="9" />
  </g>`;

const pineTree = (x: number, y: number, s: number) => svg`
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect class="trunk" x="-1.5" y="-3" width="3" height="8" />
    <polygon class="pine" points="0,-26 9,-2 -9,-2" />
  </g>`;

const palm = (x: number, y: number, s: number, lean = 1) => svg`
  <g transform="translate(${x} ${y}) scale(${s * lean} ${s})">
    <path class="palm-trunk" d="M-1.5 0 Q-2 -14 3 -28 L5 -27.5 Q1 -14 1.5 0Z" />
    <g class="frond" transform="translate(4 -28)">
      <path d="M0 0 Q-10 -6 -18 2 Q-9 -2 0 0Z" />
      <path d="M0 0 Q10 -6 18 2 Q9 -2 0 0Z" />
      <path d="M0 0 Q-6 -10 -14 -9 Q-6 -6 0 0Z" />
      <path d="M0 0 Q6 -10 14 -9 Q6 -6 0 0Z" />
      <path d="M0 0 Q-1 -9 -2 -13 Q1 -8 0 0Z" />
    </g>
  </g>`;

const cactus = (x: number, y: number, s: number) => svg`
  <g class="cactus" transform="translate(${x} ${y}) scale(${s})">
    <rect x="-2.5" y="-20" width="5" height="20" rx="2.5" />
    <path d="M-2.5 -10 H-6 V-15 a1.6 1.6 0 0 1 3.2 0 V-12.5 H-2.5Z M2.5 -7 H6 V-13 a1.6 1.6 0 0 0 -3.2 0 V-9.5 H2.5Z" />
  </g>`;

/** Pine with a snow cap. */
const snowPine = (x: number, y: number, s: number) => svg`
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect class="trunk" x="-1.5" y="-3" width="3" height="8" />
    <polygon class="pine" points="0,-26 9,-2 -9,-2" />
    <polygon class="snowcap" points="0,-26 4.2,-14.5 1.5,-16 -1,-14 -4.2,-14.5" />
  </g>`;

const FLAKES: [number, number][] = [[14, 30], [38, 52], [62, 22], [84, 44], [108, 30], [128, 58], [170, 28], [190, 48], [24, 70], [96, 66], [148, 72], [182, 70]];
const FIREFLIES: [number, number][] = [[30, 86], [58, 94], [86, 80], [118, 92], [144, 84], [170, 96], [104, 102]];

const FOREGROUND: Record<SceneName, (night: boolean) => TemplateResult> = {
  sky: () => svg`${cloud(70, 62, 1.1, "c3")}${cloud(168, 74, 0.8, "c1")}${cloud(18, 88, 0.9, "c2")}`,
  garden: () => svg`
    <path class="hill-back" d="M0 90 Q50 68 100 84 T200 78 V120 H0Z" />
    ${pineTree(150, 86, 1)}${roundTree(172, 88, 0.9)}${pineTree(34, 92, 0.8)}
    <path class="hill" d="M0 102 Q60 86 120 98 T200 94 V120 H0Z" />
    ${roundTree(62, 100, 1.1)}${pineTree(88, 100, 0.9)}`,
  city: (night) => {
    const back: [number, number, number][] = [[4, 58, 22], [30, 70, 18], [52, 50, 20], [96, 64, 24], [128, 46, 18], [150, 60, 26], [182, 54, 20]];
    const front: [number, number, number][] = [[0, 82, 26], [30, 74, 20], [56, 88, 30], [90, 70, 22], [116, 84, 28], [148, 76, 20], [172, 86, 28]];
    const windows = front.flatMap(([x, y, w], b) =>
      Array.from({ length: Math.floor((120 - y - 6) / 9) }, (_, r) =>
        [0, 1].map((c) => ((b + r + c) % 3 === 0 ? svg`<rect class="win" x=${x + 4 + c * (w - 12)} y=${y + 6 + r * 9} width="4" height="4" />` : null)),
      ),
    );
    return svg`
      ${back.map(([x, y, w]) => svg`<rect class="bld-back" x=${x} y=${y} width=${w} height=${120 - y} />`)}
      ${front.map(([x, y, w]) => svg`<rect class="bld" x=${x} y=${y} width=${w} height=${120 - y} />`)}
      ${night ? windows : null}`;
  },
  sea: () => svg`
    <rect class="water" x="0" y="82" width="200" height="38" />
    <path class="wave" d="M10 92 q6 -3 12 0 t12 0 M70 100 q6 -3 12 0 t12 0 M140 90 q6 -3 12 0 t12 0 M120 108 q6 -3 12 0 t12 0 M30 112 q6 -3 12 0 t12 0" />
    <g class="boat" transform="translate(58 82)">
      <polygon class="sail" points="0,-16 0,-2 10,-2" />
      <path class="hull" d="M-8 -1 H14 L10 3 H-4Z" />
    </g>`,  mountains: () => svg`
    <polygon class="peak-back" points="0,86 30,52 52,70 84,38 118,74 146,50 176,68 200,56 200,120 0,120" />
    <polygon class="snowcap" points="84,38 92,48 87,46 82,50 77,46" />
    <polygon class="snowcap" points="146,50 153,58 148,57 143,60 139,57" />
    <polygon class="peak" points="0,98 40,66 70,92 110,60 150,94 180,78 200,90 200,120 0,120" />
    <polygon class="snowcap" points="110,60 118,70 113,68 108,72 103,69" />
    <rect class="lake" x="0" y="104" width="200" height="16" />
    <path class="wave" d="M20 110 q6 -2 12 0 M120 112 q6 -2 12 0 M70 115 q6 -2 12 0" />
    ${pineTree(16, 104, 0.8)}${pineTree(184, 104, 0.9)}${pineTree(170, 104, 0.6)}`,
  beach: (night) => svg`
    <rect class="water" x="0" y="80" width="200" height="22" />
    ${night ? svg`<ellipse class="glint" cx="150" cy="88" rx="16" ry="2" /><ellipse class="glint" cx="150" cy="94" rx="10" ry="1.4" />` : null}
    <path class="wave" d="M20 88 q6 -3 12 0 t12 0 M90 84 q6 -3 12 0 t12 0 M60 96 q6 -3 12 0 t12 0" />
    <path class="foam" d="M0 100 Q30 96 60 100 T120 99 T200 100 V103 H0Z" />
    <path class="sand" d="M0 101 Q50 97 110 101 T200 100 V120 H0Z" />
    ${palm(30, 116, 1.1, -1)}${palm(176, 114, 0.9)}${palm(190, 117, 0.75, -1)}`,
  forest: (night) => svg`
    <path class="hill-back" d="M0 88 Q50 72 100 84 T200 76 V120 H0Z" />
    ${[8, 26, 44, 120, 138, 156, 174, 192].map((x, i) => pineTree(x, 86 + (i % 3) * 2, 0.75 + (i % 2) * 0.15))}
    <path class="hill" d="M0 104 Q60 92 120 102 T200 98 V120 H0Z" />
    ${[18, 46, 74, 100, 128, 160, 186].map((x, i) => pineTree(x, 104 + (i % 2) * 3, 1 + (i % 3) * 0.12))}
    ${night ? FIREFLIES.map(([x, y], i) => svg`<circle class="firefly" style="animation-delay:${i * 0.45}s" cx=${x} cy=${y} r="1.1" />`) : null}`,
  desert: () => svg`
    <path class="dune-back" d="M0 92 Q40 74 90 88 T200 82 V120 H0Z" />
    <path class="dune" d="M0 106 Q50 90 110 104 T200 98 V120 H0Z" />
    <path class="dune-shade" d="M110 104 Q150 96 200 98 V120 H140Z" />
    ${cactus(46, 104, 1.1)}${cactus(170, 100, 0.8)}${cactus(24, 98, 0.6)}`,
  snow: () => svg`
    <path class="snow-back" d="M0 90 Q50 76 100 86 T200 80 V120 H0Z" />
    ${snowPine(148, 88, 1)}${snowPine(168, 90, 0.8)}${snowPine(30, 92, 0.85)}
    <path class="snow" d="M0 104 Q60 92 120 102 T200 98 V120 H0Z" />
    ${snowPine(70, 104, 1.1)}
    <g class="snowman" transform="translate(118 104)">
      <circle cy="-5" r="5.5" /><circle cy="-14" r="3.8" />
      <polygon class="nose" points="0,-14.5 4,-14 0,-13.3" />
    </g>
    ${FLAKES.map(([x, y]) => svg`<circle class="flake" cx=${x} cy=${y} r="1" />`)}`,
  field: () => svg`
    <path class="hill-back" d="M0 88 Q60 78 120 86 T200 82 V120 H0Z" />
    ${roundTree(158, 88, 1)}
    <path class="field" d="M0 98 Q70 90 140 97 T200 95 V120 H0Z" />
    <path class="row" d="M0 106 Q100 98 200 104 M0 112 Q100 104 200 110 M0 118 Q100 110 200 116" />
    <g class="fence">
      ${[12, 30, 48, 66].map((x) => svg`<rect x=${x} y="90" width="2" height="10" />`)}
      <rect x="10" y="92" width="60" height="1.6" /><rect x="10" y="96" width="60" height="1.6" />
    </g>`,
  pool: (night) => svg`
    <rect class="hedge" x="0" y="80" width="200" height="14" rx="2" />
    <rect class="deck" x="0" y="92" width="200" height="28" />
    <rect class="pool" x="34" y="98" width="132" height="22" rx="3" />
    <path class="pool-line" d="M46 106 q6 -2 12 0 t12 0 M100 112 q6 -2 12 0 t12 0 M126 104 q6 -2 12 0" />
    ${night ? svg`<ellipse class="pool-light" cx="100" cy="114" rx="40" ry="5" />` : null}
    <g class="ladder"><path d="M150 92 V104 M156 92 V104 M150 96 H156 M150 100 H156" /></g>
    ${palm(16, 100, 1.05)}${palm(186, 100, 1, -1)}`,
};

/** The scene's SVG for a cover tile; colours come from `sceneStyles` and the day/night class on the container. */
export function sceneSvg(name: SceneName, night: boolean): TemplateResult {
  return html`<svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${sky(night)}${FOREGROUND[name](night)}</svg>`;
}
