// Minimal slice of Home Assistant's frontend types that Glide Card relies on.
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

export type CardType = "button" | "popup" | "nav" | "climate" | "media" | "chips" | "title";
export type ThemeMode = "auto" | "dark" | "light";

export interface BaseCardConfig {
  type: string;
  card_type: CardType;
  theme?: string;
  mode?: ThemeMode;
  accent?: string;
  /** Drop blur/glow effects for slow wall tablets. Default: auto-detect. */
  lite?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

export interface ButtonCardConfig extends BaseCardConfig {
  card_type: "button";
  entity?: string;
  name?: string;
  icon?: string;
  layout?: "tile" | "pill";
  slider?: boolean;
  /** Overrides the domain colour: an HA colour name (`cyan`, `light-blue`, ...) or any CSS colour. */
  color?: string;
}

export interface PopupCardConfig extends BaseCardConfig {
  card_type: "popup";
  hash: string; // e.g. "#living-room"
  title?: string;
  icon?: string;
  entity?: string; // optional header entity
  cards: Record<string, unknown>[];
}

export interface NavItem {
  name: string;
  icon: string;
  navigation_path: string;
  entity?: string; // shows an "active" dot when on
  /** Kept at the end of the bar, outside the scrolling list (e.g. a "more" pop-up). */
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

export type GlideCardConfig =
  | ButtonCardConfig
  | PopupCardConfig
  | NavCardConfig
  | ClimateCardConfig
  | MediaCardConfig
  | ChipsCardConfig
  | TitleCardConfig;
