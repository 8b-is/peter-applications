import { mkdirSync, readFileSync, writeFileSync, copyFileSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { APPLICANT, COMPANIES } from "./companies-data.mjs";
import {
  renderIndexHtml,
  renderResumeHtml,
  renderPortfolioHtml,
  renderEli5Md,
  renderApplicationMd,
  renderWranglerToml,
  renderWorkerBuildMjs,
  renderConstellationBar,
} from "./templates.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

mkdirSync(join(root, "resumes"), { recursive: true });

const appFiles = readdirSync(join(root, "applications")).sort();

for (const c of COMPANIES) {
  const dir = join(root, c.slug);
  const deployDir = join(dir, "deploy");
  mkdirSync(deployDir, { recursive: true });

  // Match corresponding applications/0X-*.md file
  const matchFile = appFiles.find((f) => f.startsWith(c.id + "-"));
  const existingAppMd = matchFile
    ? readFileSync(join(root, "applications", matchFile), "utf8")
    : "";

  // Write HTML & Markdown sources
  writeFileSync(join(dir, "index.html"), renderIndexHtml(c));
  writeFileSync(join(dir, "resume.html"), renderResumeHtml(c));
  writeFileSync(join(dir, "print.html"), renderPortfolioHtml(c));
  writeFileSync(join(dir, "ELI5-GUIDE.md"), renderEli5Md(c));
  writeFileSync(join(dir, "application.md"), renderApplicationMd(c, existingAppMd));
  writeFileSync(join(deployDir, "wrangler.toml"), renderWranglerToml(c));
  writeFileSync(join(deployDir, "build.mjs"), renderWorkerBuildMjs(c));

  // Step 1: Run build.mjs once to generate application.html and eli5.html
  execFileSync("node", [join(deployDir, "build.mjs")], { stdio: "inherit" });
}

// Step 2: Render all 18 tailored PDFs via ReportLab (CJK HeiseiKakuGo-W5 + clickable metadata)
execFileSync("uv", ["run", "--with", "reportlab", "python3", join(here, "render-pdfs.py")], {
  stdio: "inherit",
});

// Step 3: Re-run build.mjs for each company so worker.js embeds the fresh PDF bytes
for (const c of COMPANIES) {
  const deployDir = join(root, c.slug, "deploy");
  execFileSync("node", [join(deployDir, "build.mjs")], { stdio: "inherit" });
}

// Now generate Master Command Center index.html + README.md + deploy-hub worker for apply.vaked.dev
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const masterCardsHtml = COMPANIES.map((c) => {
  const contactsList = c.linkedinInfo.contacts
    .map(
      (ct) =>
        `<li><a href="${esc(ct.url)}" target="_blank" rel="noopener noreferrer"><strong>${esc(ct.name)}</strong></a> — <span>${esc(ct.title)}</span></li>`
    )
    .join("");
  return `
    <article class="card" id="card-${c.slug}" style="--c-accent:${c.theme.accent};--c-sec:${c.theme.secondary}">
      <div class="card-head">
        <div>
          <span class="badge">#${c.id} · ${esc(c.location)} · ${esc(c.comp)}</span>
          <h2><a href="https://${c.subdomain}" target="_blank" rel="noopener noreferrer">${esc(c.company)}</a></h2>
          <div class="role-line">${esc(c.role)}</div>
        </div>
        <a class="subdomain-pill" href="https://${c.subdomain}" target="_blank" rel="noopener noreferrer">🌐 https://${c.subdomain} ↗</a>
      </div>

      <div class="btn-row">
        <a class="btn p" href="https://${c.subdomain}" target="_blank" rel="noopener noreferrer">Live Interactive Site ↗</a>
        <a class="btn p" href="${c.slug}/lodri-resume.pdf" target="_blank" rel="noopener noreferrer">⬇ Resume PDF</a>
        <a class="btn p" href="${c.slug}/lodri-portfolio.pdf" target="_blank" rel="noopener noreferrer">⬇ Portfolio PDF</a>
        <a class="btn p" href="${c.slug}/lodri-application.pdf" target="_blank" rel="noopener noreferrer">⬇ Application PDF</a>
        <a class="btn" href="https://${c.subdomain}/eli5" target="_blank" rel="noopener noreferrer">ELI5 3-Min Guide ↗</a>
        <a class="btn" href="${esc(c.portalUrl)}" target="_blank" rel="noopener noreferrer">Official Careers Portal ↗</a>
        <a class="btn li" href="${esc(c.linkedinInfo.companyUrl)}" target="_blank" rel="noopener noreferrer">LinkedIn Company ↗</a>
        <a class="btn li" href="${esc(c.linkedinInfo.peopleUrl)}" target="_blank" rel="noopener noreferrer">LinkedIn People ↗</a>
        <a class="btn li" href="${esc(c.linkedinInfo.recruiterSearchUrl)}" target="_blank" rel="noopener noreferrer">Find Recruiters ↗</a>
      </div>

      <div class="li-contacts-box">
        <div class="box-title">Key LinkedIn &amp; Leadership Contacts (${esc(c.company.split(" (")[0])})</div>
        <ul>${contactsList}</ul>
      </div>

      <div class="copy-grid">
        <div class="copy-col">
          <div class="copy-top">
            <span>LinkedIn Connection Note (&lt;300 chars)</span>
            <button class="btn p" onclick="copyById('conn-${c.slug}', this)">Copy Note</button>
          </div>
          <pre id="conn-${c.slug}">${esc(c.linkedinInfo.connectionNote)}</pre>
        </div>
        <div class="copy-col">
          <div class="copy-top">
            <span>LinkedIn InMail / Direct Email (${esc(c.portalEmail)})</span>
            <button class="btn p" onclick="copyById('inmail-${c.slug}', this)">Copy InMail / Email</button>
          </div>
          <pre id="inmail-${c.slug}">${esc(c.linkedinInfo.inmailBody)}</pre>
        </div>
      </div>
    </article>`;
}).join("\n");

const masterIndexHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Péter József Lódri — SOTA Career, Resume &amp; Subdomain Command Center (apply.vaked.dev)</title>
<meta name="description" content="Master E2E Application Command Center for Péter József Lódri: 6 dedicated *.vaked.dev interactive sites, tailored Resume/Portfolio/Application PDFs, ELI5 guides, and 1-click LinkedIn outreach.">
<meta name="theme-color" content="#05070e">
<style>
  :root{
    --bg:#05070e;--surface:#0d111f;--ink:#eef1ff;--dim:#b5bcd9;--line:rgba(255,255,255,.12);
    --cyan:#62e6c9;--violet:#b48bff;--phos:#39ff14;--li:#0a66c2;
    --mono:ui-monospace,'SF Mono','JetBrains Mono',Menlo,monospace;
    --sans:'Inter',system-ui,-apple-system,'Hiragino Sans',sans-serif;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:var(--bg);color:var(--ink);font-family:var(--sans);line-height:1.6}
  .constellation-bar{
    position:sticky;top:0;z-index:50;display:flex;align-items:center;gap:8px;flex-wrap:wrap;
    padding:10px clamp(16px,4vw,40px);background:rgba(5,7,14,.9);backdrop-filter:blur(12px);
    border-bottom:1px solid var(--line);font-family:var(--mono);font-size:11px;
  }
  .cb-label{color:var(--cyan);font-weight:700;letter-spacing:.12em;margin-right:4px}
  .cb-link{color:var(--dim);text-decoration:none;padding:4px 9px;border-radius:6px;border:1px solid transparent}
  .cb-link:hover{color:#fff;border-color:var(--line);background:rgba(255,255,255,.05)}
  .cb-link.active{color:#05070e;background:var(--cyan);font-weight:700}

  .wrap{max-width:1140px;margin:0 auto;padding:36px clamp(16px,4vw,40px) 80px}
  header{border-bottom:1px solid var(--line);padding-bottom:28px;margin-bottom:32px}
  .kicker{font-family:var(--mono);font-size:11px;letter-spacing:.26em;text-transform:uppercase;color:var(--cyan)}
  h1{font-size:clamp(30px,5vw,52px);font-weight:800;letter-spacing:-.02em;margin-top:8px}
  .sub{color:var(--dim);font-size:15px;max-width:76ch;margin-top:8px}
  .profile-bar{
    display:flex;flex-wrap:wrap;gap:10px;margin-top:18px;font-family:var(--mono);font-size:12px;
  }
  .btn{
    font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;
    padding:9px 13px;border-radius:6px;border:1px solid var(--line);background:rgba(255,255,255,.04);
    color:var(--ink);text-decoration:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;
  }
  .btn:hover{border-color:var(--cyan);color:#fff;background:rgba(98,230,201,.12)}
  .btn.p{border-color:var(--c-accent,var(--cyan));background:color-mix(in srgb, var(--c-accent,var(--cyan)) 16%, transparent);color:#fff;font-weight:700}
  .btn.li{border-color:#0a66c2;background:rgba(10,102,194,.22);color:#d4ebff}
  .btn.li:hover{background:rgba(10,102,194,.38);border-color:#4ea3ff}

  .matrix-table{width:100%;border-collapse:collapse;margin-bottom:36px;font-size:13px;background:var(--surface);border-radius:12px;overflow:hidden;border:1px solid var(--line)}
  .matrix-table th,.matrix-table td{padding:11px 13px;border-bottom:1px solid var(--line);text-align:left;vertical-align:middle}
  .matrix-table th{font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:var(--cyan);background:rgba(255,255,255,.03)}
  .matrix-table a{color:var(--cyan);text-decoration:none;font-family:var(--mono);font-size:12px}
  .matrix-table a:hover{text-decoration:underline}

  .card{
    background:var(--surface);border:1px solid var(--line);border-top:3px solid var(--c-accent,var(--cyan));
    border-radius:14px;padding:24px;margin-bottom:26px;
  }
  .card-head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap;margin-bottom:16px}
  .badge{font-family:var(--mono);font-size:11px;color:var(--c-accent,var(--cyan));letter-spacing:.12em;text-transform:uppercase}
  .card h2{font-size:24px;margin-top:4px}
  .card h2 a{color:#fff;text-decoration:none}
  .card h2 a:hover{color:var(--c-accent,var(--cyan))}
  .role-line{color:var(--dim);font-size:14px;margin-top:2px}
  .subdomain-pill{
    font-family:var(--mono);font-size:12px;font-weight:700;color:#05070e;
    background:var(--c-accent,var(--cyan));padding:8px 14px;border-radius:8px;text-decoration:none;
  }
  .btn-row{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
  .li-contacts-box{
    background:rgba(255,255,255,.025);border:1px solid var(--line);border-radius:10px;
    padding:12px 16px;margin-bottom:16px;font-size:13px;
  }
  .box-title{font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:var(--c-sec,var(--violet));margin-bottom:6px}
  .li-contacts-box ul{padding-left:18px;display:grid;gap:4px}
  .li-contacts-box a{color:var(--cyan);text-decoration:none}
  .li-contacts-box a:hover{text-decoration:underline}
  .copy-grid{display:grid;gap:14px;grid-template-columns:1fr}
  @media(min-width:860px){.copy-grid{grid-template-columns:1fr 1fr}}
  .copy-col{background:rgba(0,0,0,.35);border:1px solid var(--line);border-radius:10px;padding:12px}
  .copy-top{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;font-family:var(--mono);font-size:11px;color:var(--dim)}
  pre{font-family:var(--mono);font-size:12px;color:#e6ebff;white-space:pre-wrap;line-height:1.55;max-height:210px;overflow:auto;padding:8px;background:rgba(4,6,12,.8);border-radius:6px}
  footer{margin-top:48px;padding-top:24px;border-top:1px solid var(--line);font-family:var(--mono);font-size:12px;color:var(--dim);line-height:2}
  footer a{color:var(--cyan);text-decoration:none}
</style>
</head>
<body>
${renderConstellationBar("apply")}
<div class="wrap">
  <header>
    <div class="kicker">E2E SOTA CAREER &amp; INCOME COMMAND CENTER · 6 DEDICATED *.VAKED.DEV SUBDOMAINS</div>
    <h1>Péter József Lódri (${esc(APPLICANT.kana)})</h1>
    <p class="sub">Every target company below has its own dedicated live Cloudflare Worker subdomain (<code>*.vaked.dev</code>) with a bespoke 60fps interactive canvas CV, tailored <code>resume.pdf</code>, <code>portfolio.pdf</code>, <code>application.pdf</code>, plain-English ELI5 guide, and 1-click LinkedIn outreach kit.</p>
    <div class="profile-bar">
      <a class="btn li" href="${esc(APPLICANT.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn: in/peter-lodri ↗</a>
      <a class="btn" href="${esc(APPLICANT.githubPrimary)}" target="_blank" rel="noopener noreferrer">github.com/peterlodri-sec ↗</a>
      <a class="btn" href="${esc(APPLICANT.githubOrg)}" target="_blank" rel="noopener noreferrer">github.com/8b-is ↗</a>
      <a class="btn" href="https://github.com/osaurus-ai/osaurus" target="_blank" rel="noopener noreferrer">OSS Architect: osaurus-ai/osaurus ↗</a>
      <a class="btn" href="https://github.com/simplifaisoul/osiris" target="_blank" rel="noopener noreferrer">OSS Architect: simplifaisoul/osiris ↗</a>
      <a class="btn" href="https://github.com/headroomlabs-ai/headroom/pull/1418" target="_blank" rel="noopener noreferrer">headroom PR #1418 ↗</a>
      <a class="btn" href="mailto:${esc(APPLICANT.emailPrimary)}">${esc(APPLICANT.emailPrimary)} ✉</a>
    </div>
  </header>

  <table class="matrix-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Company &amp; Role</th>
        <th>Dedicated Subdomain</th>
        <th>Tailored PDFs</th>
        <th>LinkedIn &amp; Portal</th>
      </tr>
    </thead>
    <tbody>
      ${COMPANIES.map(
        (c) => `
      <tr>
        <td><strong>${c.id}</strong></td>
        <td><strong>${esc(c.company)}</strong><br><span style="color:var(--dim);font-size:12px">${esc(c.role)} (${esc(c.comp)})</span></td>
        <td><a href="https://${c.subdomain}" target="_blank" rel="noopener noreferrer">https://${c.subdomain} ↗</a></td>
        <td>
          <a href="https://${c.subdomain}/resume.pdf" target="_blank">resume.pdf</a> ·
          <a href="https://${c.subdomain}/portfolio.pdf" target="_blank">portfolio.pdf</a> ·
          <a href="https://${c.subdomain}/application.pdf" target="_blank">application.pdf</a>
        </td>
        <td>
          <a href="${esc(c.linkedinInfo.companyUrl)}" target="_blank">LinkedIn</a> ·
          <a href="${esc(c.linkedinInfo.recruiterSearchUrl)}" target="_blank">Recruiters</a> ·
          <a href="${esc(c.portalUrl)}" target="_blank">Portal ↗</a>
        </td>
      </tr>`
      ).join("")}
    </tbody>
  </table>

  <main>
    ${masterCardsHtml}
  </main>

  <footer>
    <div>Péter József Lódri · Passport: ${esc(APPLICANT.passportNo)} · Visa Ref: ${esc(APPLICANT.visaRef)} · <a href="${esc(APPLICANT.linkedin)}">linkedin.com/in/peter-lodri</a></div>
    <div>Subdomain Fleet: <a href="https://apply.vaked.dev">apply.vaked.dev</a> · <a href="https://teamlab.vaked.dev">teamlab.vaked.dev</a> · <a href="https://sakana.vaked.dev">sakana.vaked.dev</a> · <a href="https://pfn.vaked.dev">pfn.vaked.dev</a> · <a href="https://tier4.vaked.dev">tier4.vaked.dev</a> · <a href="https://woven.vaked.dev">woven.vaked.dev</a> · <a href="https://taiko.vaked.dev">taiko.vaked.dev</a></div>
    <div>fine touch from within · peter + 8b.is &lt;3 · {−1, 0, +1} · om mani padme hum</div>
  </footer>
</div>
<script>
function copyById(id, btn) {
  const el = document.getElementById(id);
  if (!el) return;
  navigator.clipboard.writeText(el.innerText).then(() => {
    const prev = btn.textContent;
    btn.textContent = "✓ COPIED";
    setTimeout(() => { btn.textContent = prev; }, 1600);
  });
}
</script>
</body>
</html>`;

writeFileSync(join(root, "index.html"), masterIndexHtml);

// Build deploy-hub Worker for apply.vaked.dev
const hubDeployDir = join(root, "deploy-hub");
mkdirSync(hubDeployDir, { recursive: true });
writeFileSync(
  join(hubDeployDir, "wrangler.toml"),
  `name = "apply-cv"\nmain = "worker.js"\ncompatibility_date = "2026-09-01"\n\nroutes = [\n  { pattern = "apply.vaked.dev", custom_domain = true }\n]\n`
);
writeFileSync(
  join(hubDeployDir, "worker.js"),
  `const HTML = ${JSON.stringify(masterIndexHtml)};\nexport default {\n  async fetch(req) {\n    const url = new URL(req.url);\n    if (url.pathname === "/health") return new Response("OK");\n    return new Response(HTML, { headers: { "content-type": "text/html; charset=utf-8" } });\n  }\n};\n`
);

console.log("All 6 E2E company scaffolds + Master Hub generated and rendered to PDF!");
