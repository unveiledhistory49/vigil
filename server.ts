const port = Number(process.env.PORT) || 3000;

const server = Bun.serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;
    if (path === "/" || path === "") path = "/index.html";
    if (path === "/favicon.ico") path = "/favicon.svg";

    const file = Bun.file(`./dist${path}`);
    if (await file.exists()) {
      return new Response(file);
    }
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Vigil running on http://localhost:${server.port}`);
