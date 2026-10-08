import type { CardType } from "../core/types";

export type TokenMap = Record<`--gc-${string}`, string>;

/**
 * A Glide Card theme. Cards only read the semantic `--gc-*` tokens below, so a
 * new design is a new folder exporting one of these plus a `registerTheme` call.
 *
 * Token contract (all optional except where noted; base defaults cover the rest):
 *   --gc-font, --gc-font-meta, --gc-meta-transform, --gc-meta-spacing
 *   --gc-text, --gc-text-dim, --gc-accent, --gc-on-accent, --gc-accent-text
 *   --gc-surface, --gc-surface-on, --gc-border, --gc-highlight, --gc-shadow
 *   --gc-backdrop, --gc-fill-strength, --gc-radius, --gc-radius-control, --gc-gap
 *   --gc-sheet-bg, --gc-scrim
 *   --gc-light, --gc-fan, --gc-heat, --gc-cool, --gc-cover, --gc-media (domain colors)
 */
export interface GlideTheme {
  id: string;
  name: string;
  version: string;
  description?: string;
  /** Swatches shown in the editor's theme picker. */
  preview: { background: string; surface: string; accent: string };
  tokens: { base?: TokenMap; dark: TokenMap; light: TokenMap };
  /** Extra CSS per card type ("all" applies everywhere; "popup" also styles the sheet). */
  styles?: Partial<Record<CardType | "all", string>>;
  /** Layout defaults the cards use when the config doesn't say otherwise. */
  defaults?: { buttonLayout?: "tile" | "pill" };
}
