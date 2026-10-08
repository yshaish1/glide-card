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
function m(e, t) {
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
var h = globalThis, g = h.ShadowRoot && (h.ShadyCSS === void 0 || h.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, _ = Symbol(), ee = /* @__PURE__ */ new WeakMap(), te = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== _) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (g && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = ee.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && ee.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, ne = (e) => new te(typeof e == "string" ? e : e + "", void 0, _), v = (e, ...t) => new te(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, _), re = (e, t) => {
	if (g) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let n of t) {
		let t = document.createElement("style"), r = h.litNonce;
		r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
	}
}, ie = g ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return ne(t);
})(e) : e, { is: ae, defineProperty: oe, getOwnPropertyDescriptor: se, getOwnPropertyNames: ce, getOwnPropertySymbols: le, getPrototypeOf: ue } = Object, y = globalThis, de = y.trustedTypes, fe = de ? de.emptyScript : "", pe = y.reactiveElementPolyfillSupport, b = (e, t) => e, x = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? fe : null;
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
}, me = (e, t) => !ae(e, t), he = {
	attribute: !0,
	type: String,
	converter: x,
	reflect: !1,
	useDefault: !1,
	hasChanged: me
};
Symbol.metadata ??= Symbol("metadata"), y.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var S = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = he) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && oe(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = se(this.prototype, e) ?? {
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
		return this.elementProperties.get(e) ?? he;
	}
	static _$Ei() {
		if (this.hasOwnProperty(b("elementProperties"))) return;
		let e = ue(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(b("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(b("properties"))) {
			let e = this.properties, t = [...ce(e), ...le(e)];
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
			for (let e of n) t.unshift(ie(e));
		} else e !== void 0 && t.push(ie(e));
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
		return re(e, this.constructor.elementStyles), e;
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
			let i = (n.converter?.toAttribute === void 0 ? x : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? x : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? me)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[b("elementProperties")] = /* @__PURE__ */ new Map(), S[b("finalized")] = /* @__PURE__ */ new Map(), pe?.({ ReactiveElement: S }), (y.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var ge = globalThis, _e = (e) => e, C = ge.trustedTypes, ve = C ? C.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ye = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, be = "?" + w, xe = `<${be}>`, T = document, E = () => T.createComment(""), D = (e) => e === null || typeof e != "object" && typeof e != "function", O = Array.isArray, Se = (e) => O(e) || typeof e?.[Symbol.iterator] == "function", Ce = "[ 	\n\f\r]", k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, we = /-->/g, Te = />/g, A = RegExp(`>|${Ce}(?:([^\\s"'>=/]+)(${Ce}*=${Ce}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), Ee = /'/g, De = /"/g, Oe = /^(?:script|style|textarea|title)$/i, ke = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), j = ke(1), Ae = ke(2), M = Symbol.for("lit-noChange"), N = Symbol.for("lit-nothing"), je = /* @__PURE__ */ new WeakMap(), P = T.createTreeWalker(T, 129);
function Me(e, t) {
	if (!O(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ve === void 0 ? t : ve.createHTML(t);
}
var Ne = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = k;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === k ? c[1] === "!--" ? o = we : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = A) : (Oe.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = A) : o = Te : o === A ? c[0] === ">" ? (o = i ?? k, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? A : c[3] === "\"" ? De : Ee) : o === De || o === Ee ? o = A : o === we || o === Te ? o = k : (o = A, i = void 0);
		let d = o === A && e[t + 1].startsWith("/>") ? " " : "";
		a += o === k ? n + xe : l >= 0 ? (r.push(s), n.slice(0, l) + ye + n.slice(l) + w + d) : n + w + (l === -2 ? t : d);
	}
	return [Me(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, F = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Ne(t, n);
		if (this.el = e.createElement(l, r), P.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = P.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ye)) {
					let t = u[o++], n = i.getAttribute(e).split(w), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Ie : r[1] === "?" ? Le : r[1] === "@" ? Re : L
					}), i.removeAttribute(e);
				} else e.startsWith(w) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (Oe.test(i.tagName)) {
					let e = i.textContent.split(w), t = e.length - 1;
					if (t > 0) {
						i.textContent = C ? C.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], E()), P.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], E());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === be) c.push({
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
function I(e, t, n = e, r) {
	if (t === M) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = D(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = I(e, i._$AS(e, t.values), i, r)), t;
}
var Pe = class {
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
		P.currentNode = r;
		let i = P.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Fe(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new ze(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = P.nextNode(), a++);
		}
		return P.currentNode = T, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Fe = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = N, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = I(this, e, t), D(e) ? e === N || e == null || e === "" ? (this._$AH !== N && this._$AR(), this._$AH = N) : e !== this._$AH && e !== M && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? Se(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== N && D(this._$AH) ? this._$AA.nextSibling.data = e : this.T(T.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = F.createElement(Me(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Pe(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = je.get(e.strings);
		return t === void 0 && je.set(e.strings, t = new F(e)), t;
	}
	k(t) {
		O(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(E()), this.O(E()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = _e(e).nextSibling;
			_e(e).remove(), e = t;
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
		this.type = 1, this._$AH = N, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = N;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = I(this, e, t, 0), a = !D(e) || e !== this._$AH && e !== M, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = I(this, r[n + o], t, o), s === M && (s = this._$AH[o]), a ||= !D(s) || s !== this._$AH[o], s === N ? e = N : e !== N && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === N ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Ie = class extends L {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === N ? void 0 : e;
	}
}, Le = class extends L {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== N);
	}
}, Re = class extends L {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = I(this, e, t, 0) ?? N) === M) return;
		let n = this._$AH, r = e === N && n !== N || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== N && (n === N || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, ze = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		I(this, e);
	}
}, Be = ge.litHtmlPolyfillSupport;
Be?.(F, Fe), (ge.litHtmlVersions ??= []).push("3.3.3");
var Ve = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Fe(t.insertBefore(E(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, R = globalThis, z = class extends S {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ve(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return M;
	}
};
z._$litElement$ = !0, z.finalized = !0, R.litElementHydrateSupport?.({ LitElement: z });
var He = R.litElementPolyfillSupport;
He?.({ LitElement: z }), (R.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/lit-html/directive.js
var Ue = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, We = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), Ge = class {
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
}, Ke = "important", qe = " !" + Ke, Je = We(class extends Ge {
	constructor(e) {
		if (super(e), e.type !== Ue.ATTRIBUTE || e.name !== "style" || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
				let t = typeof r == "string" && r.endsWith(qe);
				e.includes("-") || t ? n.setProperty(e, t ? r.slice(0, -11) : r, t ? Ke : "") : n[e] = r;
			}
		}
		return M;
	}
}), B = (e = "") => e.split(".")[0], Ye = /* @__PURE__ */ new Set([
	"off",
	"closed",
	"idle",
	"standby",
	"paused",
	"unavailable",
	"unknown",
	"locked",
	"docked"
]), Xe = (e) => !e || e.state === "unavailable" || e.state === "unknown", V = (e) => !!e && !Ye.has(e.state), Ze = {
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
}, Qe = (e, t) => t ?? e?.attributes.icon ?? (Ze[B(e?.entity_id)]?.[+!V(e)] || "mdi:help-circle-outline"), H = (e, t) => t ?? e?.attributes.friendly_name ?? e?.entity_id ?? "", $e = (e) => ({
	light: "var(--gc-light)",
	fan: "var(--gc-fan)",
	cover: "var(--gc-cover)",
	climate: "var(--gc-heat)",
	media_player: "var(--gc-media)"
})[B(e?.entity_id)] ?? "var(--gc-accent)", et = /* @__PURE__ */ new Set([
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
]), tt = (e) => e ? et.has(e) ? `var(--${e}-color)` : e : void 0;
function nt(e) {
	if (!e) return;
	let t = e.entity_id, n = e.attributes;
	switch (B(t)) {
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
var rt = /* @__PURE__ */ new Set([
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
function it(e, t) {
	let n = B(t.entity_id), r = t.entity_id;
	return n === "cover" ? e.callService("cover", "toggle", { entity_id: r }) : n === "lock" ? e.callService("lock", t.state === "locked" ? "unlock" : "lock", { entity_id: r }) : n === "scene" || n === "script" ? e.callService(n, "turn_on", { entity_id: r }) : n === "button" || n === "input_button" ? e.callService(n, "press", { entity_id: r }) : rt.has(n) ? e.callService(n, "toggle", { entity_id: r }) : e.callService("homeassistant", "toggle", { entity_id: r });
}
//#endregion
//#region src/core/fire.ts
function U(e, t, n) {
	e.dispatchEvent(new CustomEvent(t, {
		detail: n,
		bubbles: !0,
		composed: !0
	}));
}
var W = (e = "light") => U(window, "haptic", e), at;
function ot(e, t) {
	at = t?.getBoundingClientRect();
	let n = e.startsWith("#") ? e : `#${e}`;
	location.hash !== n && (history.pushState({ glidePopup: !0 }, "", n), window.dispatchEvent(new CustomEvent("glide-hash")));
}
function st(e, t) {
	if (e.startsWith("#")) return ot(e, t);
	history.pushState(null, "", e), U(window, "location-changed", { replace: !1 });
}
function G(e, t, n, r) {
	if (n && n.action !== "none") switch (W(n.action === "toggle" ? "light" : "selection"), n.action) {
		case "toggle": {
			let e = r ? t.states[r] : void 0;
			e && it(t, e);
			return;
		}
		case "more-info":
			r && U(e, "hass-more-info", { entityId: r });
			return;
		case "popup":
		case "navigate":
			n.navigation_path && st(n.navigation_path, e);
			return;
		default: U(e, "hass-action", {
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
var K = v`
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
function ct(e) {
	if (e !== void 0) return e;
	try {
		let e = localStorage.getItem("glide-card-lite");
		if (e === "1" || e === "0") return e === "1";
	} catch {}
	let t = navigator.deviceMemory;
	return t !== void 0 && t <= 2;
}
var q = class extends z {
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
		let e = p(this.config.theme, this), t = m(this.config.mode, this.hass?.themes?.darkMode), n = `${e}|${t}|${this.config.accent ?? ""}|${this.config.lite}`;
		if (n === this.themeKey) return;
		this.themeKey = n, this.theme = c(e), this.toggleAttribute("dark", t), this.toggleAttribute("lite", ct(this.config.lite)), this.dataset.theme = e, this.config.accent ? this.style.setProperty("--gc-accent", this.config.accent) : this.style.removeProperty("--gc-accent");
		let r = this.constructor.elementStyles.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
		this.renderRoot.adoptedStyleSheets = [...r, f(e, t, this.cardType)];
	}
	stateOf(e) {
		return e ? this.hass?.states[e] : void 0;
	}
}, lt = 500, ut = 250, dt = 8;
function ft(e, t) {
	let n = 0, r = 0, i = 0, a = 0, o = 0, s = 0, c = "idle", l = () => clearTimeout(o), u = () => e.getBoundingClientRect().width || 1, d = () => getComputedStyle(e).direction === "rtl", f = (e) => {
		e.button === 0 && (n = e.clientX, r = e.clientY, c = "down", l(), t.hold && (o = window.setTimeout(() => {
			c = "held", t.hold();
		}, lt)));
	}, p = (o) => {
		if (c === "down") {
			let a = o.clientX - n, s = o.clientY - r;
			if (Math.abs(a) < dt && Math.abs(s) < dt) return;
			l(), t.dragStart && Math.abs(a) > Math.abs(s) ? (c = "drag", i = t.dragStart(), e.setPointerCapture(o.pointerId)) : c = "cancel";
		}
		if (c === "drag") {
			let e = (o.clientX - n) / u() * 100 * (d() ? -1 : 1);
			a = Math.round(Math.min(100, Math.max(0, i + e))), t.drag?.(a);
		}
	}, m = () => {
		l(), c === "drag" ? t.dragEnd?.(a) : c === "down" && (t.doubleTap ? s ? (clearTimeout(s), s = 0, t.doubleTap()) : s = window.setTimeout(() => {
			s = 0, t.tap?.();
		}, ut) : t.tap?.()), c = "idle";
	}, h = () => {
		l(), c === "drag" && t.dragEnd?.(a), c = "idle";
	}, g = (e) => {
		t.hold && e.preventDefault();
	}, _ = (e) => {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), t.tap?.());
	};
	return e.addEventListener("pointerdown", f), e.addEventListener("pointermove", p), e.addEventListener("pointerup", m), e.addEventListener("pointercancel", h), e.addEventListener("contextmenu", g), e.addEventListener("keydown", _), () => {
		l(), clearTimeout(s), e.removeEventListener("pointerdown", f), e.removeEventListener("pointermove", p), e.removeEventListener("pointerup", m), e.removeEventListener("pointercancel", h), e.removeEventListener("contextmenu", g), e.removeEventListener("keydown", _);
	};
}
//#endregion
//#region src/core/i18n.ts
var J = {
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
}, pt = {
	en: J,
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
function Y(e, t) {
	return (pt[(e?.locale?.language ?? e?.language ?? "en").split("-")[0]] ?? J)[t] ?? J[t];
}
function mt(e, t) {
	let n = e.states[t];
	if (!n) return Y(e, "unavailable");
	let r = e.formatEntityState;
	return r ? r(n) : (Y(e, n.state) ?? n.state) || n.state;
}
//#endregion
//#region src/cards/button.ts
var ht = /* @__PURE__ */ new Set([
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
]), gt = class extends q {
	constructor(...e) {
		super(...e), this.cardType = "button";
	}
	static {
		this.properties = {
			...q.properties,
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
		if (e === "tap") return { action: n && ht.has(B(n)) ? "toggle" : "more-info" };
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
		this.detach = ft(e, {
			tap: () => this.hass && G(this, this.hass, this.action("tap"), this.config.entity),
			hold: () => this.hass && G(this, this.hass, this.action("hold"), this.config.entity),
			doubleTap: this.config.double_tap_action ? () => this.hass && G(this, this.hass, this.action("double_tap"), this.config.entity) : void 0,
			dragStart: () => {
				let e = this.slider;
				return t = -1, e ? e.value : NaN;
			},
			drag: (e) => {
				if (!this.slider) return;
				this.dragValue = e;
				let n = Math.floor(e / 10);
				n !== t && (t = n, W("selection"));
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
		return this.config.slider === !1 ? void 0 : nt(this.stateOf(this.config.entity));
	}
	render() {
		let e = this.stateOf(this.config.entity), t = this.slider, n = this.dragValue ?? t?.value, r = this.dragValue === void 0 ? V(e) : this.dragValue > 0, i = this.hass && this.config.entity ? mt(this.hass, this.config.entity) : "", a = t && r && n !== void 0 ? `${n}%` : i, o = t ? n ?? 0 : r ? 100 : 0;
		return j`
      <div
        class="surface ${this.layout} ${r ? "on" : ""} ${Xe(e) && this.config.entity ? "unavailable" : ""}"
        style=${Je({
			"--domain": tt(this.config.color) ?? $e(e),
			"--fill": `${o}%`
		})}
        role="button"
        tabindex="0"
        aria-label=${H(e, this.config.name)}
      >
        <div class="fill ${this.dragValue === void 0 ? "" : "dragging"}"></div>
        <div class="icon"><ha-icon .icon=${Qe(e, this.config.icon)}></ha-icon></div>
        <div class="text">
          <div class="name">${H(e, this.config.name)}</div>
          <div class="meta">${a}</div>
        </div>
        ${i ? j`<div class="badge meta">${i}</div>` : N}
      </div>
    `;
	}
	static {
		this.styles = [K, v`
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
customElements.define("glide-button", gt);
//#endregion
//#region src/core/spring.ts
function _t(e = 170, t = 22, n = 1, r = 48) {
	let i = Math.sqrt(e / n), a = t / (2 * Math.sqrt(e * n)), o = i * Math.sqrt(Math.max(0, 1 - a * a)), s = (e) => a < 1 ? 1 - Math.exp(-a * i * e) * (Math.cos(o * e) + a * i / o * Math.sin(o * e)) : 1 - Math.exp(-i * e) * (1 + i * e), c = Math.min(1.2, Math.log(1e3) / (a * i)), l = Array.from({ length: r + 1 }, (e, t) => +s(t / r * c).toFixed(4));
	return l[r] = 1, {
		easing: `linear(${l.join(",")})`,
		duration: Math.round(c * 1e3)
	};
}
var vt = () => matchMedia("(prefers-reduced-motion: reduce)").matches, yt = "(min-width: 768px)", bt = 120, xt = .6, St = [
	"hass-more-info",
	"show-dialog",
	"hass-notification",
	"hass-action",
	"ll-custom"
], Ct = CSS.supports?.("animation-timing-function", "linear(0, 1)"), wt = (e, t) => Ct ? _t(e, t) : {
	easing: "cubic-bezier(.2,.9,.25,1)",
	duration: 420
}, Tt = 0, Et = (e) => {
	Tt = Math.max(0, Tt + (e ? 1 : -1)), document.documentElement.style.overflow = Tt ? "hidden" : "";
}, Dt = class extends q {
	static {
		this.properties = {
			...q.properties,
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
		for (let e of St) this.addEventListener(e, this.forward);
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
		this.open && (W("light"), history.state?.glidePopup ? history.back() : (history.replaceState(history.state, "", location.pathname + location.search), window.dispatchEvent(new CustomEvent("glide-hash"))));
	}
	updated(e) {
		super.updated(e), e.has("open") && (e.get("open") !== void 0 || this.open) && (this.open ? (this.build(), this.origin = at, Et(!0), this.animateOpen()) : (Et(!1), this.animateClose()));
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
		}), vt()) return;
		let { easing: t, duration: n } = wt(), r = this.origin, i = e.getBoundingClientRect();
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
		} else matchMedia(yt).matches ? e.animate([{
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
		let e = this.panel, t = e.style.transform || "none", n = matchMedia(yt).matches ? {
			transform: "scale(.94)",
			opacity: 0
		} : {
			transform: "translateY(100%)",
			opacity: 1
		}, r = vt() ? 0 : 260;
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
		if (matchMedia(yt).matches || e.button !== 0 || e.target.closest("button")) return;
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
			if (n.removeEventListener("pointermove", s), n.removeEventListener("pointerup", c), n.removeEventListener("pointercancel", c), this.scrim.style.opacity = "", o > bt || a > xt) return this.requestClose();
			let { easing: e, duration: r } = wt(260, 24), i = t.style.transform;
			t.style.transform = "", t.animate([{ transform: i }, { transform: "none" }], {
				duration: r,
				easing: e
			});
		};
		n.addEventListener("pointermove", s), n.addEventListener("pointerup", c), n.addEventListener("pointercancel", c);
	}
	render() {
		if (!this.config) return N;
		let e = this.config, t = this.stateOf(e.entity);
		return j`
      <div class="scrim" @click=${() => this.requestClose()}></div>
      <div class="panel surface" role="dialog" aria-modal="true" aria-label=${e.title ?? ""} tabindex="-1">
        <div class="handle" @pointerdown=${(e) => this.onDragStart(e)}>
          <div class="grabber"></div>
          <header>
            ${e.icon || t ? j`<div class="icon"><ha-icon .icon=${e.icon ?? Qe(t)}></ha-icon></div>` : N}
            <div class="titles">
              <div class="title">${e.title ?? ""}</div>
              ${t && this.hass ? j`<div class="meta">${mt(this.hass, e.entity)}</div>` : N}
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
		this.styles = [K, v`
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
customElements.define("glide-sheet", Dt);
var X = /* @__PURE__ */ new Map(), Ot, kt = (e) => e.startsWith("#") ? e : `#${e}`;
function At(e) {
	let t = kt(e.hash), n = X.get(t);
	n || (n = document.createElement("glide-sheet"), document.body.appendChild(n), X.set(t, n)), n.setConfig(e), Ot && n.setHass(Ot), Nt();
}
function jt(e) {
	let t = X.get(kt(e));
	t && (t.remove(), X.delete(kt(e)));
}
function Mt(e) {
	Ot = e, X.forEach((t) => t.setHass(e));
}
function Nt() {
	let e = decodeURIComponent(location.hash);
	X.forEach((t, n) => t.open = n === e);
}
for (let e of [
	"popstate",
	"hashchange",
	"glide-hash",
	"location-changed"
]) window.addEventListener(e, Nt);
//#endregion
//#region src/cards/popup.ts
var Pt = class extends q {
	constructor(...e) {
		super(...e), this.cardType = "popup";
	}
	setConfig(e) {
		if (!e.hash) throw Error("Pop-up needs a `hash`, e.g. #living-room");
		if (!Array.isArray(e.cards)) throw Error("Pop-up needs a `cards` list");
		super.setConfig(e), this.isConnected && At(e);
	}
	shouldUpdate(e) {
		return e.has("hass") && this.hass && Mt(this.hass), e.has("editMode") || e.has("config") || super.shouldUpdate(e);
	}
	connectedCallback() {
		super.connectedCallback(), this.config && At(this.config);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		let e = this.config?.hash;
		setTimeout(() => !this.isConnected && e && jt(e), 1e3);
	}
	updated(e) {
		if (super.updated(e), e.has("editMode")) {
			let e = this.parentElement;
			e && (e.style.display = this.editMode ? "block" : "none"), U(this, "card-visibility-changed", { value: this.editMode });
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
        <button @click=${(t) => ot(e.hash, t.currentTarget)}>Preview</button>
      </div>
    `;
	}
	static {
		this.styles = [K, v`
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
customElements.define("glide-popup", Pt);
//#endregion
//#region src/cards/nav.ts
var Ft = [
	"popstate",
	"location-changed",
	"glide-hash"
], It = class extends q {
	constructor(...e) {
		super(...e), this.cardType = "nav", this.onRoute = () => this.requestUpdate();
	}
	setConfig(e) {
		if (!Array.isArray(e.items) || !e.items.length) throw Error("Nav needs an `items` list");
		super.setConfig(e);
	}
	watched() {
		return this.config.items.map((e) => e.entity);
	}
	connectedCallback() {
		super.connectedCallback(), Ft.forEach((e) => window.addEventListener(e, this.onRoute));
	}
	disconnectedCallback() {
		super.disconnectedCallback(), Ft.forEach((e) => window.removeEventListener(e, this.onRoute));
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
	updated() {
		let e = this.renderRoot.querySelector("button.active"), t = this.renderRoot.querySelector(".indicator");
		if (t) {
			if (!e) return void (t.style.opacity = "0");
			t.style.opacity = "1", t.style.width = `${e.offsetWidth}px`, t.style.transform = `translateX(${e.offsetLeft}px)`;
		}
	}
	render() {
		return j`
      <nav class="surface ${this.editMode ? "inline" : "floating"}">
        <div class="indicator"></div>
        ${this.config.items.map((e) => j`
            <button
              class=${this.isCurrent(e) ? "active" : ""}
              aria-current=${this.isCurrent(e) ? "page" : "false"}
              @click=${(t) => {
			W("selection"), st(e.navigation_path, t.currentTarget);
		}}
            >
              <ha-icon .icon=${e.icon}></ha-icon>
              <span class="meta">${e.name}</span>
              ${e.entity && V(this.stateOf(e.entity)) ? j`<i class="dot"></i>` : N}
            </button>
          `)}
      </nav>
    `;
	}
	static {
		this.styles = [K, v`
      nav {
        display: flex;
        gap: 4px;
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
      .indicator {
        position: absolute;
        top: 6px;
        bottom: 6px;
        left: 0;
        border-radius: var(--gc-radius-control);
        background: color-mix(in srgb, var(--gc-accent) 22%, transparent);
        border: 1px solid color-mix(in srgb, var(--gc-accent) 45%, transparent);
        box-sizing: border-box;
        transition: transform 0.45s cubic-bezier(0.3, 1.3, 0.4, 1), width 0.45s cubic-bezier(0.3, 1.3, 0.4, 1), opacity 0.2s;
        pointer-events: none;
      }
      button {
        all: unset;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        min-width: 64px;
        padding: 8px 14px;
        border-radius: var(--gc-radius-control);
        color: var(--gc-text-dim);
        cursor: pointer;
        transition: color 0.2s;
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
customElements.define("glide-nav", It);
//#endregion
//#region src/cards/climate.ts
var Lt = {
	heat: "mdi:fire",
	cool: "mdi:snowflake",
	heat_cool: "mdi:sun-snowflake-variant",
	auto: "mdi:thermostat-auto",
	dry: "mdi:water-percent",
	fan_only: "mdi:fan",
	off: "mdi:power"
}, Z = 270, Q = 135, $ = 80, Rt = 700, zt = (e) => {
	let t = e * Math.PI / 180;
	return [100 + $ * Math.cos(t), 100 + $ * Math.sin(t)];
}, Bt = (e, t) => {
	let [n, r] = zt(e), [i, a] = zt(t);
	return `M ${n} ${r} A ${$} ${$} 0 ${+(t - e > 180)} 1 ${i} ${a}`;
}, Vt = class extends q {
	constructor(...e) {
		super(...e), this.cardType = "climate", this.timer = 0;
	}
	static {
		this.properties = {
			...q.properties,
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
		i !== this.target && (this.pending = i, W("selection"), clearTimeout(this.timer), this.timer = window.setTimeout(() => {
			this.timer = 0, this.hass?.callService("climate", "set_temperature", {
				entity_id: this.config.entity,
				temperature: this.pending
			});
		}, Rt));
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
		if (!e) return j`<div class="surface empty">${this.config.entity}</div>`;
		let t = e.attributes, { min: n, max: r, step: i } = this.range, a = this.target, o = this.modeColor(e.state), s = Q + (a === void 0 ? 0 : (a - n) / (r - n)) * Z, [c, l] = zt(s), u = t.hvac_action, d = u === "heating" ? `${Y(this.hass, "heating")} ${a}°` : u === "cooling" ? `${Y(this.hass, "cooling")} ${a}°` : u === "off" || e.state === "off" ? Y(this.hass, "off") : Y(this.hass, "idle"), f = +(i < 1);
		return j`
      <div class="surface" style="--mode:${o}">
        <header>
          <div class="icon"><ha-icon .icon=${Lt[e.state] ?? "mdi:thermostat"}></ha-icon></div>
          <div class="titles">
            <div class="name">${H(e, this.config.name)}</div>
            <div class="meta mode-text">${d}</div>
          </div>
          ${u && u !== "idle" && u !== "off" ? j`<div class="chip meta"><i></i>${this.hass?.formatEntityAttributeValue?.(e, "hvac_action") ?? u}</div>` : N}
        </header>

        <div class="dial">
          <svg viewBox="0 0 200 200" @pointerdown=${(e) => this.onDial(e)} role="slider"
            aria-valuemin=${n} aria-valuemax=${r} aria-valuenow=${a ?? ""} aria-label=${Y(this.hass, "target")}>
            ${Ae`<path class="track" d=${Bt(Q, 405)} />`}
            ${a !== void 0 && e.state !== "off" ? Ae`<path class="value" d=${Bt(Q, Math.max(135.5, s))} /><circle class="knob" cx=${c} cy=${l} r="9" />` : N}
          </svg>
          <div class="readout">
            <div class="target">${a === void 0 ? "--" : a.toFixed(f)}<sup>°</sup></div>
            <div class="meta">${Y(this.hass, "target")}</div>
            ${t.current_temperature === void 0 ? N : j`<div class="meta current">${Y(this.hass, "current")} ${t.current_temperature}°</div>`}
          </div>
        </div>

        <div class="steppers">
          <button class="round" aria-label="-" @click=${() => a !== void 0 && this.setTarget(a - i)}><ha-icon icon="mdi:minus" .icon=${"mdi:minus"}></ha-icon></button>
          <span class="meta">${i}°</span>
          <button class="round" aria-label="+" @click=${() => a !== void 0 && this.setTarget(a + i)}><ha-icon icon="mdi:plus" .icon=${"mdi:plus"}></ha-icon></button>
        </div>

        <div class="modes">
          ${(t.hvac_modes ?? []).map((t) => j`
              <button class=${t === e.state ? "on" : ""} style="--c:${this.modeColor(t)}"
                @click=${() => {
			W("light"), this.hass?.callService("climate", "set_hvac_mode", {
				entity_id: e.entity_id,
				hvac_mode: t
			});
		}}>
                <ha-icon .icon=${Lt[t] ?? "mdi:thermostat"}></ha-icon>
                <span class="meta">${Y(this.hass, t) ?? t}</span>
              </button>
            `)}
        </div>
      </div>
    `;
	}
	static {
		this.styles = [K, v`
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
customElements.define("glide-climate", Vt);
//#endregion
//#region src/cards/media.ts
var Ht = {
	PAUSE: 1,
	VOLUME_SET: 4,
	PREV: 16,
	NEXT: 32,
	PLAY: 16384
}, Ut = (e) => `${Math.floor(e / 60)}:${String(Math.floor(e % 60)).padStart(2, "0")}`, Wt = class extends q {
	constructor(...e) {
		super(...e), this.cardType = "media", this.tick = 0;
	}
	static {
		this.properties = {
			...q.properties,
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
		W("light"), this.hass?.callService("media_player", e, {
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
		let t = e.attributes, n = Xe(e) || e.state === "off" || e.state === "idle" || e.state === "standby" || !t.media_title, r = t.supported_features ?? 0, i = this.position(), a = t.media_duration, o = this.volDrag ?? Math.round((t.volume_level ?? 0) * 100), s = e.state === "playing", c = t.entity_picture;
		return j`
      <div class="surface ${s ? "playing" : ""}">
        ${c ? j`<div class="art-bg" style=${Je({ backgroundImage: `url("${c}")` })}></div>` : N}
        <div class="top">
          <div class="art">${c ? j`<img src=${c} alt="" loading="lazy" />` : j`<ha-icon icon="mdi:music" .icon=${"mdi:music"}></ha-icon>`}</div>
          <div class="info">
            <div class="meta source">${[t.app_name ?? t.source, H(e, this.config.name)].filter(Boolean).join(" • ")}</div>
            <div class="title">${n ? Y(this.hass, "nothing_playing") : t.media_title}</div>
            ${!n && t.media_artist ? j`<div class="artist">${t.media_artist}</div>` : N}
          </div>
        </div>

        ${!n && i !== void 0 && a ? j`
              <div class="progress"><div style="width:${i / a * 100}%"></div></div>
              <div class="times meta"><span>${Ut(i)}</span><span>${Ut(a)}</span></div>
            ` : N}

        <div class="controls">
          ${r & Ht.PREV ? j`<button aria-label="previous" @click=${() => this.call("media_previous_track")}><ha-icon icon="mdi:skip-previous" .icon=${"mdi:skip-previous"}></ha-icon></button>` : N}
          <button class="play" aria-label=${s ? "pause" : "play"} @click=${() => this.call("media_play_pause")}>
            <ha-icon .icon=${s ? "mdi:pause" : "mdi:play"}></ha-icon>
          </button>
          ${r & Ht.NEXT ? j`<button aria-label="next" @click=${() => this.call("media_next_track")}><ha-icon icon="mdi:skip-next" .icon=${"mdi:skip-next"}></ha-icon></button>` : N}
        </div>

        ${r & Ht.VOLUME_SET ? j`
              <div class="volume">
                <ha-icon icon="mdi:volume-low" .icon=${"mdi:volume-low"}></ha-icon>
                <div class="track" role="slider" aria-label="volume" aria-valuenow=${o} aria-valuemin="0" aria-valuemax="100"
                  @pointerdown=${(e) => this.onVolume(e)}>
                  <div class="bar" style="width:${o}%"></div>
                </div>
                <ha-icon icon="mdi:volume-high" .icon=${"mdi:volume-high"}></ha-icon>
              </div>
            ` : N}
      </div>
    `;
	}
	static {
		this.styles = [K, v`
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
customElements.define("glide-media", Wt);
//#endregion
//#region src/editor/editor.ts
var Gt = [
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
	}
], Kt = [
	"#ff9f43",
	"#d4ff00",
	"#006a60",
	"#4aa8ff",
	"#a78bfa",
	"#ff5c8a",
	"#34c759",
	"#ffd60a"
], qt = {
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
		}
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
				entity: { selector: { entity: {} } }
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
}, Jt = {
	hash: "Hash (e.g. #living-room)",
	slider: "Swipe to adjust (brightness / position)",
	layout: "Layout (empty = theme default)",
	color: "Colour (empty = by entity type)",
	items: "Nav items (path or #popup-hash)",
	entity: "Entity"
};
async function Yt() {
	customElements.get("ha-form") || await (await (await window.loadCardHelpers?.())?.createCardElement({
		type: "entities",
		entities: []
	}))?.constructor?.getConfigElement?.();
}
var Xt = class extends z {
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
		super.connectedCallback(), Yt().finally(() => this.ready = !0);
	}
	update_(e) {
		let t = {
			...this.config,
			...e
		};
		for (let [e, n] of Object.entries(t)) (n === "" || n == null) && delete t[e];
		this.config = t, U(this, "config-changed", { config: this.config });
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
		}), e === "nav" && Object.assign(a, { items: [{
			name: "Home",
			icon: "mdi:home",
			navigation_path: "#home"
		}] }), this.config = {}, this.update_(a);
	}
	render() {
		if (!this.config) return N;
		let e = this.config, t = l();
		return j`
      <div class="section">
        <div class="label">Card type</div>
        <div class="types">
          ${Gt.map((t) => j`<button class=${e.card_type === t.id ? "sel" : ""} @click=${() => this.setType(t.id)}>
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
            ${Kt.map((t) => j`<button class="dot ${e.accent === t ? "sel" : ""}" style="background:${t}" title=${t} @click=${() => this.update_({ accent: t })}></button>`)}
            <label class="dot custom" title="Custom color">
              <input type="color" .value=${e.accent ?? "#ff9f43"} @input=${(e) => this.update_({ accent: e.target.value })} />
            </label>
          </div>
        </div>
      </div>

      ${this.ready ? j`<ha-form
            .hass=${this.hass}
            .data=${e}
            .schema=${qt[e.card_type]}
            .computeLabel=${(e) => Jt[e.name]}
            @value-changed=${(e) => {
			e.stopPropagation(), this.update_(e.detail.value);
		}}
          ></ha-form>` : N}
      ${e.card_type === "popup" && this.ready ? j`<div class="section">
            <div class="label">Cards inside the pop-up (YAML)</div>
            <ha-yaml-editor
              .hass=${this.hass}
              .defaultValue=${e.cards ?? []}
              @value-changed=${(e) => {
			e.stopPropagation(), e.detail.isValid !== !1 && Array.isArray(e.detail.value) && this.update_({ cards: e.detail.value });
		}}
            ></ha-yaml-editor>
          </div>` : N}
    `;
	}
	static {
		this.styles = v`
    :host { display: block; }
    .section { margin-bottom: 16px; }
    .label { font-weight: 500; margin-bottom: 8px; color: var(--primary-text-color); }
    button { font: inherit; cursor: pointer; color: var(--primary-text-color); }
    .types { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
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
customElements.define("glide-card-editor", Xt);
//#endregion
//#region src/glide-card.ts
var Zt = "0.1.2", Qt = [
	"button",
	"popup",
	"nav",
	"climate",
	"media"
], $t = class extends HTMLElement {
	constructor(...e) {
		super(...e), this._editMode = !1;
	}
	setConfig(e) {
		let t = e?.card_type ?? "button";
		if (!Qt.includes(t)) throw Error(`Unknown card_type "${t}". Use one of: ${Qt.join(", ")}`);
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
customElements.get("glide-card") || (customElements.define("glide-card", $t), window.customCards = window.customCards ?? [], window.customCards.push({
	type: "glide-card",
	name: "Glide Card",
	description: "Themeable buttons, pop-up sheets, nav bar, climate and media cards",
	preview: !0,
	documentationURL: "https://github.com/yshaish1/glide-card"
}), console.info(`%c GLIDE-CARD %c ${Zt} `, "background:#ff9f43;color:#1c1206;border-radius:4px 0 0 4px", "background:#222;color:#fff;border-radius:0 4px 4px 0"));
//#endregion
