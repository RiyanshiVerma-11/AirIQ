// ─────────────────────────────────────────────────────────────
// AirIQ – Minimal Standalone Node.js Production Server
// Used when deploying as a Render Web Service (Node.js runtime).
// Uses zero external npm dependencies; pure Node built-in modules.
// ─────────────────────────────────────────────────────────────

import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_DIR = path.join(__dirname, 'dist')
const PORT = parseInt(process.env.PORT || '10000', 10)

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
}

const server = http.createServer((req, res) => {
  // Normalize URL and remove query strings
  const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
  let pathname = decodeURIComponent(parsedUrl.pathname)

  // Security check to prevent directory traversal
  let safePath = path.normalize(path.join(DIST_DIR, pathname))
  if (!safePath.startsWith(DIST_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' })
    res.end('403 Forbidden')
    return
  }

  // Check if file exists
  fs.stat(safePath, (err, stats) => {
    if (!err && stats.isFile()) {
      serveFile(safePath, res)
      return
    }

    if (!err && stats.isDirectory()) {
      const indexPath = path.join(safePath, 'index.html')
      if (fs.existsSync(indexPath)) {
        serveFile(indexPath, res)
        return
      }
    }

    // SPA Fallback: Route all non-file routes to /index.html
    const fallbackPath = path.join(DIST_DIR, 'index.html')
    if (fs.existsSync(fallbackPath)) {
      serveFile(fallbackPath, res)
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('404 Not Found - Build dist directory missing. Run npm run build first.')
    }
  })
})

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase()
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'

  const headers = { 'Content-Type': contentType }
  if (filePath.includes(`${path.sep}assets${path.sep}`)) {
    headers['Cache-Control'] = 'public, max-age=31536000, immutable'
  } else {
    headers['Cache-Control'] = 'no-cache'
  }

  res.writeHead(200, headers)
  const stream = fs.createReadStream(filePath)
  stream.pipe(res)
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[AirIQ Production Server] Listening on http://0.0.0.0:${PORT}`)
})
