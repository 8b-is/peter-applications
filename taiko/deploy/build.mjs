// Regenerate deploy/worker.js and application.html for taiko.vaked.dev
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

const html = readFileSync(join(root, "index.html"), "utf8");
const app = readFileSync(join(root, "application.md"), "utf8");
const eli5 = readFileSync(join(root, "ELI5-GUIDE.md"), "utf8");
const resume = readFileSync(join(root, "resume.html"), "utf8");
const portfolio = readFileSync(join(root, "print.html"), "utf8");

const resumePdf = existsSync(join(root, "lodri-resume.pdf"))
  ? readFileSync(join(root, "lodri-resume.pdf")).toString("base64")
  : "";
const portfolioPdfBuf = existsSync(join(root, "lodri-portfolio.pdf"))
  ? readFileSync(join(root, "lodri-portfolio.pdf"))
  : Buffer.alloc(0);
const portfolioPdf = portfolioPdfBuf.length < 500000 ? portfolioPdfBuf.toString("base64") : "";
const appPdfBuf = existsSync(join(root, "lodri-application.pdf"))
  ? readFileSync(join(root, "lodri-application.pdf"))
  : Buffer.alloc(0);
const appPdf = appPdfBuf.length < 500000 ? appPdfBuf.toString("base64") : "";

function esc(s){ return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function inline(s){
  return esc(s)
    .replace(/`([^`]+)`/g,"<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g,"<em>$1</em>")
    .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

function md(src){
  const lines = src.replace(/\r/g,"").split("\n");
  let out = "", inList = false, inOrdered = false, inTable = false, inQuote = false, inCode = false;
  const closeBlocks = () => {
    if(inList){ out += "</ul>"; inList = false; }
    if(inOrdered){ out += "</ol>"; inOrdered = false; }
    if(inTable){ out += "</tbody></table>"; inTable = false; }
    if(inQuote){ out += "</blockquote>"; inQuote = false; }
  };
  const cells = (l) => l.replace(/^\||\|$/g,"").split("|").map(c => c.trim());

  for (let i = 0; i < lines.length; i++){
    const l = lines[i];
    if (inCode){
      if (l.trim().startsWith("```")){ out += "</code></pre>"; inCode = false; }
      else { out += esc(l) + "\n"; }
      continue;
    }
    if (l.trim().startsWith("```")){
      closeBlocks();
      out += "<pre><code>";
      inCode = true;
      continue;
    }
    if (/^\s*$/.test(l)){ closeBlocks(); continue; }
    if (/^---+\s*$/.test(l)){ closeBlocks(); out += "<hr>"; continue; }
    if (/^\|/.test(l) && /\|\s*$/.test(l)){
      const cellsArr = cells(l);
      if (i + 1 < lines.length && /^\|[\s:|-]+\|?\s*$/.test(lines[i + 1])){
        closeBlocks();
        out += "<table><thead><tr>" + cellsArr.map(c => "<th>" + inline(c) + "</th>").join("") + "</tr></thead><tbody>";
        inTable = true;
        i++;
        continue;
      }
      if (!inTable){ out += "<table><tbody>"; inTable = true; }
      out += "<tr>" + cellsArr.map(c => "<td>" + inline(c) + "</td>").join("") + "</tr>";
      continue;
    }
    const h = l.match(/^(#{1,4})\s+(.*)$/);
    if (h){
      closeBlocks();
      out += "<h" + h[1].length + ">" + inline(h[2]) + "</h" + h[1].length + ">";
      continue;
    }
    if (/^>\s?/.test(l)){
      if (!inQuote){ closeBlocks(); out += "<blockquote>"; inQuote = true; }
      out += inline(l.replace(/^>\s?/, "")) + "<br>";
      continue;
    }
    if (/^\s*[-*]\s+/.test(l)){
      if (!inList){ closeBlocks(); out += "<ul>"; inList = true; }
      out += "<li>" + inline(l.replace(/^\s*[-*]\s+/, "")) + "</li>";
      continue;
    }
    if (/^\s*\d+\.\s+/.test(l)){
      if (!inOrdered){ closeBlocks(); out += "<ol>"; inOrdered = true; }
      out += "<li>" + inline(l.replace(/^\s*\d+\.\s+/, "")) + "</li>";
      continue;
    }
    closeBlocks();
    out += "<p>" + inline(l) + "</p>";
  }
  closeBlocks();
  return out;
}

