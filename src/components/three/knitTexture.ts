import * as THREE from 'three';

/**
 * Procedural knit-stitch texture (rows of interlocking "V" loops) for the hero fabric rolls.
 * This is a decorative 3D material only — it never stands in for any supplied product or print image.
 */
export function makeKnitTexture(base: string, shade: string, highlight: string, repeat: [number, number] = [12, 4]) {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  g.fillStyle = shade;
  g.fillRect(0, 0, size, size);
  const cols = 16;
  const rows = 20;
  const w = size / cols;
  const h = size / rows;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const x = col * w;
      const y = r * h;
      const stroke = (color: string, width: number, dx: number, dy: number) => {
        g.strokeStyle = color;
        g.lineWidth = width;
        g.beginPath();
        g.moveTo(x + dx, y + dy + h * 0.05);
        g.lineTo(x + w / 2 + dx, y + h * 0.95 + dy);
        g.lineTo(x + w + dx, y + h * 0.05 + dy);
        g.stroke();
      };
      stroke(shade, w * 0.5, 0.6, 1.2); // drop shadow of the loop
      stroke(base, w * 0.4, 0, 0);
      stroke(highlight, w * 0.1, -0.5, -0.8); // soft sheen on the yarn
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat[0], repeat[1]);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/** Concentric rings = the wound-fabric end face of a roll. */
export function makeRollEndTexture(base: string, line: string) {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  g.fillStyle = base;
  g.fillRect(0, 0, size, size);
  g.strokeStyle = line;
  for (let r = 14; r < size / 2; r += 3.2) {
    g.lineWidth = 1 + (r % 9 === 0 ? 0.8 : 0);
    g.globalAlpha = 0.35 + 0.25 * Math.sin(r * 0.7);
    g.beginPath();
    g.arc(size / 2, size / 2, r, 0, Math.PI * 2);
    g.stroke();
  }
  g.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
