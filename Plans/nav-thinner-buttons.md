# Nav: thinner buttons

## Context
The user wants the bottom-nav buttons to be a bit shorter: thinner, but not too thin. Today a button is about 56px
tall (8px padding, 24px icon, 2px gap, 11px label, 8px padding), and the bar is about 68px including its 6px
padding. They want to see a real mockup before choosing. Whatever they pick becomes the **new default**, with no
config option.

## Steps
1. **Mockup.** Build one HTML page and publish it as a private Artifact so it can be opened on the phone. It shows
   four variants stacked, each as the real nav: RTL Hebrew items (ראשי, סלון, מטבח, משרד, חדרים, מרתף, חוץ, and a
   pinned "עוד"), glass surface, an accent pill on the active item, and phone width. Each variant is labelled with
   its size.
   - A. Current: 56px button / 68px bar
   - B. Slim: 48px (padding 5px, icon 22px, gap 1px). Bar about 58px.
   - C. Slimmer: 42px (padding 4px, icon 20px, label 10px, gap 0). Bar about 50px.
   - D. Inline: icon beside the label, about 36px. Bar about 44px.
   Tapping an item moves the pill, so the user can feel each one. It has light and dark themes.
2. The user picks one (or asks for an in-between).
3. **Apply it in `src/cards/nav.ts` styles only.** Change the `button` padding and gap, the `ha-icon` size
   (`--mdc-icon-size`), the `.meta` font size, and the `nav` padding. Keep the `@media (max-width: 600px)` block
   consistent with these. Move the `.dot` position so it still sits on the icon. The indicator fills the button, so
   it follows the change automatically. If D is chosen, also set `flex-direction: row` on buttons.
4. Run tests and build, bump the version, then publish when asked.

## Verification
- Open the mockup on the phone and confirm the chosen variant looks right.
- After applying: `npm test`, `npm run build`, playground in Hebrew at phone width. Check the pill shape, the
  position of the active dot, and that the scroll reveal still centres items.

## Status
- [x] Mockup published: https://claude.ai/artifact/FUrz8sR5QnkrHUMg933SFT
- [x] Variant chosen: C (padding 4px, icon 20px, label 10px, no gap, bar padding 4px, dot top 3px)
- [ ] Applied, tested, published

Project copy: `Plans/nav-thinner-buttons.md`.
