//#region src/themes/bubble/index.ts
var e = {
	id: "bubble",
	name: "Refined Bubble",
	version: "1.0.0",
	description: "Compact solid pills with a neon accent, no blur",
	preview: {
		background: "#0a0a0c",
		surface: "#16161a",
		accent: "#d4ff00"
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
	styles: { button: ".fill{box-shadow:inset -2px 0 0 var(--gc-accent)}.cover .fill{box-shadow:inset 0 2px 0 var(--gc-accent);border-top-color:transparent}" },
	defaults: { buttonLayout: "pill" }
}, t = {
	id: "glass",
	name: "Liquid Glass",
	version: "1.0.0",
	description: "Frosted translucent tiles with a warm glow",
	preview: {
		background: "linear-gradient(135deg,#2a1d14,#14121c)",
		surface: "rgba(255,255,255,.1)",
		accent: "#ff9f43"
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
}, n = {
	id: "material",
	name: "Material You",
	version: "1.0.0",
	description: "Soft tonal surfaces from a teal seed",
	preview: {
		background: "#e6f4ef",
		surface: "#ffffff",
		accent: "#006a60"
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
}, r = "data:font/woff2;base64,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", i = "Glide Hebrew", a = "glide-card-fonts";
function o(e = document) {
	if (e.getElementById(a)) return;
	let t = e.createElement("style");
	t.id = a, t.textContent = `@font-face{font-family:"${i}";font-style:normal;font-weight:300 900;font-display:swap;src:url(${r}) format("woff2");unicode-range:U+0307-0308,U+0590-05FF,U+200C-2010,U+20AA,U+25CC,U+FB1D-FB4F}`, e.head.appendChild(t);
}
var s = (e) => `"${i}", ${e}`, c = "glass", l = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map(), d = {
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
function f(e) {
	l.set(e.id, e);
	for (let t of u.keys()) t.startsWith(`${e.id}|`) && u.delete(t);
}
var p = (e) => e && l.get(e) || l.get("glass"), m = () => [...l.values()], ee = (e) => Object.entries(e).map(([e, t]) => `${e}:${t};`).join("");
function te(e, t, n) {
	let r = {
		...d,
		...e.tokens.base,
		...t ? e.tokens.dark : e.tokens.light
	};
	for (let e of ["--gc-font", "--gc-font-meta"]) r[e].startsWith("var(") || (r[e] = s(r[e]));
	return `:host{${ee(r)}}${e.styles?.all ?? ""}${e.styles?.[n] ?? ""}`;
}
function h(e, t, n) {
	let r = p(e), i = `${r.id}|${t ? "d" : "l"}|${n}`, a = u.get(i);
	return a || (a = new CSSStyleSheet(), a.replaceSync(te(r, t, n)), u.set(i, a)), a;
}
function g(e, t) {
	if (e && l.has(e)) return e;
	let n = getComputedStyle(t).getPropertyValue("--glide-theme").trim();
	return l.has(n) ? n : c;
}
function _(e, t) {
	return e === "dark" ? !0 : e === "light" ? !1 : t ?? matchMedia("(prefers-color-scheme: dark)").matches;
}
[
	t,
	e,
	n
].forEach(f), window.glideCardThemes = {
	register: f,
	list: m
};
//#endregion
//#region node_modules/@lit/reactive-element/css-tag.js
var v = globalThis, y = v.ShadowRoot && (v.ShadyCSS === void 0 || v.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, b = Symbol(), ne = /* @__PURE__ */ new WeakMap(), re = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== b) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (y && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = ne.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && ne.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, ie = (e) => new re(typeof e == "string" ? e : e + "", void 0, b), x = (e, ...t) => new re(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, b), ae = (e, t) => {
	if (y) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let n of t) {
		let t = document.createElement("style"), r = v.litNonce;
		r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
	}
}, oe = y ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return ie(t);
})(e) : e, { is: se, defineProperty: ce, getOwnPropertyDescriptor: le, getOwnPropertyNames: ue, getOwnPropertySymbols: de, getPrototypeOf: fe } = Object, S = globalThis, pe = S.trustedTypes, me = pe ? pe.emptyScript : "", he = S.reactiveElementPolyfillSupport, C = (e, t) => e, ge = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? me : null;
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
}, _e = (e, t) => !se(e, t), ve = {
	attribute: !0,
	type: String,
	converter: ge,
	reflect: !1,
	useDefault: !1,
	hasChanged: _e
};
Symbol.metadata ??= Symbol("metadata"), S.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var w = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ve) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && ce(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = le(this.prototype, e) ?? {
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
		return this.elementProperties.get(e) ?? ve;
	}
	static _$Ei() {
		if (this.hasOwnProperty(C("elementProperties"))) return;
		let e = fe(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(C("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
			let e = this.properties, t = [...ue(e), ...de(e)];
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
			for (let e of n) t.unshift(oe(e));
		} else e !== void 0 && t.push(oe(e));
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
		return ae(e, this.constructor.elementStyles), e;
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
			let i = (n.converter?.toAttribute === void 0 ? ge : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? ge : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? _e)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[C("elementProperties")] = /* @__PURE__ */ new Map(), w[C("finalized")] = /* @__PURE__ */ new Map(), he?.({ ReactiveElement: w }), (S.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var ye = globalThis, be = (e) => e, xe = ye.trustedTypes, Se = xe ? xe.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ce = "$lit$", T = `lit$${Math.random().toFixed(9).slice(2)}$`, we = "?" + T, Te = `<${we}>`, E = document, D = () => E.createComment(""), O = (e) => e === null || typeof e != "object" && typeof e != "function", Ee = Array.isArray, De = (e) => Ee(e) || typeof e?.[Symbol.iterator] == "function", Oe = "[ 	\n\f\r]", k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ke = /-->/g, Ae = />/g, A = RegExp(`>|${Oe}(?:([^\\s"'>=/]+)(${Oe}*=${Oe}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), je = /'/g, Me = /"/g, Ne = /^(?:script|style|textarea|title)$/i, Pe = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), j = Pe(1), M = Pe(2), N = Symbol.for("lit-noChange"), P = Symbol.for("lit-nothing"), Fe = /* @__PURE__ */ new WeakMap(), F = E.createTreeWalker(E, 129);
function Ie(e, t) {
	if (!Ee(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return Se === void 0 ? t : Se.createHTML(t);
}
var Le = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = k;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === k ? c[1] === "!--" ? o = ke : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = A) : (Ne.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = A) : o = Ae : o === A ? c[0] === ">" ? (o = i ?? k, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? A : c[3] === "\"" ? Me : je) : o === Me || o === je ? o = A : o === ke || o === Ae ? o = k : (o = A, i = void 0);
		let d = o === A && e[t + 1].startsWith("/>") ? " " : "";
		a += o === k ? n + Te : l >= 0 ? (r.push(s), n.slice(0, l) + Ce + n.slice(l) + T + d) : n + T + (l === -2 ? t : d);
	}
	return [Ie(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Re = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Le(t, n);
		if (this.el = e.createElement(l, r), F.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = F.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(Ce)) {
					let t = u[o++], n = i.getAttribute(e).split(T), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Ve : r[1] === "?" ? He : r[1] === "@" ? Ue : L
					}), i.removeAttribute(e);
				} else e.startsWith(T) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (Ne.test(i.tagName)) {
					let e = i.textContent.split(T), t = e.length - 1;
					if (t > 0) {
						i.textContent = xe ? xe.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], D()), F.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], D());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === we) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(T, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += T.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = E.createElement("template");
		return n.innerHTML = e, n;
	}
};
function I(e, t, n = e, r) {
	if (t === N) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = O(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = I(e, i._$AS(e, t.values), i, r)), t;
}
var ze = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? E).importNode(t, !0);
		F.currentNode = r;
		let i = F.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Be(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new We(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = F.nextNode(), a++);
		}
		return F.currentNode = E, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Be = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = P, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = I(this, e, t), O(e) ? e === P || e == null || e === "" ? (this._$AH !== P && this._$AR(), this._$AH = P) : e !== this._$AH && e !== N && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? De(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== P && O(this._$AH) ? this._$AA.nextSibling.data = e : this.T(E.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Re.createElement(Ie(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new ze(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Fe.get(e.strings);
		return t === void 0 && Fe.set(e.strings, t = new Re(e)), t;
	}
	k(t) {
		Ee(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(D()), this.O(D()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = be(e).nextSibling;
			be(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, L = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = P, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = P;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = I(this, e, t, 0), a = !O(e) || e !== this._$AH && e !== N, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = I(this, r[n + o], t, o), s === N && (s = this._$AH[o]), a ||= !O(s) || s !== this._$AH[o], s === P ? e = P : e !== P && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === P ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Ve = class extends L {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === P ? void 0 : e;
	}
}, He = class extends L {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== P);
	}
}, Ue = class extends L {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = I(this, e, t, 0) ?? P) === N) return;
		let n = this._$AH, r = e === P && n !== P || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== P && (n === P || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, We = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		I(this, e);
	}
}, Ge = ye.litHtmlPolyfillSupport;
Ge?.(Re, Be), (ye.litHtmlVersions ??= []).push("3.3.3");
var Ke = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Be(t.insertBefore(D(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, qe = globalThis, R = class extends w {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ke(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return N;
	}
};
R._$litElement$ = !0, R.finalized = !0, qe.litElementHydrateSupport?.({ LitElement: R });
var Je = qe.litElementPolyfillSupport;
Je?.({ LitElement: R }), (qe.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/lit-html/directive.js
var Ye = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, Xe = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), Ze = class {
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
}, Qe = "important", $e = " !" + Qe, et = Xe(class extends Ze {
	constructor(e) {
		if (super(e), e.type !== Ye.ATTRIBUTE || e.name !== "style" || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
				let t = typeof r == "string" && r.endsWith($e);
				e.includes("-") || t ? n.setProperty(e, t ? r.slice(0, -11) : r, t ? Qe : "") : n[e] = r;
			}
		}
		return N;
	}
}), z = (e = "") => e.split(".")[0], tt = /* @__PURE__ */ new Set([
	"off",
	"closed",
	"idle",
	"standby",
	"paused",
	"unavailable",
	"unknown",
	"locked",
	"docked"
]), nt = (e) => !e || e.state === "unavailable" || e.state === "unknown", rt = (e) => !!e && !tt.has(e.state), it = {
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
}, B = (e, t) => t ?? e?.attributes.icon ?? (it[z(e?.entity_id)]?.[+!rt(e)] || "mdi:help-circle-outline"), at = (e, t) => t ?? e?.attributes.friendly_name ?? e?.entity_id ?? "", ot = (e) => ({
	light: "var(--gc-light)",
	fan: "var(--gc-fan)",
	cover: "var(--gc-cover)",
	climate: "var(--gc-heat)",
	media_player: "var(--gc-media)"
})[z(e?.entity_id)] ?? "var(--gc-accent)", st = /* @__PURE__ */ new Set([
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
]), ct = (e) => e ? st.has(e) ? `var(--${e}-color)` : e : void 0;
function lt(e) {
	if (!e) return;
	let t = e.entity_id, n = e.attributes;
	switch (z(t)) {
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
var ut = /* @__PURE__ */ new Set([
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
function dt(e, t) {
	let n = z(t.entity_id), r = t.entity_id;
	return n === "cover" ? e.callService("cover", "toggle", { entity_id: r }) : n === "lock" ? e.callService("lock", t.state === "locked" ? "unlock" : "lock", { entity_id: r }) : n === "scene" || n === "script" ? e.callService(n, "turn_on", { entity_id: r }) : n === "button" || n === "input_button" ? e.callService(n, "press", { entity_id: r }) : ut.has(n) ? e.callService(n, "toggle", { entity_id: r }) : e.callService("homeassistant", "toggle", { entity_id: r });
}
//#endregion
//#region src/core/fire.ts
function V(e, t, n) {
	e.dispatchEvent(new CustomEvent(t, {
		detail: n,
		bubbles: !0,
		composed: !0
	}));
}
var H = (e = "light") => V(window, "haptic", e), ft;
function pt(e, t) {
	ft = t?.getBoundingClientRect();
	let n = e.startsWith("#") ? e : `#${e}`;
	location.hash !== n && history.pushState({ glidePopup: !0 }, "", n), window.dispatchEvent(new CustomEvent("glide-hash"));
}
function mt(e, t) {
	if (e.startsWith("#")) return pt(e, t);
	history.pushState(null, "", e), V(window, "location-changed", { replace: !1 });
}
function U(e, t, n, r) {
	if (n && n.action !== "none") switch (H(n.action === "toggle" ? "light" : "selection"), n.action) {
		case "toggle": {
			let e = r ? t.states[r] : void 0;
			e && dt(t, e);
			return;
		}
		case "more-info":
			r && V(e, "hass-more-info", { entityId: r });
			return;
		case "popup":
		case "navigate":
			n.navigation_path && mt(n.navigation_path, e);
			return;
		default: V(e, "hass-action", {
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
function ht(e = 170, t = 22, n = 1, r = 48) {
	let i = Math.sqrt(e / n), a = t / (2 * Math.sqrt(e * n)), o = i * Math.sqrt(Math.max(0, 1 - a * a)), s = (e) => a < 1 ? 1 - Math.exp(-a * i * e) * (Math.cos(o * e) + a * i / o * Math.sin(o * e)) : 1 - Math.exp(-i * e) * (1 + i * e), c = Math.min(1.2, Math.log(1e3) / (a * i)), l = Array.from({ length: r + 1 }, (e, t) => +s(t / r * c).toFixed(4));
	return l[r] = 1, {
		easing: `linear(${l.join(",")})`,
		duration: Math.round(c * 1e3)
	};
}
var gt = () => matchMedia("(prefers-reduced-motion: reduce)").matches, _t = {
	shine: "Glass shine",
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
}, vt = "shine", yt = (e) => typeof e == "string" && e in _t;
function bt(e, t) {
	if (yt(e)) return e;
	let n = getComputedStyle(t).getPropertyValue("--glide-tap-animation").trim();
	return yt(n) ? n : vt;
}
var xt = "cubic-bezier(.2,.8,.2,1)", W = "cubic-bezier(.2,.9,.3,1.25)", G = /* @__PURE__ */ new WeakMap(), K = (e, t) => `color-mix(in srgb, ${e} ${t}%, transparent)`;
function St(e, t, n) {
	if (t === "none" || t === "press" || gt()) return;
	Ct(e);
	let r = e.offsetWidth || e.getBoundingClientRect().width, i = e.offsetHeight || e.getBoundingClientRect().height, a = n.x ?? r / 2, o = n.y ?? i / 2, s = { anims: [] };
	G.set(e, s);
	let c = (e, t, n, r = xt) => {
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
	], n, W), u = () => {
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
			c(d(`left:${a - e}px;top:${o - e}px;width:${e * 2}px;height:${e * 2}px;border-radius:50%;background:${K(n.color, 35)}`), [{
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
			c(e, [{ boxShadow: `${r}0 0 0 0 ${K(n.color, 70)}` }, { boxShadow: `${r}0 0 0 14px ${K(n.color, 0)}` }], 700, "ease-out");
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
			], 550, W);
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
			], 480, W);
			break;
		case "bloom": {
			let e = Math.hypot(r, i);
			c(d(`left:${a - e}px;top:${o - e}px;width:${e * 2}px;height:${e * 2}px;border-radius:50%;background:radial-gradient(circle,${K(n.color, 60)},${K(n.color, 20)} 60%,transparent 70%)`), [
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
			], 400, W) : l(.98, 300);
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
		], 450, W);
	}
	Promise.all(s.anims.map((e) => e.finished)).then(() => G.get(e) === s && Ct(e), () => {});
}
function Ct(e) {
	let t = G.get(e);
	t && (G.delete(e), t.anims.forEach((e) => e.cancel()), t.layer?.remove());
}
//#endregion
//#region src/core/base-card.ts
var q = x`
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
function wt(e) {
	if (e !== void 0) return e;
	try {
		let e = localStorage.getItem("glide-card-lite");
		if (e === "1" || e === "0") return e === "1";
	} catch {}
	let t = navigator.deviceMemory;
	return t !== void 0 && t <= 2;
}
var Tt = [
	"100% 100%",
	"0% 100%",
	"100% 0%",
	"15% 0%",
	"85% 110%",
	"0% 30%"
];
function Et(e) {
	let t = e, n = t.entity ?? t.name ?? t.title ?? JSON.stringify(e), r = 2166136261;
	for (let e = 0; e < n.length; e++) r = Math.imul(r ^ n.charCodeAt(e), 16777619) >>> 0;
	return {
		tint: r % 5 + 1,
		glowAt: Tt[(r >>> 8) % Tt.length]
	};
}
var J = class extends R {
	constructor(...e) {
		super(...e), this.editMode = !1, this.theme = p(), this.themeKey = "";
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
		let t = Et(e);
		this.style.setProperty("--gc-tint", `var(--gc-tint-${t.tint})`), this.style.setProperty("--gc-glow-at", t.glowAt), this.theme = p(e.theme);
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
		let e = g(this.config.theme, this), t = _(this.config.mode, this.hass?.themes?.darkMode), n = `${e}|${t}|${this.config.accent ?? ""}|${this.config.lite}|${this.config.tap_animation ?? ""}`;
		if (n === this.themeKey) return;
		this.themeKey = n, this.theme = p(e), this.toggleAttribute("dark", t), this.toggleAttribute("lite", wt(this.config.lite)), this.dataset.theme = e, this.setAttribute("tap-fx", bt(this.config.tap_animation, this)), this.config.accent ? this.style.setProperty("--gc-accent", this.config.accent) : this.style.removeProperty("--gc-accent");
		let r = this.constructor.elementStyles.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
		this.renderRoot.adoptedStyleSheets = [...r, h(e, t, this.cardType)];
	}
	playTapFx(e, t, n = {}) {
		let r = bt(this.config.tap_animation, this), i = e.getBoundingClientRect(), a = getComputedStyle(e), o = [
			"--domain",
			"--chip",
			"--c",
			"--gc-accent"
		].map((e) => a.getPropertyValue(e).trim()).find(Boolean) ?? "#ff9f43";
		St(e, r, {
			x: t && t.x - i.left,
			y: t && t.y - i.top,
			color: o,
			...n
		});
	}
	stateOf(e) {
		return e ? this.hass?.states[e] : void 0;
	}
}, Dt = 500, Ot = 250, kt = 250, At = 8;
function jt(e, t) {
	let n = 0, r = 0, i = 0, a = 0, o = 0, s = 0, c = 0, l = "x", u = !1, d = "idle", f = () => {
		clearTimeout(o), clearTimeout(c);
	}, p = () => e.getBoundingClientRect().width || 1, m = () => e.getBoundingClientRect().height || 1, ee = () => getComputedStyle(e).direction === "rtl", te = (e) => {
		e.button === 0 && (n = e.clientX, r = e.clientY, d = "down", f(), l = t.axis?.() ?? "x", u = l === "y" && e.pointerType !== "touch", l === "y" && !u && t.dragStart && (c = window.setTimeout(() => {
			u = !0, t.arm?.();
		}, kt)), t.hold && (o = window.setTimeout(() => {
			d = "held", t.hold();
		}, Dt)));
	}, h = (o) => {
		if (d === "down") {
			let a = o.clientX - n, s = o.clientY - r;
			if (Math.abs(a) < At && Math.abs(s) < At) return;
			f();
			let c = l === "y" ? u && Math.abs(s) > Math.abs(a) : Math.abs(a) > Math.abs(s);
			t.dragStart && c ? (d = "drag", i = t.dragStart(), e.setPointerCapture(o.pointerId)) : d = "cancel";
		}
		if (d === "drag") {
			let e = l === "y" ? (r - o.clientY) / m() * 100 : (o.clientX - n) / p() * 100 * (ee() ? -1 : 1);
			a = Math.round(Math.min(100, Math.max(0, i + e))), t.drag?.(a);
		}
	}, g = () => {
		if (f(), u = !1, d === "drag") t.dragEnd?.(a);
		else if (d === "down") {
			if (t.doubleTap) {
				let e = {
					x: n,
					y: r
				};
				s ? (clearTimeout(s), s = 0, t.doubleTap(e)) : s = window.setTimeout(() => {
					s = 0, t.tap?.(e);
				}, Ot);
			} else t.tap?.({
				x: n,
				y: r
			});
		}
		d = "idle";
	}, _ = () => {
		f(), u = !1, d === "drag" && t.dragEnd?.(a), d = "idle";
	}, v = (e) => {
		t.hold && e.preventDefault();
	}, y = (e) => {
		u && (d === "down" || d === "drag") && e.preventDefault();
	}, b = (e) => {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), t.tap?.());
	};
	return e.addEventListener("pointerdown", te), e.addEventListener("pointermove", h), e.addEventListener("pointerup", g), e.addEventListener("pointercancel", _), e.addEventListener("contextmenu", v), e.addEventListener("keydown", b), e.addEventListener("touchmove", y, { passive: !1 }), () => {
		f(), clearTimeout(s), e.removeEventListener("pointerdown", te), e.removeEventListener("pointermove", h), e.removeEventListener("pointerup", g), e.removeEventListener("pointercancel", _), e.removeEventListener("contextmenu", v), e.removeEventListener("keydown", b), e.removeEventListener("touchmove", y);
	};
}
//#endregion
//#region src/core/i18n.ts
var Mt = {
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
	close: "Close"
}, Nt = {
	en: Mt,
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
		close: "סגירה"
	}
};
function Y(e, t) {
	return (Nt[(e?.locale?.language ?? e?.language ?? "en").split("-")[0]] ?? Mt)[t] ?? Mt[t];
}
function Pt(e, t) {
	let n = e.states[t];
	if (!n) return Y(e, "unavailable");
	let r = e.formatEntityState;
	return r ? r(n) : (Y(e, n.state) ?? n.state) || n.state;
}
//#endregion
//#region src/core/templates.ts
var Ft = (e) => typeof e == "string" && /\{\{|\{%/.test(e), It = class {
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
		return Ft(n) ? e in this.values ? this.values[e] : t : typeof n == "string" ? n : t;
	}
	sync() {
		let { hass: e, config: t, entity: n } = this.ctx(), r = e?.connection;
		if (r) {
			r !== this.conn && (this.clear(), this.conn = r);
			for (let [i, a] of Object.entries(this.fields())) {
				let o = this.subs.get(i);
				if (!Ft(a)) {
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
}, Lt = (e) => e && /^[\w-]+:[\w-]+$/.test(e.trim()) ? e.trim() : void 0, Rt = /* @__PURE__ */ new Set([
	"scene",
	"script",
	"button",
	"input_button"
]), zt = /* @__PURE__ */ new Set([
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
]), Bt = class extends J {
	constructor(...e) {
		super(...e), this.cardType = "button", this.templateRev = 0, this.tpl = new It(this, () => {
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
			...J.properties,
			dragValue: { state: !0 },
			templateRev: { state: !0 }
		};
	}
	get layout() {
		return this.config.layout ?? this.theme.defaults?.buttonLayout ?? "tile";
	}
	getGridOptions() {
		return this.layout === "pill" ? {
			columns: 12,
			rows: 1,
			min_columns: 6
		} : {
			columns: 6,
			rows: 2,
			min_columns: 3,
			min_rows: 2
		};
	}
	getCardSize() {
		return this.layout === "pill" ? 1 : 2;
	}
	action(e) {
		let t = this.config[`${e}_action`];
		if (t) return t;
		let n = this.config.entity;
		if (e === "tap") return { action: n && zt.has(z(n)) ? "toggle" : "more-info" };
		if (e === "hold") return { action: "more-info" };
	}
	willUpdate(e) {
		if (super.willUpdate(e), e.has("hass") && this.dragValue !== void 0 && e.get("hass")) {
			let t = this.config.entity;
			e.get("hass").states[t] !== this.hass?.states[t] && (this.dragValue = void 0);
		}
	}
	firstUpdated() {
		let e = this.renderRoot.querySelector(".surface"), t = -1;
		this.detach = jt(e, {
			axis: () => this.isCover ? "y" : "x",
			arm: () => H("selection"),
			tap: (t) => {
				this.playTapFx(e, t, {
					icon: e.querySelector(".icon"),
					badge: e.querySelector(".badge")
				}), this.hass && U(this, this.hass, this.action("tap"), this.config.entity);
			},
			hold: () => this.hass && U(this, this.hass, this.action("hold"), this.config.entity),
			doubleTap: this.config.double_tap_action ? (t) => {
				this.playTapFx(e, t, {
					icon: e.querySelector(".icon"),
					badge: e.querySelector(".badge")
				}), this.hass && U(this, this.hass, this.action("double_tap"), this.config.entity);
			} : void 0,
			dragStart: () => {
				let e = this.slider;
				return t = -1, e ? e.value : NaN;
			},
			drag: (e) => {
				if (!this.slider) return;
				this.dragValue = e;
				let n = Math.floor(e / 10);
				n !== t && (t = n, H("selection"));
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
		return this.config.slider === !1 ? void 0 : lt(this.stateOf(this.config.entity));
	}
	get isCover() {
		return z(this.config.entity) === "cover" && !!this.slider;
	}
	render() {
		let e = this.stateOf(this.config.entity), t = this.slider, n = this.dragValue ?? t?.value, r = this.isCover, i = !r && (this.dragValue === void 0 ? rt(e) : this.dragValue > 0), a = this.hass && this.config.entity && e ? Pt(this.hass, this.config.entity) : "", o = Rt.has(z(this.config.entity)), s = at(e, this.tpl.get("name") || void 0), c = (this.config.badge === void 0 ? void 0 : this.tpl.get("badge") ?? "") ?? (o ? "" : r ? `${n}%` : a), l = this.config.secondary === void 0 ? r ? `${n}% ${a}` : t && i && n !== void 0 ? `${n}%` : "" : this.tpl.get("secondary") ?? "", u = t ? n ?? 0 : i ? 100 : 0;
		return j`
      <div
        class="surface ${this.layout} ${i ? "on" : ""} ${r ? "cover" : ""} ${nt(e) && this.config.entity ? "unavailable" : ""}"
        style=${et({
			"--domain": ct(this.tpl.get("color")?.trim()) ?? ot(e),
			"--fill": `${u}%`
		})}
        role="button"
        tabindex="0"
        aria-label=${s}
      >
        <div class="fill ${this.dragValue === void 0 ? "" : "dragging"}"></div>
        <div class="icon"><ha-icon .icon=${B(e, Lt(this.tpl.get("icon")))}></ha-icon></div>
        <div class="text">
          <div class="name">${s}</div>
          ${l ? j`<div class="meta">${l}</div>` : P}
        </div>
        ${c ? j`<div class="badge meta">${c}</div>` : P}
      </div>
    `;
	}
	static {
		this.styles = [q, x`
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
    `];
	}
};
customElements.define("glide-button", Bt);
//#endregion
//#region src/cards/sheet.ts
var Vt = "(min-width: 768px)", Ht = 120, Ut = .6, Wt = [
	"hass-more-info",
	"show-dialog",
	"hass-notification",
	"hass-action",
	"ll-custom"
], Gt = CSS.supports?.("animation-timing-function", "linear(0, 1)"), Kt = (e, t) => Gt ? ht(e, t) : {
	easing: "cubic-bezier(.2,.9,.25,1)",
	duration: 420
}, qt = 0, Jt = (e) => {
	qt = Math.max(0, qt + (e ? 1 : -1)), document.documentElement.style.overflow = qt ? "hidden" : "";
}, Yt = class extends J {
	static {
		this.properties = {
			...J.properties,
			open: {
				type: Boolean,
				reflect: !0
			}
		};
	}
	constructor() {
		super(), this.cardType = "popup", this.open = !1, this.children_ = [], this.built = !1, this.locked = !1, this.forward = (e) => {
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
		for (let e of Wt) this.addEventListener(e, this.forward);
		this.addEventListener("keydown", (e) => e.key === "Escape" && this.requestClose());
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.lock(!1);
	}
	lock(e) {
		this.locked === e || e && !this.isConnected || (this.locked = e, Jt(e));
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
			let n = t.type === "custom:glide-card" ? {
				...t,
				theme: t.theme ?? this.config.theme,
				tap_animation: t.tap_animation ?? this.config.tap_animation
			} : t, r = e.createCardElement(n);
			this.hass && (r.hass = this.hass);
			let i = r.getGridOptions?.() ?? {};
			return r.style.setProperty("--cols", String(typeof i.columns == "number" ? i.columns : 12)), typeof i.rows == "number" && r.style.setProperty("--rows", String(i.rows)), r;
		}), this.requestUpdate());
	}
	requestClose() {
		this.open && (H("light"), history.state?.glidePopup ? history.back() : (history.replaceState(history.state, "", location.pathname + location.search), window.dispatchEvent(new CustomEvent("glide-hash"))));
	}
	updated(e) {
		super.updated(e), e.has("open") && (e.get("open") !== void 0 || this.open) && (this.open ? (this.build(), this.origin = ft, this.lock(!0), this.animateOpen()) : (this.lock(!1), this.animateClose()));
	}
	get panel() {
		return this.renderRoot.querySelector(".panel");
	}
	get scrim() {
		return this.renderRoot.querySelector(".scrim");
	}
	animateOpen() {
		this.style.visibility = "visible";
		let e = this.panel;
		if (e.getAnimations().forEach((e) => e.cancel()), e.style.transform = "", e.focus({ preventScroll: !0 }), this.scrim.animate([{ opacity: 0 }, { opacity: 1 }], {
			duration: 250,
			fill: "backwards"
		}), gt()) return;
		let { easing: t, duration: n } = Kt(), r = this.origin, i = e.getBoundingClientRect();
		if (r && r.width && r.bottom > 0 && r.top < innerHeight) {
			let a = `translate(${r.left - i.left}px, ${r.top - i.top}px) scale(${r.width / i.width}, ${r.height / i.height})`;
			e.style.transformOrigin = "0 0", e.animate([{
				transform: a,
				opacity: .5
			}, {
				transform: "none",
				opacity: 1
			}], {
				duration: n,
				easing: t,
				fill: "backwards"
			}).finished.then(() => e.style.transformOrigin = "", () => e.style.transformOrigin = ""), this.renderRoot.querySelector(".content")?.animate([
				{ opacity: 0 },
				{
					opacity: 0,
					offset: .35
				},
				{ opacity: 1 }
			], {
				duration: n,
				fill: "backwards"
			});
		} else matchMedia(Vt).matches ? e.animate([{
			transform: "scale(.92)",
			opacity: 0
		}, {
			transform: "none",
			opacity: 1
		}], {
			duration: n,
			easing: t,
			fill: "backwards"
		}) : e.animate([{ transform: "translateY(100%)" }, { transform: "none" }], {
			duration: n,
			easing: t,
			fill: "backwards"
		});
	}
	animateClose() {
		let e = this.panel, t = e.style.transform || "none", n = matchMedia(Vt).matches ? {
			transform: "scale(.94)",
			opacity: 0
		} : {
			transform: "translateY(100%)",
			opacity: 1
		}, r = gt() ? 0 : 260;
		this.scrim.animate([{ opacity: getComputedStyle(this.scrim).opacity }, { opacity: 0 }], {
			duration: r,
			fill: "forwards"
		}), e.animate([{
			transform: t,
			opacity: 1
		}, n], {
			duration: r,
			easing: "cubic-bezier(.4,0,.8,.4)",
			fill: "forwards"
		}).finished.then(() => {
			this.open || (this.style.visibility = "hidden", e.style.transform = "", e.getAnimations().forEach((e) => e.cancel()), this.scrim.getAnimations().forEach((e) => e.cancel()));
		}).catch(() => {});
	}
	onDragStart(e) {
		if (matchMedia(Vt).matches || e.button !== 0 || e.target.closest("button")) return;
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
			if (n.removeEventListener("pointermove", s), n.removeEventListener("pointerup", c), n.removeEventListener("pointercancel", c), this.scrim.style.opacity = "", o > Ht || a > Ut) return this.requestClose();
			let { easing: e, duration: r } = Kt(260, 24), i = t.style.transform;
			t.style.transform = "", t.animate([{ transform: i }, { transform: "none" }], {
				duration: r,
				easing: e
			});
		};
		n.addEventListener("pointermove", s), n.addEventListener("pointerup", c), n.addEventListener("pointercancel", c);
	}
	render() {
		if (!this.config) return P;
		let e = this.config, t = this.stateOf(e.entity);
		return j`
      <div class="scrim" @click=${() => this.requestClose()}></div>
      <div class="panel surface" role="dialog" aria-modal="true" aria-label=${e.title ?? ""} tabindex="-1">
        <div class="handle" @pointerdown=${(e) => this.onDragStart(e)}>
          <div class="grabber"></div>
          <header>
            ${e.icon || t ? j`<div class="icon"><ha-icon .icon=${e.icon ?? B(t)}></ha-icon></div>` : P}
            <div class="titles">
              <div class="title">${e.title ?? ""}</div>
              ${t && this.hass ? j`<div class="meta">${Pt(this.hass, e.entity)}</div>` : P}
            </div>
            <button class="close" aria-label=${Y(this.hass, "close")} @click=${() => this.requestClose()}>
              <ha-icon icon="mdi:close" .icon=${"mdi:close"}></ha-icon>
            </button>
          </header>
        </div>
        <div class="content">${this.children_}</div>
      </div>
    `;
	}
	static {
		this.styles = [q, x`
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
        .panel {
          inset: 50% auto auto 50%;
          bottom: auto;
          width: min(600px, 92vw);
          max-height: 85dvh;
          translate: -50% -50%;
          border-radius: var(--gc-radius);
          border-bottom: 1px solid var(--gc-border);
        }
        .grabber { visibility: hidden; height: 0; margin: 6px; }
        .handle { cursor: default; }
      }
    `];
	}
};
customElements.define("glide-sheet", Yt);
var X = /* @__PURE__ */ new Map(), Xt, Zt = (e) => e.startsWith("#") ? e : `#${e}`;
function Qt(e, t) {
	let n = Zt(e.hash), r = X.get(n);
	if (!r) {
		let e = document.createElement("glide-sheet");
		document.body.appendChild(e), X.set(n, r = {
			el: e,
			owners: /* @__PURE__ */ new Set()
		});
	}
	r.owners.add(t), r.el.setConfig(e), Xt && r.el.setHass(Xt), tn();
}
function $t(e, t) {
	let n = X.get(Zt(e));
	n && n.owners.delete(t) && !n.owners.size && (n.el.remove(), X.delete(Zt(e)));
}
function en(e) {
	Xt = e, X.forEach(({ el: t }) => t.setHass(e));
}
function tn() {
	let e = decodeURIComponent(location.hash);
	X.forEach(({ el: t }, n) => t.open = n === e);
}
for (let e of [
	"popstate",
	"hashchange",
	"glide-hash",
	"location-changed"
]) window.addEventListener(e, tn);
//#endregion
//#region src/cards/popup.ts
var nn = class extends J {
	constructor(...e) {
		super(...e), this.cardType = "popup";
	}
	setConfig(e) {
		if (!e.hash) throw Error("Pop-up needs a `hash`, e.g. #living-room");
		if (!Array.isArray(e.cards)) throw Error("Pop-up needs a `cards` list");
		super.setConfig(e), this.isConnected && Qt(e, this);
	}
	shouldUpdate(e) {
		return e.has("hass") && this.hass && en(this.hass), e.has("editMode") || e.has("config") || super.shouldUpdate(e);
	}
	connectedCallback() {
		super.connectedCallback(), this.config && Qt(this.config, this);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		let e = this.config?.hash;
		setTimeout(() => !this.isConnected && e && $t(e, this), 1e3);
	}
	updated(e) {
		if (super.updated(e), e.has("editMode")) {
			let e = this.parentElement;
			e && (e.style.display = this.editMode ? "block" : "none"), V(this, "card-visibility-changed", { value: this.editMode });
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
		if (!this.editMode) return j``;
		let e = this.config;
		return j`
      <div class="surface">
        <ha-icon .icon=${e.icon ?? "mdi:card-outline"}></ha-icon>
        <div class="text">
          <div class="name">${e.title ?? Y(this.hass, "popup_placeholder")}</div>
          <div class="meta">${e.hash} · ${e.cards.length} cards</div>
        </div>
        <button @click=${(t) => pt(e.hash, t.currentTarget)}>Preview</button>
      </div>
    `;
	}
	static {
		this.styles = [q, x`
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
customElements.define("glide-popup", nn);
//#endregion
//#region src/cards/nav.ts
var rn = [
	"popstate",
	"location-changed",
	"glide-hash"
], an = () => location.pathname + location.hash, on = CSS.supports?.("animation-timing-function", "linear(0, 1)") ? ht(260, 26) : {
	easing: "cubic-bezier(.3,1.3,.4,1)",
	duration: 450
}, sn, cn = 1e3, ln = (e) => !!e && e.width > 0 && e.height > 0, un = class extends J {
	constructor(...e) {
		super(...e), this.cardType = "nav", this.onRoute = () => this.requestUpdate(), this.stale = !1;
	}
	setConfig(e) {
		if (!Array.isArray(e.items) || !e.items.length) throw Error("Nav needs an `items` list");
		super.setConfig(e);
	}
	watched() {
		return this.config.items.map((e) => e.entity);
	}
	connectedCallback() {
		super.connectedCallback(), rn.forEach((e) => window.addEventListener(e, this.onRoute)), this.rendered !== void 0 && this.rendered !== an() && (this.stale = !0, this.requestUpdate());
	}
	disconnectedCallback() {
		super.disconnectedCallback(), rn.forEach((e) => window.removeEventListener(e, this.onRoute));
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
		let t = e.navigation_path;
		return t.startsWith("#") ? decodeURIComponent(location.hash) === t : !location.hash && (location.pathname === t || location.pathname === t.replace(/\/$/, ""));
	}
	indRect() {
		return this.renderRoot.querySelector(".ind")?.getBoundingClientRect();
	}
	willUpdate(e) {
		super.willUpdate(e), this.from = this.stale ? void 0 : this.indRect();
	}
	updated() {
		let e = an(), t = this.rendered === void 0, n = !t && this.rendered !== e;
		this.rendered = e, this.stale = !1;
		let r = this.renderRoot.querySelector(".scroller");
		if (!r) return;
		r.classList.toggle("overflow", r.scrollWidth > r.clientWidth + 1);
		let i = this.renderRoot.querySelector(".ind");
		if (!i) return;
		let a = sn && performance.now() - sn.at < cn ? sn : void 0, o = n ? this.from : void 0, s = !o && (n || t) ? a : void 0;
		s && (r.scrollLeft = s.scroll);
		let c = o ?? s?.rect, l = i.getBoundingClientRect();
		ln(c) && ln(l) && !gt() && Math.abs(c.left - l.left) + Math.abs(c.width - l.width) > 1 && i.animate([{
			transform: `translateX(${c.left - l.left}px)`,
			width: `${c.width}px`
		}, {
			transform: "none",
			width: "100%"
		}], on);
		let u = r.querySelector("button.active");
		if (u && this.centred !== e && r.clientWidth > 0) {
			let t = r.getBoundingClientRect(), n = u.getBoundingClientRect(), i = this.centred || s ? "smooth" : "instant";
			r.scrollBy({
				left: n.left + n.width / 2 - (t.left + t.width / 2),
				behavior: i
			}), this.centred = e;
		}
	}
	item(e) {
		let t = this.isCurrent(e);
		return j`
      <button
        class=${t ? "active" : ""}
        aria-current=${t ? "page" : "false"}
        @click=${(t) => {
			H("selection");
			let n = t.currentTarget;
			this.playTapFx(n, t instanceof MouseEvent && t.detail ? {
				x: t.clientX,
				y: t.clientY
			} : void 0, { icon: n.querySelector("ha-icon") });
			let r = this.indRect(), i = this.renderRoot.querySelector(".scroller")?.scrollLeft ?? 0;
			sn = ln(r) ? {
				rect: r,
				scroll: i,
				at: performance.now()
			} : void 0, mt(e.navigation_path, t.currentTarget);
		}}
      >
        ${t ? j`<span class="ind"></span>` : P}
        <ha-icon .icon=${e.icon}></ha-icon>
        <span class="meta">${e.name}</span>
        ${e.entity && rt(this.stateOf(e.entity)) ? j`<i class="dot"></i>` : P}
      </button>
    `;
	}
	render() {
		let e = this.config.items.filter((e) => e.pinned);
		return j`
      <nav class="surface ${this.editMode ? "inline" : "floating"}">
        <div class="scroller">${this.config.items.filter((e) => !e.pinned).map((e) => this.item(e))}</div>
        ${e.length ? j`<div class="pinned">${e.map((e) => this.item(e))}</div>` : P}
      </nav>
    `;
	}
	static {
		this.styles = [q, x`
      nav {
        display: flex;
        padding: 6px;
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
        gap: 2px;
        flex: none;
        scroll-snap-align: center;
        min-width: 64px;
        padding: 8px 14px;
        border-radius: var(--gc-radius-control);
        color: var(--gc-text-dim);
        cursor: pointer;
        transition: color 0.2s;
      }
      @media (max-width: 600px) {
        button { min-width: 52px; padding: 8px 6px; }
      }
      button:focus-visible { outline: 2px solid var(--gc-accent); }
      button.active { color: var(--gc-accent-text); }
      button .meta { font-size: 11px; color: inherit; }
      .dot {
        position: absolute;
        top: 6px;
        inset-inline-end: 14px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--gc-accent);
      }
    `];
	}
};
customElements.define("glide-nav", un);
//#endregion
//#region src/cards/climate.ts
var dn = {
	heat: "mdi:fire",
	cool: "mdi:snowflake",
	heat_cool: "mdi:alpha-a-circle-outline",
	auto: "mdi:alpha-a-circle-outline",
	dry: "mdi:water-percent",
	fan_only: "mdi:fan",
	off: "mdi:power"
}, Z = 270, Q = 135, fn = 80, pn = 700, mn = (e) => `\u2066${e}°\u2069`, $ = (e) => {
	let t = e * Math.PI / 180;
	return [100 + fn * Math.cos(t), 100 + fn * Math.sin(t)];
}, hn = (e, t) => {
	let [n, r] = $(e), [i, a] = $(t);
	return `M ${n} ${r} A ${fn} ${fn} 0 ${+(t - e > 180)} 1 ${i} ${a}`;
}, gn = class extends J {
	constructor(...e) {
		super(...e), this.cardType = "climate", this.timer = 0;
	}
	static {
		this.properties = {
			...J.properties,
			pending: { state: !0 }
		};
	}
	setConfig(e) {
		if (!e.entity?.startsWith("climate.")) throw Error("Climate card needs a climate.* entity");
		super.setConfig(e);
	}
	getGridOptions() {
		return {
			columns: 12,
			rows: 8,
			min_columns: 6
		};
	}
	getCardSize() {
		return 8;
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
		i !== this.target && (this.pending = i, H("selection"), clearTimeout(this.timer), this.timer = window.setTimeout(() => {
			this.timer = 0, this.hass?.callService("climate", "set_temperature", {
				entity_id: this.config.entity,
				temperature: this.pending
			});
		}, pn));
	}
	get target() {
		return this.pending ?? this.s?.attributes.temperature;
	}
	onDial(e) {
		let t = e.currentTarget;
		if (this.target === void 0 || this.off) return;
		t.setPointerCapture(e.pointerId);
		let n = (e) => {
			let n = t.getBoundingClientRect(), r = (Math.atan2(e.clientY - (n.top + n.height / 2), e.clientX - (n.left + n.width / 2)) * 180 / Math.PI - Q + 720) % 360;
			r > Z && (r = r - Z < 45 ? Z : 0);
			let { min: i, max: a } = this.range;
			this.setTarget(i + r / Z * (a - i));
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
		if (!e) return j`<div class="surface empty">${this.config.entity}</div>`;
		let t = e.attributes, { min: n, max: r, step: i } = this.range, a = this.target, o = e.state === "off", s = this.modeColor(e.state), c = Q + (a === void 0 ? 0 : (a - n) / (r - n)) * Z, [l, u] = $(Q), [d, f] = $(c), p = Number(t.current_temperature), m = t.current_temperature != null && Number.isFinite(p), [ee, te] = $(Q + Math.min(1, Math.max(0, (p - n) / (r - n))) * Z), h = t.hvac_action, g = +(i < 1), _ = a === void 0 ? "" : mn(a.toFixed(g)), v = (e) => /[-־]$/.test(e) ? e : `${e} `, y = o || h === "off" ? Y(this.hass, "off") : h === "heating" ? v(Y(this.hass, "heating")) + _ : h === "cooling" ? v(Y(this.hass, "cooling")) + _ : [Y(this.hass, h === "idle" ? "idle" : e.state) ?? e.state, _].filter(Boolean).join(" · "), b = !o && [
			"heating",
			"cooling",
			"drying",
			"fan"
		].includes(h ?? "");
		return j`
      <div class="surface ${o ? "off" : ""}" style="--mode:${s}">
        <header>
          <div class="icon"><ha-icon .icon=${dn[e.state] ?? "mdi:thermostat"}></ha-icon></div>
          <div class="titles">
            <div class="name">${at(e, this.config.name)}</div>
            <div class="meta mode-text">${y}</div>
          </div>
          ${b ? j`<div class="chip meta"><i></i>${Y(this.hass, "active")}</div>` : P}
        </header>

        <div class="dial">
          <div class="ring">
            <svg class=${o ? "off" : ""} viewBox="0 0 200 200" @pointerdown=${(e) => this.onDial(e)} role="slider"
              aria-valuemin=${n} aria-valuemax=${r} aria-valuenow=${a ?? ""}
              aria-valuetext=${[a === void 0 ? "" : `${a.toFixed(g)}°`, m ? `${Y(this.hass, "current")} ${p.toFixed(g)}°` : ""].filter(Boolean).join(", ")} aria-label=${Y(this.hass, "target")} aria-disabled=${o ? "true" : "false"}>
              ${M`
                <defs>
                  <linearGradient id="arc" gradientUnits="userSpaceOnUse" x1=${l} y1=${u} x2=${d} y2=${f}>
                    <stop offset="0" style="stop-color:var(--mode);stop-opacity:.45" />
                    <stop offset="1" style="stop-color:var(--mode)" />
                  </linearGradient>
                </defs>
                <path class="track" d=${hn(Q, 405)} />`}
              ${a === void 0 ? P : M`<path class="value" d=${hn(Q, Math.max(135.5, c))} />`}
              ${m ? M`<circle class="room" cx=${ee} cy=${te} r="4" />` : P}
              ${a === void 0 ? P : M`<circle class="knob" cx=${d} cy=${f} r="9" />`}
            </svg>
            <div class="readout">
              <div class="target ${o ? "dim" : ""}">${a === void 0 ? "--" : a.toFixed(g)}<sup>°</sup></div>
              <div class="meta label">${Y(this.hass, o ? "off" : "target")}</div>
              ${t.current_temperature === void 0 ? P : j`<div class="meta current">${Y(this.hass, "current")} ${mn(typeof t.current_temperature == "number" ? t.current_temperature.toFixed(g) : t.current_temperature)}</div>`}
            </div>
          </div>
        </div>

        <div class="steppers">
          <button class="round" aria-label="-" ?disabled=${o} @click=${() => a !== void 0 && this.setTarget(a - i)}><ha-icon icon="mdi:minus" .icon=${"mdi:minus"}></ha-icon></button>
          <span class="meta">${o ? "" : j`${Y(this.hass, "step")}: ${mn(i)}`}</span>
          <button class="round" aria-label="+" ?disabled=${o} @click=${() => a !== void 0 && this.setTarget(a + i)}><ha-icon icon="mdi:plus" .icon=${"mdi:plus"}></ha-icon></button>
        </div>

        <div class="modes">
          ${(t.hvac_modes ?? []).map((t) => j`
              <button class=${t === e.state ? "on" : ""} style="--c:${this.modeColor(t)}" aria-pressed=${t === e.state ? "true" : "false"}
                @click=${() => {
			H("light"), this.hass?.callService("climate", "set_hvac_mode", {
				entity_id: e.entity_id,
				hvac_mode: t
			});
		}}>
                <ha-icon .icon=${dn[t] ?? "mdi:thermostat"}></ha-icon>
                <span class="meta">${Y(this.hass, t) ?? t}</span>
              </button>
            `)}
        </div>
      </div>
    `;
	}
	static {
		this.styles = [q, x`
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
    `];
	}
};
customElements.define("glide-climate", gn);
//#endregion
//#region src/cards/media.ts
var _n = {
	PAUSE: 1,
	VOLUME_SET: 4,
	PREV: 16,
	NEXT: 32,
	PLAY: 16384
}, vn = (e) => `${Math.floor(e / 60)}:${String(Math.floor(e % 60)).padStart(2, "0")}`, yn = class extends J {
	constructor(...e) {
		super(...e), this.cardType = "media", this.tick = 0;
	}
	static {
		this.properties = {
			...J.properties,
			volDrag: { state: !0 }
		};
	}
	setConfig(e) {
		if (!e.entity?.startsWith("media_player.")) throw Error("Media card needs a media_player.* entity");
		super.setConfig(e);
	}
	getGridOptions() {
		return {
			columns: 12,
			rows: 4,
			min_columns: 6
		};
	}
	getCardSize() {
		return 4;
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
		H("light"), this.hass?.callService("media_player", e, {
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
		if (!e) return j`<div class="surface empty">${this.config.entity}</div>`;
		let t = e.attributes, n = nt(e) || e.state === "off" || e.state === "idle" || e.state === "standby" || !t.media_title, r = t.supported_features ?? 0, i = this.position(), a = t.media_duration, o = this.volDrag ?? Math.round((t.volume_level ?? 0) * 100), s = e.state === "playing", c = t.entity_picture;
		return j`
      <div class="surface ${s ? "playing" : ""}">
        ${c ? j`<div class="art-bg" style=${et({ backgroundImage: `url("${c}")` })}></div>` : P}
        <div class="top">
          <div class="art">${c ? j`<img src=${c} alt="" loading="lazy" />` : j`<ha-icon icon="mdi:music" .icon=${"mdi:music"}></ha-icon>`}</div>
          <div class="info">
            <div class="meta source">${[t.app_name ?? t.source, at(e, this.config.name)].filter(Boolean).join(" • ")}</div>
            <div class="title">${n ? Y(this.hass, "nothing_playing") : t.media_title}</div>
            ${!n && t.media_artist ? j`<div class="artist">${t.media_artist}</div>` : P}
          </div>
        </div>

        ${!n && i !== void 0 && a ? j`
              <div class="progress"><div style="width:${i / a * 100}%"></div></div>
              <div class="times meta"><span>${vn(i)}</span><span>${vn(a)}</span></div>
            ` : P}

        <div class="controls">
          ${r & _n.PREV ? j`<button aria-label="previous" @click=${() => this.call("media_previous_track")}><ha-icon icon="mdi:skip-previous" .icon=${"mdi:skip-previous"}></ha-icon></button>` : P}
          <button class="play" aria-label=${s ? "pause" : "play"} @click=${() => this.call("media_play_pause")}>
            <ha-icon .icon=${s ? "mdi:pause" : "mdi:play"}></ha-icon>
          </button>
          ${r & _n.NEXT ? j`<button aria-label="next" @click=${() => this.call("media_next_track")}><ha-icon icon="mdi:skip-next" .icon=${"mdi:skip-next"}></ha-icon></button>` : P}
        </div>

        ${r & _n.VOLUME_SET ? j`
              <div class="volume">
                <ha-icon icon="mdi:volume-low" .icon=${"mdi:volume-low"}></ha-icon>
                <div class="track" role="slider" aria-label="volume" aria-valuenow=${o} aria-valuemin="0" aria-valuemax="100"
                  @pointerdown=${(e) => this.onVolume(e)}>
                  <div class="bar" style="width:${o}%"></div>
                </div>
                <ha-icon icon="mdi:volume-high" .icon=${"mdi:volume-high"}></ha-icon>
              </div>
            ` : P}
      </div>
    `;
	}
	static {
		this.styles = [q, x`
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
    `];
	}
};
customElements.define("glide-media", yn);
//#endregion
//#region src/core/format.ts
var bn = (e) => e.locale?.language ?? e.language ?? "en", xn = (e) => e.attributes.device_class === "timestamp" || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(e.state), Sn = (e, t = "en") => new Intl.DateTimeFormat(t, {
	hour: "2-digit",
	minute: "2-digit",
	hourCycle: "h23"
}).format(new Date(e));
function Cn(e, t, n) {
	let r = e;
	if (n) {
		let i = t.attributes[n];
		return i === void 0 ? "" : typeof i == "string" && /^\d{4}-\d{2}-\d{2}T/.test(i) ? Sn(i, bn(e)) : r.formatEntityAttributeValue?.(t, n) ?? String(i);
	}
	if (z(t.entity_id) === "weather") {
		let n = t.attributes.temperature, r = Pt(e, t.entity_id);
		return n === void 0 ? r : `${r} · ${n} ${t.attributes.temperature_unit ?? "°C"}`;
	}
	return xn(t) && !Number.isNaN(Date.parse(t.state)) ? Sn(t.state, bn(e)) : Pt(e, t.entity_id);
}
//#endregion
//#region src/cards/chips.ts
var wn = class extends J {
	constructor(...e) {
		super(...e), this.cardType = "chips", this.detachers = [];
	}
	setConfig(e) {
		if (!Array.isArray(e.chips)) throw Error("Chips card needs a `chips` list");
		super.setConfig(e);
	}
	watched() {
		return this.config.chips.map((e) => e.entity);
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
	updated(e) {
		super.updated(e), e.has("config") && this.bind();
	}
	connectedCallback() {
		super.connectedCallback(), this.hasUpdated && !this.detachers.length && this.bind();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.unbind();
	}
	unbind() {
		this.detachers.forEach((e) => e()), this.detachers = [];
	}
	bind() {
		this.unbind(), this.renderRoot.querySelectorAll(".chip").forEach((e, t) => {
			let n = this.config.chips[t], r = (t) => {
				let r = n[`${t}_action`] ?? { action: "more-info" };
				this.hass && U(e, this.hass, r, n.entity);
			};
			this.detachers.push(jt(e, {
				tap: (t) => {
					this.playTapFx(e, t, { icon: e.querySelector("ha-icon") }), r("tap");
				},
				hold: () => r("hold")
			}));
		});
	}
	renderChip(e) {
		let t = this.stateOf(e.entity), n = e.value ?? (t && this.hass ? Cn(this.hass, t, e.attribute) : "");
		return j`
      <div class="chip surface" role="button" tabindex="0" style="--chip:${ct(e.color) ?? (t ? ot(t) : "var(--gc-accent)")}">
        <ha-icon .icon=${B(t, e.icon)}></ha-icon>
        <div class="text">
          ${e.name === "" ? P : j`<div class="label">${at(t, e.name)}</div>`}
          <div class="value">${n}</div>
        </div>
      </div>
    `;
	}
	render() {
		return j`<div class="row ${this.config.align === "start" ? "start" : ""}">${this.config.chips.map((e) => this.renderChip(e))}</div>`;
	}
	static {
		this.styles = [q, x`
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
    `];
	}
};
customElements.define("glide-chips", wn);
//#endregion
//#region src/cards/title.ts
var Tn = class extends J {
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
		return 2;
	}
	render() {
		let e = this.config;
		return j`
      <div class="wrap ${e.align === "start" ? "start" : ""}">
        ${e.title ? j`<h1>${e.icon ? j`<ha-icon .icon=${e.icon}></ha-icon>` : P}${e.title}</h1>` : P}
        ${e.subtitle ? j`<p>${e.subtitle}</p>` : P}
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
  `;
	}
};
customElements.define("glide-title", Tn);
//#endregion
//#region src/cards/heading.ts
var En = (e) => e instanceof MouseEvent && e.detail ? {
	x: e.clientX,
	y: e.clientY
} : void 0, Dn = class extends J {
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
		this.playTapFx(n, En(e), { icon: n.querySelector(".icon") }), t && this.hass && U(e.currentTarget, this.hass, t);
	}
	badge(e) {
		let t = this.stateOf(e.entity), n = e.value ?? (t && this.hass ? Cn(this.hass, t, e.attribute) : "");
		return j`
      <button
        class="badge surface"
        style="--c:${ct(e.color) ?? (t ? ot(t) : "var(--gc-accent)")}"
        @click=${(t) => {
			t.stopPropagation();
			let n = t.currentTarget;
			this.playTapFx(n, En(t), { icon: n.querySelector("ha-icon") }), this.hass && U(t.currentTarget, this.hass, e.tap_action ?? { action: "more-info" }, e.entity);
		}}
      >
        ${e.icon || t ? j`<ha-icon .icon=${B(t, e.icon)}></ha-icon>` : P}
        <span>${n}</span>
      </button>
    `;
	}
	render() {
		let e = this.config, t = !!e.tap_action && e.tap_action.action !== "none";
		return j`
      <div class="row ${e.style === "subtitle" ? "small" : ""} ${t ? "linked" : ""}" @click=${t ? this.tap : void 0}
        role=${t ? "link" : "heading"} tabindex=${t ? "0" : "-1"}>
        ${e.icon ? j`<span class="icon" style="--c:${ct(e.color) ?? "var(--gc-accent)"}"><ha-icon .icon=${e.icon}></ha-icon></span>` : P}
        <span class="title">${e.title}</span>
        ${e.subtitle ? j`<span class="sub">${e.subtitle}</span>` : P}
        ${t ? j`<ha-icon class="chev" icon="mdi:chevron-right" .icon=${"mdi:chevron-right"}></ha-icon>` : P}
        <span class="line"></span>
        ${(e.badges ?? []).map((e) => this.badge(e))}
      </div>
    `;
	}
	static {
		this.styles = [q, x`
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
    `];
	}
};
customElements.define("glide-heading", Dn);
//#endregion
//#region src/editor/editor.ts
var On = [
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
	}
], kn = [
	"#ff9f43",
	"#d4ff00",
	"#006a60",
	"#4aa8ff",
	"#a78bfa",
	"#ff5c8a",
	"#34c759",
	"#ffd60a"
], An = {
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
}, jn = /* @__PURE__ */ new Set([
	"button",
	"chips",
	"heading",
	"nav",
	"popup"
]), Mn = {
	name: "tap_animation",
	selector: { select: {
		mode: "dropdown",
		options: Object.entries(_t).map(([e, t]) => ({
			value: e,
			label: t
		}))
	} }
}, Nn = {
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
function Pn(e) {
	let t = In[e.card_type];
	if (e.card_type === "button") {
		let n = e, r = (e) => !(e.name && [
			"name",
			"icon",
			"color"
		].includes(e.name) && Ft(n[e.name]));
		t = t.map((e) => e.type === "grid" ? {
			...e,
			schema: e.schema.filter(r)
		} : e), t = [
			...t.slice(0, -1),
			Nn,
			t[t.length - 1]
		];
	}
	return jn.has(e.card_type) ? [...t, Mn] : t;
}
var Fn = { select: {
	mode: "dropdown",
	options: [{
		value: "center",
		label: "Center"
	}, {
		value: "start",
		label: "Start"
	}]
} }, In = {
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
		selector: Fn
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
				selector: Fn
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
		An
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
				navigation_path: {
					required: !0,
					selector: { text: {} }
				},
				entity: { selector: { entity: {} } },
				pinned: { selector: { boolean: {} } }
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
	}]
}, Ln = {
	hash: "Hash (e.g. #living-room)",
	slider: "Swipe to adjust (brightness / position)",
	layout: "Layout (empty = theme default)",
	color: "Colour (empty = by entity type)",
	items: "Nav items (path or #popup-hash)",
	entity: "Entity",
	tap_animation: "Tap animation (empty = dashboard default)",
	secondary: "Secondary line, e.g. {{ states.light | selectattr('state','eq','on') | list | count }} of 7 on",
	badge: "Badge text (empty = entity state)"
};
async function Rn() {
	customElements.get("ha-form") || await (await (await window.loadCardHelpers?.())?.createCardElement({
		type: "entities",
		entities: []
	}))?.constructor?.getConfigElement?.();
}
var zn = class extends R {
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
		super.connectedCallback(), Rn().finally(() => this.ready = !0);
	}
	update_(e) {
		let t = {
			...this.config,
			...e
		};
		for (let [e, n] of Object.entries(t)) (n === "" || n == null) && delete t[e];
		this.config = t, V(this, "config-changed", { config: this.config });
	}
	setType(e) {
		if (e === this.config.card_type) return;
		let { type: t, theme: n, mode: r, accent: i, tap_animation: a } = this.config, o = {
			type: t,
			card_type: e,
			theme: n,
			mode: r,
			accent: i,
			tap_animation: a
		};
		e === "popup" && Object.assign(o, {
			hash: "#room",
			title: "Room",
			cards: []
		}), e === "chips" && Object.assign(o, { chips: [] }), e === "title" && Object.assign(o, { title: "Home" }), e === "heading" && Object.assign(o, { title: "Section" }), e === "nav" && Object.assign(o, { items: [{
			name: "Home",
			icon: "mdi:home",
			navigation_path: "#home"
		}] }), this.config = {}, this.update_(o);
	}
	render() {
		if (!this.config) return P;
		let e = this.config, t = m();
		return j`
      <div class="section">
        <div class="label">Card type</div>
        <div class="types">
          ${On.map((t) => j`<button class=${e.card_type === t.id ? "sel" : ""} @click=${() => this.setType(t.id)}>
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
          ${t.map((t) => j`<button class="theme ${e.theme === t.id ? "sel" : ""}" title=${t.description ?? ""} @click=${() => this.update_({ theme: t.id })}>
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
		].map((t) => j`<button class=${(e.mode ?? "auto") === t ? "sel" : ""} @click=${() => this.update_({ mode: t === "auto" ? void 0 : t })}>${t}</button>`)}
          </div>
          <div class="accents">
            <button class="dot none ${e.accent ? "" : "sel"}" title="Theme accent" @click=${() => this.update_({ accent: void 0 })}></button>
            ${kn.map((t) => j`<button class="dot ${e.accent === t ? "sel" : ""}" style="background:${t}" title=${t} @click=${() => this.update_({ accent: t })}></button>`)}
            <label class="dot custom" title="Custom color">
              <input type="color" .value=${e.accent ?? "#ff9f43"} @input=${(e) => this.update_({ accent: e.target.value })} />
            </label>
          </div>
        </div>
      </div>

      ${this.ready ? j`<ha-form
            .hass=${this.hass}
            .data=${e}
            .schema=${Pn(e)}
            .computeLabel=${(e) => Ln[e.name]}
            @value-changed=${(e) => {
			e.stopPropagation(), this.update_(e.detail.value);
		}}
          ></ha-form>` : P}
      ${e.card_type === "popup" && this.ready ? j`<div class="section">
            <div class="label">Cards inside the pop-up (YAML)</div>
            <ha-yaml-editor
              .hass=${this.hass}
              .defaultValue=${e.cards ?? []}
              @value-changed=${(e) => {
			e.stopPropagation(), e.detail.isValid !== !1 && Array.isArray(e.detail.value) && this.update_({ cards: e.detail.value });
		}}
            ></ha-yaml-editor>
          </div>` : P}
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
    .dot { width: 24px; height: 24px; border-radius: 50%; border: 2px solid transparent; padding: 0; position: relative; }
    .dot.sel { border-color: var(--primary-text-color); box-shadow: none; }
    .dot.none { background: conic-gradient(#ff9f43, #d4ff00, #006a60, #ff9f43); opacity: 0.6; }
    .dot.custom { overflow: hidden; background: conic-gradient(red, yellow, lime, aqua, blue, magenta, red); cursor: pointer; }
    .dot.custom input { opacity: 0; width: 100%; height: 100%; cursor: pointer; }
  `;
	}
};
customElements.define("glide-card-editor", zn);
//#endregion
//#region src/glide-card.ts
var Bn = "0.8.1", Vn = [
	"button",
	"popup",
	"nav",
	"climate",
	"media",
	"chips",
	"title",
	"heading"
], Hn = class extends HTMLElement {
	constructor(...e) {
		super(...e), this._editMode = !1;
	}
	setConfig(e) {
		let t = e?.card_type ?? "button";
		if (!Vn.includes(t)) throw Error(`Unknown card_type "${t}". Use one of: ${Vn.join(", ")}`);
		let n = `glide-${t}`;
		if (!customElements.get(n)) throw Error(`card_type "${t}" is not available in this build`);
		this.inner?.localName !== n && (this.inner?.remove(), this.inner = document.createElement(n), this.appendChild(this.inner)), this.inner.setConfig({
			...e,
			card_type: t
		}), this._hass && (this.inner.hass = this._hass), this.inner.editMode = this._editMode;
	}
	set hass(e) {
		this._hass = e, this.inner && (this.inner.hass = e);
	}
	set editMode(e) {
		this._editMode = e, this.inner && (this.inner.editMode = e);
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
o(), customElements.get("glide-card") || (customElements.define("glide-card", Hn), window.customCards = window.customCards ?? [], window.customCards.push({
	type: "glide-card",
	name: "Glide Card",
	description: "Themeable buttons, pop-up sheets, nav bar, climate and media cards",
	preview: !0,
	documentationURL: "https://github.com/yshaish1/glide-card"
}), console.info(`%c GLIDE-CARD %c ${Bn} `, "background:#ff9f43;color:#1c1206;border-radius:4px 0 0 4px", "background:#222;color:#fff;border-radius:0 4px 4px 0"));
//#endregion
