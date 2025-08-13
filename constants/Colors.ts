let baseHue = Math.round((260 / 360) * 65535);

export const getBaseHue = () => (baseHue / 65535) * 360;

export const setBaseHue = (deg: number) => {
  const norm = ((deg % 360) + 360) % 360;
  baseHue = Math.round((norm / 360) * 65535);
};

const toHex = (c: number) =>
  ("0" + Math.round(c).toString(16)).slice(-2).toUpperCase();

export const hsbToHex = ({
  saturation,
  brightness,
}: {
  saturation: number;
  brightness: number;
}) => {
  const h = (baseHue / 65535) * 360;
  const s = saturation / 254;
  const v = brightness / 254;

  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let [r, g, b] = [0, 0, 0];
  if (h < 60)      [r, g, b] = [c, x, 0];
  else if (h < 120)[r, g, b] = [x, c, 0];
  else if (h < 180)[r, g, b] = [0, c, x];
  else if (h < 240)[r, g, b] = [0, x, c];
  else if (h < 300)[r, g, b] = [x, 0, c];
  else             [r, g, b] = [c, 0, x];

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const Colors = {
  light: {
    text: {
      hex: hsbToHex({ saturation: 76, brightness: 200 }),
    },
    background: {
      hex: hsbToHex({ saturation: 76, brightness: 35 }),
    },
    tint: hsbToHex({ saturation: 150, brightness: 200 }),
    icon: {
      hex: hsbToHex({ saturation: 50, brightness: 100 }),
    },
    tabIconDefault: {
      hex: hsbToHex({ saturation: 50, brightness: 100 }),
    },
    tabIconSelected: {
      hex: hsbToHex({ saturation: 150, brightness: 200 }),
    },
  },
  dark: {
    text: {
      hex: hsbToHex({ saturation: 50, brightness: 220 }),
    },
    background: {
      hex: hsbToHex({ saturation: 76, brightness: 25 }),
    },
    tint: hsbToHex({ saturation: 150, brightness: 150 }),
    icon: {
      hex: hsbToHex({ saturation: 40, brightness: 120 }),
    },
    tabIconDefault: {
      hex: hsbToHex({ saturation: 40, brightness: 120 }),
    },
    tabIconSelected: {
      hex: hsbToHex({ saturation: 150, brightness: 150 }),
    },
  },
};
