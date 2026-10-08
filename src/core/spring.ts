/**
 * Builds a CSS `linear()` easing that approximates a damped spring, so WAAPI
 * animations get real spring motion without a physics library.
 */
export function springEasing(stiffness = 170, damping = 22, mass = 1, steps = 48): { easing: string; duration: number } {
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const wd = w0 * Math.sqrt(Math.max(0, 1 - zeta * zeta));
  const at = (t: number) =>
    zeta < 1
      ? 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t))
      : 1 - Math.exp(-w0 * t) * (1 + w0 * t);
  // Settle time: when the envelope drops below 0.1%.
  const duration = Math.min(1.2, Math.log(1000) / (zeta * w0));
  const pts = Array.from({ length: steps + 1 }, (_, i) => +at((i / steps) * duration).toFixed(4));
  pts[steps] = 1;
  return { easing: `linear(${pts.join(",")})`, duration: Math.round(duration * 1000) };
}

export const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
