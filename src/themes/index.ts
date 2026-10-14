import { aurora } from "./aurora";
import { brutal } from "./brutal";
import { bubble } from "./bubble";
import { clay } from "./clay";
import { glass } from "./glass";
import { ink } from "./ink";
import { material } from "./material";
import { terminal } from "./terminal";
import { listThemes, registerTheme } from "./registry";
import type { GlideTheme } from "./types";

// To add a design: create src/themes/<id>/index.ts and add it to this list.
[glass, bubble, material, clay, terminal, brutal, aurora, ink].forEach(registerTheme);

declare global {
  interface Window {
    glideCardThemes?: { register(theme: GlideTheme): void; list(): GlideTheme[] };
  }
}
// Lets other HACS resources ship their own Glide themes.
window.glideCardThemes = { register: registerTheme, list: listThemes };

export * from "./registry";
export type { GlideTheme } from "./types";
