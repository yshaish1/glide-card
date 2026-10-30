//#region src/themes/aurora/index.ts
var e = {
	id: "aurora",
	name: "Aurora",
	version: "1.0.0",
	description: "Night glass with vivid violet, teal and pink gradients",
	preview: {
		background: "linear-gradient(135deg,#2b1a6b,#0b0820 55%,#0d3b3a)",
		surface: "rgba(30,24,70,.7)",
		accent: "#c084fc"
	},
	background: {
		dark: "radial-gradient(80% 60% at 0% 0%, #4c1d95 0%, transparent 60%), radial-gradient(70% 50% at 100% 50%, #0f5e57 0%, transparent 60%), radial-gradient(70% 50% at 20% 100%, #831843 0%, transparent 60%), #0b0820",
		light: "radial-gradient(80% 60% at 0% 0%, #e9d5ff 0%, transparent 60%), radial-gradient(70% 50% at 100% 50%, #ccfbf1 0%, transparent 60%), radial-gradient(70% 50% at 20% 100%, #fce7f3 0%, transparent 60%), #f7f5ff"
	},
	tokens: {
		base: {
			"--gc-font": "Outfit, 'Poppins', system-ui, sans-serif",
			"--gc-backdrop": "blur(20px) saturate(1.4)",
			"--gc-radius": "24px",
			"--gc-fill-strength": "55%",
			"--gc-a1": "#8b5cf6",
			"--gc-a2": "#2dd4bf",
			"--gc-a3": "#f472b6"
		},
		dark: {
			"--gc-text": "#f3f0ff",
			"--gc-text-dim": "rgba(214,206,255,.6)",
			"--gc-accent": "#c084fc",
			"--gc-on-accent": "#ffffff",
			"--gc-surface": "rgba(20,16,48,.62)",
			"--gc-surface-on": "rgba(36,24,80,.7)",
			"--gc-surface-solid": "#1a1540",
			"--gc-border": "rgba(167,139,250,.28)",
			"--gc-highlight": "rgba(255,255,255,.06)",
			"--gc-shadow": "0 12px 32px rgba(5,2,20,.5)",
			"--gc-sheet-bg": "rgba(16,12,40,.82)",
			"--gc-scrim": "rgba(5,2,20,.55)",
			"--gc-light": "#f472b6",
			"--gc-fan": "#2dd4bf",
			"--gc-heat": "#fb7185",
			"--gc-cool": "#60a5fa",
			"--gc-cover": "#a78bfa",
			"--gc-media": "#c084fc"
		},
		light: {
			"--gc-text": "#1e1640",
			"--gc-text-dim": "rgba(50,40,100,.6)",
			"--gc-accent": "#8b5cf6",
			"--gc-on-accent": "#ffffff",
			"--gc-accent-text": "#6d3fe0",
			"--gc-surface": "rgba(255,255,255,.6)",
			"--gc-surface-on": "rgba(255,255,255,.75)",
			"--gc-surface-solid": "#f6f3ff",
			"--gc-border": "rgba(139,92,246,.25)",
			"--gc-highlight": "rgba(255,255,255,.8)",
			"--gc-shadow": "0 10px 28px rgba(90,60,180,.14)",
			"--gc-sheet-bg": "rgba(250,248,255,.85)",
			"--gc-scrim": "rgba(40,20,90,.2)",
			"--gc-light": "#ec4899",
			"--gc-fan": "#14b8a6",
			"--gc-heat": "#f43f5e",
			"--gc-cool": "#3b82f6",
			"--gc-cover": "#8b5cf6",
			"--gc-media": "#8b5cf6"
		}
	},
	styles: {
		all: ".name,.title{font-family:Sora,Outfit,system-ui,sans-serif;letter-spacing:-.01em}.surface{background-image:radial-gradient(120% 90% at 0% 0%,color-mix(in srgb,var(--gc-a1) 14%,transparent),transparent 60%),radial-gradient(100% 80% at 100% 100%,color-mix(in srgb,var(--gc-a2) 10%,transparent),transparent 60%)}",
		button: ".surface.on:not(.cover){background-image:linear-gradient(135deg,var(--domain),color-mix(in srgb,var(--domain) 40%,var(--gc-a1)));color:#fff;border-color:transparent;box-shadow:0 10px 28px color-mix(in srgb,var(--domain) 45%,transparent)}.surface.on:not(.cover) .meta{color:rgba(255,255,255,.85)}.surface.on:not(.cover) .icon{background:rgba(255,255,255,.22);border-color:rgba(255,255,255,.35);color:#fff}.surface.on:not(.cover) .badge{border-color:rgba(255,255,255,.4);color:#fff}.surface.on:not(.cover) .fill{background:rgba(255,255,255,.18)}",
		climate: ".value{filter:drop-shadow(0 0 8px color-mix(in srgb,var(--mode) 60%,transparent))}",
		media: ".surface.playing{box-shadow:0 10px 30px color-mix(in srgb,var(--gc-media) 35%,transparent)}",
		nav: ".ind{background:linear-gradient(135deg,var(--gc-a1),var(--gc-a3));border-color:transparent}button.active:has(.ind){color:#fff}"
	},
	defaults: { buttonLayout: "tile" }
}, t = {
	id: "brutal",
	name: "Brutalist",
	version: "1.0.0",
	description: "Thick black outlines, hard shadows, flat yellow",
	preview: {
		background: "#f4f0e8",
		surface: "#ffffff",
		accent: "#ffd400"
	},
	background: {
		dark: "#111",
		light: "#f4f0e8"
	},
	tokens: {
		base: {
			"--gc-font": "'Space Grotesk', 'Archivo', 'Arial Black', system-ui, sans-serif",
			"--gc-font-meta": "'Space Mono', ui-monospace, monospace",
			"--gc-meta-transform": "uppercase",
			"--gc-meta-spacing": "0.04em",
			"--gc-radius": "10px",
			"--gc-radius-control": "6px",
			"--gc-gap": "14px",
			"--gc-fill-strength": "100%"
		},
		dark: {
			"--gc-ink": "#f4f0e8",
			"--gc-pale": "#f4f0e8",
			"--gc-text": "#f4f0e8",
			"--gc-text-dim": "#b8b2a6",
			"--gc-accent": "#ffd400",
			"--gc-on-accent": "#111111",
			"--gc-surface": "#1b1b1b",
			"--gc-surface-on": "#ffd400",
			"--gc-surface-solid": "#2a2a2a",
			"--gc-border": "#f4f0e8",
			"--gc-shadow": "5px 5px 0 #f4f0e8",
			"--gc-sheet-bg": "#161616",
			"--gc-scrim": "rgba(0,0,0,.6)",
			"--gc-light": "#ffd400",
			"--gc-fan": "#00f0ff",
			"--gc-heat": "#ff2a5f",
			"--gc-cool": "#2563eb",
			"--gc-cover": "#b18cff",
			"--gc-media": "#ff2a5f"
		},
		light: {
			"--gc-ink": "#111111",
			"--gc-pale": "#ffffff",
			"--gc-text": "#111111",
			"--gc-text-dim": "#55524c",
			"--gc-accent": "#ffd400",
			"--gc-on-accent": "#111111",
			"--gc-accent-text": "#111111",
			"--gc-surface": "#ffffff",
			"--gc-surface-on": "#ffd400",
			"--gc-surface-solid": "#ffffff",
			"--gc-border": "#111111",
			"--gc-shadow": "5px 5px 0 #111111",
			"--gc-sheet-bg": "#f4f0e8",
			"--gc-scrim": "rgba(0,0,0,.35)",
			"--gc-light": "#ffd400",
			"--gc-fan": "#00f0ff",
			"--gc-heat": "#ff2a5f",
			"--gc-cool": "#2563eb",
			"--gc-cover": "#b18cff",
			"--gc-media": "#ff2a5f"
		}
	},
	styles: {
		all: ".surface{border-width:3px}.name,.title{font-weight:700;text-transform:uppercase;letter-spacing:.01em}.name{font-size:14px}",
		button: ".surface.on:not(.cover){background:color-mix(in srgb,var(--domain) 45%,var(--gc-pale));color:#111}.surface.on:not(.cover) .meta{color:#111}.surface:active{transform:translate(3px,3px);box-shadow:2px 2px 0 var(--gc-ink)}.icon{border:2px solid var(--gc-ink);border-radius:8px;color:var(--gc-text)}.on .icon,.surface.on:not(.cover) .icon{background:#fff;border-color:#111;color:#111}.badge{border:2px solid currentColor;border-radius:4px;font-weight:700}.fill{border-inline-end:3px solid #111}.surface.on.nofill{background:var(--domain)}.cover .fill{border-top:3px solid var(--gc-ink);border-radius:0}",
		chips: ".chip{border:2px solid var(--gc-ink);box-shadow:3px 3px 0 var(--gc-ink)}",
		climate: ".round,.modes button{border:2px solid var(--gc-ink);border-radius:6px;box-shadow:2px 2px 0 var(--gc-ink)}",
		nav: ".ind{background:var(--gc-accent);border:2px solid var(--gc-ink)}button.active:has(.ind){color:#111}"
	},
	defaults: { buttonLayout: "tile" }
}, n = {
	id: "bubble",
	name: "Refined Bubble",
	version: "1.0.0",
	description: "Compact solid pills with a neon accent, no blur",
	preview: {
		background: "#0a0a0c",
		surface: "#16161a",
		accent: "#d4ff00"
	},
	background: {
		dark: "#0a0a0c",
		light: "#ececef"
	},
	tokens: {
		base: {
			"--gc-font": "'Inter Tight', Inter, system-ui, sans-serif",
			"--gc-font-meta": "ui-monospace, 'JetBrains Mono', monospace",
			"--gc-meta-spacing": "0.06em",
			"--gc-radius": "26px",
			"--gc-gap": "10px"
		},
		dark: {
			"--gc-text": "#f2f2f2",
			"--gc-text-dim": "#8b8b93",
			"--gc-accent": "#d4ff00",
			"--gc-on-accent": "#0a0a0c",
			"--gc-surface": "#16161a",
			"--gc-surface-on": "#2a3300",
			"--gc-fill-strength": "22%",
			"--gc-border": "rgba(255,255,255,.08)",
			"--gc-sheet-bg": "#111114",
			"--gc-scrim": "rgba(0,0,0,.6)",
			"--gc-light": "#d4ff00",
			"--gc-fan": "#d4ff00",
			"--gc-heat": "#d4ff00",
			"--gc-cover": "#d4ff00"
		},
		light: {
			"--gc-text": "#0a0a0c",
			"--gc-text-dim": "#6b6b73",
			"--gc-accent": "#c6f000",
			"--gc-on-accent": "#0a0a0c",
			"--gc-accent-text": "#4d6b00",
			"--gc-surface": "#ffffff",
			"--gc-surface-on": "#efffb3",
			"--gc-border": "rgba(0,0,0,.08)",
			"--gc-sheet-bg": "#f6f6f8",
			"--gc-scrim": "rgba(0,0,0,.3)",
			"--gc-light": "#c6f000",
			"--gc-fan": "#c6f000",
			"--gc-heat": "#c6f000",
			"--gc-cover": "#c6f000"
		}
	},
	styles: { button: ".fill{box-shadow:inset -2px 0 0 var(--gc-accent)}.cover .fill{box-shadow:inset 0 2px 0 var(--gc-accent);border-top-color:transparent}.surface.window .fill{box-shadow:inset 0 -2px 0 var(--gc-accent)}.drape.start{border-inline-end:2px solid var(--gc-accent)}.drape.end{border-inline-start:2px solid var(--gc-accent)}" },
	defaults: { buttonLayout: "pill" }
}, r = {
	id: "clay",
	name: "Soft Clay",
	version: "1.0.0",
	description: "Neumorphic tiles from one matte colour, pressed in when on",
	preview: {
		background: "#e4e0db",
		surface: "#e4e0db",
		accent: "#f2734e"
	},
	background: {
		dark: "#2b2d33",
		light: "#e4e0db"
	},
	tokens: {
		base: {
			"--gc-font": "'Nunito Sans', Nunito, 'Varela Round', 'SF Pro Rounded', ui-rounded, system-ui, sans-serif",
			"--gc-radius": "24px",
			"--gc-fill-strength": "18%"
		},
		dark: {
			"--gc-clay": "#2b2d33",
			"--gc-clay-lit": "rgba(255,255,255,.07)",
			"--gc-clay-dark": "rgba(0,0,0,.55)",
			"--gc-text": "#e6e3de",
			"--gc-text-dim": "#8e8c94",
			"--gc-accent": "#ff8a65",
			"--gc-on-accent": "#2b1810",
			"--gc-surface": "#2b2d33",
			"--gc-surface-on": "#2b2d33",
			"--gc-surface-solid": "#33353c",
			"--gc-border": "transparent",
			"--gc-shadow": "10px 10px 24px var(--gc-clay-dark), -8px -8px 18px var(--gc-clay-lit)",
			"--gc-sheet-bg": "#2b2d33",
			"--gc-scrim": "rgba(10,10,14,.55)",
			"--gc-light": "#ffb36b",
			"--gc-fan": "#6fd3c5",
			"--gc-heat": "#ff8a65",
			"--gc-cool": "#7fb2ff",
			"--gc-cover": "#c7a8ff"
		},
		light: {
			"--gc-clay": "#e4e0db",
			"--gc-clay-lit": "rgba(255,255,255,.85)",
			"--gc-clay-dark": "rgba(150,135,120,.38)",
			"--gc-text": "#3c3733",
			"--gc-text-dim": "#8d847c",
			"--gc-accent": "#f2734e",
			"--gc-on-accent": "#ffffff",
			"--gc-accent-text": "#c04f2c",
			"--gc-surface": "#e4e0db",
			"--gc-surface-on": "#e4e0db",
			"--gc-surface-solid": "#ece8e3",
			"--gc-border": "transparent",
			"--gc-shadow": "7px 7px 15px var(--gc-clay-dark), -7px -7px 15px var(--gc-clay-lit)",
			"--gc-sheet-bg": "#e4e0db",
			"--gc-scrim": "rgba(60,50,40,.25)",
			"--gc-light": "#f59e3d",
			"--gc-fan": "#2fa999",
			"--gc-heat": "#f2734e",
			"--gc-cool": "#4f8fe6",
			"--gc-cover": "#9c7ae6"
		}
	},
	styles: {
		all: ".surface.on,.surface.playing{border-color:color-mix(in srgb,var(--domain,var(--gc-accent)) 40%,transparent);box-shadow:inset 6px 6px 12px var(--gc-clay-dark),inset -6px -6px 12px var(--gc-clay-lit)}",
		button: ".icon{border-color:transparent;box-shadow:4px 4px 9px var(--gc-clay-dark),-4px -4px 9px var(--gc-clay-lit)}.on .icon{background:var(--gc-clay);border-color:transparent;box-shadow:inset 3px 3px 7px var(--gc-clay-dark),inset -3px -3px 7px var(--gc-clay-lit);filter:drop-shadow(0 0 6px color-mix(in srgb,var(--domain) 40%,transparent))}.badge{border-color:transparent;box-shadow:inset 2px 2px 4px var(--gc-clay-dark),inset -2px -2px 4px var(--gc-clay-lit)}",
		climate: ".round,.modes button{border-color:transparent;box-shadow:4px 4px 9px var(--gc-clay-dark),-4px -4px 9px var(--gc-clay-lit)}",
		chips: ".chip{box-shadow:4px 4px 9px var(--gc-clay-dark),-4px -4px 9px var(--gc-clay-lit)}",
		nav: ".ind{background:var(--gc-clay);border-color:transparent;box-shadow:inset 3px 3px 7px var(--gc-clay-dark),inset -3px -3px 7px var(--gc-clay-lit)}"
	},
	defaults: { buttonLayout: "tile" }
}, i = {
	id: "glass",
	name: "Liquid Glass",
	version: "1.0.0",
	description: "Frosted translucent tiles with a warm glow",
	preview: {
		background: "linear-gradient(135deg,#2a1d14,#14121c)",
		surface: "rgba(255,255,255,.1)",
		accent: "#ff9f43"
	},
	background: {
		dark: "radial-gradient(120% 80% at 10% 0%, #5a3518 0%, transparent 55%), radial-gradient(90% 70% at 100% 40%, #2b2246 0%, transparent 60%), #121016",
		light: "radial-gradient(120% 80% at 10% 0%, #ffd9b0 0%, transparent 55%), radial-gradient(90% 70% at 100% 40%, #d9d4ff 0%, transparent 60%), #f4f1ee"
	},
	tokens: {
		base: {
			"--gc-font": "-apple-system, 'SF Pro Display', Inter, system-ui, sans-serif",
			"--gc-font-meta": "ui-monospace, 'SF Mono', 'JetBrains Mono', monospace",
			"--gc-meta-spacing": "0.08em",
			"--gc-backdrop": "blur(24px) saturate(1.6)",
			"--gc-radius": "28px",
			"--gc-tint-1": "#bfe6da",
			"--gc-tint-2": "#c8ddf3",
			"--gc-tint-3": "#dcd4f2",
			"--gc-tint-4": "#f6dac6",
			"--gc-tint-5": "#ebe0c4"
		},
		dark: {
			"--gc-text": "#f5f5f7",
			"--gc-text-dim": "rgba(235,235,245,.55)",
			"--gc-accent": "#ff9f43",
			"--gc-on-accent": "#1c1206",
			"--gc-surface": "rgba(28,26,34,.7)",
			"--gc-surface-on": "rgba(46,44,54,.74)",
			"--gc-surface-solid": "#26242c",
			"--gc-border": "rgba(255,255,255,.12)",
			"--gc-highlight": "rgba(255,255,255,.08)",
			"--gc-shadow": "0 10px 30px rgba(0,0,0,.35)",
			"--gc-sheet-bg": "rgba(28,26,32,.72)",
			"--gc-tint-strength": "16%",
			"--gc-wash-strength": "6%"
		},
		light: {
			"--gc-text": "#1c1c1e",
			"--gc-text-dim": "rgba(60,60,67,.6)",
			"--gc-accent": "#f08a1c",
			"--gc-on-accent": "#ffffff",
			"--gc-accent-text": "#b35f00",
			"--gc-surface": "rgba(255,255,255,.55)",
			"--gc-surface-on": "rgba(255,255,255,.8)",
			"--gc-surface-solid": "#f7f5f3",
			"--gc-border": "rgba(255,255,255,.75)",
			"--gc-highlight": "rgba(255,255,255,.9)",
			"--gc-shadow": "0 8px 24px rgba(30,20,10,.1)",
			"--gc-sheet-bg": "rgba(250,248,245,.78)",
			"--gc-scrim": "rgba(0,0,0,.2)",
			"--gc-tint-strength": "60%",
			"--gc-wash-strength": "30%"
		}
	},
	styles: {
		all: ".surface{background-image:radial-gradient(130% 100% at var(--gc-glow-at,100% 100%),color-mix(in srgb,var(--gc-tint,transparent) var(--gc-tint-strength),transparent),transparent 70%),linear-gradient(160deg,color-mix(in srgb,var(--gc-tint,transparent) var(--gc-wash-strength),transparent),transparent 65%)}",
		button: ".surface.on{--gc-tint:var(--domain)}",
		climate: ".surface{--gc-tint-strength:var(--gc-wash-strength)}.value{filter:drop-shadow(0 0 6px color-mix(in srgb,var(--mode) 45%,transparent))}",
		media: ".surface.playing{--gc-tint:var(--gc-media)}",
		chips: ".chip{--gc-tint-strength:var(--gc-wash-strength)}"
	},
	defaults: { buttonLayout: "tile" }
}, a = {
	id: "ink",
	name: "E-Ink",
	version: "1.0.0",
	description: "Monochrome paper and serif type, inverted when on",
	preview: {
		background: "#efede6",
		surface: "#efede6",
		accent: "#161616"
	},
	background: {
		dark: "#141414",
		light: "#efede6"
	},
	tokens: {
		base: {
			"--gc-font": "Newsreader, 'Source Serif 4', 'Iowan Old Style', Georgia, serif",
			"--gc-font-meta": "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
			"--gc-meta-transform": "uppercase",
			"--gc-meta-spacing": "0.12em",
			"--gc-radius": "4px",
			"--gc-radius-control": "4px",
			"--gc-fill-strength": "100%"
		},
		dark: {
			"--gc-text": "#e9e6dc",
			"--gc-text-dim": "#8f8c84",
			"--gc-accent": "#e9e6dc",
			"--gc-on-accent": "#141414",
			"--gc-accent-text": "#e9e6dc",
			"--gc-surface": "#161616",
			"--gc-surface-on": "#e9e6dc",
			"--gc-surface-solid": "#262626",
			"--gc-border": "rgba(233,230,220,.28)",
			"--gc-sheet-bg": "#141414",
			"--gc-scrim": "rgba(0,0,0,.6)",
			"--gc-hatch": "rgba(233,230,220,.35)",
			"--gc-light": "#e9e6dc",
			"--gc-fan": "#e9e6dc",
			"--gc-heat": "#e9e6dc",
			"--gc-cool": "#a9a69e",
			"--gc-cover": "#e9e6dc",
			"--gc-media": "#e9e6dc"
		},
		light: {
			"--gc-text": "#161616",
			"--gc-text-dim": "#6b6862",
			"--gc-accent": "#161616",
			"--gc-on-accent": "#efede6",
			"--gc-surface": "#efede6",
			"--gc-surface-on": "#161616",
			"--gc-surface-solid": "#e4e1d8",
			"--gc-border": "rgba(22,22,22,.28)",
			"--gc-sheet-bg": "#efede6",
			"--gc-scrim": "rgba(0,0,0,.2)",
			"--gc-hatch": "rgba(22,22,22,.35)",
			"--gc-light": "#161616",
			"--gc-fan": "#161616",
			"--gc-heat": "#161616",
			"--gc-cool": "#55524c",
			"--gc-cover": "#161616",
			"--gc-media": "#161616"
		}
	},
	styles: {
		all: ".name,.title{font-weight:500;letter-spacing:-.005em}",
		button: ".surface.on:not(.cover){color:var(--gc-on-accent)}.surface.on:not(.cover) .meta,.surface.on:not(.cover) .icon{color:var(--gc-on-accent)}.surface.on:not(.cover) .icon{background:transparent;border-color:var(--gc-on-accent)}.surface.on:not(.cover) .badge{border-color:var(--gc-on-accent)}.fill{background:repeating-linear-gradient(-45deg,var(--gc-hatch) 0 1px,transparent 1px 6px)}.surface.on:not(.cover) .fill{background:repeating-linear-gradient(-45deg,color-mix(in srgb,var(--gc-on-accent) 30%,transparent) 0 1px,transparent 1px 6px)}.icon{border-radius:4px}.cover .fill{border-top-color:var(--gc-text)}",
		nav: ".ind{background:transparent;border:0;border-bottom:2px solid var(--gc-text);border-radius:0}",
		climate: ".value{stroke:var(--gc-text)}"
	},
	defaults: { buttonLayout: "tile" }
}, o = {
	id: "material",
	name: "Material You",
	version: "1.0.0",
	description: "Soft tonal surfaces from a teal seed",
	preview: {
		background: "#e6f4ef",
		surface: "#ffffff",
		accent: "#006a60"
	},
	background: {
		dark: "#0f1513",
		light: "linear-gradient(#e6f4ef, #f4faf7)"
	},
	tokens: {
		base: {
			"--gc-font": "'Google Sans', 'Google Sans Text', Roboto, system-ui, sans-serif",
			"--gc-radius": "28px",
			"--gc-heat": "#c8553d"
		},
		dark: {
			"--gc-text": "#dfe9e5",
			"--gc-text-dim": "#8fa39d",
			"--gc-accent": "#5ddbc9",
			"--gc-on-accent": "#00382f",
			"--gc-surface": "#1a2421",
			"--gc-surface-on": "#24413a",
			"--gc-border": "transparent",
			"--gc-sheet-bg": "#16201d",
			"--gc-light": "#ffcf8a",
			"--gc-heat": "#ff9b82"
		},
		light: {
			"--gc-text": "#171d1b",
			"--gc-text-dim": "#5b6b66",
			"--gc-accent": "#006a60",
			"--gc-on-accent": "#ffffff",
			"--gc-surface": "#ffffff",
			"--gc-surface-on": "#d4efe9",
			"--gc-fill-strength": "100%",
			"--gc-icon-on": "#3b4a45",
			"--gc-border": "transparent",
			"--gc-shadow": "0 1px 3px rgba(0,40,30,.08)",
			"--gc-sheet-bg": "#f4faf7",
			"--gc-scrim": "rgba(0,30,25,.25)",
			"--gc-light": "#ffe2b8",
			"--gc-fan": "#9ff0e2",
			"--gc-cover": "#cfe4ff"
		}
	},
	styles: {
		button: ":host(:not([dark])) .on .icon{background:rgba(255,255,255,.55);border-color:transparent}",
		climate: ".round,.modes button{background:var(--gc-surface-on)}"
	},
	defaults: { buttonLayout: "tile" }
}, s = {
	id: "terminal",
	name: "Terminal",
	version: "1.0.0",
	description: "Retro CRT: phosphor green on black, monospace, inverse when on",
	preview: {
		background: "#05080a",
		surface: "#071a10",
		accent: "#39ff88"
	},
	background: {
		dark: "radial-gradient(120% 90% at 50% 40%, #0a1a10, #020403)",
		light: "#e3eddc"
	},
	tokens: {
		base: {
			"--gc-font": "'JetBrains Mono', 'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace",
			"--gc-font-meta": "var(--gc-font)",
			"--gc-meta-transform": "uppercase",
			"--gc-meta-spacing": "0.08em",
			"--gc-radius": "3px",
			"--gc-radius-control": "2px",
			"--gc-fill-strength": "26%"
		},
		dark: {
			"--gc-text": "#39ff88",
			"--gc-text-dim": "#5fa37e",
			"--gc-accent": "#39ff88",
			"--gc-on-accent": "#03140a",
			"--gc-surface": "#0c1317",
			"--gc-surface-on": "#0b2416",
			"--gc-surface-solid": "#0a1a12",
			"--gc-border": "#1f6b43",
			"--gc-shadow": "0 0 14px rgba(57,255,136,.12)",
			"--gc-sheet-bg": "#040806",
			"--gc-scrim": "rgba(0,0,0,.7)",
			"--gc-glow": "0 0 6px rgba(57,255,136,.55)",
			"--gc-scan": "rgba(0,0,0,.28)",
			"--gc-light": "#39ff88",
			"--gc-fan": "#39ff88",
			"--gc-cover": "#39ff88",
			"--gc-media": "#39ff88",
			"--gc-heat": "#ffb000",
			"--gc-cool": "#4de8ff"
		},
		light: {
			"--gc-text": "#0f3d22",
			"--gc-text-dim": "#4f7a5f",
			"--gc-accent": "#127a3e",
			"--gc-on-accent": "#eaf5e4",
			"--gc-surface": "#eaf2e3",
			"--gc-surface-on": "#cfe8c8",
			"--gc-surface-solid": "#dce9d3",
			"--gc-border": "rgba(18,122,62,.55)",
			"--gc-sheet-bg": "#eef5e8",
			"--gc-scrim": "rgba(10,40,20,.3)",
			"--gc-glow": "none",
			"--gc-scan": "rgba(18,122,62,.05)",
			"--gc-light": "#127a3e",
			"--gc-fan": "#127a3e",
			"--gc-cover": "#127a3e",
			"--gc-media": "#127a3e",
			"--gc-heat": "#b86e00",
			"--gc-cool": "#0f6f8a"
		}
	},
	styles: {
		all: ":host{text-shadow:var(--gc-glow)}.name,.title{text-transform:uppercase;letter-spacing:.12em;font-weight:700}.badge.surface{position:relative}.surface::after{content:\"\";position:absolute;inset:0;pointer-events:none;border-radius:inherit;background:repeating-linear-gradient(to bottom,transparent 0 2px,var(--gc-scan) 2px 3px)}",
		button: ".surface.on:not(.cover){background:var(--domain);color:var(--gc-on-accent);text-shadow:none}.surface.on:not(.cover) .meta,.surface.on:not(.cover) .icon{color:var(--gc-on-accent)}.surface.on:not(.cover) .icon{background:transparent;border-color:var(--gc-on-accent)}.surface.on:not(.cover) .badge{border-color:var(--gc-on-accent)}.icon{border-radius:2px}.fill{background:repeating-linear-gradient(90deg,color-mix(in srgb,var(--domain) 40%,transparent) 0 6px,transparent 6px 8px)}",
		nav: ".ind{background:var(--gc-accent);border-color:var(--gc-accent)}button.active:has(.ind){color:var(--gc-on-accent);text-shadow:none}",
		chips: ".chip{border:1px solid var(--gc-border)}",
		climate: ".round,.modes button{border-radius:2px}"
	},
	defaults: { buttonLayout: "tile" }
}, c = "data:font/woff2;base64,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", l = "Glide Hebrew", u = "glide-card-fonts";
function d(e = document) {
	if (e.getElementById(u)) return;
	let t = e.createElement("style");
	t.id = u, t.textContent = `@font-face{font-family:"${l}";font-style:normal;font-weight:300 900;font-display:swap;src:url(${c}) format("woff2");unicode-range:U+0307-0308,U+0590-05FF,U+200C-2010,U+20AA,U+25CC,U+FB1D-FB4F}`, e.head.appendChild(t);
}
var f = (e) => `"${l}", ${e}`, p = "glass", m = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), g = {
	"--gc-font": "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
	"--gc-font-meta": "var(--gc-font)",
	"--gc-meta-transform": "none",
	"--gc-meta-spacing": "0",
	"--gc-backdrop": "none",
	"--gc-fill-strength": "38%",
	"--gc-radius": "24px",
	"--gc-radius-control": "999px",
	"--gc-gap": "12px",
	"--gc-highlight": "transparent",
	"--gc-shadow": "none",
	"--gc-accent-text": "var(--gc-accent)",
	"--gc-scrim": "rgba(0, 0, 0, 0.45)",
	"--gc-light": "#ffb340",
	"--gc-fan": "#40c8e0",
	"--gc-heat": "#ff7a1a",
	"--gc-cool": "#4aa8ff",
	"--gc-cover": "#a78bfa",
	"--gc-media": "var(--gc-accent)"
};
function _(e) {
	m.set(e.id, e);
	for (let t of h.keys()) t.startsWith(`${e.id}|`) && h.delete(t);
}
var v = (e) => e && m.get(e) || m.get("glass"), y = () => [...m.values()], b = (e) => Object.entries(e).map(([e, t]) => `${e}:${t};`).join("");
function ee(e, t, n) {
	let r = {
		...g,
		...e.tokens.base,
		...t ? e.tokens.dark : e.tokens.light
	};
	for (let e of ["--gc-font", "--gc-font-meta"]) r[e].startsWith("var(") || (r[e] = f(r[e]));
	return `:host{${b(r)}}${e.styles?.all ?? ""}${e.styles?.[n] ?? ""}`;
}
function te(e, t, n) {
	let r = v(e), i = `${r.id}|${t ? "d" : "l"}|${n}`, a = h.get(i);
	return a || (a = new CSSStyleSheet(), a.replaceSync(ee(r, t, n)), h.set(i, a)), a;
}
function ne(e, t) {
	if (e && m.has(e)) return e;
	let n = getComputedStyle(t).getPropertyValue("--glide-theme").trim();
	return m.has(n) ? n : p;
}
function re(e, t) {
	return e === "dark" ? !0 : e === "light" ? !1 : t ?? matchMedia("(prefers-color-scheme: dark)").matches;
}
[
	i,
	n,
	o,
	r,
	s,
	t,
	e,
	a
].forEach(_), window.glideCardThemes = {
	register: _,
	list: y
};
//#endregion
//#region node_modules/@lit/reactive-element/css-tag.js
var ie = globalThis, ae = ie.ShadowRoot && (ie.ShadyCSS === void 0 || ie.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, oe = Symbol(), se = /* @__PURE__ */ new WeakMap(), ce = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== oe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (ae && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = se.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && se.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, le = (e) => new ce(typeof e == "string" ? e : e + "", void 0, oe), x = (e, ...t) => new ce(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, oe), ue = (e, t) => {
	if (ae) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let n of t) {
		let t = document.createElement("style"), r = ie.litNonce;
		r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
	}
}, de = ae ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return le(t);
})(e) : e, { is: fe, defineProperty: pe, getOwnPropertyDescriptor: me, getOwnPropertyNames: he, getOwnPropertySymbols: ge, getPrototypeOf: _e } = Object, ve = globalThis, ye = ve.trustedTypes, be = ye ? ye.emptyScript : "", xe = ve.reactiveElementPolyfillSupport, S = (e, t) => e, Se = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? be : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, Ce = (e, t) => !fe(e, t), we = {
	attribute: !0,
	type: String,
	converter: Se,
	reflect: !1,
	useDefault: !1,
	hasChanged: Ce
};
Symbol.metadata ??= Symbol("metadata"), ve.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var C = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = we) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && pe(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = me(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? we;
	}
	static _$Ei() {
		if (this.hasOwnProperty(S("elementProperties"))) return;
		let e = _e(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(S("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(S("properties"))) {
			let e = this.properties, t = [...he(e), ...ge(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(1 / 0).reverse());
			for (let e of n) t.unshift(de(e));
		} else e !== void 0 && t.push(de(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return ue(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? Se : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? Se : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? Ce)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[S("elementProperties")] = /* @__PURE__ */ new Map(), C[S("finalized")] = /* @__PURE__ */ new Map(), xe?.({ ReactiveElement: C }), (ve.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var Te = globalThis, Ee = (e) => e, De = Te.trustedTypes, Oe = De ? De.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ke = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, Ae = "?" + w, je = `<${Ae}>`, T = document, Me = () => T.createComment(""), Ne = (e) => e === null || typeof e != "object" && typeof e != "function", Pe = Array.isArray, Fe = (e) => Pe(e) || typeof e?.[Symbol.iterator] == "function", Ie = "[ 	\n\f\r]", E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Le = /-->/g, Re = />/g, D = RegExp(`>|${Ie}(?:([^\\s"'>=/]+)(${Ie}*=${Ie}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), ze = /'/g, Be = /"/g, Ve = /^(?:script|style|textarea|title)$/i, He = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), O = He(1), k = He(2), A = Symbol.for("lit-noChange"), j = Symbol.for("lit-nothing"), Ue = /* @__PURE__ */ new WeakMap(), M = T.createTreeWalker(T, 129);
function We(e, t) {
	if (!Pe(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return Oe === void 0 ? t : Oe.createHTML(t);
}
var Ge = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = E;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === E ? c[1] === "!--" ? o = Le : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = D) : (Ve.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = D) : o = Re : o === D ? c[0] === ">" ? (o = i ?? E, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? D : c[3] === "\"" ? Be : ze) : o === Be || o === ze ? o = D : o === Le || o === Re ? o = E : (o = D, i = void 0);
		let d = o === D && e[t + 1].startsWith("/>") ? " " : "";
		a += o === E ? n + je : l >= 0 ? (r.push(s), n.slice(0, l) + ke + n.slice(l) + w + d) : n + w + (l === -2 ? t : d);
	}
	return [We(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Ke = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Ge(t, n);
		if (this.el = e.createElement(l, r), M.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = M.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ke)) {
					let t = u[o++], n = i.getAttribute(e).split(w), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Xe : r[1] === "?" ? Ze : r[1] === "@" ? Qe : Ye
					}), i.removeAttribute(e);
				} else e.startsWith(w) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (Ve.test(i.tagName)) {
					let e = i.textContent.split(w), t = e.length - 1;
					if (t > 0) {
						i.textContent = De ? De.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], Me()), M.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], Me());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === Ae) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(w, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += w.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = T.createElement("template");
		return n.innerHTML = e, n;
	}
};
function N(e, t, n = e, r) {
	if (t === A) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = Ne(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = N(e, i._$AS(e, t.values), i, r)), t;
}
var qe = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? T).importNode(t, !0);
		M.currentNode = r;
		let i = M.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Je(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new $e(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = M.nextNode(), a++);
		}
		return M.currentNode = T, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Je = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = j, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = N(this, e, t), Ne(e) ? e === j || e == null || e === "" ? (this._$AH !== j && this._$AR(), this._$AH = j) : e !== this._$AH && e !== A && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? Fe(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== j && Ne(this._$AH) ? this._$AA.nextSibling.data = e : this.T(T.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Ke.createElement(We(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new qe(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Ue.get(e.strings);
		return t === void 0 && Ue.set(e.strings, t = new Ke(e)), t;
	}
	k(t) {
		Pe(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(Me()), this.O(Me()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = Ee(e).nextSibling;
			Ee(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, Ye = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = j, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = j;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = N(this, e, t, 0), a = !Ne(e) || e !== this._$AH && e !== A, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = N(this, r[n + o], t, o), s === A && (s = this._$AH[o]), a ||= !Ne(s) || s !== this._$AH[o], s === j ? e = j : e !== j && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === j ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Xe = class extends Ye {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === j ? void 0 : e;
	}
}, Ze = class extends Ye {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== j);
	}
}, Qe = class extends Ye {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = N(this, e, t, 0) ?? j) === A) return;
		let n = this._$AH, r = e === j && n !== j || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== j && (n === j || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, $e = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		N(this, e);
	}
}, et = Te.litHtmlPolyfillSupport;
et?.(Ke, Je), (Te.litHtmlVersions ??= []).push("3.3.3");
var tt = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Je(t.insertBefore(Me(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, nt = globalThis, P = class extends C {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = tt(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return A;
	}
};
P._$litElement$ = !0, P.finalized = !0, nt.litElementHydrateSupport?.({ LitElement: P });
var rt = nt.litElementPolyfillSupport;
rt?.({ LitElement: P }), (nt.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/lit-html/directive.js
var it = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, at = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), ot = class {
	constructor(e) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(e, t, n) {
		this._$Ct = e, this._$AM = t, this._$Ci = n;
	}
	_$AS(e, t) {
		return this.update(e, t);
	}
	update(e, t) {
		return this.render(...t);
	}
}, st = "important", ct = " !" + st, lt = at(class extends ot {
	constructor(e) {
		if (super(e), e.type !== it.ATTRIBUTE || e.name !== "style" || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
	}
	render(e) {
		return Object.keys(e).reduce((t, n) => {
			let r = e[n];
			return r == null ? t : t + `${n = n.includes("-") ? n : n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${r};`;
		}, "");
	}
	update(e, [t]) {
		let { style: n } = e.element;
		if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
		for (let e of this.ft) t[e] ?? (this.ft.delete(e), e.includes("-") ? n.removeProperty(e) : n[e] = null);
		for (let e in t) {
			let r = t[e];
			if (r != null) {
				this.ft.add(e);
				let t = typeof r == "string" && r.endsWith(ct);
				e.includes("-") || t ? n.setProperty(e, t ? r.slice(0, -11) : r, t ? st : "") : n[e] = r;
			}
		}
		return A;
	}
}), F = (e = "") => e.split(".")[0], ut = /* @__PURE__ */ new Set([
	"off",
	"closed",
	"idle",
	"standby",
	"paused",
	"unavailable",
	"unknown",
	"locked",
	"docked"
]), dt = (e) => !e || e.state === "unavailable" || e.state === "unknown", ft = (e) => !!e && !ut.has(e.state), pt = {
	light: ["mdi:lightbulb", "mdi:lightbulb-outline"],
	switch: ["mdi:toggle-switch-variant", "mdi:toggle-switch-variant-off"],
	fan: ["mdi:fan", "mdi:fan-off"],
	cover: ["mdi:window-shutter-open", "mdi:window-shutter"],
	lock: ["mdi:lock-open-variant", "mdi:lock"],
	climate: ["mdi:thermostat", "mdi:thermostat"],
	media_player: ["mdi:speaker-play", "mdi:speaker"],
	vacuum: ["mdi:robot-vacuum", "mdi:robot-vacuum"],
	scene: ["mdi:palette", "mdi:palette"],
	script: ["mdi:script-text-play", "mdi:script-text"]
}, mt = (e, t) => t ?? e?.attributes.icon ?? (pt[F(e?.entity_id)]?.[+!ft(e)] || "mdi:help-circle-outline"), ht = (e, t) => t ?? e?.attributes.friendly_name ?? e?.entity_id ?? "", gt = (e) => ({
	light: "var(--gc-light)",
	fan: "var(--gc-fan)",
	cover: "var(--gc-cover)",
	climate: "var(--gc-heat)",
	media_player: "var(--gc-media)"
})[F(e?.entity_id)] ?? "var(--gc-accent)", _t = /* @__PURE__ */ new Set([
	"primary",
	"accent",
	"red",
	"pink",
	"purple",
	"deep-purple",
	"indigo",
	"blue",
	"light-blue",
	"cyan",
	"teal",
	"green",
	"light-green",
	"lime",
	"yellow",
	"amber",
	"orange",
	"deep-orange",
	"brown",
	"grey",
	"blue-grey",
	"black",
	"white",
	"disabled"
]), I = (e) => e ? _t.has(e) ? `var(--${e}-color)` : e : void 0;
function vt(e) {
	if (!e) return !1;
	let t, n = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(e.trim());
	if (n) {
		let e = n[1].length === 3 ? [...n[1]].map((e) => e + e).join("") : n[1];
		t = [
			0,
			2,
			4
		].map((t) => parseInt(e.slice(t, t + 2), 16));
	} else {
		let n = /^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/i.exec(e.trim());
		n && (t = n.slice(1, 4).map(Number));
	}
	if (!t) return !1;
	let [r, i, a] = t.map((e) => {
		let t = e / 255;
		return t <= .04045 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	});
	return .2126 * r + .7152 * i + .0722 * a > .5;
}
var yt = (e) => vt(e) ? `color-mix(in oklab, ${e} 40%, var(--gc-text))` : void 0;
function bt(e) {
	if (!e) return;
	let t = e.entity_id, n = e.attributes;
	switch (F(t)) {
		case "light": {
			let r = n.supported_color_modes ?? [];
			return r.length && r.every((e) => e === "onoff") ? void 0 : {
				value: e.state === "on" ? Math.round((n.brightness ?? 255) / 255 * 100) : 0,
				set: (e, n) => n === 0 ? e.callService("light", "turn_off", { entity_id: t }) : e.callService("light", "turn_on", {
					entity_id: t,
					brightness_pct: n
				})
			};
		}
		case "cover": return n.current_position === void 0 ? void 0 : {
			value: n.current_position,
			set: (e, n) => e.callService("cover", "set_cover_position", {
				entity_id: t,
				position: n
			})
		};
		case "fan": return n.percentage === void 0 ? void 0 : {
			value: e.state === "on" ? n.percentage ?? 0 : 0,
			set: (e, n) => e.callService("fan", "set_percentage", {
				entity_id: t,
				percentage: n
			})
		};
		case "media_player": return n.volume_level === void 0 ? void 0 : {
			value: Math.round(n.volume_level * 100),
			set: (e, n) => e.callService("media_player", "volume_set", {
				entity_id: t,
				volume_level: n / 100
			})
		};
	}
}
var xt = /* @__PURE__ */ new Set([
	"light",
	"switch",
	"fan",
	"input_boolean",
	"media_player",
	"climate",
	"humidifier",
	"automation",
	"siren"
]);
function St(e, t) {
	let n = F(t.entity_id), r = t.entity_id;
	return n === "cover" ? e.callService("cover", "toggle", { entity_id: r }) : n === "lock" ? e.callService("lock", t.state === "locked" ? "unlock" : "lock", { entity_id: r }) : n === "scene" || n === "script" ? e.callService(n, "turn_on", { entity_id: r }) : n === "button" || n === "input_button" ? e.callService(n, "press", { entity_id: r }) : xt.has(n) ? e.callService(n, "toggle", { entity_id: r }) : e.callService("homeassistant", "toggle", { entity_id: r });
}
//#endregion
//#region src/core/fire.ts
function L(e, t, n) {
	e.dispatchEvent(new CustomEvent(t, {
		detail: n,
		bubbles: !0,
		composed: !0
	}));
}
var R = (e = "light") => L(window, "haptic", e), Ct = "glide-usage-v1", wt = 12096e5, Tt = 300, z;
function Et() {
	if (z) return z;
	try {
		z = JSON.parse(localStorage.getItem(Ct) ?? "{}") ?? {};
	} catch {
		z = {};
	}
	return z;
}
var Dt = ([e, t], n) => e * .5 ** (Math.max(0, n - t) / wt);
function Ot(e) {
	if (!e) return;
	if (e.entity) return e.entity;
	let t = e.tap_action?.navigation_path;
	return t ? `nav:${t}` : e.name ? `name:${e.name}` : void 0;
}
function kt(e, t = Date.now()) {
	if (!e) return;
	let n = Et();
	n[e] = [(n[e] ? Dt(n[e], t) : 0) + 1, t];
	let r = Object.keys(n);
	if (r.length > Tt) {
		r.sort((e, r) => Dt(n[e], t) - Dt(n[r], t));
		for (let e of r.slice(0, r.length - Tt)) delete n[e];
	}
	try {
		localStorage.setItem(Ct, JSON.stringify(n));
	} catch {}
}
function At(e, t = Date.now()) {
	let n = e ? Et()[e] : void 0;
	return n ? Dt(n, t) : 0;
}
//#endregion
//#region src/core/actions.ts
function jt(e) {
	let t = e.startsWith("#") ? e : `#${e}`;
	location.hash !== t && history.pushState({ glidePopup: !0 }, "", t), window.dispatchEvent(new CustomEvent("glide-hash"));
}
function Mt(e) {
	if (e.startsWith("#")) return jt(e);
	history.pushState(null, "", e), L(window, "location-changed", { replace: !1 });
}
function B(e, t, n, r) {
	if (n && n.action !== "none") switch (R(n.action === "toggle" ? "light" : "selection"), n.action !== "more-info" && kt(Ot(e.config)), n.action) {
		case "toggle": {
			let e = r ? t.states[r] : void 0;
			e && St(t, e);
			return;
		}
		case "more-info":
			r && L(e, "hass-more-info", { entityId: r });
			return;
		case "popup":
		case "navigate":
			n.navigation_path && Mt(n.navigation_path);
			return;
		default: L(e, "hass-action", {
			config: {
				entity: r,
				tap_action: n
			},
			action: "tap"
		});
	}
}
//#endregion
//#region src/core/spring.ts
function Nt(e = 170, t = 22, n = 1, r = 48) {
	let i = Math.sqrt(e / n), a = t / (2 * Math.sqrt(e * n)), o = i * Math.sqrt(Math.max(0, 1 - a * a)), s = (e) => a < 1 ? 1 - Math.exp(-a * i * e) * (Math.cos(o * e) + a * i / o * Math.sin(o * e)) : 1 - Math.exp(-i * e) * (1 + i * e), c = Math.min(1.2, Math.log(1e3) / (a * i)), l = Array.from({ length: r + 1 }, (e, t) => +s(t / r * c).toFixed(4));
	return l[r] = 1, {
		easing: `linear(${l.join(",")})`,
		duration: Math.round(c * 1e3)
	};
}
var V = () => matchMedia("(prefers-reduced-motion: reduce)").matches, Pt = {
	shine: "Glass shine",
	random: "Random (different each tap)",
	press: "Press (shrink only)",
	spring: "Spring squish",
	ripple: "Ripple",
	glow: "Glow pulse",
	jelly: "Jelly",
	tilt: "3D tilt",
	"icon-pop": "Icon pop",
	ring: "Ring burst",
	"deep-press": "Deep press",
	bloom: "Color bloom",
	breathe: "Breathe out",
	sparks: "Sparks",
	"icon-flip": "Icon flip",
	"border-trace": "Border trace",
	nudge: "Nudge",
	"badge-pop": "Badge pop",
	none: "None"
}, Ft = "shine", It = (e) => typeof e == "string" && e in Pt;
function Lt(e, t) {
	if (It(e)) return e;
	let n = getComputedStyle(t).getPropertyValue("--glide-tap-animation").trim();
	return It(n) ? n : Ft;
}
var Rt = "cubic-bezier(.2,.8,.2,1)", H = "cubic-bezier(.2,.9,.3,1.25)", zt = /* @__PURE__ */ new WeakMap();
function Bt(e, t) {
	let n = zt.get(e), r = Object.keys(Pt).filter((e) => e !== "random" && e !== "press" && e !== "none" && e !== n && (t.icon || e !== "icon-pop" && e !== "icon-flip") && (t.badge || e !== "badge-pop")), i = r[Math.floor(Math.random() * r.length)] ?? "shine";
	return zt.set(e, i), i;
}
var Vt = /* @__PURE__ */ new WeakMap(), U = (e, t) => `color-mix(in srgb, ${e} ${t}%, transparent)`;
function Ht(e, t, n) {
	if (t === "none" || t === "press" || V()) return;
	t === "random" && (t = Bt(e, n)), Ut(e);
	let r = e.offsetWidth || e.getBoundingClientRect().width, i = e.offsetHeight || e.getBoundingClientRect().height, a = n.x ?? r / 2, o = n.y ?? i / 2, s = { anims: [] };
	Vt.set(e, s);
	let c = (e, t, n, r = Rt) => {
		let i = e.animate(t, {
			duration: n,
			easing: r
		});
		return s.anims.push(i), i;
	}, l = (t, n = 320) => c(e, [
		{ transform: "scale(1)" },
		{
			transform: `scale(${t})`,
			offset: .3
		},
		{ transform: "scale(1)" }
	], n, H), u = () => {
		if (s.layer) return s.layer;
		getComputedStyle(e).position === "static" && (e.style.position = "relative");
		let t = document.createElement("span");
		t.className = "gc-tap-layer", t.style.cssText = "position:absolute;inset:0;overflow:hidden;border-radius:inherit;pointer-events:none";
		let n = e.querySelector(":scope > .fill");
		return n ? n.after(t) : e.prepend(t), s.layer = t;
	}, d = (e) => {
		let t = document.createElement("span");
		return t.style.cssText = `position:absolute;pointer-events:none;${e}`, u().append(t), t;
	}, f = (e, t, n) => {
		l(.98, 300), e && c(e, t, n);
	};
	switch (t) {
		case "shine":
			l(.98, 350), c(d("top:-20%;bottom:-20%;left:0;width:45%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.45),transparent);filter:blur(2px)"), [{ transform: "translateX(-120%) skewX(-15deg)" }, { transform: `translateX(${r * 2.6}px) skewX(-15deg)` }], 700, "ease-in-out");
			break;
		case "spring":
			c(e, [
				{ transform: "scale(1)" },
				{
					transform: "scale(.92)",
					offset: .3
				},
				{
					transform: "scale(1.03)",
					offset: .65
				},
				{ transform: "scale(1)" }
			], 520);
			break;
		case "ripple": {
			let e = Math.hypot(r, i);
			c(d(`left:${a - e}px;top:${o - e}px;width:${e * 2}px;height:${e * 2}px;border-radius:50%;background:${U(n.color, 35)}`), [{
				transform: "scale(0)",
				opacity: .9
			}, {
				transform: "scale(1)",
				opacity: 0
			}], 650);
			break;
		}
		case "glow": {
			let t = getComputedStyle(e).boxShadow, r = t && t !== "none" ? `${t}, ` : "";
			c(e, [{ boxShadow: `${r}0 0 0 0 ${U(n.color, 70)}` }, { boxShadow: `${r}0 0 0 14px ${U(n.color, 0)}` }], 700, "ease-out");
			break;
		}
		case "jelly":
			c(e, [
				{ transform: "scale(1,1)" },
				{
					transform: "scale(1.06,.92)",
					offset: .25
				},
				{
					transform: "scale(.96,1.05)",
					offset: .5
				},
				{
					transform: "scale(1.02,.98)",
					offset: .75
				},
				{ transform: "scale(1,1)" }
			], 600, "ease-out");
			break;
		case "tilt":
			c(e, [
				{ transform: "perspective(600px) rotateX(0) rotateY(0) scale(1)" },
				{
					transform: `perspective(600px) rotateX(${(o / i - .5) * -14}deg) rotateY(${(a / r - .5) * 14}deg) scale(.97)`,
					offset: .3
				},
				{ transform: "perspective(600px) rotateX(0) rotateY(0) scale(1)" }
			], 550, H);
			break;
		case "icon-pop":
			f(n.icon, [
				{ transform: "scale(1)" },
				{
					transform: "scale(1.3) rotate(-8deg)",
					offset: .35
				},
				{
					transform: "scale(.94)",
					offset: .7
				},
				{ transform: "scale(1)" }
			], 550);
			break;
		case "ring":
			c(d(`left:${a - 30}px;top:${o - 30}px;width:60px;height:60px;border-radius:50%;border:2px solid ${n.color};box-sizing:border-box`), [{
				transform: "scale(.2)",
				opacity: 1
			}, {
				transform: "scale(3.2)",
				opacity: 0
			}], 600);
			break;
		case "deep-press":
			c(e, [
				{ transform: "translateY(0) scale(1)" },
				{
					transform: "translateY(3px) scale(.97)",
					boxShadow: "0 1px 3px rgba(0,0,0,.25), inset 0 2px 8px rgba(0,0,0,.18)",
					offset: .35
				},
				{ transform: "translateY(0) scale(1)" }
			], 480, H);
			break;
		case "bloom": {
			let e = Math.hypot(r, i);
			c(d(`left:${a - e}px;top:${o - e}px;width:${e * 2}px;height:${e * 2}px;border-radius:50%;background:radial-gradient(circle,${U(n.color, 60)},${U(n.color, 20)} 60%,transparent 70%)`), [
				{
					transform: "scale(0)",
					opacity: 1
				},
				{
					transform: "scale(1)",
					opacity: .8,
					offset: .6
				},
				{
					transform: "scale(1.1)",
					opacity: 0
				}
			], 800);
			break;
		}
		case "breathe":
			c(e, [
				{ transform: "scale(1)" },
				{
					transform: "scale(1.045)",
					offset: .4
				},
				{ transform: "scale(1)" }
			], 520, "ease-in-out");
			break;
		case "sparks": {
			let t = e.getBoundingClientRect(), r = n.icon?.getBoundingClientRect(), i = r ? r.left - t.left + r.width / 2 : a, s = r ? r.top - t.top + r.height / 2 : o;
			n.icon ? c(n.icon, [
				{ transform: "scale(1)" },
				{
					transform: "scale(.85)",
					offset: .3
				},
				{ transform: "scale(1)" }
			], 400, H) : l(.98, 300);
			for (let e = 0; e < 10; e++) {
				let t = e / 10 * Math.PI * 2 + Math.random() * .3, r = 30 + Math.random() * 22;
				c(d(`left:${i - 3}px;top:${s - 3}px;width:6px;height:6px;border-radius:50%;background:${n.color}`), [{
					transform: "translate(0,0) scale(1)",
					opacity: 1
				}, {
					transform: `translate(${Math.cos(t) * r}px,${Math.sin(t) * r}px) scale(.2)`,
					opacity: 0
				}], 650);
			}
			break;
		}
		case "icon-flip":
			f(n.icon, [
				{ transform: "perspective(200px) rotateY(0)" },
				{ transform: "perspective(200px) rotateY(180deg)" },
				{ transform: "perspective(200px) rotateY(360deg)" }
			], 600);
			break;
		case "border-trace": {
			let e = d(`inset:0;border-radius:inherit;padding:2px;box-sizing:border-box;background:conic-gradient(from var(--gc-trace,0deg),transparent 0 70%,${n.color} 85%,transparent 100%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0)`), t = c(e, [
				{ opacity: 1 },
				{
					opacity: 1,
					offset: .8
				},
				{ opacity: 0 }
			], 750, "linear"), r = () => {
				t.playState === "running" && (e.style.setProperty("--gc-trace", `${(Number(t.currentTime) || 0) / 750 * 360}deg`), requestAnimationFrame(r));
			};
			requestAnimationFrame(r);
			break;
		}
		case "nudge":
			c(e, [
				{ transform: "translateX(0)" },
				{
					transform: "translateX(-4px)",
					offset: .2
				},
				{
					transform: "translateX(4px)",
					offset: .45
				},
				{
					transform: "translateX(-2px)",
					offset: .7
				},
				{ transform: "translateX(0)" }
			], 380, "ease-out");
			break;
		case "badge-pop": l(.96, 420), n.badge && c(n.badge, [
			{ transform: "scale(1)" },
			{
				transform: "scale(1.35)",
				offset: .4
			},
			{ transform: "scale(1)" }
		], 450, H);
	}
	Promise.all(s.anims.map((e) => e.finished)).then(() => Vt.get(e) === s && Ut(e), () => {});
}
function Ut(e) {
	let t = Vt.get(e);
	t && (Vt.delete(e), t.anims.forEach((e) => e.cancel()), t.layer?.remove());
}
//#endregion
//#region src/core/base-card.ts
var Wt = [
	"full",
	"compact",
	"slim"
], Gt = (e) => Wt.includes(e);
function Kt(e, t) {
	if (Gt(e)) return e;
	for (let e of [t, document.documentElement]) {
		let t = getComputedStyle(e).getPropertyValue("--glide-size").trim();
		if (Gt(t)) return t;
	}
	return "full";
}
var W = x`
  :host {
    display: block;
    font-family: var(--gc-font);
    color: var(--gc-text);
    -webkit-tap-highlight-color: transparent;
  }
  .surface {
    position: relative;
    box-sizing: border-box;
    background: var(--gc-surface);
    border: 1px solid var(--gc-border);
    border-radius: var(--gc-radius);
    box-shadow: var(--gc-shadow), inset 0 1px 0 var(--gc-highlight);
    backdrop-filter: var(--gc-backdrop);
    -webkit-backdrop-filter: var(--gc-backdrop);
    overflow: hidden;
  }
  .meta {
    font-family: var(--gc-font-meta);
    letter-spacing: var(--gc-meta-spacing);
    text-transform: var(--gc-meta-transform);
    font-size: 12px;
    color: var(--gc-text-dim);
  }
  /* Monospace + tracking reads as broken letters in Hebrew/Arabic: use the body font there. */
  .meta:lang(he),
  .meta:lang(ar),
  .meta:lang(fa) {
    font-family: var(--gc-font);
    letter-spacing: 0;
  }
  /* "none" also drops the press shrink each card sets on :active. */
  :host([tap-fx="none"]) *:active {
    transform: none !important;
  }
  ha-icon {
    --mdc-icon-size: 22px;
    display: inline-flex;
  }
  :host([lite]) .surface {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  @media (prefers-reduced-transparency: reduce) {
    .surface {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
  }
`;
function qt(e) {
	if (e !== void 0) return e;
	try {
		let e = localStorage.getItem("glide-card-lite");
		if (e === "1" || e === "0") return e === "1";
	} catch {}
	let t = navigator.deviceMemory;
	return t !== void 0 && t <= 2;
}
var Jt = [
	"100% 100%",
	"0% 100%",
	"100% 0%",
	"15% 0%",
	"85% 110%",
	"0% 30%"
];
function Yt(e) {
	let t = e, n = t.entity ?? t.name ?? t.title ?? JSON.stringify(e), r = 2166136261;
	for (let e = 0; e < n.length; e++) r = Math.imul(r ^ n.charCodeAt(e), 16777619) >>> 0;
	return {
		tint: r % 5 + 1,
		glowAt: Jt[(r >>> 8) % Jt.length]
	};
}
var G = class extends P {
	constructor(...e) {
		super(...e), this.editMode = !1, this.theme = v(), this.themeKey = "";
	}
	static {
		this.properties = {
			hass: { attribute: !1 },
			config: { attribute: !1 },
			editMode: {
				type: Boolean,
				attribute: "edit-mode"
			}
		};
	}
	watched() {
		return [this.config.entity];
	}
	setConfig(e) {
		this.config = e;
		let t = Yt(e);
		this.style.setProperty("--gc-tint", `var(--gc-tint-${t.tint})`), this.style.setProperty("--gc-glow-at", t.glowAt), this.theme = v(e.theme);
	}
	shouldUpdate(e) {
		if (e.size > 1 || !e.has("hass")) return !0;
		let t = e.get("hass");
		return !t || !this.hass || t.themes?.darkMode !== this.hass.themes?.darkMode || t.language !== this.hass.language || this.watched().some((e) => e && t.states[e] !== this.hass.states[e]);
	}
	willUpdate(e) {
		super.willUpdate(e), this.applyTheme();
	}
	applyTheme() {
		if (!this.config) return;
		let e = ne(this.config.theme, this), t = re(this.config.mode, this.hass?.themes?.darkMode), n = `${e}|${t}|${this.config.accent ?? ""}|${this.config.lite}|${this.config.tap_animation ?? ""}|${this.config.size ?? ""}`;
		if (n === this.themeKey) return;
		this.themeKey = n, this.theme = v(e), this.toggleAttribute("dark", t), this.toggleAttribute("lite", qt(this.config.lite)), this.dataset.theme = e, this.setAttribute("tap-fx", Lt(this.config.tap_animation, this)), this.setAttribute("size", this.size), this.config.accent ? this.style.setProperty("--gc-accent", this.config.accent) : this.style.removeProperty("--gc-accent");
		let r = this.constructor.elementStyles.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
		this.renderRoot.adoptedStyleSheets = [...r, te(e, t, this.cardType)];
	}
	playTapFx(e, t, n = {}) {
		let r = Lt(this.config.tap_animation, this), i = e.getBoundingClientRect(), a = getComputedStyle(e), o = [
			"--domain",
			"--chip",
			"--c",
			"--gc-accent"
		].map((e) => a.getPropertyValue(e).trim()).find(Boolean) ?? "#ff9f43";
		Ht(e, r, {
			x: t && t.x - i.left,
			y: t && t.y - i.top,
			color: o,
			...n
		});
	}
	get size() {
		return Kt(this.config?.size, this);
	}
	stateOf(e) {
		return e ? this.hass?.states[e] : void 0;
	}
}, Xt = 500, Zt = 250, Qt = 250, $t = 8, en = (e) => e.composedPath().some((e) => e instanceof Element && e.hasAttribute("data-no-gesture"));
function tn(e, t) {
	let n = 0, r = 0, i = 0, a = 0, o = 0, s = 0, c = 0, l = "x", u = 1, d = !1, f = "idle", p = () => {
		clearTimeout(o), clearTimeout(c);
	}, m = () => e.getBoundingClientRect().width || 1, h = () => e.getBoundingClientRect().height || 1, g = () => getComputedStyle(e).direction === "rtl", _ = (e) => {
		if (e.button !== 0 || en(e)) return;
		n = e.clientX, r = e.clientY, f = "down", p();
		let i = t.axis?.() ?? "x";
		l = i.endsWith("y") ? "y" : "x", u = i.startsWith("-") ? -1 : 1, d = l === "y" && e.pointerType !== "touch", l === "y" && !d && t.dragStart && (c = window.setTimeout(() => {
			d = !0, t.arm?.();
		}, Qt)), t.hold && (o = window.setTimeout(() => {
			f = "held", t.hold();
		}, Xt));
	}, v = (o) => {
		if (f === "down") {
			let a = o.clientX - n, s = o.clientY - r;
			if (Math.abs(a) < $t && Math.abs(s) < $t) return;
			p();
			let c = l === "y" ? d && Math.abs(s) > Math.abs(a) : Math.abs(a) > Math.abs(s);
			t.dragStart && c ? (f = "drag", i = t.dragStart(), e.setPointerCapture(o.pointerId)) : f = "cancel";
		}
		if (f === "drag") {
			let e = l === "y" ? (r - o.clientY) / h() * 100 : (o.clientX - n) / m() * 100 * (g() ? -1 : 1);
			a = Math.round(Math.min(100, Math.max(0, i + u * e))), t.drag?.(a);
		}
	}, y = () => {
		if (p(), d = !1, f === "drag") t.dragEnd?.(a);
		else if (f === "down") {
			if (t.doubleTap) {
				let e = {
					x: n,
					y: r
				};
				s ? (clearTimeout(s), s = 0, t.doubleTap(e)) : s = window.setTimeout(() => {
					s = 0, t.tap?.(e);
				}, Zt);
			} else t.tap?.({
				x: n,
				y: r
			});
		}
		f = "idle";
	}, b = () => {
		p(), d = !1, f === "drag" && t.dragEnd?.(a), f = "idle";
	}, ee = (e) => {
		t.hold && e.preventDefault();
	}, te = (e) => {
		d && (f === "down" || f === "drag") && e.preventDefault();
	}, ne = (e) => {
		en(e) || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), t.tap?.());
	};
	return e.addEventListener("pointerdown", _), e.addEventListener("pointermove", v), e.addEventListener("pointerup", y), e.addEventListener("pointercancel", b), e.addEventListener("contextmenu", ee), e.addEventListener("keydown", ne), e.addEventListener("touchmove", te, { passive: !1 }), () => {
		p(), clearTimeout(s), e.removeEventListener("pointerdown", _), e.removeEventListener("pointermove", v), e.removeEventListener("pointerup", y), e.removeEventListener("pointercancel", b), e.removeEventListener("contextmenu", ee), e.removeEventListener("keydown", ne), e.removeEventListener("touchmove", te);
	};
}
//#endregion
//#region src/cards/cover-scenes.ts
var nn = [
	"garden",
	"sky",
	"city",
	"sea",
	"mountains",
	"beach",
	"forest",
	"desert",
	"snow",
	"field",
	"pool"
], rn = (e) => nn.includes(e), K = (e, t, n, r) => k`
  <g class="cloud ${r}" transform="translate(${e} ${t}) scale(${n})">
    <ellipse cx="0" cy="4" rx="16" ry="6" />
    <circle cx="-6" cy="0" r="7" />
    <circle cx="5" cy="-2" r="9" />
  </g>`, an = [
	[
		18,
		14,
		1
	],
	[
		44,
		30,
		.8
	],
	[
		70,
		10,
		1.1
	],
	[
		96,
		26,
		.7
	],
	[
		118,
		8,
		.9
	],
	[
		140,
		34,
		.8
	],
	[
		186,
		18,
		1
	],
	[
		30,
		46,
		.6
	],
	[
		104,
		46,
		.7
	],
	[
		176,
		44,
		.6
	]
];
function on(e) {
	return e ? k`
      <g class="stars">${an.map(([e, t, n], r) => k`<circle class="star" style="animation-delay:${r % 5 * .7}s" cx=${e} cy=${t} r=${n} />`)}</g>
      <circle class="moon" cx="150" cy="50" r="10" />
      <circle class="moon-cut" cx="155" cy="46" r="9" />` : k`
      <circle class="halo" cx="150" cy="50" r="18" />
      <circle class="sun" cx="150" cy="50" r="10" />
      ${K(42, 24, 1, "c1")}
      ${K(112, 16, .75, "c2")}`;
}
var sn = (e, t, n) => k`
  <g transform="translate(${e} ${t}) scale(${n})">
    <rect class="trunk" x="-1.5" y="-4" width="3" height="10" />
    <circle class="leaf" cx="0" cy="-10" r="9" />
  </g>`, q = (e, t, n) => k`
  <g transform="translate(${e} ${t}) scale(${n})">
    <rect class="trunk" x="-1.5" y="-3" width="3" height="8" />
    <polygon class="pine" points="0,-26 9,-2 -9,-2" />
  </g>`, cn = (e, t, n, r = 1) => k`
  <g transform="translate(${e} ${t}) scale(${n * r} ${n})">
    <path class="palm-trunk" d="M-1.5 0 Q-2 -14 3 -28 L5 -27.5 Q1 -14 1.5 0Z" />
    <g class="frond" transform="translate(4 -28)">
      <path d="M0 0 Q-10 -6 -18 2 Q-9 -2 0 0Z" />
      <path d="M0 0 Q10 -6 18 2 Q9 -2 0 0Z" />
      <path d="M0 0 Q-6 -10 -14 -9 Q-6 -6 0 0Z" />
      <path d="M0 0 Q6 -10 14 -9 Q6 -6 0 0Z" />
      <path d="M0 0 Q-1 -9 -2 -13 Q1 -8 0 0Z" />
    </g>
  </g>`, ln = (e, t, n) => k`
  <g class="cactus" transform="translate(${e} ${t}) scale(${n})">
    <rect x="-2.5" y="-20" width="5" height="20" rx="2.5" />
    <path d="M-2.5 -10 H-6 V-15 a1.6 1.6 0 0 1 3.2 0 V-12.5 H-2.5Z M2.5 -7 H6 V-13 a1.6 1.6 0 0 0 -3.2 0 V-9.5 H2.5Z" />
  </g>`, un = (e, t, n) => k`
  <g transform="translate(${e} ${t}) scale(${n})">
    <rect class="trunk" x="-1.5" y="-3" width="3" height="8" />
    <polygon class="pine" points="0,-26 9,-2 -9,-2" />
    <polygon class="snowcap" points="0,-26 4.2,-14.5 1.5,-16 -1,-14 -4.2,-14.5" />
  </g>`, dn = [
	[14, 30],
	[38, 52],
	[62, 22],
	[84, 44],
	[108, 30],
	[128, 58],
	[170, 28],
	[190, 48],
	[24, 70],
	[96, 66],
	[148, 72],
	[182, 70]
], fn = [
	[30, 86],
	[58, 94],
	[86, 80],
	[118, 92],
	[144, 84],
	[170, 96],
	[104, 102]
], pn = {
	sky: () => k`${K(70, 62, 1.1, "c3")}${K(168, 74, .8, "c1")}${K(18, 88, .9, "c2")}`,
	garden: () => k`
    <path class="hill-back" d="M0 90 Q50 68 100 84 T200 78 V120 H0Z" />
    ${q(150, 86, 1)}${sn(172, 88, .9)}${q(34, 92, .8)}
    <path class="hill" d="M0 102 Q60 86 120 98 T200 94 V120 H0Z" />
    ${sn(62, 100, 1.1)}${q(88, 100, .9)}`,
	city: (e) => {
		let t = [
			[
				4,
				58,
				22
			],
			[
				30,
				70,
				18
			],
			[
				52,
				50,
				20
			],
			[
				96,
				64,
				24
			],
			[
				128,
				46,
				18
			],
			[
				150,
				60,
				26
			],
			[
				182,
				54,
				20
			]
		], n = [
			[
				0,
				82,
				26
			],
			[
				30,
				74,
				20
			],
			[
				56,
				88,
				30
			],
			[
				90,
				70,
				22
			],
			[
				116,
				84,
				28
			],
			[
				148,
				76,
				20
			],
			[
				172,
				86,
				28
			]
		], r = n.flatMap(([e, t, n], r) => Array.from({ length: Math.floor((120 - t - 6) / 9) }, (i, a) => [0, 1].map((i) => (r + a + i) % 3 == 0 ? k`<rect class="win" x=${e + 4 + i * (n - 12)} y=${t + 6 + a * 9} width="4" height="4" />` : null)));
		return k`
      ${t.map(([e, t, n]) => k`<rect class="bld-back" x=${e} y=${t} width=${n} height=${120 - t} />`)}
      ${n.map(([e, t, n]) => k`<rect class="bld" x=${e} y=${t} width=${n} height=${120 - t} />`)}
      ${e ? r : null}`;
	},
	sea: () => k`
    <rect class="water" x="0" y="82" width="200" height="38" />
    <path class="wave" d="M10 92 q6 -3 12 0 t12 0 M70 100 q6 -3 12 0 t12 0 M140 90 q6 -3 12 0 t12 0 M120 108 q6 -3 12 0 t12 0 M30 112 q6 -3 12 0 t12 0" />
    <g class="boat" transform="translate(58 82)">
      <polygon class="sail" points="0,-16 0,-2 10,-2" />
      <path class="hull" d="M-8 -1 H14 L10 3 H-4Z" />
    </g>`,
	mountains: () => k`
    <polygon class="peak-back" points="0,86 30,52 52,70 84,38 118,74 146,50 176,68 200,56 200,120 0,120" />
    <polygon class="snowcap" points="84,38 92,48 87,46 82,50 77,46" />
    <polygon class="snowcap" points="146,50 153,58 148,57 143,60 139,57" />
    <polygon class="peak" points="0,98 40,66 70,92 110,60 150,94 180,78 200,90 200,120 0,120" />
    <polygon class="snowcap" points="110,60 118,70 113,68 108,72 103,69" />
    <rect class="lake" x="0" y="104" width="200" height="16" />
    <path class="wave" d="M20 110 q6 -2 12 0 M120 112 q6 -2 12 0 M70 115 q6 -2 12 0" />
    ${q(16, 104, .8)}${q(184, 104, .9)}${q(170, 104, .6)}`,
	beach: (e) => k`
    <rect class="water" x="0" y="80" width="200" height="22" />
    ${e ? k`<ellipse class="glint" cx="150" cy="88" rx="16" ry="2" /><ellipse class="glint" cx="150" cy="94" rx="10" ry="1.4" />` : null}
    <path class="wave" d="M20 88 q6 -3 12 0 t12 0 M90 84 q6 -3 12 0 t12 0 M60 96 q6 -3 12 0 t12 0" />
    <path class="foam" d="M0 100 Q30 96 60 100 T120 99 T200 100 V103 H0Z" />
    <path class="sand" d="M0 101 Q50 97 110 101 T200 100 V120 H0Z" />
    ${cn(30, 116, 1.1, -1)}${cn(176, 114, .9)}${cn(190, 117, .75, -1)}`,
	forest: (e) => k`
    <path class="hill-back" d="M0 88 Q50 72 100 84 T200 76 V120 H0Z" />
    ${[
		8,
		26,
		44,
		120,
		138,
		156,
		174,
		192
	].map((e, t) => q(e, 86 + t % 3 * 2, .75 + t % 2 * .15))}
    <path class="hill" d="M0 104 Q60 92 120 102 T200 98 V120 H0Z" />
    ${[
		18,
		46,
		74,
		100,
		128,
		160,
		186
	].map((e, t) => q(e, 104 + t % 2 * 3, 1 + t % 3 * .12))}
    ${e ? fn.map(([e, t], n) => k`<circle class="firefly" style="animation-delay:${n * .45}s" cx=${e} cy=${t} r="1.1" />`) : null}`,
	desert: () => k`
    <path class="dune-back" d="M0 92 Q40 74 90 88 T200 82 V120 H0Z" />
    <path class="dune" d="M0 106 Q50 90 110 104 T200 98 V120 H0Z" />
    <path class="dune-shade" d="M110 104 Q150 96 200 98 V120 H140Z" />
    ${ln(46, 104, 1.1)}${ln(170, 100, .8)}${ln(24, 98, .6)}`,
	snow: () => k`
    <path class="snow-back" d="M0 90 Q50 76 100 86 T200 80 V120 H0Z" />
    ${un(148, 88, 1)}${un(168, 90, .8)}${un(30, 92, .85)}
    <path class="snow" d="M0 104 Q60 92 120 102 T200 98 V120 H0Z" />
    ${un(70, 104, 1.1)}
    <g class="snowman" transform="translate(118 104)">
      <circle cy="-5" r="5.5" /><circle cy="-14" r="3.8" />
      <polygon class="nose" points="0,-14.5 4,-14 0,-13.3" />
    </g>
    ${dn.map(([e, t]) => k`<circle class="flake" cx=${e} cy=${t} r="1" />`)}`,
	field: () => k`
    <path class="hill-back" d="M0 88 Q60 78 120 86 T200 82 V120 H0Z" />
    ${sn(158, 88, 1)}
    <path class="field" d="M0 98 Q70 90 140 97 T200 95 V120 H0Z" />
    <path class="row" d="M0 106 Q100 98 200 104 M0 112 Q100 104 200 110 M0 118 Q100 110 200 116" />
    <g class="fence">
      ${[
		12,
		30,
		48,
		66
	].map((e) => k`<rect x=${e} y="90" width="2" height="10" />`)}
      <rect x="10" y="92" width="60" height="1.6" /><rect x="10" y="96" width="60" height="1.6" />
    </g>`,
	pool: (e) => k`
    <rect class="hedge" x="0" y="80" width="200" height="14" rx="2" />
    <rect class="deck" x="0" y="92" width="200" height="28" />
    <rect class="pool" x="34" y="98" width="132" height="22" rx="3" />
    <path class="pool-line" d="M46 106 q6 -2 12 0 t12 0 M100 112 q6 -2 12 0 t12 0 M126 104 q6 -2 12 0" />
    ${e ? k`<ellipse class="pool-light" cx="100" cy="114" rx="40" ry="5" />` : null}
    <g class="ladder"><path d="M150 92 V104 M156 92 V104 M150 96 H156 M150 100 H156" /></g>
    ${cn(16, 100, 1.05)}${cn(186, 100, 1, -1)}`
};
function mn(e, t) {
	return O`<svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${on(t)}${pn[e](t)}</svg>`;
}
//#endregion
//#region src/core/i18n.ts
var hn = {
	on: "On",
	off: "Off",
	open: "Open",
	closed: "Closed",
	unavailable: "Unavailable",
	heating: "Heating to",
	cooling: "Cooling to",
	idle: "Idle",
	target: "Target temp",
	current: "Current",
	active: "Active",
	step: "Step",
	heat: "Heat",
	cool: "Cool",
	heat_cool: "Auto",
	auto: "Auto",
	dry: "Dry",
	fan_only: "Fan",
	nothing_playing: "Nothing playing",
	popup_placeholder: "Pop-up",
	close: "Close",
	open_cover: "Open",
	close_cover: "Close",
	stop_cover: "Stop",
	search: "Search",
	search_placeholder: "Search lights, rooms, ACs…",
	search_frequent: "Frequently used",
	search_places: "Places",
	search_extras: "More entities",
	search_sensors: "Sensors",
	search_none: "Nothing found for",
	search_hint: "Type to search the whole dashboard",
	search_more: "more results, keep typing to narrow down",
	clear: "Clear"
}, gn = {
	en: hn,
	he: {
		on: "פועל",
		off: "כבוי",
		open: "פתוח",
		closed: "סגור",
		unavailable: "לא זמין",
		heating: "מחמם ל־",
		cooling: "מקרר ל־",
		idle: "במנוחה",
		target: "יעד",
		current: "נוכחי",
		active: "פעיל",
		step: "צעד",
		heat: "חימום",
		cool: "קירור",
		heat_cool: "אוטו",
		auto: "אוטו",
		dry: "ייבוש",
		fan_only: "מאוורר",
		nothing_playing: "לא מתנגן כלום",
		popup_placeholder: "חלון קופץ",
		close: "סגירה",
		open_cover: "פתיחה",
		close_cover: "סגירה",
		stop_cover: "עצירה",
		search: "חיפוש",
		search_placeholder: "חפשו אור, חדר, מזגן…",
		search_frequent: "בשימוש תדיר",
		search_places: "מקומות",
		search_extras: "ישויות נוספות",
		search_sensors: "חיישנים",
		search_none: "לא נמצא כלום עבור",
		search_hint: "הקלידו כדי לחפש בכל הדשבורד",
		search_more: "תוצאות נוספות, המשיכו להקליד כדי לצמצם",
		clear: "ניקוי"
	}
};
function J(e, t) {
	return (gn[(e?.locale?.language ?? e?.language ?? "en").split("-")[0]] ?? hn)[t] ?? hn[t];
}
function _n(e, t) {
	let n = e.states[t];
	if (!n) return J(e, "unavailable");
	let r = e.formatEntityState;
	return r ? r(n) : (J(e, n.state) ?? n.state) || n.state;
}
//#endregion
//#region src/core/templates.ts
var vn = (e) => typeof e == "string" && /\{\{|\{%/.test(e), yn = class {
	constructor(e, t, n, r = () => e.requestUpdate()) {
		this.fields = t, this.ctx = n, this.onChange = r, this.values = {}, this.subs = /* @__PURE__ */ new Map(), this.warned = /* @__PURE__ */ new Set(), e.addController(this);
	}
	hostConnected() {
		this.sync();
	}
	hostUpdate() {
		this.sync();
	}
	hostDisconnected() {
		this.clear();
	}
	get(e, t) {
		let n = this.fields()[e];
		return vn(n) ? e in this.values ? this.values[e] : t : typeof n == "string" ? n : t;
	}
	sync() {
		let { hass: e, config: t, entity: n } = this.ctx(), r = e?.connection;
		if (r) {
			r !== this.conn && (this.clear(), this.conn = r);
			for (let [i, a] of Object.entries(this.fields())) {
				let o = this.subs.get(i);
				if (!vn(a)) {
					o && this.drop(i);
					continue;
				}
				let s = `${n ?? ""}\u0000${a}`;
				if (o?.key === s) continue;
				o && this.drop(i);
				let c = {
					config: t,
					user: e.user?.name,
					entity: n
				}, l = r.subscribeMessage((e) => {
					this.subs.get(i)?.key === s && ("error" in e && e.error ? (this.values[i] = "", this.warned.has(a) || (this.warned.add(a), console.warn(`[glide-card] template error in "${i}": ${e.error}`))) : this.values[i] = e.result == null ? "" : String(e.result), this.onChange());
				}, {
					type: "render_template",
					template: a,
					variables: c,
					strict: !1,
					report_errors: !0
				}).catch((e) => {
					this.warned.has(a) || (this.warned.add(a), console.warn(`[glide-card] template "${i}" failed:`, e));
				});
				this.subs.set(i, {
					key: s,
					unsub: l
				});
			}
		}
	}
	drop(e) {
		let t = this.subs.get(e);
		this.subs.delete(e), delete this.values[e], t?.unsub.then((e) => e?.());
	}
	clear() {
		for (let e of [...this.subs.keys()]) this.drop(e);
		this.conn = void 0;
	}
}, bn = (e) => e && /^[\w-]+:[\w-]+$/.test(e.trim()) ? e.trim() : void 0, xn = /* @__PURE__ */ new Set([
	"scene",
	"script",
	"button",
	"input_button"
]), Sn = 1, Cn = 2, wn = 8, Tn = {
	blind: "down",
	roman: "down",
	venetian: "down",
	shutter: "down",
	bottom_up: "up",
	curtain: "split",
	curtain_side: "side",
	vertical: "side"
}, En = /* @__PURE__ */ new Set([
	"curtain",
	"curtain_side",
	"roman"
]), Dn = 1e3, On = 250, kn = 4e3, An = (e) => {
	let t = typeof e == "number" ? Math.abs(e - 50) / 50 : .5;
	return Math.round((2.5 + 5.5 * t) * 10) / 10;
}, jn = (e) => e?.state === "opening" || e?.state === "closing", Mn = /* @__PURE__ */ new Set([
	"light",
	"switch",
	"fan",
	"input_boolean",
	"cover",
	"lock",
	"scene",
	"script",
	"button",
	"input_button",
	"siren",
	"humidifier"
]), Nn = class extends G {
	constructor(...e) {
		super(...e), this.cardType = "button", this.templateRev = 0, this.moveMs = Dn, this.tpl = new yn(this, () => {
			let e = this.config ?? {};
			return {
				name: e.name,
				secondary: e.secondary,
				badge: e.badge,
				icon: e.icon,
				color: e.color
			};
		}, () => ({
			hass: this.hass,
			config: this.config,
			entity: this.config?.entity
		}), () => this.templateRev++);
	}
	static {
		this.properties = {
			...G.properties,
			dragValue: { state: !0 },
			templateRev: { state: !0 }
		};
	}
	get layout() {
		return this.config.layout ?? this.theme.defaults?.buttonLayout ?? "tile";
	}
	get rows() {
		return this.layout === "pill" || this.size === "slim" ? 1 : 2;
	}
	getGridOptions() {
		return this.layout === "pill" ? {
			columns: 12,
			rows: 1,
			min_columns: 6
		} : {
			columns: 6,
			rows: this.rows,
			min_columns: 3,
			min_rows: this.rows
		};
	}
	getCardSize() {
		return this.rows;
	}
	action(e) {
		let t = this.config[`${e}_action`];
		if (t) return t;
		let n = this.config.entity;
		if (e === "tap") return { action: n && Mn.has(F(n)) ? "toggle" : "more-info" };
		if (e === "hold") return { action: "more-info" };
	}
	willUpdate(e) {
		if (super.willUpdate(e), e.has("hass") && this.dragValue !== void 0 && e.get("hass")) {
			let t = this.config.entity;
			e.get("hass").states[t] !== this.hass?.states[t] && (this.dragValue = void 0);
		}
		e.has("hass") && this.trackMotion();
	}
	trackMotion() {
		let e = this.stateOf(this.config.entity), t = e?.attributes.current_position;
		if (typeof t != "number" || t === this.lastPos?.value) return;
		let n = performance.now(), r = jn(e);
		r && (this.moveMs = this.lastPos?.moving ? Math.min(kn, Math.max(On, n - this.lastPos.at)) : Dn), this.lastPos = {
			value: t,
			at: n,
			moving: r
		};
	}
	firstUpdated() {
		let e = this.renderRoot.querySelector(".surface"), t = -1;
		this.detach = tn(e, {
			axis: () => this.dragAxis,
			arm: () => R("selection"),
			tap: (t) => {
				this.playTapFx(e, t, {
					icon: e.querySelector(".icon"),
					badge: e.querySelector(".badge")
				}), this.hass && B(this, this.hass, this.action("tap"), this.config.entity);
			},
			hold: () => this.hass && B(this, this.hass, this.action("hold"), this.config.entity),
			doubleTap: this.config.double_tap_action ? (t) => {
				this.playTapFx(e, t, {
					icon: e.querySelector(".icon"),
					badge: e.querySelector(".badge")
				}), this.hass && B(this, this.hass, this.action("double_tap"), this.config.entity);
			} : void 0,
			dragStart: () => {
				let e = this.slider;
				return t = -1, e ? e.value : NaN;
			},
			drag: (e) => {
				if (!this.slider) return;
				this.dragValue = e;
				let n = Math.floor(e / 10);
				n !== t && (t = n, R("selection"));
			},
			dragEnd: (e) => {
				let t = this.slider;
				t && this.hass && t.set(this.hass, e);
			}
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.detach?.(), this.detach = void 0;
	}
	connectedCallback() {
		super.connectedCallback(), this.hasUpdated && !this.detach && this.firstUpdated();
	}
	get slider() {
		return this.config.slider === !1 ? void 0 : bt(this.stateOf(this.config.entity));
	}
	get isCover() {
		return F(this.config.entity) === "cover" && !!this.slider;
	}
	get coverStyle() {
		if (!this.isCover) return;
		let e = this.config.cover_style;
		if (e && e in Tn) return e;
		let t = this.stateOf(this.config.entity)?.attributes.device_class;
		return t === "curtain" ? "curtain" : t === "shutter" ? "shutter" : "blind";
	}
	get motion() {
		let e = this.coverStyle;
		return e ? Tn[e] : void 0;
	}
	get horizontal() {
		return this.motion === "split" || this.motion === "side";
	}
	get side() {
		return this.config.cover_side === "end" ? "end" : "start";
	}
	get dragAxis() {
		switch (this.motion) {
			case "down": return "y";
			case "up": return "-y";
			case "split": return "x";
			case "side": return this.side === "start" ? "-x" : "x";
			default: return "x";
		}
	}
	get view() {
		if (!this.isCover) return;
		let e = this.config.view;
		if (e !== "color") return e === void 0 && this.config.view_image ? "image" : "scene";
	}
	get coverButtons() {
		return F(this.config.entity) === "cover" && !!this.config.cover_buttons;
	}
	renderCoverButtons(e) {
		let t = this.config.entity, n = e?.attributes ?? {}, r = n.supported_features ?? 11, i = n.current_position, a = jn(e), o = !e || dt(e), s = !a && (i === void 0 ? e?.state === "open" : i >= 100), c = !a && (i === void 0 ? e?.state === "closed" : i <= 0), [l, u] = {
			down: ["mdi:arrow-up", "mdi:arrow-down"],
			up: ["mdi:arrow-down", "mdi:arrow-up"],
			split: ["mdi:arrow-split-vertical", "mdi:arrow-collapse-horizontal"],
			side: this.side === "start" ? ["mdi:arrow-left", "mdi:arrow-right"] : ["mdi:arrow-right", "mdi:arrow-left"]
		}[this.motion ?? "down"], d = this.motion === "side" ? "mirror" : "", f = (e, n, r, i, a = "") => O`
      <button class="round ${a}" aria-label=${r} title=${r} ?disabled=${o || i}
        @click=${(n) => {
			n.stopPropagation(), R("light"), this.hass?.callService("cover", e, { entity_id: t });
		}}>
        <ha-icon .icon=${n}></ha-icon>
      </button>`;
		return O`
      <div class="cover-btns" data-no-gesture>
        ${r & Sn ? f("open_cover", l, J(this.hass, "open_cover"), s, d) : j}
        ${r & wn ? f("stop_cover", "mdi:stop", J(this.hass, "stop_cover"), !a, a ? "stop live" : "stop") : j}
        ${r & Cn ? f("close_cover", u, J(this.hass, "close_cover"), c, d) : j}
      </div>
    `;
	}
	watched() {
		return this.view ? [...super.watched(), "sun.sun"] : super.watched();
	}
	renderView() {
		let e = this.hass?.states["sun.sun"]?.state === "below_horizon", t = rn(this.config.view) ? this.config.view : "garden";
		return O`
      <div class="view ${e ? "night" : "day"} ${this.view === "image" ? "photo" : t}">
        ${this.view === "image" ? O`<img src=${this.config.view_image} alt="" draggable="false" />` : mn(t, e)}
      </div>
    `;
	}
	renderPanel(e) {
		let t = this.dragValue === void 0 ? "" : "dragging";
		switch (Tn[e]) {
			case "split": return O`<div class="rod"></div>${["start", "end"].map((e) => O`<div class="drape ${e} ${t}"></div>`)}`;
			case "side": return O`<div class="rod"></div><div class="drape single ${this.side} ${t}"></div>`;
			default: return O`<div class="fill ${t}"></div>${e === "shutter" ? O`<div class="box"></div>` : j}`;
		}
	}
	render() {
		let e = this.stateOf(this.config.entity), t = this.slider, n = this.dragValue ?? t?.value, r = this.isCover, i = this.view, a = this.coverStyle, o = this.horizontal, s = !r && (this.dragValue === void 0 ? ft(e) : this.dragValue > 0), c = this.hass && this.config.entity && e ? _n(this.hass, this.config.entity) : "", l = xn.has(F(this.config.entity)), u = ht(e, this.tpl.get("name") || void 0), d = (this.config.badge === void 0 ? void 0 : this.tpl.get("badge") ?? "") ?? (l ? "" : r ? `${n}%` : c), f = this.config.secondary === void 0 ? r ? `${n}% ${c}` : this.coverButtons ? c : t && s && n !== void 0 ? `${n}%` : "" : this.tpl.get("secondary") ?? "", p = i && !o ? 100 - (n ?? 0) : t ? n ?? 0 : s ? 100 : 0, m = this.tpl.get("color")?.trim(), h = this.coverButtons, g = r && this.dragValue === void 0 && jn(e);
		return O`
      <div
        class="surface ${this.layout} ${s ? "on" : ""} ${r ? "cover" : ""} ${i ? "window" : ""} ${a ? `style-${a} side-${this.side}` : ""} ${a === "curtain" ? "curtain" : ""} ${a && En.has(a) ? "fabric" : ""} ${g ? "moving" : ""} ${h ? "has-btns" : ""} ${this.config.fill === !1 ? "nofill" : ""} ${dt(e) && this.config.entity ? "unavailable" : ""}"
        style=${lt({
			"--domain": I(m) ?? gt(e),
			"--gc-icon-on": yt(m),
			"--fill": `${p}%`,
			"--closed": `${(100 - (n ?? 0)) / 100}`,
			"--gc-fabric": a && En.has(a) ? I(m) : void 0,
			"--slat": a === "venetian" ? `${An(e?.attributes.current_tilt_position)}px` : void 0,
			"--gc-move": g ? `${Math.round(this.moveMs)}ms` : void 0
		})}
        role="button"
        tabindex="0"
        aria-label=${u}
      >
        ${i ? this.renderView() : j}
        ${i ? this.renderPanel(a) : O`<div class="fill ${this.dragValue === void 0 ? "" : "dragging"}"></div>`}
        <div class="icon"><ha-icon .icon=${mt(e, bn(this.tpl.get("icon")))}></ha-icon></div>
        <div class="text">
          <div class="name">${u}</div>
          ${f ? O`<div class="meta">${f}</div>` : j}
        </div>
        ${d && !h ? O`<div class="badge meta">${d}</div>` : j}
        ${h ? this.renderCoverButtons(e) : j}
      </div>
    `;
	}
	static {
		this.styles = [W, x`
      :host { height: 100%; container-type: inline-size; }
      .surface {
        height: 100%;
        cursor: pointer;
        user-select: none;
        touch-action: pan-y;
        transition: transform 0.25s cubic-bezier(0.2, 0.9, 0.3, 1.2), background-color 0.3s;
      }
      .surface:active { transform: scale(0.97); }
      .surface:focus-visible { outline: 2px solid var(--gc-accent); outline-offset: 2px; }
      .surface.on { background-color: var(--gc-surface-on); }
      .surface.unavailable { opacity: 0.5; }
      .fill {
        position: absolute;
        inset-block: 0;
        inset-inline-start: 0;
        width: var(--fill);
        background: color-mix(in srgb, var(--domain) var(--gc-fill-strength), transparent);
        transition: width 0.45s cubic-bezier(0.2, 0.9, 0.25, 1);
        pointer-events: none;
      }
      .fill.dragging { transition: none; }
      .nofill .fill { display: none; }
      .cover .fill {
        inset-block: auto 0;
        inset-inline: 0;
        width: auto;
        height: var(--fill);
        border-top: 1.5px solid color-mix(in srgb, var(--domain) 35%, transparent);
        border-start-start-radius: 6px;
        border-start-end-radius: 6px;
        box-shadow: none;
        transition: height 0.45s cubic-bezier(0.2, 0.9, 0.25, 1);
      }
      .cover .fill.dragging { transition: none; }
      .cover .badge {
        background: color-mix(in srgb, var(--gc-text) 7%, transparent);
        border-color: transparent;
        color: var(--gc-text);
      }
      .cover .meta:not(.badge) { color: var(--gc-text-dim); }

      /* Window: the outdoor view sits behind a blind that drops from the top. */
      .view { position: absolute; inset: 0; pointer-events: none; }
      .view svg, .view img { display: block; width: 100%; height: 100%; object-fit: cover; }
      .view.day { background: linear-gradient(to bottom, #7cc0ef, #cfe9fb 75%); }
      .view.night { background: linear-gradient(to bottom, #0d1630, #23305a 80%); }
      .view.photo.night img { filter: brightness(0.6) saturate(0.8); }
      .view .sun { fill: #ffd65a; }
      .view .halo { fill: #fff2b0; opacity: 0.45; }
      .view .cloud { fill: #fff; opacity: 0.92; }
      .view .moon { fill: #f3efd8; }
      .view .moon-cut { fill: #13204a; }
      .view .star { fill: #fff; }
      .view .hill-back { fill: #a3d48c; }
      .view .hill { fill: #6cb257; }
      .view .leaf { fill: #4f9a45; }
      .view .pine { fill: #2f7d4a; }
      .view .trunk { fill: #8a6243; }
      .view .bld-back { fill: #a9bdd6; }
      .view .bld { fill: #7a93b5; }
      .view .win { fill: #ffd56b; }
      .view .water { fill: #3d9bd6; }
      .view .wave { fill: none; stroke: #fff; stroke-width: 1.2; stroke-linecap: round; opacity: 0.55; }
      .view .sail { fill: #fff; }
      .view .hull { fill: #c8553d; }
      .view.night .cloud { fill: #8a96b8; opacity: 0.35; }
      .view.night .hill-back { fill: #22402f; }
      .view.night .hill { fill: #16301f; }
      .view.night .leaf, .view.night .pine { fill: #10261a; }
      .view.night .trunk { fill: #1d1a17; }
      .view.night .bld-back { fill: #26345a; }
      .view.night .bld { fill: #1a2442; }
      .view.night .water { fill: #172a52; }
      .view.night .wave { opacity: 0.25; }
      .view.night .sail { fill: #9aa5c4; }
      .view.night .hull { fill: #5a2a22; }
      /* Mountains, beach, forest, desert, snow, field, pool. */
      .view.day.desert { background: linear-gradient(to bottom, #f6b26b, #fde3b0 75%); }
      .view.day.field { background: linear-gradient(to bottom, #f7a65e, #ffe0a8 70%); }
      .view.day.snow { background: linear-gradient(to bottom, #a9c4dc, #e6eef5 75%); }
      .view.day.beach, .view.day.pool { background: linear-gradient(to bottom, #4fb3f0, #c4ecff 75%); }
      .view.night.desert { background: linear-gradient(to bottom, #1c1640, #4a3060 85%); }
      .view.night.desert .moon-cut { fill: #22184a; }
      .view .peak-back { fill: #8fa6c4; }
      .view .peak { fill: #5f7a9c; }
      .view .snowcap, .view .snow, .view .snowman { fill: #ffffff; }
      .view .snow-back { fill: #dfe8f1; }
      .view .snowman .nose { fill: #f08a1c; }
      .view .flake { fill: #fff; opacity: 0.85; }
      .view .lake { fill: #5aa7d8; }
      .view .sand { fill: #f2d39b; }
      .view .foam { fill: #fff; opacity: 0.7; }
      .view .palm-trunk { fill: #9a6b45; }
      .view .frond { fill: #3f9a4a; }
      .view .dune-back { fill: #f0c27f; }
      .view .dune { fill: #e3a95e; }
      .view .dune-shade { fill: #c98a47; opacity: 0.55; }
      .view .cactus { fill: #4f8f4a; }
      .view .field { fill: #e5b84a; }
      .view .row { fill: none; stroke: #c99a2e; stroke-width: 1.2; opacity: 0.8; }
      .view .fence { fill: #a87a52; }
      .view .hedge { fill: #4f9a45; }
      .view .deck { fill: #e8d6b8; }
      .view .pool { fill: #36c2e3; }
      .view .pool-line { fill: none; stroke: #fff; stroke-width: 1.1; stroke-linecap: round; opacity: 0.7; }
      .view .ladder { fill: none; stroke: #cfd8de; stroke-width: 1.4; stroke-linecap: round; }
      .view .glint, .view .pool-light { fill: #f3efd8; opacity: 0.5; }
      .view .firefly { fill: #f6f08a; }
      .view.night .peak-back { fill: #2b3a5c; }
      .view.night .peak { fill: #1d2944; }
      .view.night .snowcap, .view.night .snow, .view.night .snowman { fill: #c9d4e8; }
      .view.night .snow-back { fill: #9fb0cc; }
      .view.night .lake { fill: #172a52; }
      .view.night .sand { fill: #6b5e4a; }
      .view.night .foam { opacity: 0.25; }
      .view.night .palm-trunk { fill: #2a2018; }
      .view.night .frond, .view.night .cactus, .view.night .hedge { fill: #10261a; }
      .view.night .dune-back { fill: #5a4468; }
      .view.night .dune { fill: #3e2f52; }
      .view.night .dune-shade { fill: #241a36; }
      .view.night .field { fill: #4a3f22; }
      .view.night .row { stroke: #6b5a2c; }
      .view.night .fence { fill: #2a2018; }
      .view.night .deck { fill: #4a4438; }
      .view.night .pool { fill: #1aa6c9; }
      .view.night .pool-light { fill: #8ff0ff; opacity: 0.45; }
      .view.night .ladder { stroke: #8a96a0; }
      @media (prefers-reduced-motion: no-preference) {
        .view .cloud { animation: gc-drift 80s ease-in-out infinite alternate; }
        .view .cloud.c2 { animation-duration: 110s; animation-direction: alternate-reverse; }
        .view .cloud.c3 { animation-duration: 95s; }
        .view .star { animation: gc-twinkle 4s ease-in-out infinite; }
        .view .firefly { animation: gc-twinkle 2.6s ease-in-out infinite; }
      }
      @keyframes gc-drift { from { translate: -14px 0; } to { translate: 14px 0; } }
      @keyframes gc-twinkle { 50% { opacity: 0.3; } }
      .surface.window .fill {
        inset-block: 0 auto;
        border-top: none;
        border-radius: 0;
        border-bottom: 3px solid color-mix(in srgb, var(--gc-text) 22%, var(--gc-surface-solid, var(--gc-surface)));
        background:
          repeating-linear-gradient(to bottom, transparent 0 8px, color-mix(in srgb, var(--gc-text) 10%, transparent) 8px 9px),
          var(--gc-surface-solid, var(--gc-surface));
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
      }
      /* Curtains: two folded drapes under a rod, parting from the centre; a bunched panel stays at each side when open. */
      .cover { --fabric: var(--gc-fabric, var(--gc-surface-solid, var(--gc-surface))); }
      .rod {
        position: absolute;
        inset-inline: 0;
        top: 0;
        height: 4px;
        background: color-mix(in srgb, var(--gc-text) 30%, var(--fabric));
        pointer-events: none;
      }
      .drape {
        position: absolute;
        top: 4px;
        bottom: 0;
        width: calc(7% + 44% * var(--closed));
        /* Sheer like real fabric: the creases are dense, the crests let the view through, and what shows is softened. */
        background: repeating-linear-gradient(
          to right,
          color-mix(in srgb, color-mix(in srgb, var(--fabric), black 16%) 92%, transparent) 0,
          color-mix(in srgb, var(--fabric) 80%, transparent) 25%,
          color-mix(in srgb, color-mix(in srgb, var(--fabric), white 14%) 66%, transparent) 50%,
          color-mix(in srgb, var(--fabric) 80%, transparent) 75%,
          color-mix(in srgb, color-mix(in srgb, var(--fabric), black 16%) 92%, transparent) 100%
        );
        background-size: 25% 100%;
        backdrop-filter: blur(1.5px) saturate(0.85);
        -webkit-backdrop-filter: blur(1.5px) saturate(0.85);
        border-bottom: 3px solid color-mix(in srgb, var(--fabric), black 22%);
        transition: width 0.45s cubic-bezier(0.2, 0.9, 0.25, 1);
        pointer-events: none;
      }
      .drape.dragging { transition: none; }
      .drape.start { inset-inline-start: 0; }
      .drape.end { inset-inline-end: 0; }
      .drape.start:dir(ltr), .drape.end:dir(rtl) { box-shadow: 3px 0 6px rgba(0, 0, 0, 0.22); }
      .drape.end:dir(ltr), .drape.start:dir(rtl) { box-shadow: -3px 0 6px rgba(0, 0, 0, 0.22); }
      /* One drape or a stack of vertical slats on the rail, gathered at one side when open. */
      .drape.single { width: calc(7% + 93% * var(--closed)); }
      .style-vertical .drape {
        background: repeating-linear-gradient(
          to right,
          color-mix(in srgb, var(--fabric), black 14%) 0 1px,
          color-mix(in srgb, var(--fabric), white 8%) 1px 45%,
          var(--fabric) 45% 92%,
          color-mix(in srgb, var(--fabric), black 8%) 92% 100%
        );
        background-size: 14px 100%;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        border-bottom: none;
      }

      /* Shade from the sill: the same panel, anchored at the bottom with its bar on top. */
      .style-bottom_up.window .fill {
        inset-block: auto 0;
        border-bottom: none;
        border-top: 3px solid color-mix(in srgb, var(--gc-text) 22%, var(--gc-surface-solid, var(--gc-surface)));
        box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.18);
      }
      /* Roman shade: soft horizontal folds in the fabric and a heavier hem. */
      .style-roman.window .fill {
        background: repeating-linear-gradient(
          to bottom,
          color-mix(in srgb, var(--fabric), white 10%) 0,
          var(--fabric) 55%,
          color-mix(in srgb, var(--fabric), black 18%) 100%
        );
        background-size: 100% 16px;
        border-bottom: 5px solid color-mix(in srgb, var(--fabric), black 24%);
      }
      /* Venetian: slats over the view; --slat (from the tilt) sets how much of each 8px pitch is slat. */
      .style-venetian.window .fill {
        background: repeating-linear-gradient(
          to bottom,
          color-mix(in srgb, var(--gc-surface-solid, var(--gc-surface)), white 12%) 0,
          var(--gc-surface-solid, var(--gc-surface)) calc(var(--slat, 5px) * 0.6),
          color-mix(in srgb, var(--gc-surface-solid, var(--gc-surface)), black 14%) var(--slat, 5px),
          transparent var(--slat, 5px) 8px
        );
        border-bottom: 3px solid color-mix(in srgb, var(--gc-text) 25%, var(--gc-surface-solid, var(--gc-surface)));
      }
      /* Outdoor roller shutter: opaque aluminium slats under a box that stays at the top. */
      .style-shutter.window .fill {
        --metal: color-mix(in srgb, var(--gc-surface-solid, var(--gc-surface)) 55%, #9aa3ad);
        background: repeating-linear-gradient(
          to bottom,
          color-mix(in srgb, var(--metal), white 22%) 0,
          var(--metal) 45%,
          color-mix(in srgb, var(--metal), black 22%) 85%,
          color-mix(in srgb, var(--metal), black 40%) 100%
        );
        background-size: 100% 7px;
        border-bottom: 3px solid color-mix(in srgb, var(--metal), black 35%);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
      }
      .box {
        position: absolute;
        inset-inline: 0;
        top: 0;
        height: 8px;
        background: linear-gradient(to bottom, color-mix(in srgb, #9aa3ad, white 20%), color-mix(in srgb, #9aa3ad, black 25%));
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        pointer-events: none;
      }

      /* Plain fill (no view): it grows the way the cover opens. From the top for a shade from the sill, */
      .style-bottom_up:not(.window) .fill {
        inset-block: 0 auto;
        border-top: none;
        border-bottom: 1.5px solid color-mix(in srgb, var(--domain) 35%, transparent);
        border-radius: 0 0 6px 6px;
      }
      /* sideways for curtains and vertical blinds: from the middle out, or away from the stacking side. */
      .cover.style-curtain:not(.window) .fill,
      .cover.style-curtain_side:not(.window) .fill,
      .cover.style-vertical:not(.window) .fill {
        inset-block: 0;
        width: var(--fill);
        height: auto;
        border-top: none;
        border-radius: 0;
        transition: width 0.45s cubic-bezier(0.2, 0.9, 0.25, 1);
      }
      .cover.style-curtain:not(.window) .fill { inset-inline: calc((100% - var(--fill)) / 2) auto; }
      .cover.side-start:not(.window):is(.style-curtain_side, .style-vertical) .fill { inset-inline: auto 0; }
      .cover.side-end:not(.window):is(.style-curtain_side, .style-vertical) .fill { inset-inline: 0 auto; }
      /* While the motor runs, each reported step glides at a steady speed into the next. */
      @media (prefers-reduced-motion: no-preference) {
        .surface.moving .fill:not(.dragging),
        .surface.moving .drape:not(.dragging) {
          transition-duration: var(--gc-move, 1s);
          transition-timing-function: linear;
        }
      }

      .window .icon, .window .badge { background: var(--gc-surface-solid, var(--gc-surface)); }
      /* Keeps the name readable over the view, blind or drapes: a frosted chip that hugs the text.
         Its corner is concentric with the card's (card radius minus card padding). */
      .window .text {
        padding: 4px 12px;
        margin-inline-start: -4px;
        border-radius: 12px;
        box-shadow: inset 0 0 0 1px var(--gc-border);
        background: color-mix(in srgb, var(--gc-surface-solid, var(--gc-surface)) 55%, transparent);
        backdrop-filter: blur(10px) saturate(1.2);
        -webkit-backdrop-filter: blur(10px) saturate(1.2);
      }
      .tile.window .text { justify-self: start; max-width: 100%; }
      .pill.window .text, :host([size="slim"]) .tile.window .text { flex: 0 1 auto; min-width: 0; margin-inline-end: auto; }
      :host([size="compact"]) .window .text { padding: 2px 11px; border-radius: 11px; }
      /* Slim keeps tight sides so "40% Open" stays on its line. */
      :host([size="slim"]) .window .text { padding: 0 8px; border-radius: 10px; }
      .icon {
        position: relative;
        display: grid;
        place-items: center;
        width: 44px;
        height: 44px;
        flex: none;
        border-radius: 50%;
        background: var(--gc-surface);
        border: 1px solid var(--gc-border);
        color: var(--gc-text-dim);
        transition: background 0.3s, color 0.3s;
      }
      .on .icon {
        background: color-mix(in srgb, var(--domain) 22%, transparent);
        border-color: color-mix(in srgb, var(--domain) 45%, transparent);
        color: var(--gc-icon-on, var(--domain));
      }
      .text { position: relative; min-width: 0; }
      /* Each line orders its words by its own language ("7 of 12 on" stays readable on a Hebrew dashboard) but keeps the card's alignment. */
      .text > *, .badge { unicode-bidi: plaintext; }
      .text > *:dir(rtl) { text-align: right; }
      .text > *:dir(ltr) { text-align: left; }
      .name {
        font-size: 16px;
        font-weight: 600;
      }
      .on .meta { color: var(--gc-icon-on, var(--domain)); }
      /* A line break in the secondary text starts a new line (tile look). */
      .tile .meta { white-space: pre-line; }
      .badge {
        position: relative;
        padding: 3px 10px;
        border-radius: var(--gc-radius-control);
        border: 1px solid var(--gc-border);
        font-size: 11px;
        text-transform: uppercase;
        white-space: nowrap;
      }
      .on .badge { color: var(--gc-on-accent); background: var(--gc-accent); border-color: transparent; }

      /* Tile: icon top-start, badge top-end, text bottom */
      .tile {
        display: grid;
        grid-template: "icon badge" auto "text text" 1fr / 1fr auto;
        padding: 16px;
        min-height: 120px;
      }
      .tile .icon { grid-area: icon; }
      .tile .badge { grid-area: badge; align-self: start; }
      .tile .text { grid-area: text; align-self: end; min-height: 0; }
      /* Long names wrap to two lines instead of hiding behind an ellipsis. */
      .tile .name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        overflow: hidden;
        line-height: 1.2;
        overflow-wrap: anywhere;
        text-wrap: balance;
      }
      /* Narrow tiles give back a little room so two lines plus the meta line fit in 2 rows. */
      @container (max-width: 260px) {
        .tile { padding: 12px; }
        .tile .icon { width: 38px; height: 38px; }
        .tile .name { font-size: 14px; }
      }

      /* Cover buttons: small round controls at the end, solid so they read over the view. */
      .cover-btns {
        position: relative;
        display: flex;
        gap: 6px;
        cursor: default;
      }
      .cover-btns .round {
        display: grid;
        place-items: center;
        width: 32px;
        height: 32px;
        padding: 0;
        border-radius: 50%;
        border: 1px solid var(--gc-border);
        background: var(--gc-surface-solid, var(--gc-surface));
        color: var(--gc-text);
        --mdc-icon-size: 18px;
        cursor: pointer;
        font: inherit;
        transition: opacity 0.2s, background 0.2s, color 0.2s;
      }
      .cover-btns .round:active:not(:disabled) { transform: scale(0.92); }
      .cover-btns .round:disabled { opacity: 0.4; cursor: default; }
      .cover-btns .round.mirror:dir(rtl) ha-icon { transform: scaleX(-1); }
      .cover-btns .round.live {
        background: color-mix(in srgb, var(--domain) 22%, var(--gc-surface-solid, var(--gc-surface)));
        border-color: color-mix(in srgb, var(--domain) 45%, transparent);
        color: var(--domain);
      }
      /* They take the badge's place (the meta line still says "40% Open"), so the name keeps the full width. */
      .tile .cover-btns { grid-area: badge; align-self: start; }
      .pill .cover-btns { flex: none; }
      .pill.has-btns { padding-inline-end: 6px; }
      /* Short of room, stop only shows while the cover moves. */
      @container (max-width: 260px) {
        :host([size="slim"]) .cover-btns .stop:disabled, .pill .cover-btns .stop:disabled { display: none; }
      }

      /* Pill: one row */
      .pill {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 6px;
        padding-inline-end: 14px;
        min-height: 56px;
        border-radius: var(--gc-radius-control);
      }
      .pill .text { flex: 1; }
      .pill .name { font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

      /* Compact: same layouts, tighter */
      :host([size="compact"]) .icon { width: 38px; height: 38px; --mdc-icon-size: 20px; }
      :host([size="compact"]) .badge { padding: 2px 8px; }
      :host([size="compact"]) .tile { padding: 12px; min-height: 96px; }
      :host([size="compact"]) .tile .name { font-size: 15px; }
      :host([size="compact"]) .pill { padding: 5px; padding-inline-end: 12px; gap: 10px; min-height: 48px; }
      :host([size="compact"]) .pill .name { font-size: 14.5px; }
      :host([size="compact"]) .cover-btns .round, :host([size="slim"]) .cover-btns .round { width: 28px; height: 28px; --mdc-icon-size: 16px; }
      :host([size="compact"]) .cover-btns, :host([size="slim"]) .cover-btns { gap: 4px; }

      /* Slim: the tile becomes one row (icon beside the name); the pill puts name and meta on one line */
      :host([size="slim"]) .badge { padding: 2px 7px; }
      :host([size="slim"]) .tile {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px;
        padding-inline-end: 12px;
        min-height: 56px;
      }
      :host([size="slim"]) .tile .icon { width: 36px; height: 36px; --mdc-icon-size: 19px; }
      :host([size="slim"]) .tile .text { flex: 1; align-self: center; }
      :host([size="slim"]) .tile .badge { align-self: center; }
      :host([size="slim"]) .tile .cover-btns { align-self: center; }
      :host([size="slim"]) .tile.has-btns, :host([size="slim"]) .pill.has-btns { padding-inline-end: 8px; }
      :host([size="slim"]) .tile .name { font-size: 14px; -webkit-line-clamp: 1; line-clamp: 1; }
      :host([size="slim"]) .tile .meta { font-size: 11.5px; }
      :host([size="slim"]) .pill { padding: 4px; padding-inline-end: 12px; gap: 8px; min-height: 40px; }
      :host([size="slim"]) .pill .icon { width: 32px; height: 32px; --mdc-icon-size: 18px; }
      :host([size="slim"]) .pill .text { display: flex; align-items: baseline; gap: 8px; }
      :host([size="slim"]) .pill .name { font-size: 14px; flex: 0 1 auto; min-width: 0; }
      :host([size="slim"]) .pill .meta { flex: none; font-size: 11px; }
    `];
	}
};
customElements.define("glide-button", Nn);
//#endregion
//#region src/cards/sheet.ts
var Pn = 120, Fn = .6, In = [
	"hass-more-info",
	"show-dialog",
	"hass-notification",
	"hass-action",
	"ll-custom"
], Ln = CSS.supports?.("animation-timing-function", "linear(0, 1)"), Rn = (e, t) => Ln ? Nt(e, t) : {
	easing: "cubic-bezier(.2,.9,.25,1)",
	duration: 420
}, zn = 0, Bn = (e) => {
	zn = Math.max(0, zn + (e ? 1 : -1)), document.documentElement.style.overflow = zn ? "hidden" : "";
}, Vn = class extends G {
	static {
		this.properties = {
			...G.properties,
			open: {
				type: Boolean,
				reflect: !0
			}
		};
	}
	constructor() {
		super(), this.cardType = "popup", this.open = !1, this.children_ = [], this.built = !1, this.locked = !1, this.scrimPress = !1, this.forward = (e) => {
			let t = document.querySelector("home-assistant");
			if (!t || e.__glideForwarded) return;
			e.stopPropagation();
			let n = new CustomEvent(e.type, {
				detail: e.detail,
				bubbles: !0,
				composed: !0
			});
			n.__glideForwarded = !0, t.dispatchEvent(n);
		};
		for (let e of In) this.addEventListener(e, this.forward);
		this.addEventListener("keydown", (e) => e.key === "Escape" && this.requestClose());
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.lock(!1);
	}
	lock(e) {
		this.locked === e || e && !this.isConnected || (this.locked = e, Bn(e));
	}
	setHass(e) {
		this.hass = e;
		for (let t of this.children_) t.hass = e;
	}
	async build() {
		if (this.built) return;
		this.built = !0;
		let e = await window.loadCardHelpers?.();
		e && (this.children_ = (this.config.cards ?? []).map((t) => {
			let n = this.config, r = t.type === "custom:glide-card" ? {
				...t,
				theme: t.theme ?? n.theme,
				tap_animation: t.tap_animation ?? n.tap_animation,
				size: t.size ?? n.size
			} : t, i = e.createCardElement(r);
			this.hass && (i.hass = this.hass);
			let a = i.getGridOptions?.() ?? {};
			return i.style.setProperty("--cols", String(typeof a.columns == "number" ? a.columns : 12)), typeof a.rows == "number" && i.style.setProperty("--rows", String(a.rows)), i;
		}), this.requestUpdate());
	}
	requestClose() {
		this.open && (R("light"), history.state?.glidePopup ? history.back() : (history.replaceState(history.state, "", location.pathname + location.search), window.dispatchEvent(new CustomEvent("glide-hash"))));
	}
	updated(e) {
		super.updated(e), e.has("open") && (e.get("open") !== void 0 || this.open) && (this.open ? (this.build(), this.lock(!0), this.animateOpen()) : (this.lock(!1), this.animateClose()));
	}
	get panel() {
		return this.renderRoot.querySelector(".panel");
	}
	get scrim() {
		return this.renderRoot.querySelector(".scrim");
	}
	animateOpen() {
		this.scrimPress = !1, this.style.display = "", this.style.visibility = "visible";
		let e = this.panel;
		if (e.getAnimations().forEach((e) => e.cancel()), e.style.transform = "", e.focus({ preventScroll: !0 }), this.scrim.animate([{ opacity: 0 }, { opacity: 1 }], {
			duration: 250,
			fill: "backwards"
		}), V()) return;
		let { easing: t, duration: n } = Rn();
		e.animate([{ transform: "translateY(100%)" }, { transform: "none" }], {
			duration: n,
			easing: t,
			fill: "backwards"
		});
	}
	animateClose() {
		let e = this.panel, t = e.style.transform || "none", n = V() ? 0 : 260;
		this.scrim.animate([{ opacity: getComputedStyle(this.scrim).opacity }, { opacity: 0 }], {
			duration: n,
			fill: "forwards"
		}), e.animate([{ transform: t }, { transform: "translateY(100%)" }], {
			duration: n,
			easing: "cubic-bezier(.4,0,.8,.4)",
			fill: "forwards"
		}).finished.then(() => {
			this.open || (this.style.visibility = "hidden", this.style.display = "none", e.style.transform = "", e.getAnimations().forEach((e) => e.cancel()), this.scrim.getAnimations().forEach((e) => e.cancel()));
		}).catch(() => {});
	}
	onDragStart(e) {
		if (e.button !== 0 || e.target.closest("button")) return;
		let t = this.panel, n = e.currentTarget, r = e.clientY, i = {
			y: r,
			t: e.timeStamp
		}, a = 0, o = 0;
		n.setPointerCapture(e.pointerId), t.getAnimations().forEach((e) => e.cancel());
		let s = (e) => {
			o = e.clientY - r;
			let n = e.timeStamp - i.t;
			n > 0 && (a = (e.clientY - i.y) / n), i = {
				y: e.clientY,
				t: e.timeStamp
			};
			let s = o > 0 ? o : o * .2;
			t.style.transform = `translateY(${s}px)`, this.scrim.style.opacity = String(1 - Math.max(0, o) / t.offsetHeight);
		}, c = () => {
			if (n.removeEventListener("pointermove", s), n.removeEventListener("pointerup", c), n.removeEventListener("pointercancel", c), this.scrim.style.opacity = "", o > Pn || a > Fn) return this.requestClose();
			let { easing: e, duration: r } = Rn(260, 24), i = t.style.transform;
			t.style.transform = "", t.animate([{ transform: i }, { transform: "none" }], {
				duration: r,
				easing: e
			});
		};
		n.addEventListener("pointermove", s), n.addEventListener("pointerup", c), n.addEventListener("pointercancel", c);
	}
	render() {
		if (!this.config) return j;
		let e = this.config, t = this.stateOf(e.entity);
		return O`
      <div
        class="scrim"
        @pointerdown=${() => this.scrimPress = !0}
        @click=${() => {
			this.scrimPress && this.requestClose(), this.scrimPress = !1;
		}}
      ></div>
      <div class="panel surface" role="dialog" aria-modal="true" aria-label=${e.title ?? ""} tabindex="-1">
        <div class="handle" @pointerdown=${(e) => this.onDragStart(e)}>
          <div class="grabber"></div>
          <header>
            ${e.icon || t ? O`<div class="icon"><ha-icon .icon=${e.icon ?? mt(t)}></ha-icon></div>` : j}
            <div class="titles">
              <div class="title">${e.title ?? ""}</div>
              ${t && this.hass ? O`<div class="meta">${_n(this.hass, e.entity)}</div>` : j}
            </div>
            <button class="close" aria-label=${J(this.hass, "close")} @click=${() => this.requestClose()}>
              <ha-icon icon="mdi:close" .icon=${"mdi:close"}></ha-icon>
            </button>
          </header>
        </div>
        <div class="content">${this.children_}</div>
      </div>
    `;
	}
	static {
		this.styles = [W, x`
      :host {
        position: fixed;
        inset: 0;
        z-index: 7;
        visibility: hidden;
        pointer-events: none;
      }
      :host([open]) { pointer-events: auto; }
      :host([lite]) .scrim { backdrop-filter: none; -webkit-backdrop-filter: none; }
      .scrim {
        position: absolute;
        inset: 0;
        background: var(--gc-scrim);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
      }
      .panel {
        position: absolute;
        inset-inline: 0;
        bottom: 0;
        max-height: 92dvh;
        display: flex;
        flex-direction: column;
        background: var(--gc-sheet-bg);
        border-radius: var(--gc-radius) var(--gc-radius) 0 0;
        border-bottom: 0;
        transform-origin: 50% 50%;
        outline: none;
        will-change: transform;
      }
      .handle { touch-action: none; cursor: grab; flex: none; }
      .grabber {
        width: 40px;
        height: 5px;
        margin: 8px auto 2px;
        border-radius: 3px;
        background: var(--gc-text-dim);
        opacity: 0.5;
      }
      header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 16px 12px;
      }
      .icon {
        display: grid;
        place-items: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: color-mix(in srgb, var(--gc-accent) 20%, transparent);
        color: var(--gc-accent-text);
      }
      .titles { flex: 1; min-width: 0; }
      .title { font-size: 22px; font-weight: 700; }
      .close {
        all: unset;
        display: grid;
        place-items: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--gc-surface);
        border: 1px solid var(--gc-border);
        color: var(--gc-text);
        cursor: pointer;
      }
      .close:focus-visible { outline: 2px solid var(--gc-accent); }
      :host([size="compact"]) header { gap: 10px; padding: 6px 16px 10px; }
      :host([size="compact"]) .icon { width: 36px; height: 36px; --mdc-icon-size: 20px; }
      :host([size="compact"]) .title { font-size: 19px; }
      :host([size="compact"]) .close { width: 32px; height: 32px; --mdc-icon-size: 20px; }
      :host([size="slim"]) header { gap: 8px; padding: 4px 14px 8px; }
      :host([size="slim"]) .icon { width: 32px; height: 32px; --mdc-icon-size: 18px; }
      :host([size="slim"]) .title { font-size: 17px; }
      :host([size="slim"]) .close { width: 30px; height: 30px; --mdc-icon-size: 18px; }
      .content {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        grid-auto-rows: minmax(56px, auto);
        gap: var(--gc-gap);
        padding: 4px 16px calc(20px + env(safe-area-inset-bottom));
        overflow-y: auto;
        overscroll-behavior: contain;
      }
      .content > * { grid-column: span var(--cols, 12); grid-row: span var(--rows, 1); min-width: 0; }
      @media (min-width: 768px) {
        /* Still a bottom sheet, centred at a readable width. */
        .panel {
          inset: auto auto 0 50%;
          width: min(600px, 92vw);
          max-height: 85dvh;
          translate: -50% 0;
        }
      }
    `];
	}
};
customElements.define("glide-sheet", Vn);
var Y = /* @__PURE__ */ new Map(), Hn, Un = (e) => e.startsWith("#") ? e : `#${e}`, Wn = () => document.querySelector("home-assistant")?.shadowRoot ?? document.body;
function Gn(e, t) {
	let n = Un(e.hash), r = Y.get(n);
	if (!r) {
		let e = document.createElement("glide-sheet");
		Wn().appendChild(e), Y.set(n, r = {
			el: e,
			owners: /* @__PURE__ */ new Set()
		});
	}
	r.owners.add(t), r.el.setConfig(e), Hn && r.el.setHass(Hn), Jn();
}
function Kn(e, t) {
	let n = Y.get(Un(e));
	n && n.owners.delete(t) && !n.owners.size && (n.el.remove(), Y.delete(Un(e)));
}
function qn(e) {
	Hn = e, Y.forEach(({ el: t }) => t.setHass(e));
}
function Jn() {
	let e = decodeURIComponent(location.hash);
	Y.forEach(({ el: t }, n) => t.open = n === e);
}
for (let e of [
	"popstate",
	"hashchange",
	"glide-hash",
	"location-changed"
]) window.addEventListener(e, Jn);
//#endregion
//#region src/cards/popup.ts
var Yn = class extends G {
	constructor(...e) {
		super(...e), this.cardType = "popup";
	}
	setConfig(e) {
		if (!e.hash) throw Error("Pop-up needs a `hash`, e.g. #living-room");
		if (!Array.isArray(e.cards)) throw Error("Pop-up needs a `cards` list");
		super.setConfig(e), this.isConnected && Gn(e, this);
	}
	shouldUpdate(e) {
		return e.has("hass") && this.hass && qn(this.hass), e.has("editMode") || e.has("config") || super.shouldUpdate(e);
	}
	connectedCallback() {
		super.connectedCallback(), this.config && Gn(this.config, this);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		let e = this.config?.hash;
		setTimeout(() => !this.isConnected && e && Kn(e, this), 1e3);
	}
	updated(e) {
		if (super.updated(e), e.has("editMode")) {
			let e = this.parentElement;
			e && (e.style.display = this.editMode ? "block" : "none"), L(this, "card-visibility-changed", { value: this.editMode });
		}
	}
	getGridOptions() {
		return {
			columns: 12,
			rows: 1
		};
	}
	getCardSize() {
		return +!!this.editMode;
	}
	render() {
		if (!this.editMode) return O``;
		let e = this.config;
		return O`
      <div class="surface">
        <ha-icon .icon=${e.icon ?? "mdi:card-outline"}></ha-icon>
        <div class="text">
          <div class="name">${e.title ?? J(this.hass, "popup_placeholder")}</div>
          <div class="meta">${e.hash} · ${e.cards.length} cards</div>
        </div>
        <button @click=${() => jt(e.hash)}>Preview</button>
      </div>
    `;
	}
	static {
		this.styles = [W, x`
      .surface {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 16px;
        border-style: dashed;
        min-height: 56px;
      }
      .text { flex: 1; }
      .name { font-weight: 600; }
      button {
        font: inherit;
        padding: 6px 14px;
        border-radius: var(--gc-radius-control);
        border: 0;
        background: var(--gc-accent);
        color: var(--gc-on-accent);
        cursor: pointer;
      }
    `];
	}
};
customElements.define("glide-popup", Yn);
//#endregion
//#region src/cards/nav.ts
var Xn = [
	"popstate",
	"location-changed",
	"glide-hash"
], Zn = () => location.pathname + location.hash, Qn = CSS.supports?.("animation-timing-function", "linear(0, 1)") ? Nt(260, 26) : {
	easing: "cubic-bezier(.3,1.3,.4,1)",
	duration: 450
}, $n, er = 1e3, tr = 450, nr = (e) => 1 - (1 - e) ** 3, rr = 12, ir = (e) => !!e && e.width > 0 && e.height > 0, ar = 8, or = CSS.supports?.("animation-timing-function", "linear(0, 1)") ? Nt(320, 28) : {
	easing: "cubic-bezier(.2,.9,.25,1.1)",
	duration: 320
}, sr = (e) => e.startsWith("#") ? decodeURIComponent(location.hash) === e : !location.hash && (location.pathname === e || location.pathname === e.replace(/\/$/, "")), cr = class extends G {
	constructor(...e) {
		super(...e), this.cardType = "nav", this.onRoute = () => {
			this.closeMenu(), this.requestUpdate();
		}, this.stale = !1, this.touched = !1, this.menuShift = {
			y: 0,
			x: 0
		}, this.closeMenu = () => {
			this.menuFor && (this.menuFor = this.menuAnchor = void 0, window.removeEventListener("pointerdown", this.onOutside, !0), window.removeEventListener("keydown", this.onKey), window.removeEventListener("resize", this.closeMenu), this.requestUpdate());
		}, this.onOutside = (e) => {
			let t = e.composedPath(), n = this.renderRoot.querySelector(".menu");
			n && t.includes(n) || this.menuAnchor && t.includes(this.menuAnchor) || this.closeMenu();
		}, this.onKey = (e) => {
			if (e.key !== "Escape") return;
			let t = this.menuAnchor;
			this.closeMenu(), t?.focus();
		}, this.on = (e) => !!e && ft(this.stateOf(e));
	}
	setConfig(e) {
		if (!Array.isArray(e.items) || !e.items.length) throw Error("Nav needs an `items` list");
		for (let t of e.items) if (t.items ? !Array.isArray(t.items) || !t.items.length : !t.navigation_path) throw Error(`Nav item "${t.name}" needs a \`navigation_path\` or an \`items\` list`);
		super.setConfig(e);
	}
	watched() {
		return this.config.items.flatMap((e) => [e.entity, ...(e.items ?? []).map((e) => e.entity)]);
	}
	openMenu(e, t, n) {
		this.menuFor = e, this.menuAnchor = t, window.addEventListener("pointerdown", this.onOutside, !0), window.addEventListener("keydown", this.onKey), window.addEventListener("resize", this.closeMenu), this.menuShift = {
			y: 0,
			x: 0
		}, this.requestUpdate(), this.updateComplete.then(async () => {
			let e = this.renderRoot.querySelector(".menu");
			if (!e) return;
			let t = this.menuTarget(), r = e.getBoundingClientRect();
			if (t) {
				let n = t.right === void 0 ? t.left - r.left : r.right - t.right, i = r.bottom - t.bottom;
				if ((Math.abs(n) > .5 || Math.abs(i) > .5) && (this.menuShift = {
					x: n,
					y: i
				}, this.requestUpdate(), await this.updateComplete, e = this.renderRoot.querySelector(".menu"), !e)) return;
			}
			n && e.querySelector("button")?.focus(), !V() && e.animate([{
				opacity: 0,
				transform: `translateY(${ar}px) scale(.92)`
			}, {
				opacity: 1,
				transform: "none"
			}], or);
		});
	}
	menuTarget() {
		let e = this.menuAnchor?.getBoundingClientRect();
		if (!e) return;
		let t = this.renderRoot.querySelector("nav")?.getBoundingClientRect(), n = t && t.width ? t.left + t.width / 2 : innerWidth / 2, r = Math.min(innerHeight - ar, e.top - ar);
		return e.left + e.width / 2 > n ? {
			bottom: r,
			right: Math.min(innerWidth - ar, e.right)
		} : {
			bottom: r,
			left: Math.max(ar, e.left)
		};
	}
	menuPosition() {
		let e = this.menuTarget();
		if (!e) return "";
		let { x: t, y: n } = this.menuShift, r = `bottom: ${innerHeight - e.bottom + n}px;`;
		return e.right === void 0 ? `${r} left: ${e.left + t}px; transform-origin: bottom left;` : `${r} right: ${innerWidth - e.right + t}px; transform-origin: bottom right;`;
	}
	connectedCallback() {
		super.connectedCallback(), this.observe(), Xn.forEach((e) => window.addEventListener(e, this.onRoute)), this.rendered !== void 0 && this.rendered !== Zn() && (this.stale = !0, this.requestUpdate());
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.closeMenu(), this.resizer?.disconnect();
		let e = this.scroller();
		e && this.stopGlide(e), Xn.forEach((e) => window.removeEventListener(e, this.onRoute));
	}
	getGridOptions() {
		return {
			columns: 12,
			rows: 1
		};
	}
	getCardSize() {
		return 1;
	}
	isCurrent(e) {
		return e.items ? !this.config.items.some((e) => !e.items && sr(e.navigation_path)) && e.items.some((e) => sr(e.navigation_path)) : sr(e.navigation_path);
	}
	indRect() {
		return this.renderRoot.querySelector(".ind")?.getBoundingClientRect();
	}
	scroller() {
		return this.renderRoot.querySelector(".scroller") ?? void 0;
	}
	markOverflow(e) {
		let t = e.classList.contains("overflow") ? 24 : 0;
		e.classList.toggle("overflow", e.scrollWidth - t > e.clientWidth + 1);
	}
	inView(e) {
		let t = e.querySelector("button.active");
		if (!t || !e.classList.contains("overflow")) return !0;
		let n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
		return r.left >= n.left + rr - 2 && r.right <= n.right - rr + 2;
	}
	reveal(e) {
		let t = this.scroller();
		if (!t || t.clientWidth <= 0) return;
		this.markOverflow(t), this.pending && (this.pending.scroll !== void 0 && (t.scrollLeft = this.pending.scroll), this.slide(this.pending.rect), this.pending = void 0, e = !0), e &&= !V(), this.centred = Zn(), this.touched = !1, this.stopGlide(t);
		let n = t.querySelector("button.active");
		if (!n) return;
		let r = t.getBoundingClientRect(), i = n.getBoundingClientRect(), a = t.scrollLeft;
		t.scrollLeft = a + i.left + i.width / 2 - (r.left + r.width / 2);
		let o = t.scrollLeft;
		if (!e || Math.abs(o - a) < 1) return;
		t.scrollLeft = a, t.style.scrollSnapType = "none";
		let s = performance.now(), c = (e) => {
			if (this.touched) return this.stopGlide(t);
			let n = Math.min(1, (e - s) / tr);
			t.scrollLeft = a + (o - a) * nr(n), n < 1 ? this.glide = requestAnimationFrame(c) : (this.stopGlide(t), this.recheck());
		};
		this.glide = requestAnimationFrame(c);
	}
	stopGlide(e) {
		this.glide !== void 0 && cancelAnimationFrame(this.glide), this.glide = void 0, e.style.scrollSnapType = "";
	}
	recheck() {
		let e = this.scroller();
		e && (this.markOverflow(e), this.centred === Zn() ? !this.touched && (this.glide !== void 0 || !this.inView(e)) && this.reveal(!0) : this.reveal(!1));
	}
	slide(e) {
		let t = this.renderRoot.querySelector(".ind"), n = t?.getBoundingClientRect();
		t && ir(e) && ir(n) && !V() && (Math.abs(e.left - n.left) + Math.abs(e.width - n.width) <= 1 || t.animate([{
			transform: `translateX(${e.left - n.left}px)`,
			width: `${e.width}px`
		}, {
			transform: "none",
			width: "100%"
		}], Qn));
	}
	observe() {
		let e = this.scroller();
		e && this.resizer && (this.resizer.observe(e), e.querySelectorAll("button").forEach((e) => this.resizer.observe(e)));
	}
	firstUpdated() {
		let e = this.scroller();
		if (!e) return;
		let t = () => this.touched = !0;
		for (let n of [
			"touchstart",
			"pointerdown",
			"wheel"
		]) e.addEventListener(n, t, { passive: !0 });
		typeof ResizeObserver < "u" && (this.resizer = new ResizeObserver(() => this.recheck()), this.observe());
	}
	willUpdate(e) {
		super.willUpdate(e), this.from = this.stale ? void 0 : this.indRect();
	}
	updated() {
		let e = Zn(), t = this.rendered === void 0, n = !t && this.rendered !== e;
		this.rendered = e, this.stale = !1;
		let r = this.scroller();
		if (!r) return;
		this.markOverflow(r);
		let i = $n && performance.now() - $n.at < er ? $n : void 0, a = n ? this.from : void 0, o = !a && (n || t) ? i : void 0, s = a ?? o?.rect;
		if (n || t) {
			let e = r.clientWidth > 0;
			this.pending = e || !s && !o ? void 0 : {
				scroll: o?.scroll,
				rect: s
			}, e && (o && (r.scrollLeft = o.scroll), this.slide(s));
		}
		this.observe(), this.centred !== e && this.reveal(!!this.centred || !!o);
	}
	go(e) {
		let t = this.indRect(), n = this.scroller()?.scrollLeft ?? 0;
		$n = ir(t) ? {
			rect: t,
			scroll: n,
			at: performance.now()
		} : void 0, Mt(e);
	}
	tapFx(e) {
		R("selection");
		let t = e.currentTarget;
		this.playTapFx(t, e instanceof MouseEvent && e.detail ? {
			x: e.clientX,
			y: e.clientY
		} : void 0, { icon: t.querySelector("ha-icon") });
	}
	item(e) {
		let t = this.isCurrent(e), n = this.menuFor === e;
		return O`
      <button
        class="${t ? "active" : ""} ${n ? "open" : ""}"
        aria-current=${t ? "page" : "false"}
        aria-haspopup=${e.items ? "menu" : j}
        aria-expanded=${e.items ? String(n) : j}
        @click=${(t) => {
			this.tapFx(t);
			let r = t.currentTarget;
			if (!e.items) return this.go(e.navigation_path);
			n ? this.closeMenu() : this.openMenu(e, r, t instanceof MouseEvent && !t.detail);
		}}
      >
        ${t ? O`<span class="ind"></span>` : j}
        <ha-icon .icon=${e.icon}></ha-icon>
        <span class="meta">${e.name}</span>
        ${this.on(e.entity) || e.items?.some((e) => this.on(e.entity)) ? O`<i class="dot"></i>` : j}
      </button>
    `;
	}
	menuItem(e) {
		let t = sr(e.navigation_path);
		return O`
      <button
        role="menuitem"
        class=${t ? "active" : ""}
        aria-current=${t ? "page" : "false"}
        @click=${(n) => {
			this.tapFx(n), this.closeMenu(), t || this.go(e.navigation_path);
		}}
      >
        <ha-icon .icon=${e.icon}></ha-icon>
        <span class="label">${e.name}</span>
        ${this.on(e.entity) ? O`<i class="dot"></i>` : j}
      </button>
    `;
	}
	render() {
		let e = this.config.items.filter((e) => e.pinned);
		return O`
      <nav class="surface ${this.editMode ? "inline" : "floating"}">
        <div class="scroller">${this.config.items.filter((e) => !e.pinned).map((e) => this.item(e))}</div>
        ${e.length ? O`<div class="pinned">${e.map((e) => this.item(e))}</div>` : j}
      </nav>
      ${this.menuFor?.items ? O`<div class="menu surface" role="menu" aria-label=${this.menuFor.name} style=${this.menuPosition()}>
            ${this.menuFor.items.map((e) => this.menuItem(e))}
          </div>` : j}
    `;
	}
	static {
		this.styles = [W, x`
      nav {
        display: flex;
        padding: 4px;
        border-radius: var(--gc-radius-control);
        background: var(--gc-sheet-bg);
      }
      nav.floating {
        position: fixed;
        z-index: 5;
        inset-inline: 0;
        bottom: calc(14px + env(safe-area-inset-bottom));
        margin: 0 auto;
        width: max-content;
        max-width: calc(100vw - 24px);
      }
      .scroller {
        display: flex;
        gap: 4px;
        min-width: 0;
        overflow-x: auto;
        scroll-snap-type: x proximity;
        scrollbar-width: none;
        overscroll-behavior-x: contain;
      }
      .scroller::-webkit-scrollbar { display: none; }
      .scroller.overflow {
        padding-inline: ${rr}px;
        mask-image: linear-gradient(to right, transparent, #000 18px, #000 calc(100% - 18px), transparent);
      }
      .pinned {
        display: flex;
        gap: 4px;
        flex: none;
        margin-inline-start: 4px;
        padding-inline-start: 4px;
        border-inline-start: 1px solid var(--gc-border);
      }
      /* Physical left so the FLIP translateX maps 1:1 in both directions */
      .ind {
        position: absolute;
        z-index: -1;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        border-radius: var(--gc-radius-control);
        background: color-mix(in srgb, var(--gc-accent) 22%, transparent);
        border: 1px solid color-mix(in srgb, var(--gc-accent) 45%, transparent);
        pointer-events: none;
      }
      button {
        all: unset;
        position: relative;
        isolation: isolate;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: none;
        scroll-snap-align: center;
        min-width: 64px;
        padding: 4px 14px;
        border-radius: var(--gc-radius-control);
        color: var(--gc-text-dim);
        cursor: pointer;
        transition: color 0.2s;
      }
      @media (max-width: 600px) {
        button { min-width: 52px; padding: 4px 6px; }
      }
      button:focus-visible { outline: 2px solid var(--gc-accent); }
      button.active { color: var(--gc-accent-text); }
      button ha-icon { --mdc-icon-size: 20px; }
      button .meta { font-size: 10px; line-height: 1.25; color: inherit; }
      .dot {
        position: absolute;
        top: 3px;
        inset-inline-end: 14px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--gc-accent);
      }
      /* Slim: icons only; the active item shows its name beside the icon. Compact is the same as full. */
      :host([size="slim"]) nav button { flex-direction: row; gap: 6px; min-width: 40px; padding: 7px 9px; }
      :host([size="slim"]) nav button:not(.active) .meta { display: none; }
      :host([size="slim"]) nav button.active { padding-inline: 12px 14px; }
      :host([size="slim"]) nav button .meta { font-size: 12px; }
      :host([size="slim"]) nav .dot { top: 4px; inset-inline-end: 6px; }
      button.open:not(.active) { color: var(--gc-text); }

      /* The menu is the bar's sibling: inside it, the bar's clipping and backdrop would cut it off. */
      .menu {
        position: fixed;
        z-index: 6;
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 180px;
        max-width: calc(100vw - ${16}px);
        max-height: 60vh;
        overflow-y: auto;
        padding: 4px;
        border-radius: var(--gc-radius);
        background: var(--gc-sheet-bg);
      }
      .menu button {
        flex-direction: row;
        gap: 12px;
        min-width: 0;
        padding: 10px 14px;
        border-radius: max(6px, calc(var(--gc-radius) - 4px));
        color: var(--gc-text);
        scroll-snap-align: none;
        transition: background 0.15s;
      }
      .menu button:hover { background: color-mix(in srgb, var(--gc-text) 7%, transparent); }
      .menu button.active {
        color: var(--gc-accent-text);
        background: color-mix(in srgb, var(--gc-accent) 22%, transparent);
      }
      .menu button ha-icon { flex: none; color: var(--gc-text-dim); }
      .menu button.active ha-icon { color: inherit; }
      .menu .label { flex: 1; font-size: 14px; line-height: 1.3; }
      .menu .dot { position: static; flex: none; }
    `];
	}
};
customElements.define("glide-nav", cr);
//#endregion
//#region src/cards/climate.ts
var lr = {
	heat: "mdi:fire",
	cool: "mdi:snowflake",
	heat_cool: "mdi:alpha-a-circle-outline",
	auto: "mdi:alpha-a-circle-outline",
	dry: "mdi:water-percent",
	fan_only: "mdi:fan",
	off: "mdi:power"
}, X = 270, Z = 135, ur = 80, dr = 700, fr = (e) => `\u2066${e}°\u2069`, pr = (e) => {
	let t = e * Math.PI / 180;
	return [100 + ur * Math.cos(t), 100 + ur * Math.sin(t)];
}, mr = (e, t) => {
	let [n, r] = pr(e), [i, a] = pr(t);
	return `M ${n} ${r} A ${ur} ${ur} 0 ${+(t - e > 180)} 1 ${i} ${a}`;
}, hr = class extends G {
	constructor(...e) {
		super(...e), this.cardType = "climate", this.timer = 0;
	}
	static {
		this.properties = {
			...G.properties,
			pending: { state: !0 }
		};
	}
	setConfig(e) {
		if (!e.entity?.startsWith("climate.")) throw Error("Climate card needs a climate.* entity");
		super.setConfig(e);
	}
	get rows() {
		return {
			full: 8,
			compact: 7,
			slim: 5
		}[this.size];
	}
	getGridOptions() {
		return {
			columns: 12,
			rows: this.rows,
			min_columns: 6
		};
	}
	getCardSize() {
		return this.rows;
	}
	get s() {
		return this.stateOf(this.config.entity);
	}
	get range() {
		let e = this.s?.attributes ?? {};
		return {
			min: e.min_temp ?? 7,
			max: e.max_temp ?? 35,
			step: e.target_temp_step ?? .5
		};
	}
	willUpdate(e) {
		super.willUpdate(e), this.pending !== void 0 && !this.timer && this.s?.attributes.temperature === this.pending && (this.pending = void 0);
	}
	get off() {
		return this.s?.state === "off";
	}
	setTarget(e) {
		if (this.off) return;
		let { min: t, max: n, step: r } = this.range, i = Math.min(n, Math.max(t, Math.round(e / r) * r));
		i !== this.target && (this.pending = i, R("selection"), clearTimeout(this.timer), this.timer = window.setTimeout(() => {
			this.timer = 0, this.hass?.callService("climate", "set_temperature", {
				entity_id: this.config.entity,
				temperature: this.pending
			});
		}, dr));
	}
	get target() {
		return this.pending ?? this.s?.attributes.temperature;
	}
	onDial(e) {
		let t = e.currentTarget;
		if (this.target === void 0 || this.off) return;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect(), r = (Math.atan2(e.clientY - (n.top + n.height / 2), e.clientX - (n.left + n.width / 2)) * 180 / Math.PI - Z + 720) % 360;
			r > X && (r = r - X < 45 ? X : 0);
			let { min: i, max: a } = this.range;
			this.setTarget(i + r / X * (a - i));
		};
		n(e);
		let r = () => {
			t.removeEventListener("pointermove", n), t.removeEventListener("pointerup", r), t.removeEventListener("pointercancel", r);
		};
		t.addEventListener("pointermove", n), t.addEventListener("pointerup", r), t.addEventListener("pointercancel", r);
	}
	modeColor(e) {
		return e === "cool" ? "var(--gc-cool)" : e === "heat" ? "var(--gc-heat)" : e === "off" ? "var(--gc-text-dim)" : "var(--gc-accent)";
	}
	render() {
		let e = this.s;
		if (!e) return O`<div class="surface empty">${this.config.entity}</div>`;
		let t = e.attributes, { min: n, max: r, step: i } = this.range, a = this.target, o = e.state === "off", s = this.modeColor(e.state), c = Z + (a === void 0 ? 0 : (a - n) / (r - n)) * X, [l, u] = pr(Z), [d, f] = pr(c), p = Number(t.current_temperature), m = t.current_temperature != null && Number.isFinite(p), [h, g] = pr(Z + Math.min(1, Math.max(0, (p - n) / (r - n))) * X), _ = t.hvac_action, v = +(i < 1), y = a === void 0 ? "" : fr(a.toFixed(v)), b = (e) => /[-־]$/.test(e) ? e : `${e} `, ee = o || _ === "off" ? J(this.hass, "off") : _ === "heating" ? b(J(this.hass, "heating")) + y : _ === "cooling" ? b(J(this.hass, "cooling")) + y : [J(this.hass, _ === "idle" ? "idle" : e.state) ?? e.state, y].filter(Boolean).join(" · "), te = !o && [
			"heating",
			"cooling",
			"drying",
			"fan"
		].includes(_ ?? "");
		return O`
      <div class="surface ${o ? "off" : ""}" style="--mode:${s}">
        <header>
          <div class="icon"><ha-icon .icon=${lr[e.state] ?? "mdi:thermostat"}></ha-icon></div>
          <div class="titles">
            <div class="name">${ht(e, this.config.name)}</div>
            <div class="meta mode-text">${ee}</div>
          </div>
          ${te ? O`<div class="chip meta"><i></i>${J(this.hass, "active")}</div>` : j}
        </header>

        <div class="dial">
          <div class="ring">
            <svg class=${o ? "off" : ""} viewBox="0 0 200 200" @pointerdown=${(e) => this.onDial(e)} role="slider"
              aria-valuemin=${n} aria-valuemax=${r} aria-valuenow=${a ?? ""}
              aria-valuetext=${[a === void 0 ? "" : `${a.toFixed(v)}°`, m ? `${J(this.hass, "current")} ${p.toFixed(v)}°` : ""].filter(Boolean).join(", ")} aria-label=${J(this.hass, "target")} aria-disabled=${o ? "true" : "false"}>
              ${k`
                <defs>
                  <linearGradient id="arc" gradientUnits="userSpaceOnUse" x1=${l} y1=${u} x2=${d} y2=${f}>
                    <stop offset="0" style="stop-color:var(--mode);stop-opacity:.45" />
                    <stop offset="1" style="stop-color:var(--mode)" />
                  </linearGradient>
                </defs>
                <path class="track" d=${mr(Z, 405)} />`}
              ${a === void 0 ? j : k`<path class="value" d=${mr(Z, Math.max(135.5, c))} />`}
              ${m ? k`<circle class="room" cx=${h} cy=${g} r="4" />` : j}
              ${a === void 0 ? j : k`<circle class="knob" cx=${d} cy=${f} r="9" />`}
            </svg>
            <div class="readout">
              <div class="target ${o ? "dim" : ""}">${a === void 0 ? "--" : a.toFixed(v)}<sup>°</sup></div>
              <div class="meta label">${J(this.hass, o ? "off" : "target")}</div>
              ${t.current_temperature === void 0 ? j : O`<div class="meta current">${J(this.hass, "current")} ${fr(typeof t.current_temperature == "number" ? t.current_temperature.toFixed(v) : t.current_temperature)}</div>`}
            </div>
          </div>
        </div>

        <div class="steppers">
          <button class="round" aria-label="-" ?disabled=${o} @click=${() => a !== void 0 && this.setTarget(a - i)}><ha-icon icon="mdi:minus" .icon=${"mdi:minus"}></ha-icon></button>
          <span class="meta">${o ? "" : O`${J(this.hass, "step")}: ${fr(i)}`}</span>
          <button class="round" aria-label="+" ?disabled=${o} @click=${() => a !== void 0 && this.setTarget(a + i)}><ha-icon icon="mdi:plus" .icon=${"mdi:plus"}></ha-icon></button>
        </div>

        <div class="modes">
          ${(t.hvac_modes ?? []).map((t) => O`
              <button class=${t === e.state ? "on" : ""} style="--c:${this.modeColor(t)}" aria-pressed=${t === e.state ? "true" : "false"}
                @click=${() => {
			R("light"), this.hass?.callService("climate", "set_hvac_mode", {
				entity_id: e.entity_id,
				hvac_mode: t
			});
		}}>
                <ha-icon .icon=${lr[t] ?? "mdi:thermostat"}></ha-icon>
                <span class="meta">${J(this.hass, t) ?? t}</span>
              </button>
            `)}
        </div>
      </div>
    `;
	}
	static {
		this.styles = [W, x`
      :host { height: 100%; }
      .surface {
        position: relative; overflow: hidden; box-sizing: border-box;
        height: 100%; padding: 20px 18px 18px; display: flex; flex-direction: column; gap: 10px;
        --soft: color-mix(in srgb, var(--gc-text) 6%, transparent);
        --line: color-mix(in srgb, var(--gc-text) 10%, transparent);
      }
      /* Accent strip along the top edge: theme accent into the mode colour */
      .surface::before {
        content: ""; position: absolute; inset: 0 0 auto; height: 4px;
        background: linear-gradient(to var(--strip-dir, right), var(--gc-accent), var(--mode));
      }
      .surface:dir(rtl)::before { --strip-dir: left; }
      .surface.off::before { opacity: 0.3; }
      header { display: flex; align-items: center; gap: 12px; }
      .icon {
        display: grid; place-items: center; flex: none; width: 42px; height: 42px; border-radius: 12px;
        background: color-mix(in srgb, var(--mode) 18%, transparent); color: var(--mode); --mdc-icon-size: 22px;
      }
      .titles { flex: 1; min-width: 0; }
      .name { font-size: 17px; font-weight: 650; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .mode-text { color: var(--mode); font-size: 13px; }
      .chip {
        display: flex; align-items: center; gap: 6px; flex: none; padding: 5px 11px; border-radius: 999px;
        background: color-mix(in srgb, var(--mode) 16%, transparent); color: var(--mode);
        text-transform: uppercase; letter-spacing: 0.06em; font-size: 11px; font-weight: 600;
      }
      .chip i { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
      .dial { position: relative; flex: 1; min-height: 190px; display: grid; place-items: center; }
      /* The ring holds the arc and the readout, so the number stays centred on the arc however tall the card is */
      .ring { position: relative; width: min(100%, 240px); aspect-ratio: 1; }
      svg { display: block; width: 100%; height: 100%; touch-action: none; cursor: pointer; overflow: visible; }
      .track { fill: none; stroke: var(--line); stroke-width: 14; stroke-linecap: round; }
      .value { fill: none; stroke: url(#arc); stroke-width: 14; stroke-linecap: round; }
      /* Room temperature: a small dot under the knob, outlined so it reads on the track and the arc */
      .room { fill: var(--gc-text); stroke: var(--gc-sheet-bg, #000); stroke-width: 2; pointer-events: none; transition: cx 0.4s, cy 0.4s; }
      svg.off .room { fill: var(--gc-text-dim); }
      .knob { fill: #fff; stroke: var(--mode); stroke-width: 4; filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2)); }
      /* Off: the target stays visible but muted, and the dial ignores input */
      svg.off { cursor: default; }
      svg.off .value { opacity: 0.6; }
      svg.off .knob { fill: color-mix(in srgb, #fff 75%, var(--gc-text-dim)); }
      .target.dim { opacity: 0.45; }
      .readout { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; pointer-events: none; }
      .target { font-size: 54px; font-weight: 750; line-height: 1; letter-spacing: -0.03em; }
      .target sup { font-size: 20px; font-weight: 700; color: var(--mode); vertical-align: 0.9em; margin-inline-start: 2px; }
      .label { text-transform: uppercase; letter-spacing: 0.1em; font-size: 11px; color: var(--gc-text-dim); }
      .current { padding: 3px 10px; border-radius: 999px; background: var(--soft); font-size: 12px; color: var(--gc-text-dim); }
      .steppers { display: flex; align-items: center; justify-content: center; gap: 24px; }
      .steppers .meta { min-width: 72px; text-align: center; font-size: 13px; color: var(--gc-text-dim); }
      button {
        all: unset; box-sizing: border-box; cursor: pointer; display: grid; place-items: center;
        border: 1px solid var(--line); background: var(--soft); color: var(--gc-text);
        transition: transform 0.15s, background 0.2s, color 0.2s;
      }
      button:active { transform: scale(0.94); }
      button:disabled { opacity: 0.35; cursor: default; transform: none; }
      button:focus-visible { outline: 2px solid var(--gc-accent); }
      .round { width: 52px; height: 52px; border-radius: 50%; }
      .modes {
        display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 8px;
        margin-top: 4px; padding-top: 14px; border-top: 1px solid var(--line);
      }
      .modes button { gap: 5px; padding: 11px 2px; border-radius: 16px; color: var(--gc-text-dim); --mdc-icon-size: 20px; }
      .modes .meta { color: inherit; font-size: 11px; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .modes button.on {
        color: var(--c); background: color-mix(in srgb, var(--c) 18%, transparent);
        border-color: color-mix(in srgb, var(--c) 50%, transparent);
      }
      .empty { padding: 18px; color: var(--gc-text-dim); }

      :host([size="compact"]) .surface { padding: 16px 14px 14px; gap: 8px; }
      :host([size="compact"]) .icon { width: 36px; height: 36px; --mdc-icon-size: 20px; }
      :host([size="compact"]) .name { font-size: 16px; }
      :host([size="compact"]) .dial { min-height: 160px; }
      :host([size="compact"]) .ring { width: min(100%, 200px); }
      :host([size="compact"]) .target { font-size: 46px; }
      :host([size="compact"]) .target sup { font-size: 17px; }
      :host([size="compact"]) .round { width: 44px; height: 44px; }
      :host([size="compact"]) .modes { padding-top: 10px; }
      :host([size="compact"]) .modes button { padding: 8px 2px; }
      /* Slim: a small dial with - / + beside it; only the active mode keeps its label */
      :host([size="slim"]) .surface {
        display: grid; grid-template-columns: 1fr auto 1fr; align-content: center; gap: 6px; padding: 12px 12px 10px;
      }
      :host([size="slim"]) header { grid-column: 1 / -1; gap: 10px; }
      :host([size="slim"]) .icon { width: 30px; height: 30px; border-radius: 10px; --mdc-icon-size: 18px; }
      :host([size="slim"]) .name { font-size: 15px; }
      :host([size="slim"]) .dial { grid-area: 2 / 2; min-height: 0; }
      :host([size="slim"]) .ring { width: 150px; }
      :host([size="slim"]) .target { font-size: 36px; }
      :host([size="slim"]) .target sup { font-size: 14px; }
      :host([size="slim"]) .readout .label { display: none; }
      :host([size="slim"]) .current { font-size: 11px; padding: 2px 8px; }
      :host([size="slim"]) .steppers { display: contents; }
      :host([size="slim"]) .steppers .meta { display: none; }
      :host([size="slim"]) .round { width: 38px; height: 38px; align-self: center; }
      :host([size="slim"]) .round:first-child { grid-area: 2 / 1; justify-self: end; }
      :host([size="slim"]) .round:last-child { grid-area: 2 / 3; justify-self: start; }
      :host([size="slim"]) .modes { grid-column: 1 / -1; display: flex; margin-top: 2px; padding-top: 8px; gap: 6px; }
      :host([size="slim"]) .modes button { flex: 1 1 0; min-width: 0; }
      :host([size="slim"]) .modes button.on { flex: 2 1 auto; }
      :host([size="slim"]) .modes button { grid-auto-flow: column; gap: 4px; padding: 6px 2px; border-radius: 12px; --mdc-icon-size: 17px; }
      :host([size="slim"]) .modes button:not(.on) .meta { display: none; }
    `];
	}
};
customElements.define("glide-climate", hr);
//#endregion
//#region src/cards/media.ts
var gr = {
	PAUSE: 1,
	VOLUME_SET: 4,
	PREV: 16,
	NEXT: 32,
	PLAY: 16384
}, _r = (e) => `${Math.floor(e / 60)}:${String(Math.floor(e % 60)).padStart(2, "0")}`, vr = class extends G {
	constructor(...e) {
		super(...e), this.cardType = "media", this.tick = 0;
	}
	static {
		this.properties = {
			...G.properties,
			volDrag: { state: !0 }
		};
	}
	setConfig(e) {
		if (!e.entity?.startsWith("media_player.")) throw Error("Media card needs a media_player.* entity");
		super.setConfig(e);
	}
	get rows() {
		return {
			full: 4,
			compact: 3,
			slim: 2
		}[this.size];
	}
	getGridOptions() {
		return {
			columns: 12,
			rows: this.rows,
			min_columns: 6
		};
	}
	getCardSize() {
		return this.rows;
	}
	get s() {
		return this.stateOf(this.config.entity);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), clearInterval(this.tick), this.tick = 0;
	}
	updated(e) {
		super.updated(e);
		let t = this.s?.state === "playing";
		t && !this.tick && (this.tick = window.setInterval(() => this.requestUpdate(), 1e3)), !t && this.tick && (clearInterval(this.tick), this.tick = 0);
	}
	call(e, t = {}) {
		R("light"), this.hass?.callService("media_player", e, {
			entity_id: this.config.entity,
			...t
		});
	}
	position() {
		let e = this.s.attributes;
		if (e.media_position === void 0) return;
		let t = e.media_position;
		return this.s.state === "playing" && e.media_position_updated_at && (t += (Date.now() - Date.parse(e.media_position_updated_at)) / 1e3), Math.min(t, e.media_duration ?? t);
	}
	onVolume(e) {
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect(), r = (e.clientX - n.left) / n.width;
			return Math.round(Math.min(1, Math.max(0, getComputedStyle(t).direction === "rtl" ? 1 - r : r)) * 100);
		};
		this.volDrag = n(e);
		let r = (e) => this.volDrag = n(e), i = () => {
			t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i), t.removeEventListener("pointercancel", i), this.volDrag !== void 0 && this.call("volume_set", { volume_level: this.volDrag / 100 }), setTimeout(() => this.volDrag = void 0, 600);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i), t.addEventListener("pointercancel", i);
	}
	render() {
		let e = this.s;
		if (!e) return O`<div class="surface empty">${this.config.entity}</div>`;
		let t = e.attributes, n = dt(e) || e.state === "off" || e.state === "idle" || e.state === "standby" || !t.media_title, r = t.supported_features ?? 0, i = this.position(), a = t.media_duration, o = this.volDrag ?? Math.round((t.volume_level ?? 0) * 100), s = e.state === "playing", c = t.entity_picture;
		return O`
      <div class="surface ${s ? "playing" : ""}">
        ${c ? O`<div class="art-bg" style=${lt({ backgroundImage: `url("${c}")` })}></div>` : j}
        <div class="top">
          <div class="art">${c ? O`<img src=${c} alt="" loading="lazy" />` : O`<ha-icon icon="mdi:music" .icon=${"mdi:music"}></ha-icon>`}</div>
          <div class="info">
            <div class="meta source">${[t.app_name ?? t.source, ht(e, this.config.name)].filter(Boolean).join(" • ")}</div>
            <div class="title">${n ? J(this.hass, "nothing_playing") : t.media_title}</div>
            ${!n && t.media_artist ? O`<div class="artist">${t.media_artist}</div>` : j}
          </div>
        </div>

        ${!n && i !== void 0 && a ? O`
              <div class="progress"><div style="width:${i / a * 100}%"></div></div>
              <div class="times meta"><span>${_r(i)}</span><span>${_r(a)}</span></div>
            ` : j}

        <div class="controls">
          ${r & gr.PREV ? O`<button aria-label="previous" @click=${() => this.call("media_previous_track")}><ha-icon icon="mdi:skip-previous" .icon=${"mdi:skip-previous"}></ha-icon></button>` : j}
          <button class="play" aria-label=${s ? "pause" : "play"} @click=${() => this.call("media_play_pause")}>
            <ha-icon .icon=${s ? "mdi:pause" : "mdi:play"}></ha-icon>
          </button>
          ${r & gr.NEXT ? O`<button aria-label="next" @click=${() => this.call("media_next_track")}><ha-icon icon="mdi:skip-next" .icon=${"mdi:skip-next"}></ha-icon></button>` : j}
        </div>

        ${r & gr.VOLUME_SET ? O`
              <div class="volume">
                <ha-icon icon="mdi:volume-low" .icon=${"mdi:volume-low"}></ha-icon>
                <div class="track" role="slider" aria-label="volume" aria-valuenow=${o} aria-valuemin="0" aria-valuemax="100"
                  @pointerdown=${(e) => this.onVolume(e)}>
                  <div class="bar" style="width:${o}%"></div>
                </div>
                <ha-icon icon="mdi:volume-high" .icon=${"mdi:volume-high"}></ha-icon>
              </div>
            ` : j}
      </div>
    `;
	}
	static {
		this.styles = [W, x`
      :host { height: 100%; }
      .surface { height: 100%; padding: 18px; display: flex; flex-direction: column; justify-content: center; gap: 10px; }
      .art-bg {
        position: absolute; inset: -40px; background-size: cover; background-position: center;
        filter: blur(40px) saturate(1.4); opacity: 0.28; pointer-events: none;
      }
      :host([lite]) .art-bg { display: none; }
      .top, .progress, .times, .controls, .volume { position: relative; }
      .top { display: flex; gap: 14px; align-items: center; }
      .art {
        width: 64px; height: 64px; flex: none; border-radius: calc(var(--gc-radius) * 0.55); overflow: hidden;
        display: grid; place-items: center; background: var(--gc-surface); border: 1px solid var(--gc-border);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
      }
      .art img { width: 100%; height: 100%; object-fit: cover; }
      .info { min-width: 0; flex: 1; }
      .source { color: var(--gc-accent-text); font-size: 11px; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .title { font-size: 18px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .artist { color: var(--gc-text-dim); font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .progress { height: 4px; border-radius: 2px; background: color-mix(in srgb, var(--gc-text) 14%, transparent); overflow: hidden; }
      .progress div { height: 100%; background: var(--gc-accent); border-radius: 2px; transition: width 1s linear; }
      .times { display: flex; justify-content: space-between; font-size: 11px; margin-top: -4px; }
      .controls { display: flex; justify-content: center; align-items: center; gap: 28px; }
      button {
        all: unset; cursor: pointer; display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%;
        color: var(--gc-text); transition: transform 0.15s;
      }
      button:active { transform: scale(0.9); }
      button:focus-visible { outline: 2px solid var(--gc-accent); }
      .play { width: 60px; height: 60px; background: var(--gc-surface-on); border: 1px solid var(--gc-border); --mdc-icon-size: 28px; }
      .playing .play { background: var(--gc-accent); color: var(--gc-on-accent); border-color: transparent; }
      .volume { display: flex; align-items: center; gap: 10px; color: var(--gc-text-dim); --mdc-icon-size: 18px; }
      .track {
        flex: 1; height: 8px; border-radius: 4px; cursor: pointer; touch-action: none;
        background: color-mix(in srgb, var(--gc-text) 14%, transparent); position: relative;
      }
      .track::before { content: ""; position: absolute; inset: -12px 0; } /* bigger hit area */
      .bar { height: 100%; border-radius: 4px; background: var(--gc-text); }
      .empty { color: var(--gc-text-dim); }

      :host([size="compact"]) .surface { padding: 14px; gap: 8px; }
      :host([size="compact"]) .top { gap: 12px; }
      :host([size="compact"]) .art { width: 52px; height: 52px; }
      :host([size="compact"]) .title { font-size: 16px; }
      :host([size="compact"]) .artist { font-size: 13px; }
      :host([size="compact"]) .controls { gap: 22px; }
      :host([size="compact"]) button { width: 38px; height: 38px; }
      :host([size="compact"]) .play { width: 48px; height: 48px; --mdc-icon-size: 24px; }
      /* Slim: art, title and play/pause on one line, then a thin progress bar */
      :host([size="slim"]) .surface {
        display: grid; grid-template-columns: minmax(0, 1fr) auto; align-content: center;
        column-gap: 10px; row-gap: 8px; padding: 10px 12px;
      }
      :host([size="slim"]) .top { grid-area: 1 / 1; gap: 10px; }
      :host([size="slim"]) .controls { grid-area: 1 / 2; }
      :host([size="slim"]) .progress { grid-area: 2 / 1 / 3 / 3; height: 3px; }
      :host([size="slim"]) .times,
      :host([size="slim"]) .volume,
      :host([size="slim"]) .source,
      :host([size="slim"]) .controls button:not(.play) { display: none; }
      :host([size="slim"]) .art { width: 40px; height: 40px; border-radius: 10px; box-shadow: none; }
      :host([size="slim"]) .title { font-size: 14px; }
      :host([size="slim"]) .artist { font-size: 12px; }
      :host([size="slim"]) .play { width: 38px; height: 38px; --mdc-icon-size: 22px; }
    `];
	}
};
customElements.define("glide-media", vr);
//#endregion
//#region src/core/conditions.ts
var yr = (e) => (Array.isArray(e) ? e : [e]).map(String);
function br(e, t) {
	switch (t.condition) {
		case "state": {
			let n = e.states[t.entity]?.state ?? "unavailable";
			return !(t.state !== void 0 && !yr(t.state).includes(n) || t.state_not !== void 0 && yr(t.state_not).includes(n));
		}
		case "numeric_state": {
			let n = Number(e.states[t.entity]?.state);
			return !(Number.isNaN(n) || t.above !== void 0 && !(n > t.above) || t.below !== void 0 && !(n < t.below));
		}
		case "and": return t.conditions.every((t) => br(e, t));
		case "or": return t.conditions.some((t) => br(e, t));
		default: return !0;
	}
}
var xr = (e, t) => !t?.length || !!e && t.every((t) => br(e, t));
function Sr(e) {
	return (e ?? []).flatMap((e) => e.condition === "and" || e.condition === "or" ? Sr(e.conditions) : [e.entity]);
}
//#endregion
//#region src/core/format.ts
var Cr = (e) => e.locale?.language ?? e.language ?? "en", wr = (e) => e.attributes.device_class === "timestamp" || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(e.state), Tr = (e, t = "en") => new Intl.DateTimeFormat(t, {
	hour: "2-digit",
	minute: "2-digit",
	hourCycle: "h23"
}).format(new Date(e));
function Er(e, t, n) {
	let r = e;
	if (n) {
		let i = t.attributes[n];
		return i === void 0 ? "" : typeof i == "string" && /^\d{4}-\d{2}-\d{2}T/.test(i) ? Tr(i, Cr(e)) : r.formatEntityAttributeValue?.(t, n) ?? String(i);
	}
	if (F(t.entity_id) === "weather") {
		let n = t.attributes.temperature, r = _n(e, t.entity_id);
		return n === void 0 ? r : `${r} · ${n} ${t.attributes.temperature_unit ?? "°C"}`;
	}
	return wr(t) && !Number.isNaN(Date.parse(t.state)) ? Tr(t.state, Cr(e)) : _n(e, t.entity_id);
}
//#endregion
//#region src/cards/chips.ts
var Dr = class extends G {
	constructor(...e) {
		super(...e), this.cardType = "chips", this.detachers = [], this.shown = [], this.boundKey = "";
	}
	setConfig(e) {
		if (!Array.isArray(e.chips)) throw Error("Chips card needs a `chips` list");
		super.setConfig(e);
	}
	watched() {
		return this.config.chips.flatMap((e) => [e.entity, ...Sr(e.visibility)]);
	}
	getGridOptions() {
		return {
			columns: 12,
			rows: 1
		};
	}
	getCardSize() {
		return 1;
	}
	willUpdate(e) {
		super.willUpdate(e), this.shown = this.config.chips.flatMap((e, t) => xr(this.hass, e.visibility) ? [t] : []);
	}
	updated(e) {
		super.updated(e), (e.has("config") || this.shown.join() !== this.boundKey) && this.bind();
	}
	connectedCallback() {
		super.connectedCallback(), this.hasUpdated && !this.detachers.length && this.bind();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.unbind();
	}
	unbind() {
		this.detachers.forEach((e) => e()), this.detachers = [], this.boundKey = "";
	}
	bind() {
		this.unbind(), this.boundKey = this.shown.join(), this.renderRoot.querySelectorAll(".chip").forEach((e, t) => {
			let n = this.config.chips[this.shown[t]], r = (t) => {
				let r = n[`${t}_action`] ?? { action: "more-info" };
				this.hass && B(e, this.hass, r, n.entity);
			};
			this.detachers.push(tn(e, {
				tap: (t) => {
					this.playTapFx(e, t, { icon: e.querySelector("ha-icon") }), r("tap");
				},
				hold: () => r("hold")
			}));
		});
	}
	renderChip(e) {
		let t = this.stateOf(e.entity), n = e.value ?? (t && this.hass ? Er(this.hass, t, e.attribute) : "");
		return O`
      <div class="chip surface" role="button" tabindex="0" style="--chip:${I(e.color) ?? (t ? gt(t) : "var(--gc-accent)")}">
        <ha-icon .icon=${mt(t, e.icon)}></ha-icon>
        <div class="text">
          ${e.name === "" ? j : O`<div class="label">${ht(t, e.name)}</div>`}
          <div class="value">${n}</div>
        </div>
      </div>
    `;
	}
	render() {
		return O`<div class="row ${this.config.align === "start" ? "start" : ""}">${this.shown.map((e) => this.renderChip(this.config.chips[e]))}</div>`;
	}
	static {
		this.styles = [W, x`
      .row {
        display: flex;
        gap: 10px;
        justify-content: safe center;
        overflow-x: auto;
        scroll-snap-type: x proximity;
        scrollbar-width: none;
        padding: 6px 4px 10px; /* room for chip shadows */
        margin: -6px -4px -10px;
      }
      .row::-webkit-scrollbar { display: none; }
      .row.start { justify-content: flex-start; }
      .chip {
        flex: none;
        display: flex;
        align-items: center;
        gap: 10px;
        padding-block: 7px;
        padding-inline: 12px 16px;
        border-radius: var(--gc-radius-control);
        cursor: pointer;
        user-select: none;
        touch-action: pan-x;
        scroll-snap-align: center;
        transition: transform 0.2s cubic-bezier(0.2, 0.9, 0.3, 1.2);
      }
      .chip:active { transform: scale(0.95); }
      .chip:focus-visible { outline: 2px solid var(--gc-accent); outline-offset: 2px; }
      ha-icon { --mdc-icon-size: 22px; color: var(--gc-chip-icon, var(--chip)); }
      .text { display: flex; flex-direction: column; line-height: 1.2; }
      .label { font-size: 11px; color: var(--gc-text-dim); white-space: nowrap; }
      .value { font-size: 14px; font-weight: 600; white-space: nowrap; font-variant-numeric: tabular-nums; }

      :host([size="compact"]) .row { gap: 8px; }
      :host([size="compact"]) .chip { gap: 8px; padding-block: 5px; padding-inline: 10px 13px; }
      :host([size="compact"]) ha-icon { --mdc-icon-size: 20px; }
      :host([size="compact"]) .label { font-size: 10.5px; }
      :host([size="compact"]) .value { font-size: 13px; }
      /* Slim: label and value on one line */
      :host([size="slim"]) .row { gap: 6px; }
      :host([size="slim"]) .chip { gap: 7px; padding-block: 5px; padding-inline: 9px 12px; }
      :host([size="slim"]) ha-icon { --mdc-icon-size: 18px; }
      :host([size="slim"]) .text { flex-direction: row; align-items: baseline; gap: 5px; }
      :host([size="slim"]) .label { font-size: 11.5px; }
      :host([size="slim"]) .value { font-size: 13px; }
    `];
	}
};
customElements.define("glide-chips", Dr);
//#endregion
//#region src/cards/title.ts
var Or = class extends G {
	constructor(...e) {
		super(...e), this.cardType = "title";
	}
	setConfig(e) {
		if (!e.title && !e.subtitle) throw Error("Title card needs a `title` or `subtitle`");
		super.setConfig(e);
	}
	watched() {
		return [];
	}
	getGridOptions() {
		return { columns: 12 };
	}
	getCardSize() {
		return this.size === "full" ? 2 : 1;
	}
	render() {
		let e = this.config;
		return O`
      <div class="wrap ${e.align === "start" ? "start" : ""}">
        ${e.title ? O`<h1>${e.icon ? O`<ha-icon .icon=${e.icon}></ha-icon>` : j}${e.title}</h1>` : j}
        ${e.subtitle ? O`<p>${e.subtitle}</p>` : j}
      </div>
    `;
	}
	static {
		this.styles = x`
    :host { display: block; font-family: var(--gc-font); color: var(--gc-text); }
    .wrap { padding: 12px 4px 4px; text-align: center; }
    .wrap.start { text-align: start; }
    h1 {
      margin: 0;
      font-size: clamp(26px, 6vw, 36px);
      font-weight: 800;
      letter-spacing: -0.02em;
      line-height: 1.15;
    }
    h1 ha-icon { --mdc-icon-size: 0.9em; margin-inline-end: 10px; vertical-align: -0.08em; color: var(--gc-accent-text); }
    p { margin: 8px 0 0; font-size: 15px; color: var(--gc-text-dim); }
    :host([size="compact"]) .wrap { padding: 8px 4px 2px; }
    :host([size="compact"]) h1 { font-size: clamp(22px, 5vw, 30px); }
    :host([size="compact"]) p { margin-top: 6px; font-size: 14px; }
    :host([size="slim"]) .wrap { padding: 4px 4px 0; }
    :host([size="slim"]) h1 { font-size: clamp(18px, 4.2vw, 24px); font-weight: 750; }
    :host([size="slim"]) h1 ha-icon { margin-inline-end: 8px; }
    :host([size="slim"]) p { margin-top: 4px; font-size: 13px; }
  `;
	}
};
customElements.define("glide-title", Or);
//#endregion
//#region src/cards/heading.ts
var kr = (e) => e instanceof MouseEvent && e.detail ? {
	x: e.clientX,
	y: e.clientY
} : void 0, Ar = class extends G {
	constructor(...e) {
		super(...e), this.cardType = "heading";
	}
	setConfig(e) {
		if (!e.title) throw Error("Heading needs a `title`");
		super.setConfig(e);
	}
	watched() {
		return (this.config.badges ?? []).map((e) => e.entity);
	}
	getGridOptions() {
		return {
			columns: 12,
			rows: 1
		};
	}
	getCardSize() {
		return 1;
	}
	tap(e) {
		let t = this.config.tap_action, n = e.currentTarget;
		this.playTapFx(n, kr(e), { icon: n.querySelector(".icon") }), t && this.hass && B(e.currentTarget, this.hass, t);
	}
	badge(e) {
		let t = this.stateOf(e.entity), n = e.value ?? (t && this.hass ? Er(this.hass, t, e.attribute) : "");
		return O`
      <button
        class="badge surface"
        style="--c:${I(e.color) ?? (t ? gt(t) : "var(--gc-accent)")}"
        @click=${(t) => {
			t.stopPropagation();
			let n = t.currentTarget;
			this.playTapFx(n, kr(t), { icon: n.querySelector("ha-icon") }), this.hass && B(t.currentTarget, this.hass, e.tap_action ?? { action: "more-info" }, e.entity);
		}}
      >
        ${e.icon || t ? O`<ha-icon .icon=${mt(t, e.icon)}></ha-icon>` : j}
        <span>${n}</span>
      </button>
    `;
	}
	render() {
		let e = this.config, t = !!e.tap_action && e.tap_action.action !== "none";
		return O`
      <div class="row ${e.style === "subtitle" ? "small" : ""} ${t ? "linked" : ""}" @click=${t ? this.tap : void 0}
        role=${t ? "link" : "heading"} tabindex=${t ? "0" : "-1"}>
        ${e.icon ? O`<span class="icon" style="--c:${I(e.color) ?? "var(--gc-accent)"}"><ha-icon .icon=${e.icon}></ha-icon></span>` : j}
        <span class="title">${e.title}</span>
        ${e.subtitle ? O`<span class="sub">${e.subtitle}</span>` : j}
        ${t ? O`<ha-icon class="chev" icon="mdi:chevron-right" .icon=${"mdi:chevron-right"}></ha-icon>` : j}
        <span class="line"></span>
        ${(e.badges ?? []).map((e) => this.badge(e))}
      </div>
    `;
	}
	static {
		this.styles = [W, x`
      :host { height: 100%; }
      .row {
        height: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: flex-end;
        gap: 10px;
        padding: 0 4px 6px;
        min-height: 40px;
      }
      .row.linked { cursor: pointer; }
      .row.linked:focus-visible { outline: 2px solid var(--gc-accent); border-radius: 8px; }
      .icon {
        display: grid;
        place-items: center;
        width: 30px;
        height: 30px;
        flex: none;
        border-radius: 50%;
        color: var(--c);
        background: color-mix(in srgb, var(--c) 18%, transparent);
        --mdc-icon-size: 18px;
      }
      .title {
        font-size: 19px;
        font-weight: 750;
        letter-spacing: -0.01em;
        line-height: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .small .title { font-size: 14px; font-weight: 600; color: var(--gc-text-dim); line-height: 24px; }
      .small .icon { width: 24px; height: 24px; --mdc-icon-size: 15px; }
      .sub {
        font-family: var(--gc-font-meta);
        letter-spacing: var(--gc-meta-spacing);
        font-size: 12px;
        line-height: 30px;
        color: var(--gc-text-dim);
        white-space: nowrap;
      }
      .sub:lang(he), .sub:lang(ar) { font-family: var(--gc-font); letter-spacing: 0; }
      .chev {
        --mdc-icon-size: 20px;
        color: var(--gc-text-dim);
        /* Same 30px line box as the title, bottom-aligned with it, so the chevron sits on the text's middle */
        display: flex;
        align-items: center;
        height: 30px;
        align-self: flex-end;
        flex: none;
        margin-inline-start: -6px;
      }
      .small .chev { height: 24px; --mdc-icon-size: 18px; }
      .chev:dir(rtl) { transform: scaleX(-1); }
      /* Divider fading out after the title */
      .line {
        flex: 1;
        min-width: 12px;
        height: 1px;
        margin-bottom: 14px;
        background: linear-gradient(to var(--gc-line-dir, right), color-mix(in srgb, var(--gc-text) 18%, transparent), transparent);
        opacity: 0.9;
      }
      .line:dir(rtl) { --gc-line-dir: left; }
      .badge {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        height: 28px;
        padding-inline: 8px 10px;
        border-radius: var(--gc-radius-control);
        border: 1px solid var(--gc-border);
        background: var(--gc-surface);
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
        cursor: pointer;
        flex: none;
        --mdc-icon-size: 16px;
      }
      .badge ha-icon { color: var(--c); }
      .badge:focus-visible { outline: 2px solid var(--gc-accent); }

      :host([size="compact"]) .row { min-height: 34px; padding-bottom: 5px; }
      :host([size="compact"]) .icon { width: 26px; height: 26px; --mdc-icon-size: 16px; }
      :host([size="compact"]) .title { font-size: 17px; line-height: 26px; }
      :host([size="compact"]) .sub { line-height: 26px; }
      :host([size="compact"]) .chev { height: 26px; --mdc-icon-size: 18px; }
      :host([size="compact"]) .line { margin-bottom: 12px; }
      :host([size="compact"]) .badge { height: 25px; font-size: 11.5px; --mdc-icon-size: 15px; }
      :host([size="slim"]) .row { min-height: 28px; padding-bottom: 4px; gap: 8px; }
      :host([size="slim"]) .icon { width: 22px; height: 22px; --mdc-icon-size: 14px; }
      :host([size="slim"]) .title { font-size: 15px; line-height: 22px; }
      :host([size="slim"]) .sub { font-size: 11px; line-height: 22px; }
      :host([size="slim"]) .chev { height: 22px; --mdc-icon-size: 16px; }
      :host([size="slim"]) .line { margin-bottom: 10px; }
      :host([size="slim"]) .badge { height: 22px; padding-inline: 7px 8px; font-size: 11px; --mdc-icon-size: 13px; }
    `];
	}
};
customElements.define("glide-heading", Ar);
//#endregion
//#region src/core/backdrops.ts
var jr = {
	aurora: {
		name: "Aurora",
		dark: "radial-gradient(80% 60% at 0% 0%,#4c1d95 0%,transparent 60%),radial-gradient(70% 50% at 100% 50%,#0f5e57 0%,transparent 60%),radial-gradient(70% 50% at 20% 100%,#831843 0%,transparent 60%),#0b0820",
		light: "radial-gradient(80% 60% at 0% 0%,#e9d5ff 0%,transparent 60%),radial-gradient(70% 50% at 100% 50%,#ccfbf1 0%,transparent 60%),radial-gradient(70% 50% at 20% 100%,#fce7f3 0%,transparent 60%),#f7f5ff"
	},
	sunset: {
		name: "Sunset",
		dark: "radial-gradient(90% 60% at 50% 110%,#c2410c 0%,transparent 60%),radial-gradient(70% 50% at 100% 0%,#7c2d12 0%,transparent 60%),linear-gradient(#1c1022,#2a1420)",
		light: "radial-gradient(90% 60% at 50% 110%,#fdba74 0%,transparent 60%),radial-gradient(70% 50% at 100% 0%,#fecdd3 0%,transparent 60%),linear-gradient(#fff7ed,#ffe4e6)"
	},
	ocean: {
		name: "Ocean",
		dark: "radial-gradient(80% 60% at 0% 100%,#0e7490 0%,transparent 60%),radial-gradient(70% 50% at 100% 0%,#1e3a8a 0%,transparent 60%),#06121f",
		light: "radial-gradient(80% 60% at 0% 100%,#a5f3fc 0%,transparent 60%),radial-gradient(70% 50% at 100% 0%,#bfdbfe 0%,transparent 60%),#f0f9ff"
	},
	forest: {
		name: "Forest",
		dark: "radial-gradient(80% 60% at 100% 100%,#166534 0%,transparent 60%),radial-gradient(70% 50% at 0% 0%,#365314 0%,transparent 60%),#0a140e",
		light: "radial-gradient(80% 60% at 100% 100%,#bbf7d0 0%,transparent 60%),radial-gradient(70% 50% at 0% 0%,#d9f99d 0%,transparent 60%),#f4faf3"
	},
	midnight: {
		name: "Midnight",
		dark: "radial-gradient(70% 50% at 50% 0%,#1e1b4b 0%,transparent 70%),linear-gradient(#05060f,#0b1024)",
		light: "radial-gradient(70% 50% at 50% 0%,#c7d2fe 0%,transparent 70%),linear-gradient(#eef2ff,#f8fafc)"
	},
	dusk: {
		name: "Dusk",
		dark: "linear-gradient(160deg,#312e81 0%,#6b21a8 45%,#9d174d 100%)",
		light: "linear-gradient(160deg,#c7d2fe 0%,#e9d5ff 45%,#fbcfe8 100%)"
	},
	pastel: {
		name: "Pastel",
		dark: "radial-gradient(60% 50% at 20% 20%,#3b2f5c 0%,transparent 60%),radial-gradient(60% 50% at 80% 30%,#22424a 0%,transparent 60%),radial-gradient(60% 50% at 50% 90%,#4a2b3d 0%,transparent 60%),#16141c",
		light: "radial-gradient(60% 50% at 20% 20%,#ddd6fe 0%,transparent 60%),radial-gradient(60% 50% at 80% 30%,#bae6fd 0%,transparent 60%),radial-gradient(60% 50% at 50% 90%,#fbcfe8 0%,transparent 60%),#fdfcff"
	},
	mint: {
		name: "Mint",
		dark: "radial-gradient(80% 60% at 0% 0%,#065f46 0%,transparent 60%),radial-gradient(60% 50% at 100% 100%,#134e4a 0%,transparent 60%),#07120f",
		light: "radial-gradient(80% 60% at 0% 0%,#a7f3d0 0%,transparent 60%),radial-gradient(60% 50% at 100% 100%,#99f6e4 0%,transparent 60%),#f0fdf9"
	},
	rose: {
		name: "Rose",
		dark: "radial-gradient(80% 60% at 100% 0%,#9f1239 0%,transparent 60%),radial-gradient(60% 50% at 0% 100%,#581c87 0%,transparent 60%),#14080e",
		light: "radial-gradient(80% 60% at 100% 0%,#fecdd3 0%,transparent 60%),radial-gradient(60% 50% at 0% 100%,#f5d0fe 0%,transparent 60%),#fff7f9"
	},
	graphite: {
		name: "Graphite",
		dark: "radial-gradient(90% 70% at 30% 0%,#2a2d33 0%,transparent 70%),#111214",
		light: "radial-gradient(90% 70% at 30% 0%,#ffffff 0%,transparent 70%),#e7e8eb"
	}
}, Mr = (e, t, n, r) => {
	let i = Number(e);
	return Number.isFinite(i) ? Math.min(n, Math.max(t, i)) : r;
};
function Nr(e, t) {
	let n = e.background ?? "theme", r = {
		blur: 0,
		dim: 0,
		dark: t.dark,
		animate: !!e.animate && !t.still
	}, i = (e) => e ? t.dark ? e.dark : e.light : "";
	switch (n) {
		case "preset": return {
			...r,
			background: i(jr[e.preset ?? ""] ?? jr.aurora)
		};
		case "color": {
			let n = e.color || (t.dark ? "#111214" : "#f2f2f4"), i = e.color2 ? `linear-gradient(${Mr(e.angle, 0, 360, 135)}deg,${n},${e.color2})` : n;
			return {
				...r,
				background: i,
				animate: r.animate && !!e.color2
			};
		}
		case "image": {
			let n = t.night && e.image_night || e.image;
			return {
				...r,
				background: t.dark ? "#000" : "#fff",
				image: n || void 0,
				blur: Mr(e.blur, 0, 40, 0),
				dim: Mr(e.dim, 0, 90, 0) / 100,
				animate: !1
			};
		}
		default: return {
			...r,
			background: i(t.themeBackground) || i(jr.graphite)
		};
	}
}
var Pr = (e) => e && typeof e == "object" && e.type === "custom:glide-card" && e.card_type === "background";
function Fr(e, t = []) {
	if (Array.isArray(e)) e.forEach((e) => Fr(e, t));
	else if (e && typeof e == "object") {
		if (Pr(e)) t.push(e);
		else for (let n of Object.values(e)) Fr(n, t);
	}
	return t;
}
function Ir(e, t) {
	return e?.length ? Fr(e[t])[0] || Fr(e).find((e) => e.scope === "dashboard") : void 0;
}
function Lr(e, t) {
	let n = decodeURIComponent(t.split("/")[2] ?? "");
	if (!e?.length || !n) return 0;
	let r = e.findIndex((e) => e?.path === n);
	if (r >= 0) return r;
	let i = Number(n);
	return Number.isInteger(i) && i >= 0 && i < e.length ? i : 0;
}
//#endregion
//#region src/core/backdrop.ts
var Rr = "glide-backdrop", Q, zr, Br = "", Vr, Hr;
function Ur(e, t, n = 0) {
	let r = e.querySelector?.(t);
	if (r) return r;
	if (!(n > 12)) {
		for (let r of e.querySelectorAll?.("*") ?? []) if (r.shadowRoot) {
			let e = Ur(r.shadowRoot, t, n + 1);
			if (e) return e;
		}
	}
}
var Wr = 0;
function Gr(e = !1) {
	if (Hr?.isConnected) return Hr;
	if (Hr = void 0, !(!e && Date.now() - Wr < 1e4)) return Wr = Date.now(), Hr = Ur(document, "hui-root"), Hr;
}
function Kr(e) {
	if (!e) return { parent: document.body };
	let t = e.shadowRoot?.querySelector("hui-view-container");
	if (t) return {
		parent: t,
		after: t.querySelector(":scope > hui-view-background") ?? void 0
	};
}
function qr() {
	return qt() || matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Jr(e, t) {
	Q || (Q = document.createElement("div"), Q.className = Rr, Q.setAttribute("aria-hidden", "true"), Q.style.cssText = "position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden;"), (t.after ? t.after.nextSibling === Q : Q.parentNode === t.parent) || (t.after ? t.after.after(Q) : t.parent.insertBefore(Q, t.parent.firstChild));
	let n = e.image ? e.blur * 2 : 0, r = document.createElement("div");
	r.style.cssText = `position:absolute;inset:${e.animate ? "-12%" : `-${n}px`};background:${e.background};` + (e.image ? `background:url("${e.image.replace(/"/g, "%22")}") center/cover no-repeat,${e.background};filter:blur(${e.blur}px);` : "");
	let i = document.createElement("div");
	i.style.cssText = `position:absolute;inset:0;background:${e.dark ? "#000" : "#fff"};opacity:${e.dim};`, zr?.cancel(), Q.replaceChildren(r, ...e.dim ? [i] : []), zr = e.animate ? r.animate([{ transform: "translate(-4%,-3%) rotate(0deg) scale(1)" }, { transform: "translate(4%,3%) rotate(4deg) scale(1.08)" }], {
		duration: 45e3,
		iterations: Infinity,
		direction: "alternate",
		easing: "ease-in-out"
	}) : void 0;
}
function Yr() {
	zr?.cancel(), zr = void 0, Q?.remove(), Br = "";
}
function Xr(e, t, n) {
	let r = n ?? Kr(Gr(!0));
	if (!r) return;
	let i = new Set(y().map((e) => e.id)), a = getComputedStyle(document.documentElement).getPropertyValue("--glide-theme").trim(), o = e.theme && i.has(e.theme) ? e.theme : i.has(a) ? a : void 0, s = Nr(e, {
		dark: re(e.mode, t?.themes?.darkMode),
		night: t?.states?.["sun.sun"]?.state === "below_horizon",
		themeBackground: v(o).background,
		still: qr()
	}), c = JSON.stringify(s);
	c === Br && Q?.isConnected && (r.after ? r.after.nextSibling === Q : Q.parentNode === r.parent) || (Br = c, Jr(s, r));
}
function Zr(e) {
	Vr = e, Qr(!0);
}
function Qr(e = !1) {
	let t = Gr(e);
	if (!t) {
		Q?.isConnected && Q.parentNode !== document.body && Yr();
		return;
	}
	let n = t.lovelace?.config?.views, r = Vr ?? Ir(n, Lr(n, location.pathname));
	r ? Xr(r, t.hass) : Q?.isConnected && Yr();
}
var $r = !1;
function ei() {
	if ($r || typeof window > "u") return;
	$r = !0;
	let e = () => setTimeout(() => Qr(!0), 50);
	window.addEventListener("location-changed", e), window.addEventListener("popstate", e), setInterval(() => Qr(), 2e3), e();
}
//#endregion
//#region src/cards/background.ts
ei();
var ti = {
	theme: "Glide theme",
	preset: "Preset",
	color: "Colour",
	image: "Image"
}, ni = class extends G {
	constructor(...e) {
		super(...e), this.cardType = "background", this.preview = !1;
	}
	static {
		this.properties = {
			...G.properties,
			preview: { type: Boolean }
		};
	}
	watched() {
		return ["sun.sun"];
	}
	get editing() {
		return this.editMode || this.preview;
	}
	getGridOptions() {
		return {
			columns: 12,
			rows: 1
		};
	}
	getCardSize() {
		return +!!this.editing;
	}
	updated() {
		this.toggleAttribute("editing", this.editing), this.preview && Zr(this.config);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.preview && (Zr(void 0), Yr());
	}
	render() {
		if (!this.editing) return j;
		let e = this.config, t = e.background ?? "theme";
		return O`<div class="surface">
      <ha-icon icon="mdi:image-filter-hdr"></ha-icon>
      <span>Background: ${t === "preset" ? jr[e.preset ?? "aurora"]?.name ?? e.preset : ti[t]}</span>
      <span class="meta">${e.scope === "dashboard" ? "whole dashboard" : "this view"}</span>
    </div>`;
	}
	static {
		this.styles = x`
    :host { display: none; }
    :host([editing]) { display: block; font-family: var(--gc-font); color: var(--gc-text); }
    .surface {
      display: flex; align-items: center; gap: 10px; padding: 10px 14px;
      border-radius: var(--gc-radius-control, 999px);
      background: var(--gc-surface); border: 1px dashed var(--gc-border);
      font-size: 14px; font-weight: 600;
    }
    .meta { margin-inline-start: auto; font-size: 12px; font-weight: 400; color: var(--gc-text-dim); }
  `;
	}
};
customElements.get("glide-background") || customElements.define("glide-background", ni);
//#endregion
//#region src/core/search-index.ts
var ri = [
	"light",
	"switch",
	"input_boolean",
	"cover",
	"climate",
	"fan",
	"script",
	"scene",
	"media_player",
	"vacuum",
	"lock",
	"button",
	"input_button",
	"humidifier",
	"water_heater",
	"valve",
	"siren"
], ii = ["sensor", "binary_sensor"], $ = "custom:glide-card", ai = /* @__PURE__ */ new Set([
	"button",
	"climate",
	"media"
]), oi = /* @__PURE__ */ new Set([
	"nav",
	"search",
	"background",
	"title",
	"heading",
	"chips"
]);
function si(e) {
	return e.toLowerCase().replace(/[֑-ׇ]/g, "").replace(/[ךםןףץ]/g, (e) => ({
		ך: "כ",
		ם: "מ",
		ן: "נ",
		ף: "פ",
		ץ: "צ"
	})[e]).replace(/["'`׳״\-_.,:;!?()[\]{}|/\\]+/g, " ").replace(/\s+/g, " ").trim();
}
var ci = (e) => typeof e == "string" && /\{\{|\{%/.test(e), li = {
	light: "אור תאורה light",
	climate: "מזגן מיזוג ac climate",
	cover: "תריס וילון cover blind shutter",
	switch: "מתג שקע switch plug",
	fan: "מאוורר fan",
	media_player: "מדיה רמקול טלוויזיה media speaker tv",
	vacuum: "שואב vacuum",
	script: "תסריט script",
	scene: "סצנה scene",
	lock: "מנעול lock",
	water_heater: "דוד boiler",
	camera: "מצלמה camera"
}, ui = (e) => {
	let t = e ? li[e.split(".")[0]] : void 0;
	return t ? [t] : [];
};
function di(e, t) {
	if (typeof e.name == "string" && e.name && !ci(e.name)) return e.name;
	let n = e.entity;
	return (n ? t?.states[n]?.attributes.friendly_name : void 0) ?? n ?? "";
}
var fi = (e) => e.split("/").filter(Boolean)[0] ?? "lovelace";
function pi(e, t, n) {
	let r = e?.views ?? [], i = [], a = /* @__PURE__ */ new Map(), o = 0, s = /* @__PURE__ */ new Map(), c = (e, t) => {
		for (let n of e ?? []) n && typeof n == "object" && (t(n), c(n.cards, t), n.card && c([n.card], t));
	}, l = (e) => [...e.cards ?? [], ...e.sections ?? []];
	r.forEach((e, t) => c(l(e), (e) => {
		e.type === $ && e.card_type === "popup" && e.hash && (s.has(e.hash) || s.set(e.hash, /* @__PURE__ */ new Set()), s.get(e.hash).add(t));
	}));
	let u = /* @__PURE__ */ new Map(), d = (e, t = []) => {
		let n = mi(e.config), r = a.get(e.key);
		if (r) {
			let t = n > u.get(e.key), i = t ? r.group : e.group;
			t && (Object.assign(r, {
				name: e.name,
				group: e.group,
				config: gi(e.config)
			}), u.set(e.key, n)), i && i !== r.group && !r.alt.includes(i) && r.alt.push(i);
			return;
		}
		let s = {
			...e,
			config: gi(e.config),
			alt: [...t],
			order: o++
		};
		a.set(e.key, s), u.set(e.key, n), i.push(s);
	}, f = (e, t, r, i) => {
		for (let a of e ?? []) if (a && typeof a == "object") {
			if (a.type === $) {
				let e = a.card_type ?? "button";
				if (e === "popup" && a.hash) {
					let e = a.title ?? a.hash.slice(1), t = (s.get(a.hash)?.size ?? 0) > 1, n = t || !r ? e : `${r} › ${e}`;
					hi(a.cards).size !== 1 && d({
						kind: "place",
						key: `nav:${a.hash}`,
						name: e,
						group: t ? "" : r,
						config: _i(e, a.icon ?? "mdi:card-outline", a.hash)
					}), f(a.cards, n, r, i);
					continue;
				}
				if (oi.has(e)) continue;
				if (ai.has(e)) {
					let e = Ot(a), r = di(a, n);
					e && r && d({
						kind: "card",
						key: e,
						name: r,
						group: t,
						config: a
					}, ui(a.entity));
				}
			} else a.type === "tile" && a.entity ? d({
				kind: "card",
				key: a.entity,
				name: di(a, n),
				group: t,
				config: a
			}, ui(a.entity)) : (f(a.cards, t, r, i), a.card && f([a.card], t, r, i));
		}
	};
	return r.forEach((e, n) => {
		let r = e.title ?? e.path ?? String(n), i = `/${t}/${e.path ?? n}`;
		d({
			kind: "place",
			key: `nav:${i}`,
			name: r,
			group: "",
			config: _i(r, e.icon ?? "mdi:view-dashboard", i)
		}), f(l(e), r, r, n);
	}), i;
}
function mi(e) {
	return e.type === $ ? (e.card_type ?? "button") === "button" ? typeof e.name == "string" && e.name && !ci(e.name) ? 3 : 2 : 1 : 0;
}
function hi(e, t = /* @__PURE__ */ new Set()) {
	for (let n of e ?? []) n && typeof n == "object" && (typeof n.entity == "string" && t.add(n.entity), hi(n.cards, t), n.card && hi([n.card], t));
	return t;
}
var gi = (e) => e.type === $ && (e.card_type === "climate" || e.card_type === "media") ? {
	type: $,
	card_type: "button",
	entity: e.entity,
	...e.name ? { name: e.name } : {},
	...e.theme ? { theme: e.theme } : {}
} : e, _i = (e, t, n) => ({
	type: $,
	card_type: "button",
	layout: "pill",
	name: e,
	icon: t,
	tap_action: {
		action: "navigate",
		navigation_path: n
	}
});
function vi(e, t, n) {
	let r = new Set(n.domains ?? ri), i = new Set(n.sensors === !1 ? [] : ii), a = (n.exclude ?? []).map(yi), o = e.entities ?? {}, s = [], c = 1e5;
	for (let l of Object.keys(e.states).sort()) {
		if (t.has(l) || a.some((e) => e.test(l))) continue;
		let u = l.split(".")[0], d = i.has(u);
		if (!d && !r.has(u)) continue;
		let f = o[l];
		if (f && (f.hidden || f.entity_category)) continue;
		let p = f?.area_id ?? (f?.device_id ? e.devices?.[f.device_id]?.area_id : void 0), m = p ? e.areas?.[p]?.name : void 0, h = d ? n.labels.sensors : n.labels.extras, g = e.states[l];
		s.push({
			kind: d ? "sensor" : "extra",
			key: l,
			name: g.attributes.friendly_name ?? l,
			group: m ? `${h} › ${m}` : h,
			alt: [...m ? [m] : [], ...ui(l)],
			config: {
				type: $,
				card_type: "button",
				entity: l,
				...d ? { tap_action: { action: "more-info" } } : {}
			},
			order: c++
		});
	}
	return s;
}
var yi = (e) => RegExp(`^${e.split("*").map((e) => e.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join(".*")}$`);
function bi(e, t) {
	let n = si(t);
	if (!n) return;
	let r = si(e.name);
	if (r === n) return 0;
	if (r.startsWith(n)) return 1;
	if (r.split(" ").some((e) => e.startsWith(n))) return 2;
	if (r.includes(n)) return 3;
	let i = n.split(" "), a = `${r} ${si(e.group)}`;
	if (i.every((e) => a.includes(e))) return 4;
	let o = `${a} ${e.alt.map(si).join(" ")}`;
	if (i.every((e) => o.includes(e))) return 5;
}
var xi = {
	place: 0,
	card: 1,
	extra: 2,
	sensor: 3
};
function Si(e, t, n, r, i = 60) {
	let a = e.map((e) => ({
		e,
		tier: bi(e, t),
		use: n(e.key)
	})).filter((e) => e.tier !== void 0).sort((e, t) => e.tier - t.tier || t.use - e.use || e.e.order - t.e.order), o = a.slice(0, i), s = /* @__PURE__ */ new Map();
	return o.forEach((e, t) => {
		let n = e.e.kind === "place" ? r.places : e.e.group, i = `${e.e.kind === "place" ? "place" : e.e.kind}|${n}`;
		s.has(i) || s.set(i, {
			title: n,
			kind: e.e.kind,
			entries: [],
			best: t
		}), s.get(i).entries.push(e.e);
	}), {
		groups: [...s.values()].sort((e, t) => xi[e.kind] - xi[t.kind] || e.best - t.best).map(({ best: e, ...t }) => t),
		more: a.length - o.length
	};
}
function Ci(e, t, n) {
	return e.filter((e) => e.kind === "card" || e.kind === "extra").map((e) => ({
		e,
		use: t(e.key)
	})).filter((e) => e.use > .05).sort((e, t) => t.use - e.use || e.e.order - t.e.order).slice(0, n).map((e) => e.e);
}
//#endregion
//#region src/cards/search.ts
var wi = "#search", Ti = 80, Ei = /* @__PURE__ */ new Set();
function Di(e) {
	let t = e;
	for (; t;) {
		let e = t.lovelace?.config;
		if (e?.views) return e;
		t = t.parentNode ?? t.host;
	}
}
function Oi() {
	for (let e of Ei) {
		let t = e.isConnected ? Di(e) : void 0;
		if (t) return t;
	}
}
var ki = (e, t) => ({
	type: e.type,
	card_type: "popup",
	hash: e.hash ?? wi,
	title: e.title ?? J(t, "search"),
	icon: "mdi:magnify",
	theme: e.theme,
	mode: e.mode,
	size: e.size,
	tap_animation: e.tap_animation,
	lite: e.lite,
	cards: [{
		...e,
		type: "custom:glide-search-panel"
	}]
}), Ai = class extends Yn {
	setConfig(e) {
		this.raw = e, this.titleLang = this.hass?.language, super.setConfig(ki(this.raw, this.hass));
	}
	willUpdate(e) {
		this.raw && this.hass && this.hass.language !== this.titleLang && this.setConfig(this.raw), super.willUpdate(e);
	}
	connectedCallback() {
		super.connectedCallback(), Ei.add(this);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), setTimeout(() => !this.isConnected && Ei.delete(this), 1e3);
	}
};
customElements.define("glide-search", Ai);
var ji = class extends G {
	constructor(...e) {
		super(...e), this.cardType = "popup", this.query = "", this.shown = "", this.els = /* @__PURE__ */ new Map(), this.index = { entries: [] }, this.onRoute = () => {
			decodeURIComponent(location.hash) === this.hash && (this.index.lovelace = void 0, this.requestUpdate(), setTimeout(() => {
				let e = this.renderRoot.querySelector("input");
				e?.focus({ preventScroll: !0 }), e?.select();
			}, 60));
		};
	}
	static {
		this.properties = {
			...G.properties,
			query: { state: !0 }
		};
	}
	setConfig(e) {
		super.setConfig(e), this.index = { entries: [] };
	}
	connectedCallback() {
		super.connectedCallback();
		for (let e of [
			"popstate",
			"hashchange",
			"glide-hash",
			"location-changed"
		]) window.addEventListener(e, this.onRoute);
		this.onRoute();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		for (let e of [
			"popstate",
			"hashchange",
			"glide-hash",
			"location-changed"
		]) window.removeEventListener(e, this.onRoute);
	}
	get hash() {
		return this.config?.hash ?? wi;
	}
	get labels() {
		return {
			places: J(this.hass, "search_places"),
			extras: J(this.hass, "search_extras"),
			sensors: J(this.hass, "search_sensors")
		};
	}
	entries() {
		let e = this.hass;
		if (!e) return [];
		let t = Oi() ?? this.fetched;
		if (!t && !this.fetched && e.callWS) {
			let t = fi(location.pathname);
			e.callWS({
				type: "lovelace/config",
				url_path: t === "lovelace" ? null : t
			}).then((e) => (this.fetched = e, this.requestUpdate())).catch(() => {});
		}
		let n = Object.keys(e.states).length;
		if (this.index.lovelace === t && this.index.states === n && this.index.entries.length) return this.index.entries;
		let r = pi(t, fi(location.pathname), e), i = vi(e, new Set(r.map((e) => e.config.entity).filter(Boolean)), {
			domains: this.config.extra_domains,
			sensors: this.config.include_sensors,
			exclude: this.config.exclude,
			labels: this.labels
		});
		return this.index = {
			lovelace: t,
			states: n,
			entries: [...r, ...i]
		}, this.index.entries;
	}
	shouldUpdate(e) {
		if (e.size === 1 && e.has("hass") && this.hass) {
			for (let e of this.els.values()) e.hass = this.hass;
			let t = e.get("hass");
			return !t || t.language !== this.hass.language || t.themes?.darkMode !== this.hass.themes?.darkMode;
		}
		return super.shouldUpdate(e);
	}
	onInput(e) {
		this.query = e.target.value, clearTimeout(this.timer), this.timer = setTimeout(() => (this.shown = this.query, this.requestUpdate()), Ti);
	}
	clear() {
		this.query = this.shown = "";
		let e = this.renderRoot.querySelector("input");
		e && (e.value = "", e.focus());
	}
	card(e) {
		let t = `${e.kind}|${e.key}`, n = this.els.get(t);
		if (!n && this.helpers) {
			let r = this.config, i = e.config.type === "custom:glide-card" ? {
				...e.config,
				theme: e.config.theme ?? r.theme,
				tap_animation: e.config.tap_animation ?? r.tap_animation,
				size: e.config.size ?? r.size
			} : e.config;
			n = this.helpers.createCardElement(i);
			let a = n.getGridOptions?.() ?? {}, o = typeof a.columns == "number" ? a.columns : 12;
			n.style.setProperty("--cols", String(e.kind === "place" ? 6 : o)), typeof a.rows == "number" && n.style.setProperty("--rows", String(a.rows)), this.els.set(t, n);
		}
		return n && this.hass && (n.hass = this.hass), n;
	}
	group(e) {
		return O`
      <section>
        ${e.title ? O`<div class="gtitle">${e.title}</div>` : j}
        <div class="grid">${e.entries.map((e) => this.card(e))}</div>
      </section>
    `;
	}
	render() {
		if (!this.config || !this.hass) return j;
		this.helpers || window.loadCardHelpers?.().then((e) => (this.helpers = e, this.requestUpdate()));
		let e = this.entries(), t = this.shown.trim(), n;
		if (t) {
			let { groups: r, more: i } = Si(e, t, (e) => At(e), this.labels);
			n = r.length ? O`${r.map((e) => this.group(e))}${i ? O`<div class="note">+${i} ${J(this.hass, "search_more")}</div>` : j}` : O`<div class="note">${J(this.hass, "search_none")} “${t}”</div>`;
		} else {
			let t = this.config.frequent === 0 ? [] : Ci(e, (e) => At(e), this.config.frequent ?? 8);
			n = t.length ? this.group({
				title: J(this.hass, "search_frequent"),
				kind: "card",
				entries: t
			}) : O`<div class="note">${J(this.hass, "search_hint")}</div>`;
		}
		return O`
      <div class="bar surface">
        <ha-icon icon="mdi:magnify" .icon=${"mdi:magnify"}></ha-icon>
        <input
          type="search"
          dir="auto"
          enterkeyhint="search"
          autocomplete="off"
          spellcheck="false"
          .value=${this.query}
          placeholder=${this.config.placeholder ?? J(this.hass, "search_placeholder")}
          @input=${this.onInput}
          @keydown=${(e) => e.key === "Enter" && e.target.blur()}
        />
        ${this.query ? O`<button class="clear" aria-label=${J(this.hass, "clear")} @click=${() => this.clear()}>
              <ha-icon icon="mdi:close-circle" .icon=${"mdi:close-circle"}></ha-icon>
            </button>` : j}
      </div>
      <div class="results">${n}</div>
    `;
	}
	getGridOptions() {
		return { columns: 12 };
	}
	static {
		this.styles = [W, x`
      :host { display: block; }
      .bar {
        position: sticky;
        top: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 14px;
        height: 48px;
        border-radius: var(--gc-radius-control, 14px);
        background: var(--gc-sheet-bg, var(--gc-surface));
        color: var(--gc-text-dim);
      }
      input {
        flex: 1;
        min-width: 0;
        height: 100%;
        border: 0;
        outline: none;
        background: none;
        font: inherit;
        font-size: 17px;
        color: var(--gc-text);
      }
      input::placeholder { color: var(--gc-text-dim); }
      input::-webkit-search-cancel-button { display: none; }
      .clear {
        all: unset;
        display: grid;
        place-items: center;
        cursor: pointer;
        color: var(--gc-text-dim);
      }
      .results { padding-top: 6px; }
      section { margin-top: 10px; }
      .gtitle {
        font-size: 13px;
        font-weight: 600;
        color: var(--gc-text-dim);
        padding: 4px 4px 6px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        grid-auto-rows: minmax(56px, auto);
        gap: var(--gc-gap, 8px);
      }
      .grid > * { grid-column: span var(--cols, 6); grid-row: span var(--rows, 1); min-width: 0; }
      .note {
        padding: 28px 8px;
        text-align: center;
        color: var(--gc-text-dim);
        font-size: 14px;
      }
    `];
	}
};
customElements.define("glide-search-panel", ji);
//#endregion
//#region src/editor/editor.ts
var Mi = [
	{
		id: "button",
		icon: "mdi:gesture-tap-button",
		label: "Button"
	},
	{
		id: "popup",
		icon: "mdi:card-outline",
		label: "Pop-up"
	},
	{
		id: "nav",
		icon: "mdi:dock-bottom",
		label: "Nav bar"
	},
	{
		id: "climate",
		icon: "mdi:thermostat",
		label: "Climate"
	},
	{
		id: "media",
		icon: "mdi:play-circle-outline",
		label: "Media"
	},
	{
		id: "chips",
		icon: "mdi:label-multiple-outline",
		label: "Chips"
	},
	{
		id: "title",
		icon: "mdi:format-title",
		label: "Title"
	},
	{
		id: "heading",
		icon: "mdi:format-header-pound",
		label: "Heading"
	},
	{
		id: "background",
		icon: "mdi:image-filter-hdr",
		label: "Background"
	},
	{
		id: "search",
		icon: "mdi:magnify",
		label: "Search"
	}
], Ni = [
	"#ff9f43",
	"#d4ff00",
	"#006a60",
	"#4aa8ff",
	"#a78bfa",
	"#ff5c8a",
	"#34c759",
	"#ffd60a"
], Pi = {
	type: "expandable",
	title: "Interactions",
	icon: "mdi:gesture-tap",
	schema: [
		{
			name: "tap_action",
			selector: { ui_action: {} }
		},
		{
			name: "hold_action",
			selector: { ui_action: {} }
		},
		{
			name: "double_tap_action",
			selector: { ui_action: {} }
		}
	]
}, Fi = /* @__PURE__ */ new Set([
	"button",
	"chips",
	"heading",
	"nav",
	"popup"
]), Ii = {
	name: "tap_animation",
	selector: { select: {
		mode: "dropdown",
		options: Object.entries(Pt).map(([e, t]) => ({
			value: e,
			label: t
		}))
	} }
}, Li = {
	type: "expandable",
	title: "Templates",
	icon: "mdi:code-braces",
	schema: [
		"name",
		"secondary",
		"badge",
		"icon",
		"color"
	].map((e) => ({
		name: e,
		selector: { template: {} }
	}))
};
function Ri(e) {
	if (e.card_type === "background") return Bi(e.background ?? "theme");
	let t = Hi[e.card_type];
	if (e.card_type === "button") {
		let n = e, r = (e) => !(e.name && [
			"name",
			"icon",
			"color"
		].includes(e.name) && vn(n[e.name]));
		t = t.map((e) => e.type === "grid" ? {
			...e,
			schema: e.schema.filter(r)
		} : e), t = [
			...t.slice(0, -1),
			Li,
			t[t.length - 1]
		];
	}
	return Fi.has(e.card_type) ? [...t, Ii] : t;
}
var zi = (e, t, n) => ({ number: {
	min: e,
	max: t,
	step: 1,
	mode: "slider",
	unit_of_measurement: n
} });
function Bi(e) {
	let t = [{
		type: "grid",
		name: "",
		schema: [{
			name: "background",
			selector: { select: {
				mode: "dropdown",
				options: [
					{
						value: "theme",
						label: "Match the Glide theme"
					},
					{
						value: "preset",
						label: "Preset"
					},
					{
						value: "color",
						label: "Colour / gradient"
					},
					{
						value: "image",
						label: "Image"
					}
				]
			} }
		}, {
			name: "scope",
			selector: { select: {
				mode: "dropdown",
				options: [{
					value: "view",
					label: "This view"
				}, {
					value: "dashboard",
					label: "Whole dashboard"
				}]
			} }
		}]
	}], n = {
		color: [{
			type: "grid",
			name: "",
			schema: [{
				name: "color",
				selector: { text: {} }
			}, {
				name: "color2",
				selector: { text: {} }
			}]
		}, {
			name: "angle",
			selector: zi(0, 360, "°")
		}],
		image: [
			{
				name: "image",
				selector: { text: {} }
			},
			{
				name: "image_night",
				selector: { text: {} }
			},
			{
				type: "grid",
				name: "",
				schema: [{
					name: "blur",
					selector: zi(0, 40, "px")
				}, {
					name: "dim",
					selector: zi(0, 90, "%")
				}]
			}
		]
	}, r = e === "image" ? [] : [{
		name: "animate",
		selector: { boolean: {} }
	}];
	return [
		...t,
		...n[e] ?? [],
		...r
	];
}
var Vi = { select: {
	mode: "dropdown",
	options: [{
		value: "center",
		label: "Center"
	}, {
		value: "start",
		label: "Start"
	}]
} }, Hi = {
	background: [],
	heading: [
		{
			name: "title",
			required: !0,
			selector: { text: {} }
		},
		{
			type: "grid",
			name: "",
			schema: [
				{
					name: "subtitle",
					selector: { text: {} }
				},
				{
					name: "style",
					selector: { select: {
						mode: "dropdown",
						options: [{
							value: "title",
							label: "Title"
						}, {
							value: "subtitle",
							label: "Subtitle (smaller)"
						}]
					} }
				},
				{
					name: "icon",
					selector: { icon: {} }
				},
				{
					name: "color",
					selector: { ui_color: {} }
				}
			]
		},
		{
			name: "badges",
			selector: { object: {
				multiple: !0,
				label_field: "entity",
				fields: {
					entity: { selector: { entity: {} } },
					icon: { selector: { icon: {} } },
					color: { selector: { ui_color: {} } },
					attribute: { selector: { text: {} } },
					tap_action: { selector: { ui_action: {} } }
				}
			} }
		},
		{
			name: "tap_action",
			selector: { ui_action: {} }
		}
	],
	chips: [{
		name: "chips",
		selector: { object: {
			multiple: !0,
			label_field: "name",
			fields: {
				entity: { selector: { entity: {} } },
				name: { selector: { text: {} } },
				icon: { selector: { icon: {} } },
				color: { selector: { ui_color: {} } },
				attribute: { selector: { text: {} } },
				tap_action: { selector: { ui_action: {} } }
			}
		} }
	}, {
		name: "align",
		selector: Vi
	}],
	title: [
		{
			name: "title",
			selector: { text: {} }
		},
		{
			name: "subtitle",
			selector: { text: {} }
		},
		{
			type: "grid",
			name: "",
			schema: [{
				name: "icon",
				selector: { icon: {} }
			}, {
				name: "align",
				selector: Vi
			}]
		}
	],
	button: [
		{
			name: "entity",
			required: !0,
			selector: { entity: {} }
		},
		{
			type: "grid",
			name: "",
			schema: [
				{
					name: "name",
					selector: { text: {} }
				},
				{
					name: "icon",
					selector: { icon: {} },
					context: { icon_entity: "entity" }
				},
				{
					name: "layout",
					selector: { select: {
						mode: "dropdown",
						options: [{
							value: "tile",
							label: "Tile"
						}, {
							value: "pill",
							label: "Pill row"
						}]
					} }
				},
				{
					name: "slider",
					default: !0,
					selector: { boolean: {} }
				},
				{
					name: "color",
					selector: { ui_color: {} }
				}
			]
		},
		{
			type: "grid",
			name: "",
			schema: [
				{
					name: "view",
					selector: { select: {
						mode: "dropdown",
						options: [
							{
								value: "garden",
								label: "Garden"
							},
							{
								value: "sky",
								label: "Sky"
							},
							{
								value: "city",
								label: "City"
							},
							{
								value: "sea",
								label: "Sea"
							},
							{
								value: "mountains",
								label: "Mountains"
							},
							{
								value: "beach",
								label: "Beach"
							},
							{
								value: "forest",
								label: "Forest"
							},
							{
								value: "desert",
								label: "Desert"
							},
							{
								value: "snow",
								label: "Snow"
							},
							{
								value: "field",
								label: "Field"
							},
							{
								value: "pool",
								label: "Pool"
							},
							{
								value: "color",
								label: "Plain colour"
							}
						]
					} }
				},
				{
					name: "view_image",
					selector: { text: {} }
				},
				{
					name: "cover_style",
					selector: { select: {
						mode: "dropdown",
						options: [
							{
								value: "blind",
								label: "Blind (top down)"
							},
							{
								value: "bottom_up",
								label: "Shade (bottom up)"
							},
							{
								value: "roman",
								label: "Roman shade"
							},
							{
								value: "venetian",
								label: "Venetian blind"
							},
							{
								value: "shutter",
								label: "Roller shutter"
							},
							{
								value: "curtain",
								label: "Curtain (from the middle)"
							},
							{
								value: "curtain_side",
								label: "Curtain (one side)"
							},
							{
								value: "vertical",
								label: "Vertical blinds"
							}
						]
					} }
				},
				{
					name: "cover_side",
					selector: { select: {
						mode: "dropdown",
						options: [{
							value: "start",
							label: "Start"
						}, {
							value: "end",
							label: "End"
						}]
					} }
				},
				{
					name: "cover_buttons",
					selector: { boolean: {} }
				}
			]
		},
		Pi
	],
	popup: [
		{
			name: "hash",
			required: !0,
			selector: { text: {} }
		},
		{
			type: "grid",
			name: "",
			schema: [{
				name: "title",
				selector: { text: {} }
			}, {
				name: "icon",
				selector: { icon: {} }
			}]
		},
		{
			name: "entity",
			selector: { entity: {} }
		}
	],
	nav: [{
		name: "items",
		selector: { object: {
			multiple: !0,
			label_field: "name",
			fields: {
				name: {
					required: !0,
					selector: { text: {} }
				},
				icon: {
					required: !0,
					selector: { icon: {} }
				},
				navigation_path: { selector: { text: {} } },
				entity: { selector: { entity: {} } },
				pinned: { selector: { boolean: {} } },
				items: { selector: { object: {
					multiple: !0,
					label_field: "name",
					fields: {
						name: {
							required: !0,
							selector: { text: {} }
						},
						icon: {
							required: !0,
							selector: { icon: {} }
						},
						navigation_path: {
							required: !0,
							selector: { text: {} }
						},
						entity: { selector: { entity: {} } }
					}
				} } }
			}
		} }
	}],
	climate: [{
		name: "entity",
		required: !0,
		selector: { entity: { filter: { domain: "climate" } } }
	}, {
		name: "name",
		selector: { text: {} }
	}],
	media: [{
		name: "entity",
		required: !0,
		selector: { entity: { filter: { domain: "media_player" } } }
	}, {
		name: "name",
		selector: { text: {} }
	}],
	search: [
		{
			type: "grid",
			name: "",
			schema: [{
				name: "title",
				selector: { text: {} }
			}, {
				name: "hash",
				selector: { text: {} }
			}]
		},
		{
			name: "placeholder",
			selector: { text: {} }
		},
		{
			name: "include_sensors",
			selector: { boolean: {} }
		},
		{
			name: "frequent",
			selector: { number: {
				min: 0,
				max: 24,
				mode: "box"
			} }
		}
	]
}, Ui = {
	hash: "Hash (e.g. #living-room)",
	slider: "Swipe to adjust (brightness / position)",
	layout: "Layout (empty = theme default)",
	color: "Colour (empty = by entity type)",
	items: "Nav items (path or #popup-hash)",
	entity: "Entity",
	tap_animation: "Tap animation (empty = dashboard default)",
	secondary: "Secondary line, e.g. {{ states.light | selectattr('state','eq','on') | list | count }} of 7 on",
	badge: "Badge text (empty = entity state)",
	view: "Cover view (covers only, empty = garden)",
	view_image: "Cover view photo, e.g. /local/yard.jpg",
	cover_style: "Cover style (empty = auto from device class)",
	cover_side: "One-sided covers stack at (empty = start)",
	cover_buttons: "Open / stop / close buttons (covers)",
	background: "Background",
	scope: "Applies to",
	color2: "Second colour (makes a gradient)",
	angle: "Gradient angle",
	image: "Image, e.g. /local/wall.jpg",
	image_night: "Night image (optional, while the sun is down)",
	blur: "Blur",
	dim: "Dim",
	animate: "Slow drift",
	placeholder: "Search field hint",
	include_sensors: "Also search sensors (default on)",
	frequent: "Most-used buttons shown before typing (default 8)"
};
async function Wi() {
	customElements.get("ha-form") || await (await (await window.loadCardHelpers?.())?.createCardElement({
		type: "entities",
		entities: []
	}))?.constructor?.getConfigElement?.();
}
var Gi = class extends P {
	constructor(...e) {
		super(...e), this.ready = !1;
	}
	static {
		this.properties = {
			hass: { attribute: !1 },
			config: { state: !0 },
			ready: { state: !0 }
		};
	}
	setConfig(e) {
		this.config = {
			...e,
			card_type: e.card_type ?? "button"
		};
	}
	connectedCallback() {
		super.connectedCallback(), Wi().finally(() => this.ready = !0);
	}
	update_(e) {
		let t = {
			...this.config,
			...e
		};
		for (let [e, n] of Object.entries(t)) (n === "" || n == null) && delete t[e];
		this.config = t, L(this, "config-changed", { config: this.config });
	}
	setType(e) {
		if (e === this.config.card_type) return;
		let { type: t, theme: n, mode: r, accent: i, tap_animation: a, size: o } = this.config, s = {
			type: t,
			card_type: e,
			theme: n,
			mode: r,
			accent: i,
			tap_animation: a,
			size: o
		};
		e === "popup" && Object.assign(s, {
			hash: "#room",
			title: "Room",
			cards: []
		}), e === "chips" && Object.assign(s, { chips: [] }), e === "title" && Object.assign(s, { title: "Home" }), e === "heading" && Object.assign(s, { title: "Section" }), e === "background" && Object.assign(s, { background: "theme" }), e === "search" && Object.assign(s, { hash: "#search" }), e === "nav" && Object.assign(s, { items: [{
			name: "Home",
			icon: "mdi:home",
			navigation_path: "#home"
		}] }), this.config = {}, this.update_(s);
	}
	render() {
		if (!this.config) return j;
		let e = this.config, t = y();
		return O`
      <div class="section">
        <div class="label">Card type</div>
        <div class="types">
          ${Mi.map((t) => O`<button class=${e.card_type === t.id ? "sel" : ""} @click=${() => this.setType(t.id)}>
              <ha-icon .icon=${t.icon}></ha-icon><span>${t.label}</span>
            </button>`)}
        </div>
      </div>

      <div class="section">
        <div class="label">Design</div>
        <div class="themes">
          <button class="theme ${e.theme ? "" : "sel"}" @click=${() => this.update_({ theme: void 0 })}>
            <div class="swatch auto"><ha-icon icon="mdi:auto-fix" .icon=${"mdi:auto-fix"}></ha-icon></div>
            <span>Dashboard default</span>
          </button>
          ${t.map((t) => O`<button class="theme ${e.theme === t.id ? "sel" : ""}" title=${t.description ?? ""} @click=${() => this.update_({ theme: t.id })}>
              <div class="swatch" style="background:${t.preview.background}">
                <i style="background:${t.preview.surface}"></i><b style="background:${t.preview.accent}"></b>
              </div>
              <span>${t.name}</span>
            </button>`)}
        </div>
        <div class="row">
          <div class="seg">
            ${[
			"auto",
			"dark",
			"light"
		].map((t) => O`<button class=${(e.mode ?? "auto") === t ? "sel" : ""} @click=${() => this.update_({ mode: t === "auto" ? void 0 : t })}>${t}</button>`)}
          </div>
          <div class="accents">
            <button class="dot none ${e.accent ? "" : "sel"}" title="Theme accent" @click=${() => this.update_({ accent: void 0 })}></button>
            ${Ni.map((t) => O`<button class="dot ${e.accent === t ? "sel" : ""}" style="background:${t}" title=${t} @click=${() => this.update_({ accent: t })}></button>`)}
            <label class="dot custom" title="Custom color">
              <input type="color" .value=${e.accent ?? "#ff9f43"} @input=${(e) => this.update_({ accent: e.target.value })} />
            </label>
          </div>
        </div>
        <div class="row">
          <span class="hint">Size</span>
          <div class="seg" title="Empty = dashboard default (glide-size in your theme), else full">
            ${[
			"auto",
			"full",
			"compact",
			"slim"
		].map((t) => O`<button class=${(e.size ?? "auto") === t ? "sel" : ""} @click=${() => this.update_({ size: t === "auto" ? void 0 : t })}>${t === "auto" ? "dashboard" : t}</button>`)}
          </div>
        </div>
      </div>

      ${e.card_type === "background" && (e.background ?? "theme") === "preset" ? O`<div class="section">
            <div class="label">Preset</div>
            <div class="themes">
              ${Object.entries(jr).map(([t, n]) => O`<button class="theme ${(e.preset ?? "aurora") === t ? "sel" : ""}" @click=${() => this.update_({ preset: t })}>
                  <div class="swatch" style="background:${e.mode === "light" ? n.light : n.dark}"></div>
                  <span>${n.name}</span>
                </button>`)}
            </div>
          </div>` : j}
      ${this.ready ? O`<ha-form
            .hass=${this.hass}
            .data=${e}
            .schema=${Ri(e)}
            .computeLabel=${(e) => Ui[e.name]}
            @value-changed=${(e) => {
			e.stopPropagation(), this.update_(e.detail.value);
		}}
          ></ha-form>` : j}
      ${e.card_type === "popup" && this.ready ? O`<div class="section">
            <div class="label">Cards inside the pop-up (YAML)</div>
            <ha-yaml-editor
              .hass=${this.hass}
              .defaultValue=${e.cards ?? []}
              @value-changed=${(e) => {
			e.stopPropagation(), e.detail.isValid !== !1 && Array.isArray(e.detail.value) && this.update_({ cards: e.detail.value });
		}}
            ></ha-yaml-editor>
          </div>` : j}
    `;
	}
	static {
		this.styles = x`
    :host { display: block; }
    .section { margin-bottom: 16px; }
    .label { font-weight: 500; margin-bottom: 8px; color: var(--primary-text-color); }
    button { font: inherit; cursor: pointer; color: var(--primary-text-color); }
    .types { display: grid; grid-template-columns: repeat(auto-fill, minmax(72px, 1fr)); gap: 6px; }
    .types button, .theme {
      display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px 4px;
      border-radius: 12px; border: 1px solid var(--divider-color); background: var(--card-background-color); font-size: 12px;
    }
    .sel { border-color: var(--primary-color) !important; box-shadow: 0 0 0 1px var(--primary-color); }
    .themes { display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); gap: 8px; }
    .swatch {
      position: relative; width: 100%; height: 52px; border-radius: 8px; overflow: hidden; display: grid; place-items: center;
    }
    .swatch.auto { background: var(--secondary-background-color); color: var(--secondary-text-color); }
    .swatch i { position: absolute; inset: 10px 30% 10px 10px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.2); }
    .swatch b { position: absolute; right: 10px; bottom: 10px; width: 16px; height: 16px; border-radius: 50%; }
    .row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-top: 10px; }
    .seg { display: flex; border: 1px solid var(--divider-color); border-radius: 999px; overflow: hidden; }
    .seg button { border: 0; background: none; padding: 6px 12px; text-transform: capitalize; }
    .seg button.sel { background: var(--primary-color); color: var(--text-primary-color, #fff); box-shadow: none; }
    .accents { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
    .hint { font-size: 13px; color: var(--secondary-text-color); }
    .dot { width: 24px; height: 24px; border-radius: 50%; border: 2px solid transparent; padding: 0; position: relative; }
    .dot.sel { border-color: var(--primary-text-color); box-shadow: none; }
    .dot.none { background: conic-gradient(#ff9f43, #d4ff00, #006a60, #ff9f43); opacity: 0.6; }
    .dot.custom { overflow: hidden; background: conic-gradient(red, yellow, lime, aqua, blue, magenta, red); cursor: pointer; }
    .dot.custom input { opacity: 0; width: 100%; height: 100%; cursor: pointer; }
  `;
	}
};
customElements.define("glide-card-editor", Gi);
//#endregion
//#region src/glide-card.ts
var Ki = "0.21.0", qi = [
	"button",
	"popup",
	"nav",
	"climate",
	"media",
	"chips",
	"title",
	"heading",
	"background",
	"search"
], Ji = class extends HTMLElement {
	constructor(...e) {
		super(...e), this._editMode = !1, this._preview = !1;
	}
	setConfig(e) {
		let t = e?.card_type ?? "button";
		if (!qi.includes(t)) throw Error(`Unknown card_type "${t}". Use one of: ${qi.join(", ")}`);
		let n = `glide-${t}`;
		if (!customElements.get(n)) throw Error(`card_type "${t}" is not available in this build`);
		this.inner?.localName !== n && (this.inner?.remove(), this.inner = document.createElement(n), this.appendChild(this.inner)), this.inner.setConfig({
			...e,
			card_type: t
		}), this._hass && (this.inner.hass = this._hass), this.inner.editMode = this._editMode, this.inner.preview = this._preview;
	}
	set hass(e) {
		this._hass = e, this.inner && (this.inner.hass = e);
	}
	set editMode(e) {
		this._editMode = e, this.inner && (this.inner.editMode = e);
	}
	set preview(e) {
		this._preview = e, this.inner && (this.inner.preview = e);
	}
	connectedCallback() {
		this.style.display = "block", this.style.height = "100%";
	}
	getCardSize() {
		return this.inner?.getCardSize?.() ?? 1;
	}
	getGridOptions() {
		return this.inner?.getGridOptions?.() ?? {
			columns: 6,
			rows: 2
		};
	}
	static getStubConfig() {
		return {
			card_type: "button",
			entity: ""
		};
	}
	static getConfigElement() {
		return document.createElement("glide-card-editor");
	}
};
d(), customElements.get("glide-card") || (customElements.define("glide-card", Ji), window.customCards = window.customCards ?? [], window.customCards.push({
	type: "glide-card",
	name: "Glide Card",
	description: "Themeable buttons, pop-up sheets, nav bar, search, climate and media cards",
	preview: !0,
	documentationURL: "https://github.com/yshaish1/glide-card"
}), console.info(`%c GLIDE-CARD %c ${Ki} `, "background:#ff9f43;color:#1c1206;border-radius:4px 0 0 4px", "background:#222;color:#fff;border-radius:0 4px 4px 0"));
//#endregion
