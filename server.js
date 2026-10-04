const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.wasm': 'application/wasm',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.bin': 'application/octet-stream',
  '.ktx2': 'image/ktx2',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.otf': 'font/otf',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Serve index.html for root
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  const cleanPath = pathname.replace(/^\//, '');
  const filePath = path.join(PUBLIC_DIR, cleanPath);

  // Security check: prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 404 fallback to index.html for SPA if not an asset
      if (!path.extname(pathname)) {
        const indexPath = path.join(PUBLIC_DIR, 'index.html');
        return sendFile(req, res, indexPath, 'text/html; charset=utf-8');
      }
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end(`404 Not Found: ${pathname}`);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    sendFile(req, res, filePath, contentType, stats);
  });
});

function sendFile(req, res, filePath, contentType, stats) {
  if (!stats) {
    stats = fs.statSync(filePath);
  }

  const range = req.headers.range;

  // Handle HTTP Range requests (crucial for audio and video streaming)
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
    const chunksize = (end - start) + 1;

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${stats.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });

    const fileStream = fs.createReadStream(filePath, { start, end });
    fileStream.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': stats.size,
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*'
    });

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  }
}

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` ZERO University WebGL 3D Experience is Live!`);
  console.log(` URL: http://localhost:${PORT}`);
  console.log(` Models, Shaders, Sounds & Physics all Loaded.`);
  console.log(` Press Ctrl+C to stop.`);
  console.log(`====================================================`);
});
