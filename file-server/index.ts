import http from 'http'
import fs from 'fs'
import path from 'path'


const CONTENTTYPE = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "application/javascript",
  css: "text/css",
  png: "text/png",
  jpg: "text/jpg",
  gif: "text/gif",
  ico: "text/x-icon",
  svg: "text/svg+xml"
}


http.createServer((req, res) => {
  let filePath = `.${req.url}`

  if (!filePath.endsWith(".html")) filePath = `.${req.url}/index.html`

  const ext = path.extname(filePath).replace(".", "")
  const ContentType = CONTENTTYPE[ext as keyof typeof CONTENTTYPE]

  if (ContentType === undefined) res.writeHead(400);

  fs.readFile(filePath, (err, ctx) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile("./error/404.html", (_err, ctx) => {
          res.writeHead(200, { ContentType })
          res.end(ctx, 'utf-8')
        })
      } else {
        res.writeHead(500)
        res.end(`Something wrong ${err.code}`)
        res.end()
      }
    } else {
      res.writeHead(200, { ContentType })
      res.end(ctx, 'utf-8')
    }
  })
})
  .listen(8125)

console.log(`Server running at http://127.0.0.1:8125/`)


/**
 * Usage
 * http://127.0.0.1:8125/
 * http://127.0.0.1:8125/note/
 * http://127.0.0.1:8125/notexists/    -> 404
 */
