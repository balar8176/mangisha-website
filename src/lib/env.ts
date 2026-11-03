// Capability checks used to decide whether to run expensive effects.
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const hasWebGL = (): boolean => {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
};

// Heuristic for low-powered devices: few cores, little memory, or data-saver on.
export const isLowPower = (): boolean => {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  return (
    (nav.hardwareConcurrency ?? 8) <= 4 ||
    (nav.deviceMemory ?? 8) <= 2 ||
    !!nav.connection?.saveData
  );
};

export const canRun3D = () => !prefersReducedMotion() && hasWebGL() && !isLowPower();
