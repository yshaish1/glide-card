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
	styles: { button: ".fill{box-shadow:inset -2px 0 0 var(--gc-accent)}" },
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
			"--gc-radius": "28px"
		},
		dark: {
			"--gc-text": "#f5f5f7",
			"--gc-text-dim": "rgba(235,235,245,.55)",
			"--gc-accent": "#ff9f43",
			"--gc-on-accent": "#1c1206",
			"--gc-surface": "rgba(255,255,255,.06)",
			"--gc-surface-on": "rgba(255,255,255,.1)",
			"--gc-border": "rgba(255,255,255,.12)",
			"--gc-highlight": "rgba(255,255,255,.08)",
			"--gc-shadow": "0 10px 30px rgba(0,0,0,.35)",
			"--gc-sheet-bg": "rgba(28,26,32,.72)"
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
			"--gc-scrim": "rgba(0,0,0,.2)"
		}
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
}, r = "glass", i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), o = {
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
function s(e) {
	i.set(e.id, e);
	for (let t of a.keys()) t.startsWith(`${e.id}|`) && a.delete(t);
}
var c = (e) => e && i.get(e) || i.get("glass"), l = () => [...i.values()], u = (e) => Object.entries(e).map(([e, t]) => `${e}:${t};`).join("");
function d(e, t, n) {
	return `:host{${u({
		...o,
		...e.tokens.base,
		...t ? e.tokens.dark : e.tokens.light
	})}}${e.styles?.all ?? ""}${e.styles?.[n] ?? ""}`;
}
function f(e, t, n) {
	let r = c(e), i = `${r.id}|${t ? "d" : "l"}|${n}`, o = a.get(i);
	return o || (o = new CSSStyleSheet(), o.replaceSync(d(r, t, n)), a.set(i, o)), o;
}
function p(e, t) {
	if (e && i.has(e)) return e;
	let n = getComputedStyle(t).getPropertyValue("--glide-theme").trim();
	return i.has(n) ? n : r;
}
function ee(e, t) {
	return e === "dark" ? !0 : e === "light" ? !1 : t ?? matchMedia("(prefers-color-scheme: dark)").matches;
}
[
	t,
	e,
	n
].forEach(s), window.glideCardThemes = {
	register: s,
	list: l
};
//#endregion
//#region node_modules/@lit/reactive-element/css-tag.js
var m = globalThis, h = m.ShadowRoot && (m.ShadyCSS === void 0 || m.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, g = Symbol(), te = /* @__PURE__ */ new WeakMap(), ne = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== g) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (h && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = te.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && te.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, re = (e) => new ne(typeof e == "string" ? e : e + "", void 0, g), _ = (e, ...t) => new ne(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, g), ie = (e, t) => {
	if (h) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let n of t) {
		let t = document.createElement("style"), r = m.litNonce;
		r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
	}
}, ae = h ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return re(t);
})(e) : e, { is: oe, defineProperty: se, getOwnPropertyDescriptor: ce, getOwnPropertyNames: le, getOwnPropertySymbols: ue, getPrototypeOf: de } = Object, v = globalThis, fe = v.trustedTypes, pe = fe ? fe.emptyScript : "", me = v.reactiveElementPolyfillSupport, y = (e, t) => e, he = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? pe : null;
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
}, ge = (e, t) => !oe(e, t), _e = {
	attribute: !0,
	type: String,
	converter: he,
	reflect: !1,
	useDefault: !1,
	hasChanged: ge
};
Symbol.metadata ??= Symbol("metadata"), v.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var b = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = _e) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && se(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = ce(this.prototype, e) ?? {
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
		return this.elementProperties.get(e) ?? _e;
	}
	static _$Ei() {
		if (this.hasOwnProperty(y("elementProperties"))) return;
		let e = de(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(y("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(y("properties"))) {
			let e = this.properties, t = [...le(e), ...ue(e)];
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
			for (let e of n) t.unshift(ae(e));
		} else e !== void 0 && t.push(ae(e));
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
		return ie(e, this.constructor.elementStyles), e;
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
			let i = (n.converter?.toAttribute === void 0 ? he : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? he : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? ge)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[y("elementProperties")] = /* @__PURE__ */ new Map(), b[y("finalized")] = /* @__PURE__ */ new Map(), me?.({ ReactiveElement: b }), (v.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var ve = globalThis, ye = (e) => e, x = ve.trustedTypes, be = x ? x.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, xe = "$lit$", S = `lit$${Math.random().toFixed(9).slice(2)}$`, Se = "?" + S, Ce = `<${Se}>`, C = document, w = () => C.createComment(""), T = (e) => e === null || typeof e != "object" && typeof e != "function", we = Array.isArray, Te = (e) => we(e) || typeof e?.[Symbol.iterator] == "function", E = "[ 	\n\f\r]", D = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ee = /-->/g, De = />/g, O = RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), Oe = /'/g, ke = /"/g, Ae = /^(?:script|style|textarea|title)$/i, je = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), k = je(1), Me = je(2), A = Symbol.for("lit-noChange"), j = Symbol.for("lit-nothing"), Ne = /* @__PURE__ */ new WeakMap(), M = C.createTreeWalker(C, 129);
function Pe(e, t) {
	if (!we(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return be === void 0 ? t : be.createHTML(t);
}
var Fe = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = D;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === D ? c[1] === "!--" ? o = Ee : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = O) : (Ae.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = O) : o = De : o === O ? c[0] === ">" ? (o = i ?? D, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? O : c[3] === "\"" ? ke : Oe) : o === ke || o === Oe ? o = O : o === Ee || o === De ? o = D : (o = O, i = void 0);
		let d = o === O && e[t + 1].startsWith("/>") ? " " : "";
		a += o === D ? n + Ce : l >= 0 ? (r.push(s), n.slice(0, l) + xe + n.slice(l) + S + d) : n + S + (l === -2 ? t : d);
	}
	return [Pe(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, N = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Fe(t, n);
		if (this.el = e.createElement(l, r), M.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = M.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(xe)) {
					let t = u[o++], n = i.getAttribute(e).split(S), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Re : r[1] === "?" ? ze : r[1] === "@" ? Be : F
					}), i.removeAttribute(e);
				} else e.startsWith(S) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (Ae.test(i.tagName)) {
					let e = i.textContent.split(S), t = e.length - 1;
					if (t > 0) {
						i.textContent = x ? x.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], w()), M.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], w());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === Se) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(S, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += S.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = C.createElement("template");
		return n.innerHTML = e, n;
	}
};
function P(e, t, n = e, r) {
	if (t === A) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = T(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = P(e, i._$AS(e, t.values), i, r)), t;
}
var Ie = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? C).importNode(t, !0);
		M.currentNode = r;
		let i = M.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Le(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Ve(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = M.nextNode(), a++);
		}
		return M.currentNode = C, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Le = class e {
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
		e = P(this, e, t), T(e) ? e === j || e == null || e === "" ? (this._$AH !== j && this._$AR(), this._$AH = j) : e !== this._$AH && e !== A && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? Te(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== j && T(this._$AH) ? this._$AA.nextSibling.data = e : this.T(C.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = N.createElement(Pe(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Ie(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = Ne.get(e.strings);
		return t === void 0 && Ne.set(e.strings, t = new N(e)), t;
	}
	k(t) {
		we(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(w()), this.O(w()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = ye(e).nextSibling;
			ye(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, F = class {
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
		if (i === void 0) e = P(this, e, t, 0), a = !T(e) || e !== this._$AH && e !== A, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = P(this, r[n + o], t, o), s === A && (s = this._$AH[o]), a ||= !T(s) || s !== this._$AH[o], s === j ? e = j : e !== j && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === j ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Re = class extends F {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === j ? void 0 : e;
	}
}, ze = class extends F {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== j);
	}
}, Be = class extends F {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = P(this, e, t, 0) ?? j) === A) return;
		let n = this._$AH, r = e === j && n !== j || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== j && (n === j || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Ve = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		P(this, e);
	}
}, He = ve.litHtmlPolyfillSupport;
He?.(N, Le), (ve.litHtmlVersions ??= []).push("3.3.3");
var Ue = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Le(t.insertBefore(w(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, We = globalThis, I = class extends b {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ue(t, this.renderRoot, this.renderOptions);
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
I._$litElement$ = !0, I.finalized = !0, We.litElementHydrateSupport?.({ LitElement: I });
var Ge = We.litElementPolyfillSupport;
Ge?.({ LitElement: I }), (We.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/lit-html/directive.js
var Ke = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, qe = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), Je = class {
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
}, Ye = "important", Xe = " !" + Ye, Ze = qe(class extends Je {
	constructor(e) {
		if (super(e), e.type !== Ke.ATTRIBUTE || e.name !== "style" || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
				let t = typeof r == "string" && r.endsWith(Xe);
				e.includes("-") || t ? n.setProperty(e, t ? r.slice(0, -11) : r, t ? Ye : "") : n[e] = r;
			}
		}
		return A;
	}
}), L = (e = "") => e.split(".")[0], Qe = /* @__PURE__ */ new Set([
	"off",
	"closed",
	"idle",
	"standby",
	"paused",
	"unavailable",
	"unknown",
	"locked",
	"docked"
]), $e = (e) => !e || e.state === "unavailable" || e.state === "unknown", et = (e) => !!e && !Qe.has(e.state), tt = {
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
}, R = (e, t) => t ?? e?.attributes.icon ?? (tt[L(e?.entity_id)]?.[+!et(e)] || "mdi:help-circle-outline"), z = (e, t) => t ?? e?.attributes.friendly_name ?? e?.entity_id ?? "", B = (e) => ({
	light: "var(--gc-light)",
	fan: "var(--gc-fan)",
	cover: "var(--gc-cover)",
	climate: "var(--gc-heat)",
	media_player: "var(--gc-media)"
})[L(e?.entity_id)] ?? "var(--gc-accent)", nt = /* @__PURE__ */ new Set([
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
]), V = (e) => e ? nt.has(e) ? `var(--${e}-color)` : e : void 0;
function rt(e) {
	if (!e) return;
	let t = e.entity_id, n = e.attributes;
	switch (L(t)) {
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
var it = /* @__PURE__ */ new Set([
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
function at(e, t) {
	let n = L(t.entity_id), r = t.entity_id;
	return n === "cover" ? e.callService("cover", "toggle", { entity_id: r }) : n === "lock" ? e.callService("lock", t.state === "locked" ? "unlock" : "lock", { entity_id: r }) : n === "scene" || n === "script" ? e.callService(n, "turn_on", { entity_id: r }) : n === "button" || n === "input_button" ? e.callService(n, "press", { entity_id: r }) : it.has(n) ? e.callService(n, "toggle", { entity_id: r }) : e.callService("homeassistant", "toggle", { entity_id: r });
}
//#endregion
//#region src/core/fire.ts
function H(e, t, n) {
	e.dispatchEvent(new CustomEvent(t, {
		detail: n,
		bubbles: !0,
		composed: !0
	}));
}
var U = (e = "light") => H(window, "haptic", e), ot;
function st(e, t) {
	ot = t?.getBoundingClientRect();
	let n = e.startsWith("#") ? e : `#${e}`;
	location.hash !== n && (history.pushState({ glidePopup: !0 }, "", n), window.dispatchEvent(new CustomEvent("glide-hash")));
}
function ct(e, t) {
	if (e.startsWith("#")) return st(e, t);
	history.pushState(null, "", e), H(window, "location-changed", { replace: !1 });
}
function W(e, t, n, r) {
	if (n && n.action !== "none") switch (U(n.action === "toggle" ? "light" : "selection"), n.action) {
		case "toggle": {
			let e = r ? t.states[r] : void 0;
			e && at(t, e);
			return;
		}
		case "more-info":
			r && H(e, "hass-more-info", { entityId: r });
			return;
		case "popup":
		case "navigate":
			n.navigation_path && ct(n.navigation_path, e);
			return;
		default: H(e, "hass-action", {
			config: {
				entity: r,
				tap_action: n
			},
			action: "tap"
		});
	}
}
//#endregion
//#region src/core/base-card.ts
var G = _`
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
function lt(e) {
	if (e !== void 0) return e;
	try {
		let e = localStorage.getItem("glide-card-lite");
		if (e === "1" || e === "0") return e === "1";
	} catch {}
	let t = navigator.deviceMemory;
	return t !== void 0 && t <= 2;
}
var K = class extends I {
	constructor(...e) {
		super(...e), this.editMode = !1, this.theme = c(), this.themeKey = "";
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
		this.config = e, this.theme = c(e.theme);
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
		let e = p(this.config.theme, this), t = ee(this.config.mode, this.hass?.themes?.darkMode), n = `${e}|${t}|${this.config.accent ?? ""}|${this.config.lite}`;
		if (n === this.themeKey) return;
		this.themeKey = n, this.theme = c(e), this.toggleAttribute("dark", t), this.toggleAttribute("lite", lt(this.config.lite)), this.dataset.theme = e, this.config.accent ? this.style.setProperty("--gc-accent", this.config.accent) : this.style.removeProperty("--gc-accent");
		let r = this.constructor.elementStyles.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
		this.renderRoot.adoptedStyleSheets = [...r, f(e, t, this.cardType)];
	}
	stateOf(e) {
		return e ? this.hass?.states[e] : void 0;
	}
}, ut = 500, dt = 250, ft = 8;
function pt(e, t) {
	let n = 0, r = 0, i = 0, a = 0, o = 0, s = 0, c = "idle", l = () => clearTimeout(o), u = () => e.getBoundingClientRect().width || 1, d = () => getComputedStyle(e).direction === "rtl", f = (e) => {
		e.button === 0 && (n = e.clientX, r = e.clientY, c = "down", l(), t.hold && (o = window.setTimeout(() => {
			c = "held", t.hold();
		}, ut)));
	}, p = (o) => {
		if (c === "down") {
			let a = o.clientX - n, s = o.clientY - r;
			if (Math.abs(a) < ft && Math.abs(s) < ft) return;
			l(), t.dragStart && Math.abs(a) > Math.abs(s) ? (c = "drag", i = t.dragStart(), e.setPointerCapture(o.pointerId)) : c = "cancel";
		}
		if (c === "drag") {
			let e = (o.clientX - n) / u() * 100 * (d() ? -1 : 1);
			a = Math.round(Math.min(100, Math.max(0, i + e))), t.drag?.(a);
		}
	}, ee = () => {
		l(), c === "drag" ? t.dragEnd?.(a) : c === "down" && (t.doubleTap ? s ? (clearTimeout(s), s = 0, t.doubleTap()) : s = window.setTimeout(() => {
			s = 0, t.tap?.();
		}, dt) : t.tap?.()), c = "idle";
	}, m = () => {
		l(), c === "drag" && t.dragEnd?.(a), c = "idle";
	}, h = (e) => {
		t.hold && e.preventDefault();
	}, g = (e) => {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), t.tap?.());
	};
	return e.addEventListener("pointerdown", f), e.addEventListener("pointermove", p), e.addEventListener("pointerup", ee), e.addEventListener("pointercancel", m), e.addEventListener("contextmenu", h), e.addEventListener("keydown", g), () => {
		l(), clearTimeout(s), e.removeEventListener("pointerdown", f), e.removeEventListener("pointermove", p), e.removeEventListener("pointerup", ee), e.removeEventListener("pointercancel", m), e.removeEventListener("contextmenu", h), e.removeEventListener("keydown", g);
	};
}
//#endregion
//#region src/core/i18n.ts
var mt = {
	on: "On",
	off: "Off",
	open: "Open",
	closed: "Closed",
	unavailable: "Unavailable",
	heating: "Heating to",
	cooling: "Cooling to",
	idle: "Idle",
	target: "Target",
	current: "Current",
	heat: "Heat",
	cool: "Cool",
	heat_cool: "Auto",
	auto: "Auto",
	dry: "Dry",
	fan_only: "Fan",
	nothing_playing: "Nothing playing",
	popup_placeholder: "Pop-up",
	close: "Close"
}, ht = {
	en: mt,
	he: {
		on: "פועל",
		off: "כבוי",
		open: "פתוח",
		closed: "סגור",
		unavailable: "לא זמין",
		heating: "מחמם ל-",
		cooling: "מקרר ל-",
		idle: "במנוחה",
		target: "יעד",
		current: "נוכחי",
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
function q(e, t) {
	return (ht[(e?.locale?.language ?? e?.language ?? "en").split("-")[0]] ?? mt)[t] ?? mt[t];
}
function J(e, t) {
	let n = e.states[t];
	if (!n) return q(e, "unavailable");
	let r = e.formatEntityState;
	return r ? r(n) : (q(e, n.state) ?? n.state) || n.state;
}
//#endregion
//#region src/cards/button.ts
var gt = /* @__PURE__ */ new Set([
	"scene",
	"script",
	"button",
	"input_button"
]), _t = /* @__PURE__ */ new Set([
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
]), vt = class extends K {
	constructor(...e) {
		super(...e), this.cardType = "button";
	}
	static {
		this.properties = {
			...K.properties,
			dragValue: { state: !0 }
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
		if (e === "tap") return { action: n && _t.has(L(n)) ? "toggle" : "more-info" };
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
		this.detach = pt(e, {
			tap: () => this.hass && W(this, this.hass, this.action("tap"), this.config.entity),
			hold: () => this.hass && W(this, this.hass, this.action("hold"), this.config.entity),
			doubleTap: this.config.double_tap_action ? () => this.hass && W(this, this.hass, this.action("double_tap"), this.config.entity) : void 0,
			dragStart: () => {
				let e = this.slider;
				return t = -1, e ? e.value : NaN;
			},
			drag: (e) => {
				if (!this.slider) return;
				this.dragValue = e;
				let n = Math.floor(e / 10);
				n !== t && (t = n, U("selection"));
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
		return this.config.slider === !1 ? void 0 : rt(this.stateOf(this.config.entity));
	}
	render() {
		let e = this.stateOf(this.config.entity), t = this.slider, n = this.dragValue ?? t?.value, r = this.dragValue === void 0 ? et(e) : this.dragValue > 0, i = this.hass && this.config.entity ? J(this.hass, this.config.entity) : "", a = gt.has(L(this.config.entity)), o = t && r && n !== void 0 ? `${n}%` : "", s = t ? n ?? 0 : r ? 100 : 0;
		return k`
      <div
        class="surface ${this.layout} ${r ? "on" : ""} ${$e(e) && this.config.entity ? "unavailable" : ""}"
        style=${Ze({
			"--domain": V(this.config.color) ?? B(e),
			"--fill": `${s}%`
		})}
        role="button"
        tabindex="0"
        aria-label=${z(e, this.config.name)}
      >
        <div class="fill ${this.dragValue === void 0 ? "" : "dragging"}"></div>
        <div class="icon"><ha-icon .icon=${R(e, this.config.icon)}></ha-icon></div>
        <div class="text">
          <div class="name">${z(e, this.config.name)}</div>
          ${o ? k`<div class="meta">${o}</div>` : j}
        </div>
        ${i && !a ? k`<div class="badge meta">${i}</div>` : j}
      </div>
    `;
	}
	static {
		this.styles = [G, _`
      :host { height: 100%; }
      .surface {
        height: 100%;
        cursor: pointer;
        user-select: none;
        touch-action: pan-y;
        transition: transform 0.25s cubic-bezier(0.2, 0.9, 0.3, 1.2), background-color 0.3s;
      }
      .surface:active { transform: scale(0.97); }
      .surface:focus-visible { outline: 2px solid var(--gc-accent); outline-offset: 2px; }
      .surface.on { background: var(--gc-surface-on); }
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
      .name {
        font-size: 16px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
      .tile .text { grid-area: text; align-self: end; }

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
      .pill .name { font-size: 15px; }
    `];
	}
};
customElements.define("glide-button", vt);
//#endregion
//#region src/core/spring.ts
function yt(e = 170, t = 22, n = 1, r = 48) {
	let i = Math.sqrt(e / n), a = t / (2 * Math.sqrt(e * n)), o = i * Math.sqrt(Math.max(0, 1 - a * a)), s = (e) => a < 1 ? 1 - Math.exp(-a * i * e) * (Math.cos(o * e) + a * i / o * Math.sin(o * e)) : 1 - Math.exp(-i * e) * (1 + i * e), c = Math.min(1.2, Math.log(1e3) / (a * i)), l = Array.from({ length: r + 1 }, (e, t) => +s(t / r * c).toFixed(4));
	return l[r] = 1, {
		easing: `linear(${l.join(",")})`,
		duration: Math.round(c * 1e3)
	};
}
var bt = () => matchMedia("(prefers-reduced-motion: reduce)").matches, xt = "(min-width: 768px)", St = 120, Ct = .6, wt = [
	"hass-more-info",
	"show-dialog",
	"hass-notification",
	"hass-action",
	"ll-custom"
], Tt = CSS.supports?.("animation-timing-function", "linear(0, 1)"), Et = (e, t) => Tt ? yt(e, t) : {
	easing: "cubic-bezier(.2,.9,.25,1)",
	duration: 420
}, Dt = 0, Ot = (e) => {
	Dt = Math.max(0, Dt + (e ? 1 : -1)), document.documentElement.style.overflow = Dt ? "hidden" : "";
}, kt = class extends K {
	static {
		this.properties = {
			...K.properties,
			open: {
				type: Boolean,
				reflect: !0
			}
		};
	}
	constructor() {
		super(), this.cardType = "popup", this.open = !1, this.children_ = [], this.built = !1, this.forward = (e) => {
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
		for (let e of wt) this.addEventListener(e, this.forward);
		this.addEventListener("keydown", (e) => e.key === "Escape" && this.requestClose());
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
			let n = t.type === "custom:glide-card" && !t.theme && this.config.theme ? {
				...t,
				theme: this.config.theme
			} : t, r = e.createCardElement(n);
			this.hass && (r.hass = this.hass);
			let i = r.getGridOptions?.() ?? {};
			return r.style.setProperty("--cols", String(typeof i.columns == "number" ? i.columns : 12)), typeof i.rows == "number" && r.style.setProperty("--rows", String(i.rows)), r;
		}), this.requestUpdate());
	}
	requestClose() {
		this.open && (U("light"), history.state?.glidePopup ? history.back() : (history.replaceState(history.state, "", location.pathname + location.search), window.dispatchEvent(new CustomEvent("glide-hash"))));
	}
	updated(e) {
		super.updated(e), e.has("open") && (e.get("open") !== void 0 || this.open) && (this.open ? (this.build(), this.origin = ot, Ot(!0), this.animateOpen()) : (Ot(!1), this.animateClose()));
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
		}), bt()) return;
		let { easing: t, duration: n } = Et(), r = this.origin, i = e.getBoundingClientRect();
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
		} else matchMedia(xt).matches ? e.animate([{
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
		let e = this.panel, t = e.style.transform || "none", n = matchMedia(xt).matches ? {
			transform: "scale(.94)",
			opacity: 0
		} : {
			transform: "translateY(100%)",
			opacity: 1
		}, r = bt() ? 0 : 260;
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
		if (matchMedia(xt).matches || e.button !== 0 || e.target.closest("button")) return;
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
			if (n.removeEventListener("pointermove", s), n.removeEventListener("pointerup", c), n.removeEventListener("pointercancel", c), this.scrim.style.opacity = "", o > St || a > Ct) return this.requestClose();
			let { easing: e, duration: r } = Et(260, 24), i = t.style.transform;
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
		return k`
      <div class="scrim" @click=${() => this.requestClose()}></div>
      <div class="panel surface" role="dialog" aria-modal="true" aria-label=${e.title ?? ""} tabindex="-1">
        <div class="handle" @pointerdown=${(e) => this.onDragStart(e)}>
          <div class="grabber"></div>
          <header>
            ${e.icon || t ? k`<div class="icon"><ha-icon .icon=${e.icon ?? R(t)}></ha-icon></div>` : j}
            <div class="titles">
              <div class="title">${e.title ?? ""}</div>
              ${t && this.hass ? k`<div class="meta">${J(this.hass, e.entity)}</div>` : j}
            </div>
            <button class="close" aria-label=${q(this.hass, "close")} @click=${() => this.requestClose()}>
              <ha-icon icon="mdi:close" .icon=${"mdi:close"}></ha-icon>
            </button>
          </header>
        </div>
        <div class="content">${this.children_}</div>
      </div>
    `;
	}
	static {
		this.styles = [G, _`
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
customElements.define("glide-sheet", kt);
var Y = /* @__PURE__ */ new Map(), At, jt = (e) => e.startsWith("#") ? e : `#${e}`;
function Mt(e) {
	let t = jt(e.hash), n = Y.get(t);
	n || (n = document.createElement("glide-sheet"), document.body.appendChild(n), Y.set(t, n)), n.setConfig(e), At && n.setHass(At), Ft();
}
function Nt(e) {
	let t = Y.get(jt(e));
	t && (t.remove(), Y.delete(jt(e)));
}
function Pt(e) {
	At = e, Y.forEach((t) => t.setHass(e));
}
function Ft() {
	let e = decodeURIComponent(location.hash);
	Y.forEach((t, n) => t.open = n === e);
}
for (let e of [
	"popstate",
	"hashchange",
	"glide-hash",
	"location-changed"
]) window.addEventListener(e, Ft);
//#endregion
//#region src/cards/popup.ts
var It = class extends K {
	constructor(...e) {
		super(...e), this.cardType = "popup";
	}
	setConfig(e) {
		if (!e.hash) throw Error("Pop-up needs a `hash`, e.g. #living-room");
		if (!Array.isArray(e.cards)) throw Error("Pop-up needs a `cards` list");
		super.setConfig(e), this.isConnected && Mt(e);
	}
	shouldUpdate(e) {
		return e.has("hass") && this.hass && Pt(this.hass), e.has("editMode") || e.has("config") || super.shouldUpdate(e);
	}
	connectedCallback() {
		super.connectedCallback(), this.config && Mt(this.config);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		let e = this.config?.hash;
		setTimeout(() => !this.isConnected && e && Nt(e), 1e3);
	}
	updated(e) {
		if (super.updated(e), e.has("editMode")) {
			let e = this.parentElement;
			e && (e.style.display = this.editMode ? "block" : "none"), H(this, "card-visibility-changed", { value: this.editMode });
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
		if (!this.editMode) return k``;
		let e = this.config;
		return k`
      <div class="surface">
        <ha-icon .icon=${e.icon ?? "mdi:card-outline"}></ha-icon>
        <div class="text">
          <div class="name">${e.title ?? q(this.hass, "popup_placeholder")}</div>
          <div class="meta">${e.hash} · ${e.cards.length} cards</div>
        </div>
        <button @click=${(t) => st(e.hash, t.currentTarget)}>Preview</button>
      </div>
    `;
	}
	static {
		this.styles = [G, _`
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
customElements.define("glide-popup", It);
//#endregion
//#region src/cards/nav.ts
var Lt = [
	"popstate",
	"location-changed",
	"glide-hash"
], Rt = () => location.pathname + location.hash, zt = CSS.supports?.("animation-timing-function", "linear(0, 1)") ? yt(260, 26) : {
	easing: "cubic-bezier(.3,1.3,.4,1)",
	duration: 450
}, X, Bt = 1e3, Vt = (e) => !!e && e.width > 0 && e.height > 0, Ht = class extends K {
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
		super.connectedCallback(), Lt.forEach((e) => window.addEventListener(e, this.onRoute)), this.rendered !== void 0 && this.rendered !== Rt() && (this.stale = !0, this.requestUpdate());
	}
	disconnectedCallback() {
		super.disconnectedCallback(), Lt.forEach((e) => window.removeEventListener(e, this.onRoute));
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
		let e = Rt(), t = this.rendered === void 0, n = !t && this.rendered !== e;
		this.rendered = e, this.stale = !1;
		let r = this.renderRoot.querySelector(".scroller");
		if (!r) return;
		r.classList.toggle("overflow", r.scrollWidth > r.clientWidth + 1);
		let i = this.renderRoot.querySelector(".ind");
		if (!i) return;
		let a = X && performance.now() - X.at < Bt ? X : void 0, o = n ? this.from : void 0, s = !o && (n || t) ? a : void 0;
		s && (r.scrollLeft = s.scroll);
		let c = o ?? s?.rect, l = i.getBoundingClientRect();
		Vt(c) && Vt(l) && !bt() && Math.abs(c.left - l.left) + Math.abs(c.width - l.width) > 1 && i.animate([{
			transform: `translateX(${c.left - l.left}px)`,
			width: `${c.width}px`
		}, {
			transform: "none",
			width: "100%"
		}], zt);
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
		return k`
      <button
        class=${t ? "active" : ""}
        aria-current=${t ? "page" : "false"}
        @click=${(t) => {
			U("selection");
			let n = this.indRect(), r = this.renderRoot.querySelector(".scroller")?.scrollLeft ?? 0;
			X = Vt(n) ? {
				rect: n,
				scroll: r,
				at: performance.now()
			} : void 0, ct(e.navigation_path, t.currentTarget);
		}}
      >
        ${t ? k`<span class="ind"></span>` : j}
        <ha-icon .icon=${e.icon}></ha-icon>
        <span class="meta">${e.name}</span>
        ${e.entity && et(this.stateOf(e.entity)) ? k`<i class="dot"></i>` : j}
      </button>
    `;
	}
	render() {
		let e = this.config.items.filter((e) => e.pinned);
		return k`
      <nav class="surface ${this.editMode ? "inline" : "floating"}">
        <div class="scroller">${this.config.items.filter((e) => !e.pinned).map((e) => this.item(e))}</div>
        ${e.length ? k`<div class="pinned">${e.map((e) => this.item(e))}</div>` : j}
      </nav>
    `;
	}
	static {
		this.styles = [G, _`
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
customElements.define("glide-nav", Ht);
//#endregion
//#region src/cards/climate.ts
var Ut = {
	heat: "mdi:fire",
	cool: "mdi:snowflake",
	heat_cool: "mdi:sun-snowflake-variant",
	auto: "mdi:thermostat-auto",
	dry: "mdi:water-percent",
	fan_only: "mdi:fan",
	off: "mdi:power"
}, Z = 270, Q = 135, $ = 80, Wt = 700, Gt = (e) => {
	let t = e * Math.PI / 180;
	return [100 + $ * Math.cos(t), 100 + $ * Math.sin(t)];
}, Kt = (e, t) => {
	let [n, r] = Gt(e), [i, a] = Gt(t);
	return `M ${n} ${r} A ${$} ${$} 0 ${+(t - e > 180)} 1 ${i} ${a}`;
}, qt = class extends K {
	constructor(...e) {
		super(...e), this.cardType = "climate", this.timer = 0;
	}
	static {
		this.properties = {
			...K.properties,
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
			rows: 7,
			min_columns: 6
		};
	}
	getCardSize() {
		return 7;
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
	setTarget(e) {
		let { min: t, max: n, step: r } = this.range, i = Math.min(n, Math.max(t, Math.round(e / r) * r));
		i !== this.target && (this.pending = i, U("selection"), clearTimeout(this.timer), this.timer = window.setTimeout(() => {
			this.timer = 0, this.hass?.callService("climate", "set_temperature", {
				entity_id: this.config.entity,
				temperature: this.pending
			});
		}, Wt));
	}
	get target() {
		return this.pending ?? this.s?.attributes.temperature;
	}
	onDial(e) {
		let t = e.currentTarget;
		if (this.target === void 0) return;
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
		if (!e) return k`<div class="surface empty">${this.config.entity}</div>`;
		let t = e.attributes, { min: n, max: r, step: i } = this.range, a = this.target, o = this.modeColor(e.state), s = Q + (a === void 0 ? 0 : (a - n) / (r - n)) * Z, [c, l] = Gt(s), u = t.hvac_action, d = u === "heating" ? `${q(this.hass, "heating")} ${a}°` : u === "cooling" ? `${q(this.hass, "cooling")} ${a}°` : u === "off" || e.state === "off" ? q(this.hass, "off") : q(this.hass, "idle"), f = +(i < 1);
		return k`
      <div class="surface" style="--mode:${o}">
        <header>
          <div class="icon"><ha-icon .icon=${Ut[e.state] ?? "mdi:thermostat"}></ha-icon></div>
          <div class="titles">
            <div class="name">${z(e, this.config.name)}</div>
            <div class="meta mode-text">${d}</div>
          </div>
          ${u && u !== "idle" && u !== "off" ? k`<div class="chip meta"><i></i>${this.hass?.formatEntityAttributeValue?.(e, "hvac_action") ?? u}</div>` : j}
        </header>

        <div class="dial">
          <svg viewBox="0 0 200 200" @pointerdown=${(e) => this.onDial(e)} role="slider"
            aria-valuemin=${n} aria-valuemax=${r} aria-valuenow=${a ?? ""} aria-label=${q(this.hass, "target")}>
            ${Me`<path class="track" d=${Kt(Q, 405)} />`}
            ${a !== void 0 && e.state !== "off" ? Me`<path class="value" d=${Kt(Q, Math.max(135.5, s))} /><circle class="knob" cx=${c} cy=${l} r="9" />` : j}
          </svg>
          <div class="readout">
            <div class="target">${a === void 0 ? "--" : a.toFixed(f)}<sup>°</sup></div>
            <div class="meta">${q(this.hass, "target")}</div>
            ${t.current_temperature === void 0 ? j : k`<div class="meta current">${q(this.hass, "current")} ${t.current_temperature}°</div>`}
          </div>
        </div>

        <div class="steppers">
          <button class="round" aria-label="-" @click=${() => a !== void 0 && this.setTarget(a - i)}><ha-icon icon="mdi:minus" .icon=${"mdi:minus"}></ha-icon></button>
          <span class="meta">${i}°</span>
          <button class="round" aria-label="+" @click=${() => a !== void 0 && this.setTarget(a + i)}><ha-icon icon="mdi:plus" .icon=${"mdi:plus"}></ha-icon></button>
        </div>

        <div class="modes">
          ${(t.hvac_modes ?? []).map((t) => k`
              <button class=${t === e.state ? "on" : ""} style="--c:${this.modeColor(t)}"
                @click=${() => {
			U("light"), this.hass?.callService("climate", "set_hvac_mode", {
				entity_id: e.entity_id,
				hvac_mode: t
			});
		}}>
                <ha-icon .icon=${Ut[t] ?? "mdi:thermostat"}></ha-icon>
                <span class="meta">${q(this.hass, t) ?? t}</span>
              </button>
            `)}
        </div>
      </div>
    `;
	}
	static {
		this.styles = [G, _`
      :host { height: 100%; }
      .surface { height: 100%; padding: 18px; display: flex; flex-direction: column; gap: 8px; }
      header { display: flex; align-items: center; gap: 12px; }
      .icon {
        display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%;
        background: color-mix(in srgb, var(--mode) 20%, transparent); color: var(--mode);
      }
      .titles { flex: 1; min-width: 0; }
      .name { font-size: 17px; font-weight: 600; }
      .mode-text { color: var(--mode); }
      .chip {
        display: flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: var(--gc-radius-control);
        border: 1px solid color-mix(in srgb, var(--mode) 50%, transparent); color: var(--mode); text-transform: uppercase; font-size: 11px;
      }
      .chip i { width: 7px; height: 7px; border-radius: 50%; background: var(--mode); }
      .dial { position: relative; flex: 1; min-height: 180px; display: grid; place-items: center; }
      svg { width: min(100%, 240px); aspect-ratio: 1; touch-action: none; cursor: pointer; overflow: visible; }
      .track { fill: none; stroke: color-mix(in srgb, var(--gc-text) 12%, transparent); stroke-width: 14; stroke-linecap: round; }
      .value {
        fill: none; stroke: var(--mode); stroke-width: 14; stroke-linecap: round;
        filter: drop-shadow(0 0 8px color-mix(in srgb, var(--mode) 60%, transparent));
      }
      .knob { fill: #fff; stroke: var(--mode); stroke-width: 4; }
      .readout { position: absolute; text-align: center; pointer-events: none; }
      .target { font-size: 52px; font-weight: 700; line-height: 1; letter-spacing: -0.02em; }
      .target sup { font-size: 22px; color: var(--mode); }
      .steppers { display: flex; align-items: center; justify-content: center; gap: 28px; }
      button {
        all: unset; box-sizing: border-box; cursor: pointer; display: grid; place-items: center;
        border: 1px solid var(--gc-border); background: var(--gc-surface); color: var(--gc-text);
        transition: transform 0.15s, background 0.2s;
      }
      button:active { transform: scale(0.94); }
      button:focus-visible { outline: 2px solid var(--gc-accent); }
      .round { width: 46px; height: 46px; border-radius: 50%; }
      .modes {
        display: grid; grid-template-columns: repeat(auto-fit, minmax(64px, 1fr)); gap: 8px;
        padding-top: 12px; border-top: 1px solid var(--gc-border);
      }
      .modes button { gap: 4px; padding: 10px 4px; border-radius: calc(var(--gc-radius) * 0.6); color: var(--gc-text-dim); }
      .modes .meta { color: inherit; font-size: 11px; }
      .modes button.on {
        color: var(--c); background: color-mix(in srgb, var(--c) 18%, transparent);
        border-color: color-mix(in srgb, var(--c) 55%, transparent);
      }
      .empty { padding: 18px; color: var(--gc-text-dim); }
    `];
	}
};
customElements.define("glide-climate", qt);
//#endregion
//#region src/cards/media.ts
var Jt = {
	PAUSE: 1,
	VOLUME_SET: 4,
	PREV: 16,
	NEXT: 32,
	PLAY: 16384
}, Yt = (e) => `${Math.floor(e / 60)}:${String(Math.floor(e % 60)).padStart(2, "0")}`, Xt = class extends K {
	constructor(...e) {
		super(...e), this.cardType = "media", this.tick = 0;
	}
	static {
		this.properties = {
			...K.properties,
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
		U("light"), this.hass?.callService("media_player", e, {
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
		if (!e) return k`<div class="surface empty">${this.config.entity}</div>`;
		let t = e.attributes, n = $e(e) || e.state === "off" || e.state === "idle" || e.state === "standby" || !t.media_title, r = t.supported_features ?? 0, i = this.position(), a = t.media_duration, o = this.volDrag ?? Math.round((t.volume_level ?? 0) * 100), s = e.state === "playing", c = t.entity_picture;
		return k`
      <div class="surface ${s ? "playing" : ""}">
        ${c ? k`<div class="art-bg" style=${Ze({ backgroundImage: `url("${c}")` })}></div>` : j}
        <div class="top">
          <div class="art">${c ? k`<img src=${c} alt="" loading="lazy" />` : k`<ha-icon icon="mdi:music" .icon=${"mdi:music"}></ha-icon>`}</div>
          <div class="info">
            <div class="meta source">${[t.app_name ?? t.source, z(e, this.config.name)].filter(Boolean).join(" • ")}</div>
            <div class="title">${n ? q(this.hass, "nothing_playing") : t.media_title}</div>
            ${!n && t.media_artist ? k`<div class="artist">${t.media_artist}</div>` : j}
          </div>
        </div>

        ${!n && i !== void 0 && a ? k`
              <div class="progress"><div style="width:${i / a * 100}%"></div></div>
              <div class="times meta"><span>${Yt(i)}</span><span>${Yt(a)}</span></div>
            ` : j}

        <div class="controls">
          ${r & Jt.PREV ? k`<button aria-label="previous" @click=${() => this.call("media_previous_track")}><ha-icon icon="mdi:skip-previous" .icon=${"mdi:skip-previous"}></ha-icon></button>` : j}
          <button class="play" aria-label=${s ? "pause" : "play"} @click=${() => this.call("media_play_pause")}>
            <ha-icon .icon=${s ? "mdi:pause" : "mdi:play"}></ha-icon>
          </button>
          ${r & Jt.NEXT ? k`<button aria-label="next" @click=${() => this.call("media_next_track")}><ha-icon icon="mdi:skip-next" .icon=${"mdi:skip-next"}></ha-icon></button>` : j}
        </div>

        ${r & Jt.VOLUME_SET ? k`
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
		this.styles = [G, _`
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
customElements.define("glide-media", Xt);
//#endregion
//#region src/core/format.ts
var Zt = (e) => e.locale?.language ?? e.language ?? "en", Qt = (e) => e.attributes.device_class === "timestamp" || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(e.state), $t = (e, t = "en") => new Intl.DateTimeFormat(t, {
	hour: "2-digit",
	minute: "2-digit",
	hourCycle: "h23"
}).format(new Date(e));
function en(e, t, n) {
	let r = e;
	if (n) {
		let i = t.attributes[n];
		return i === void 0 ? "" : typeof i == "string" && /^\d{4}-\d{2}-\d{2}T/.test(i) ? $t(i, Zt(e)) : r.formatEntityAttributeValue?.(t, n) ?? String(i);
	}
	if (L(t.entity_id) === "weather") {
		let n = t.attributes.temperature, r = J(e, t.entity_id);
		return n === void 0 ? r : `${r} · ${n} ${t.attributes.temperature_unit ?? "°C"}`;
	}
	return Qt(t) && !Number.isNaN(Date.parse(t.state)) ? $t(t.state, Zt(e)) : J(e, t.entity_id);
}
//#endregion
//#region src/cards/chips.ts
var tn = class extends K {
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
				this.hass && W(e, this.hass, r, n.entity);
			};
			this.detachers.push(pt(e, {
				tap: () => r("tap"),
				hold: () => r("hold")
			}));
		});
	}
	renderChip(e) {
		let t = this.stateOf(e.entity), n = e.value ?? (t && this.hass ? en(this.hass, t, e.attribute) : "");
		return k`
      <div class="chip surface" role="button" tabindex="0" style="--chip:${V(e.color) ?? (t ? B(t) : "var(--gc-accent)")}">
        <ha-icon .icon=${R(t, e.icon)}></ha-icon>
        <div class="text">
          ${e.name === "" ? j : k`<div class="label">${z(t, e.name)}</div>`}
          <div class="value">${n}</div>
        </div>
      </div>
    `;
	}
	render() {
		return k`<div class="row ${this.config.align === "start" ? "start" : ""}">${this.config.chips.map((e) => this.renderChip(e))}</div>`;
	}
	static {
		this.styles = [G, _`
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
customElements.define("glide-chips", tn);
//#endregion
//#region src/cards/title.ts
var nn = class extends K {
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
		return k`
      <div class="wrap ${e.align === "start" ? "start" : ""}">
        ${e.title ? k`<h1>${e.icon ? k`<ha-icon .icon=${e.icon}></ha-icon>` : j}${e.title}</h1>` : j}
        ${e.subtitle ? k`<p>${e.subtitle}</p>` : j}
      </div>
    `;
	}
	static {
		this.styles = _`
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
customElements.define("glide-title", nn);
//#endregion
//#region src/cards/heading.ts
var rn = class extends K {
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
		let t = this.config.tap_action;
		t && this.hass && W(e.currentTarget, this.hass, t);
	}
	badge(e) {
		let t = this.stateOf(e.entity), n = e.value ?? (t && this.hass ? en(this.hass, t, e.attribute) : "");
		return k`
      <button
        class="badge surface"
        style="--c:${V(e.color) ?? (t ? B(t) : "var(--gc-accent)")}"
        @click=${(t) => {
			t.stopPropagation(), this.hass && W(t.currentTarget, this.hass, e.tap_action ?? { action: "more-info" }, e.entity);
		}}
      >
        ${e.icon || t ? k`<ha-icon .icon=${R(t, e.icon)}></ha-icon>` : j}
        <span>${n}</span>
      </button>
    `;
	}
	render() {
		let e = this.config, t = !!e.tap_action && e.tap_action.action !== "none";
		return k`
      <div class="row ${e.style === "subtitle" ? "small" : ""} ${t ? "linked" : ""}" @click=${t ? this.tap : void 0}
        role=${t ? "link" : "heading"} tabindex=${t ? "0" : "-1"}>
        ${e.icon ? k`<span class="icon" style="--c:${V(e.color) ?? "var(--gc-accent)"}"><ha-icon .icon=${e.icon}></ha-icon></span>` : j}
        <span class="title">${e.title}</span>
        ${e.subtitle ? k`<span class="sub">${e.subtitle}</span>` : j}
        ${t ? k`<ha-icon class="chev" icon="mdi:chevron-right" .icon=${"mdi:chevron-right"}></ha-icon>` : j}
        <span class="line"></span>
        ${(e.badges ?? []).map((e) => this.badge(e))}
      </div>
    `;
	}
	static {
		this.styles = [G, _`
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
        align-self: center;
        margin-bottom: -6px;
        margin-inline-start: -6px;
      }
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
customElements.define("glide-heading", rn);
//#endregion
//#region src/editor/editor.ts
var an = [
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
], on = [
	"#ff9f43",
	"#d4ff00",
	"#006a60",
	"#4aa8ff",
	"#a78bfa",
	"#ff5c8a",
	"#34c759",
	"#ffd60a"
], sn = {
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
}, cn = { select: {
	mode: "dropdown",
	options: [{
		value: "center",
		label: "Center"
	}, {
		value: "start",
		label: "Start"
	}]
} }, ln = {
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
		selector: cn
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
				selector: cn
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
		sn
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
}, un = {
	hash: "Hash (e.g. #living-room)",
	slider: "Swipe to adjust (brightness / position)",
	layout: "Layout (empty = theme default)",
	color: "Colour (empty = by entity type)",
	items: "Nav items (path or #popup-hash)",
	entity: "Entity"
};
async function dn() {
	customElements.get("ha-form") || await (await (await window.loadCardHelpers?.())?.createCardElement({
		type: "entities",
		entities: []
	}))?.constructor?.getConfigElement?.();
}
var fn = class extends I {
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
		super.connectedCallback(), dn().finally(() => this.ready = !0);
	}
	update_(e) {
		let t = {
			...this.config,
			...e
		};
		for (let [e, n] of Object.entries(t)) (n === "" || n == null) && delete t[e];
		this.config = t, H(this, "config-changed", { config: this.config });
	}
	setType(e) {
		if (e === this.config.card_type) return;
		let { type: t, theme: n, mode: r, accent: i } = this.config, a = {
			type: t,
			card_type: e,
			theme: n,
			mode: r,
			accent: i
		};
		e === "popup" && Object.assign(a, {
			hash: "#room",
			title: "Room",
			cards: []
		}), e === "chips" && Object.assign(a, { chips: [] }), e === "title" && Object.assign(a, { title: "Home" }), e === "heading" && Object.assign(a, { title: "Section" }), e === "nav" && Object.assign(a, { items: [{
			name: "Home",
			icon: "mdi:home",
			navigation_path: "#home"
		}] }), this.config = {}, this.update_(a);
	}
	render() {
		if (!this.config) return j;
		let e = this.config, t = l();
		return k`
      <div class="section">
        <div class="label">Card type</div>
        <div class="types">
          ${an.map((t) => k`<button class=${e.card_type === t.id ? "sel" : ""} @click=${() => this.setType(t.id)}>
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
          ${t.map((t) => k`<button class="theme ${e.theme === t.id ? "sel" : ""}" title=${t.description ?? ""} @click=${() => this.update_({ theme: t.id })}>
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
		].map((t) => k`<button class=${(e.mode ?? "auto") === t ? "sel" : ""} @click=${() => this.update_({ mode: t === "auto" ? void 0 : t })}>${t}</button>`)}
          </div>
          <div class="accents">
            <button class="dot none ${e.accent ? "" : "sel"}" title="Theme accent" @click=${() => this.update_({ accent: void 0 })}></button>
            ${on.map((t) => k`<button class="dot ${e.accent === t ? "sel" : ""}" style="background:${t}" title=${t} @click=${() => this.update_({ accent: t })}></button>`)}
            <label class="dot custom" title="Custom color">
              <input type="color" .value=${e.accent ?? "#ff9f43"} @input=${(e) => this.update_({ accent: e.target.value })} />
            </label>
          </div>
        </div>
      </div>

      ${this.ready ? k`<ha-form
            .hass=${this.hass}
            .data=${e}
            .schema=${ln[e.card_type]}
            .computeLabel=${(e) => un[e.name]}
            @value-changed=${(e) => {
			e.stopPropagation(), this.update_(e.detail.value);
		}}
          ></ha-form>` : j}
      ${e.card_type === "popup" && this.ready ? k`<div class="section">
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
		this.styles = _`
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
customElements.define("glide-card-editor", fn);
//#endregion
//#region src/glide-card.ts
var pn = "0.3.1", mn = [
	"button",
	"popup",
	"nav",
	"climate",
	"media",
	"chips",
	"title",
	"heading"
], hn = class extends HTMLElement {
	constructor(...e) {
		super(...e), this._editMode = !1;
	}
	setConfig(e) {
		let t = e?.card_type ?? "button";
		if (!mn.includes(t)) throw Error(`Unknown card_type "${t}". Use one of: ${mn.join(", ")}`);
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
customElements.get("glide-card") || (customElements.define("glide-card", hn), window.customCards = window.customCards ?? [], window.customCards.push({
	type: "glide-card",
	name: "Glide Card",
	description: "Themeable buttons, pop-up sheets, nav bar, climate and media cards",
	preview: !0,
	documentationURL: "https://github.com/yshaish1/glide-card"
}), console.info(`%c GLIDE-CARD %c ${pn} `, "background:#ff9f43;color:#1c1206;border-radius:4px 0 0 4px", "background:#222;color:#fff;border-radius:0 4px 4px 0"));
//#endregion
