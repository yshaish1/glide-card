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

export type ActionType = "toggle" | "more-info" | "popup" | "navigate" | "call-service" | "none";

export interface ActionConfig {
  action: ActionType;
  navigation_path?: string; // navigate, or "#hash" to open a popup
  service?: string; // "domain.service"
  data?: Record<string, unknown>;
}

export type CardType = "button" | "popup" | "nav" | "climate" | "media";
export type ThemeMode = "auto" | "dark" | "light";

export interface BaseCardConfig {
  type: string;
  card_type: CardType;
  theme?: string;
  mode?: ThemeMode;
  accent?: string;
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

export type GlideCardConfig =
  | ButtonCardConfig
  | PopupCardConfig
  | NavCardConfig
  | ClimateCardConfig
  | MediaCardConfig;
