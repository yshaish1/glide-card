// Rubik, Hebrew subset only (SIL OFL 1.1, variable weight 300-900), bundled so it works offline.
import rubikHebrew from "../assets/rubik-hebrew.woff2?inline";

/** Covers Hebrew glyphs only, so Latin text and digits keep the theme's own font. */
export const HEBREW_FONT = "Glide Hebrew";

const STYLE_ID = "glide-card-fonts";

/** @font-face is ignored inside shadow roots, so the face is registered once on the document. */
export function ensureFonts(doc: Document = document): void {
  if (doc.getElementById(STYLE_ID)) return;
  const style = doc.createElement("style");
  style.id = STYLE_ID;
  style.textContent =
    `@font-face{font-family:"${HEBREW_FONT}";font-style:normal;font-weight:300 900;font-display:swap;` +
    `src:url(${rubikHebrew}) format("woff2");` +
    `unicode-range:U+0307-0308,U+0590-05FF,U+200C-2010,U+20AA,U+25CC,U+FB1D-FB4F}`;
  doc.head.appendChild(style);
}

/** Puts the Hebrew face in front of a font stack. */
export const withHebrew = (stack: string) => `"${HEBREW_FONT}", ${stack}`;
