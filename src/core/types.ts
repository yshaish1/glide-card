// Minimal slice of Home Assistant's frontend types that Glide Card relies on.
import type { Condition } from "./conditions";

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language: string;
  locale?: { language: string };
  themes?: { darkMode?: boolean };
  user?: { name: string };
  /** HA websocket connection; used for server-rendered templates. */
  connection?: {
    subscribeMessage<T>(callback: (msg: T) => void, message: Record<string, unknown>): Promise<() => unknown>;
  };
  callService(domain: string, service: string, data?: Record<string, unknown>): Promise<unknown>;
}

export type ActionType =
  | "toggle" | "more-info" | "popup" | "navigate" | "call-service" | "perform-action" | "url" | "assist" | "fire-dom-event" | "none";

export interface ActionConfig {
  action: ActionType;
  navigation_path?: string; // navigate, or "#hash" to open a popup
  service?: string; // "domain.service"
  perform_action?: string;
  data?: Record<string, unknown>;
  target?: Record<string, unknown>;
  /** Same as HA: true or { text } asks before running. */
  confirmation?: boolean | { text?: string };
  [key: string]: unknown;
}

export type CardType = "button" | "popup" | "nav" | "climate" | "media" | "chips" | "title" | "heading" | "background";
export type ThemeMode = "auto" | "dark" | "light";
/** How much room a card takes: today's look, tighter, or the minimum (some layouts change). */
export type CardSize = "full" | "compact" | "slim";

export interface BaseCardConfig {
  type: string;
  card_type: CardType;
  theme?: string;
  mode?: ThemeMode;
  accent?: string;
  /** Drop blur/glow effects for slow wall tablets. Default: auto-detect. */
  lite?: boolean;
  /** Animation played on tap (see TAP_EFFECTS). Default: HA theme variable `glide-tap-animation`, else "shine". */
  tap_animation?: string;
  /** Card size. Default: HA theme variable `glide-size`, else "full". */
  size?: CardSize;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

/** Top-down: blind, roman, venetian, shutter; bottom_up rises from the sill; the rest open sideways. */
export type CoverStyle = "blind" | "bottom_up" | "roman" | "venetian" | "shutter" | "curtain" | "curtain_side" | "vertical";

export interface ButtonCardConfig extends BaseCardConfig {
  card_type: "button";
  entity?: string;
  name?: string;
  icon?: string;
  layout?: "tile" | "pill";
  slider?: boolean;
  /** Covers: the outdoor view behind the blind (`garden` by default), or `color` for the plain fill. */
  view?: "garden" | "sky" | "city" | "sea" | "mountains" | "beach" | "forest" | "desert" | "snow" | "field" | "pool" | "color";
  /** Covers: your own photo for the view (e.g. `/local/yard.jpg`), used when `view` is not set. */
  view_image?: string;
  /**
   * Covers: how the window opens; unset follows the device class (curtain → `curtain`,
   * shutter → `shutter`, anything else → `blind`).
   */
  cover_style?: CoverStyle;
  /** Covers: where a one-sided cover (`curtain_side`, `vertical`) stacks when open; `start` by default. */
  cover_side?: "start" | "end";
  /** Covers: open, stop and close buttons on the card (each only when the cover supports it). */
  cover_buttons?: boolean;
  /** `false`: no solid colour fill when on; the glass gradient takes the colour instead. */
  fill?: boolean;
  /** Overrides the domain colour: an HA colour name (`cyan`, `light-blue`, ...) or any CSS colour. */
  color?: string;
  /** Line under the name, replacing the automatic brightness/position text. */
  secondary?: string;
  /** Text for the corner badge, replacing the state. */
  badge?: string;
  // name, icon, color, secondary and badge also accept HA templates ({{ ... }}).
}

export interface PopupCardConfig extends BaseCardConfig {
  card_type: "popup";
  hash: string; // e.g. "#living-room"
  title?: string;
  icon?: string;
  entity?: string; // optional header entity
  position?: "auto" | "bottom"; // bottom: a bottom sheet on wide screens too
  cards: Record<string, unknown>[];
}

export interface NavMenuItem {
  name: string;
  icon: string;
  navigation_path: string;
  entity?: string; // shows an "active" dot when on
}

export interface NavItem extends Omit<NavMenuItem, "navigation_path"> {
  /** Where the item goes. Not needed when it has `items`. */
  navigation_path?: string;
  /** Opens a small menu of these instead of navigating (e.g. "more"). */
  items?: NavMenuItem[];
  /** Kept at the end of the bar, outside the scrolling list (e.g. "more"). */
  pinned?: boolean;
}

export interface NavCardConfig extends BaseCardConfig {
  card_type: "nav";
  items: NavItem[];
}

export interface ClimateCardConfig extends BaseCardConfig {
  card_type: "climate";
  entity: string;
  name?: string;
}

export interface MediaCardConfig extends BaseCardConfig {
  card_type: "media";
  entity: string;
  name?: string;
}

export interface ChipConfig {
  entity?: string;
  name?: string; // "" hides the label
  icon?: string;
  /** HA colour name (`light-green`, `amber`...) or any CSS colour for the icon. */
  color?: string;
  /** Show this attribute instead of the state. */
  attribute?: string;
  /** Static text instead of the entity value. */
  value?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  /** Show the chip only while every condition passes (HA card `visibility` format). */
  visibility?: Condition[];
}

export interface ChipsCardConfig extends BaseCardConfig {
  card_type: "chips";
  chips: ChipConfig[];
  align?: "center" | "start";
}

export interface TitleCardConfig extends BaseCardConfig {
  card_type: "title";
  title?: string;
  subtitle?: string;
  icon?: string;
  align?: "center" | "start";
}

export interface HeadingCardConfig extends BaseCardConfig {
  card_type: "heading";
  title: string;
  subtitle?: string;
  icon?: string;
  /** Icon colour: HA colour name or CSS colour. */
  color?: string;
  style?: "title" | "subtitle";
  /** Small entity badges at the end of the heading (same options as chips). */
  badges?: ChipConfig[];
}

/** Paints the dashboard behind the cards; invisible outside edit mode. */
export interface BackgroundCardConfig extends BaseCardConfig {
  card_type: "background";
  /** `theme` (the Glide theme's own backdrop), a built-in `preset`, a `color`/gradient, or an `image`. */
  background?: "theme" | "preset" | "color" | "image";
  preset?: string;
  color?: string;
  /** With `color`, makes a gradient. */
  color2?: string;
  angle?: number;
  image?: string;
  /** Used while `sun.sun` is below the horizon. */
  image_night?: string;
  /** Photo blur in px (0-40). */
  blur?: number;
  /** Photo veil in % (0-90): darkens in dark mode, lightens in light mode. */
  dim?: number;
  /** Slow drift for theme, preset and gradient backgrounds. Off in lite mode and with reduced motion. */
  animate?: boolean;
  /** `view` (default): only the view it's on. `dashboard`: every view without its own background card. */
  scope?: "view" | "dashboard";
}

export type GlideCardConfig =
  | ButtonCardConfig
  | PopupCardConfig
  | NavCardConfig
  | ClimateCardConfig
  | MediaCardConfig
  | ChipsCardConfig
  | TitleCardConfig
  | HeadingCardConfig
  | BackgroundCardConfig;
