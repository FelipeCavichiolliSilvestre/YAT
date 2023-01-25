export default function nameToColor(name: string, colors: any) {
  const hash = simpleHash(name);
  const color = hashToColor(hash, colors);

  return color;
}

function simpleHash(string: string) {
  let hash = 0;

  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  return hash;
}

function hashToColor(hash: number, colors: any) {
  const colorsName = Object.keys(colors);

  const colorIndex = Math.abs(hash % colorsName.length);
  const colorName: typeof colors = colorsName[colorIndex];
  const color = colors[colorName];

  return color;
}
