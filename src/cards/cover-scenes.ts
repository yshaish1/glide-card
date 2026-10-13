import { html, svg, type TemplateResult } from "lit";

/** Built-in outdoor views a cover tile shows behind its blind. */
export const SCENES = ["garden", "sky", "city", "sea"] as const;
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
    </g>`,
};

/** The scene's SVG for a cover tile; colours come from `sceneStyles` and the day/night class on the container. */
export function sceneSvg(name: SceneName, night: boolean): TemplateResult {
  return html`<svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${sky(night)}${FOREGROUND[name](night)}</svg>`;
}