function page(title, body, accent){
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><meta name="robots" content="noindex">
<style>
 :root{color-scheme:dark;--ink:#eef0ff;--dim:#b8b2d4;--line:rgba(255,255,255,.12);--accent:${accent}}
 *{box-sizing:border-box}
 body{margin:0;background:#04060a;color:var(--ink);font:15px/1.75 ui-monospace,'SF Mono','Hiragino Sans',Menlo,monospace;padding:clamp(20px,5vw,60px)}
 main{max-width:880px;margin:0 auto}
 a{color:#62e6c9;text-underline-offset:3px}
 h1,h2,h3,h4{line-height:1.25;color:#fff}
 h1{font-size:clamp(22px,4.5vw,34px);margin-bottom:.6em}
 h2{margin-top:1.8em;padding-bottom:.3em;font-size:18px;color:var(--accent);border-bottom:1px solid var(--line)}
 h3{font-size:15px;margin-top:1.2em}
 p,li{color:var(--ink);font-size:14px;line-height:1.7}
 blockquote{border-left:3px solid var(--accent);margin:1em 0;padding:.5em 1em;background:rgba(255,255,255,.03)}
 code{background:rgba(255,255,255,.07);padding:.1em .4em;border-radius:4px;font-size:.9em}
 pre{background:#0a0e16;border:1px solid var(--line);border-radius:8px;padding:.8em 1em;overflow:auto;white-space:pre-wrap}
 pre code{background:none}
 table{border-collapse:collapse;width:100%;margin:1.2em 0;font-size:13px}
 th,td{border:1px solid var(--line);padding:.5em .7em;text-align:left;vertical-align:top}
 th{background:rgba(255,255,255,.06);color:#fff}
 hr{border:0;border-top:1px dashed var(--line);margin:1.8em 0}
 .top{display:flex;justify-content:space-between;gap:1em;flex-wrap:wrap;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--dim);margin-bottom:2em}
 footer{margin-top:3em;padding-top:1.2em;border-top:1px solid var(--line);font-size:12px;color:var(--dim);line-height:2}
 @media print{ body{padding:10mm} .top{display:none} blockquote,pre,table{break-inside:avoid} }
</style></head><body><main>
<div class="top"><a href="/">🜂 taiko.vaked.dev</a><span>Taiko Labs (Based Ethereum ZK-Rollup) · Péter József Lódri</span></div>
${body}
<footer>
  <div><a href="/">Interactive CV</a> · <a href="/resume">Résumé (HTML)</a> · <a href="/resume.pdf">resume.pdf</a> · <a href="/portfolio">Portfolio (HTML)</a> · <a href="/portfolio.pdf">portfolio.pdf</a> · <a href="/application">Application</a> · <a href="/application.pdf">application.pdf</a> · <a href="/eli5">ELI5 Guide</a> · <a href="https://www.linkedin.com/in/peter-lodri/">LinkedIn</a> · <a href="https://apply.vaked.dev">apply.vaked.dev</a></div>
  <div>fine touch from within · peter + 8b.is · {−1, 0, +1} · om mani padme hum</div>
</footer>
</main></body></html>`;
}

const applicationHtml = page("Taiko Labs (Based Ethereum ZK-Rollup) Application — Péter József Lódri", md(app), "#e81899");
const eli5Html = page("ELI5 Guide — Taiko Labs (Based Ethereum ZK-Rollup) — Péter József Lódri", md(eli5), "#e81899");
writeFileSync(join(root, "application.html"), applicationHtml);
writeFileSync(join(root, "eli5.html"), eli5Html);

const worker = `// taiko.vaked.dev — E2E Interactive CV, Resume, Portfolio, Application, ELI5 & LinkedIn Kit
const HTML = ${JSON.stringify(html)};
const APPLICATION = ${JSON.stringify(app)};
const APPLICATION_HTML = ${JSON.stringify(applicationHtml)};
const ELI5_MD = ${JSON.stringify(eli5)};
const ELI5_HTML = ${JSON.stringify(eli5Html)};
const RESUME = ${JSON.stringify(resume)};
const PORTFOLIO = ${JSON.stringify(portfolio)};
const RESUME_PDF_B64 = ${JSON.stringify(resumePdf)};
const PORTFOLIO_PDF_B64 = ${JSON.stringify(portfolioPdf)};
const APP_PDF_B64 = ${JSON.stringify(appPdf)};

function b64Bytes(b64){
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

const COMMON_HEADERS = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
};

export default {
  async fetch(req){
    const url = new URL(req.url);
    const p = url.pathname.replace(/\\/+$/, "") || "/";

    if (p === "/resume.pdf" || p === "/lodri-resume.pdf") {
      return new Response(b64Bytes(RESUME_PDF_B64), {
        headers: { ...COMMON_HEADERS, "content-type": "application/pdf", "content-disposition": 'inline; filename="Peter-Lodri-Resume-taiko.pdf"' }
      });
    }
    if (p === "/portfolio.pdf" || p === "/lodri-portfolio.pdf") {
      if (!PORTFOLIO_PDF_B64) return Response.redirect("https://8b-is.github.io/peter-applications/taiko/lodri-portfolio.pdf", 302);
      return new Response(b64Bytes(PORTFOLIO_PDF_B64), {
        headers: { ...COMMON_HEADERS, "content-type": "application/pdf", "content-disposition": 'inline; filename="Peter-Lodri-Portfolio-taiko.pdf"' }
      });
    }
    if (p === "/application.pdf" || p === "/lodri-application.pdf" || p === "/lodri-teamlab-application.pdf") {
      if (!APP_PDF_B64) return Response.redirect("https://8b-is.github.io/peter-applications/taiko/lodri-application.pdf", 302);
      return new Response(b64Bytes(APP_PDF_B64), {
        headers: { ...COMMON_HEADERS, "content-type": "application/pdf", "content-disposition": 'inline; filename="Peter-Lodri-Application-taiko.pdf"' }
      });
    }
    if (p === "/resume") {
      return new Response(RESUME, { headers: { ...COMMON_HEADERS, "content-type": "text/html; charset=utf-8" } });
    }
    if (p === "/portfolio" || p === "/print") {
      return new Response(PORTFOLIO, { headers: { ...COMMON_HEADERS, "content-type": "text/html; charset=utf-8" } });
    }
    if (p === "/application") {
      return new Response(APPLICATION_HTML, { headers: { ...COMMON_HEADERS, "content-type": "text/html; charset=utf-8" } });
    }
    if (p === "/application.md") {
      return new Response(APPLICATION, { headers: { ...COMMON_HEADERS, "content-type": "text/markdown; charset=utf-8" } });
    }
    if (p === "/eli5") {
      return new Response(ELI5_HTML, { headers: { ...COMMON_HEADERS, "content-type": "text/html; charset=utf-8" } });
    }
    if (p === "/eli5.md") {
      return new Response(ELI5_MD, { headers: { ...COMMON_HEADERS, "content-type": "text/markdown; charset=utf-8" } });
    }
    if (p === "/linkedin") {
      return Response.redirect("https://taiko.vaked.dev/#linkedin", 302);
    }
    if (p === "/health") {
      return new Response("OK", { headers: { ...COMMON_HEADERS, "content-type": "text/plain; charset=utf-8" } });
    }
    return new Response(HTML, { headers: { ...COMMON_HEADERS, "content-type": "text/html; charset=utf-8" } });
  }
};
`;

writeFileSync(join(here, "worker.js"), worker);
console.log(`[taiko] worker.js regenerated (${worker.length} chars)`);
