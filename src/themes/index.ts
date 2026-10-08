import { bubble } from "./bubble";
import { glass } from "./glass";
import { material } from "./material";
import { listThemes, registerTheme } from "./registry";
import type { GlideTheme } from "./types";

// To add a design: create src/themes/<id>/index.ts and add it to this list.
[glass, bubble, material].forEach(registerTheme);

declare global {
  interface Window {
    glideCardThemes?: { register(theme: GlideTheme): void; list(): GlideTheme[] };
  }
}
// Lets other HACS resources ship their own Glide themes.
window.glideCardThemes = { register: registerTheme, list: listThemes };

export * from "./registry";
export type { GlideTheme } from "./types";
