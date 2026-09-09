import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
const root = path.resolve("out");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};
http
  .createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      let file = path.resolve(root, `.${pathname}`);
      if (file !== root && !file.startsWith(root + path.sep)) {
        res.writeHead(403);
        return res.end("Forbidden");
      }
      try {
        if ((await stat(file)).isDirectory())
          file = path.join(file, "index.html");
        await stat(file);
      } catch {
        res.statusCode = 404;
        file = path.join(root, "404.html");
      }
      const data = await readFile(file);
      res.setHeader(
        "Content-Type",
        mime[path.extname(file)] || "application/octet-stream",
      );
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
      res.setHeader("Cache-Control", "no-cache");
      res.end(data);
    } catch {
      res.writeHead(400);
      res.end("Bad request");
    }
  })
  .listen(3000, "127.0.0.1", () =>
    console.log("GAZAL preview: http://localhost:3000"),
  );
