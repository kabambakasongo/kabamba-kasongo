const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

http
  .createServer(function (request, response) {
    const pathname = new URL(request.url, 'http://127.0.0.1:4173').pathname;
    const filename = path.resolve(root, '.' + decodeURIComponent(pathname));

    if (filename !== root && !filename.startsWith(root + path.sep)) {
      response.writeHead(403).end();
      return;
    }

    fs.stat(filename, function (statError, stats) {
      const file = stats && stats.isDirectory() ? path.join(filename, 'index.html') : filename;
      fs.readFile(file, function (readError, content) {
        if (statError || readError) {
          response.writeHead(404).end('Not found');
          return;
        }

        response.writeHead(200, {
          'Content-Type': contentTypes[path.extname(file)] || 'application/octet-stream',
        });
        response.end(content);
      });
    });
  })
  .listen(4173, '127.0.0.1');
