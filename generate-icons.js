// Pure Node.js PNG generator — no external dependencies
const fs   = require('fs');
const zlib = require('zlib');

function u32(n) { const b = Buffer.alloc(4); b.writeUInt32BE(n); return b; }

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (const b of buf) { c ^= b; for (let i = 0; i < 8; i++) c = (c >>> 1) ^ (c & 1 ? 0xEDB88320 : 0); }
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function pngChunk(type, data) {
  const t = Buffer.from(type);
  const crc = u32(crc32(Buffer.concat([t, data])));
  return Buffer.concat([u32(data.length), t, data, crc]);
}

function makePng(size, r, g, b) {
  const row = Buffer.alloc(1 + size * 4);
  row[0] = 0;
  for (let i = 0; i < size; i++) {
    row[1 + i * 4] = r; row[2 + i * 4] = g; row[3 + i * 4] = b; row[4 + i * 4] = 255;
  }
  const raw = Buffer.concat(Array.from({ length: size }, () => row));
  const compressed = zlib.deflateSync(raw, { level: 9 });

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6;

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

for (const size of [192, 512]) {
  fs.writeFileSync(`icon-${size}.png`, makePng(size, 7, 94, 84));
  console.log(`✓ icon-${size}.png`);
}
