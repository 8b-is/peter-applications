import { APPLICANT, EDUCATION, EXPERIENCE, COMPANIES } from "./companies-data.mjs";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderConstellationBar(activeSlug) {
  const links = [
    { slug: "apply", label: "00 Hub (apply.vaked.dev)", url: "https://apply.vaked.dev" },
    ...COMPANIES.map((c) => ({
      slug: c.slug,
      label: `${c.id} ${c.company.split(" (")[0]}`,
      url: `https://${c.subdomain}`,
    })),
  ];
  return `<nav class="constellation-bar" aria-label="Application Subdomain Network">
    <span class="cb-label">SOTA CAREER NETWORK:</span>
    ${links
      .map(
        (l) =>
          `<a href="${l.url}" class="cb-link${l.slug === activeSlug ? " active" : ""}">${esc(l.label)}</a>`
      )
      .join("")}
  </nav>`;
}

export function renderIndexHtml(c) {
  const worksHtml = c.works
    .map(
      (w) => `
        <a class="work reveal" href="${esc(w.url)}" target="_blank" rel="noopener noreferrer">
          <span class="tag">${esc(w.tag)}</span>
          <h3>${esc(w.title)}</h3>
          <p>${esc(w.desc)}</p>
          <div class="url">${esc(w.label)} ↗</div>
        </a>`
    )
    .join("\n");

  const contactsHtml = c.linkedinInfo.contacts
    .map(
      (ct) => `
        <a class="li-card reveal" href="${esc(ct.url)}" target="_blank" rel="noopener noreferrer">
          <div class="li-badge">LinkedIn Contact ↗</div>
          <h3>${esc(ct.name)}</h3>
          <div class="li-title">${esc(ct.title)}</div>
          <p>${esc(ct.note)}</p>
        </a>`
    )
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(APPLICANT.name)} — ${esc(c.role)} · ${esc(c.company)}</title>
<meta name="description" content="Interactive CV, tailored résumé, portfolio, and LinkedIn outreach kit of ${esc(APPLICANT.name)} for ${esc(c.company)} (${esc(c.role)}).">
<meta name="theme-color" content="#04060a">
<meta property="og:title" content="${esc(APPLICANT.name)} — ${esc(c.company)} Application & Interactive CV">
<meta property="og:description" content="${esc(c.heroRole)}">
<style>
  :root{
    --bg:#04060a;
    --accent:${c.theme.accent};
    --sec:${c.theme.secondary};
    --ter:${c.theme.tertiary};
    --ink:#eef0ff;
    --dim:rgba(215,212,240,.86);
    --line:rgba(255,255,255,.12);
    --mono:ui-monospace,'SF Mono','JetBrains Mono',Menlo,monospace;
    --sans:'Inter',system-ui,-apple-system,'Hiragino Sans','Helvetica Neue',sans-serif;
  }
  *{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{background:var(--bg);color:var(--ink);font-family:var(--sans);line-height:1.6;overflow-x:hidden}
  #fx{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;display:block;pointer-events:none}
  .grain{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.38;
    background:
      radial-gradient(100% 60% at 50% -10%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 55%),
      radial-gradient(90% 70% at 100% 40%, color-mix(in srgb, var(--sec) 14%, transparent), transparent 55%),
      radial-gradient(90% 90% at 50% 120%, color-mix(in srgb, var(--ter) 14%, transparent), transparent 60%)}
  .constellation-bar{
    position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:8px;flex-wrap:wrap;
    padding:10px clamp(16px,4vw,40px);background:rgba(4,6,10,.86);backdrop-filter:blur(12px);
    border-bottom:1px solid var(--line);font-family:var(--mono);font-size:11px;
  }
  .cb-label{color:var(--accent);font-weight:700;letter-spacing:.12em;margin-right:4px}
  .cb-link{color:var(--dim);text-decoration:none;padding:4px 9px;border-radius:6px;border:1px solid transparent;transition:all .18s}
  .cb-link:hover{color:#fff;border-color:var(--line);background:rgba(255,255,255,.05)}
  .cb-link.active{color:#04060a;background:var(--accent);font-weight:700}

  .wrap{position:relative;z-index:1;max-width:980px;margin:0 auto;padding:0 clamp(18px,5vw,48px)}
  .hero{min-height:84vh;display:flex;flex-direction:column;justify-content:center;gap:18px;padding-block:64px}
  .kicker{
    font-family:var(--mono);font-size:11px;letter-spacing:.26em;text-transform:uppercase;
    color:var(--accent);
  }
  h1{font-size:clamp(38px,8vw,78px);line-height:.98;letter-spacing:-.02em;font-weight:800}
  h1 .accent{
    background:linear-gradient(135deg, var(--accent), var(--sec), var(--ter));
    -webkit-background-clip:text;background-clip:text;color:transparent;
  }
  .target-pill{
    display:inline-flex;align-items:center;gap:10px;flex-wrap:wrap;
    font-family:var(--mono);font-size:12px;color:#fff;
    background:rgba(255,255,255,.05);border:1px solid var(--line);
    padding:8px 14px;border-radius:8px;width:fit-content;
  }
  .target-pill strong{color:var(--accent)}
  .role{font-size:clamp(16px,2.6vw,22px);color:rgba(235,230,255,.95);max-width:46ch}
  .lede{font-family:var(--mono);font-size:13px;color:var(--dim);max-width:66ch;line-height:1.85}
  .cta{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px}
  .btn{
    font-family:var(--mono);text-decoration:none;color:var(--ink);border:1px solid var(--line);border-radius:6px;
    padding:11px 16px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;transition:all .2s;
    background:rgba(255,255,255,.03);cursor:pointer;
  }
  .btn:hover{border-color:var(--accent);color:#fff;background:rgba(255,255,255,.08)}
  .btn.p{border-color:var(--accent);background:color-mix(in srgb, var(--accent) 16%, transparent);color:#fff;font-weight:700}
  .btn.p:hover{background:color-mix(in srgb, var(--accent) 28%, transparent);box-shadow:0 0 18px color-mix(in srgb, var(--accent) 40%, transparent)}
  .btn.li{border-color:#0a66c2;background:rgba(10,102,194,.18);color:#cfe8ff}
  .btn.li:hover{background:rgba(10,102,194,.32);border-color:#378fe9}

  section{padding-block:clamp(42px,7vw,80px)}
  .sec-h{display:flex;align-items:baseline;gap:14px;margin-bottom:24px;flex-wrap:wrap}
  .sec-h h2{font-size:clamp(22px,3.6vw,32px);letter-spacing:-.01em;font-weight:700}
  .sec-h .n{font-family:var(--mono);font-size:12px;color:var(--accent);letter-spacing:.2em}
  .works{display:grid;gap:16px;grid-template-columns:1fr}
  @media(min-width:700px){.works{grid-template-columns:1fr 1fr}}
  .work,.li-card{
    position:relative;border:1px solid var(--line);border-radius:12px;padding:20px 22px;
    background:rgba(10,12,22,.68);text-decoration:none;color:inherit;
    transition:transform .22s,border-color .22s,background .22s;overflow:hidden;
    backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);display:block;
  }
  .work:hover,.li-card:hover{transform:translateY(-3px);border-color:var(--accent);background:rgba(14,18,32,.86)}
  .work .tag,.li-badge{font-family:var(--mono);font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--accent)}
  .work h3,.li-card h3{font-size:18px;margin:6px 0 6px;font-weight:700}
  .li-title{font-family:var(--mono);font-size:11.5px;color:var(--sec);margin-bottom:8px}
  .work p,.li-card p{font-size:13.5px;color:rgba(228,224,255,.88);line-height:1.65}
  .work .url{font-family:var(--mono);font-size:11px;color:var(--dim);margin-top:10px}

  .li-grid{display:grid;gap:14px;grid-template-columns:1fr}
  @media(min-width:700px){.li-grid{grid-template-columns:repeat(3,1fr)}}
  .li-bar{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:18px}
  .copy-box{
    border:1px solid var(--line);border-radius:12px;padding:18px 20px;
    background:rgba(10,12,22,.74);margin-top:16px;
  }
  .copy-head{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px}
  .copy-head span{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--sec)}
  .copy-pre{
    font-family:var(--mono);font-size:12.5px;color:#e8ecff;background:rgba(4,6,10,.8);
    border:1px solid var(--line);border-radius:8px;padding:14px;white-space:pre-wrap;line-height:1.65;
  }

  .skills{display:grid;gap:12px;grid-template-columns:1fr}
  @media(min-width:700px){.skills{grid-template-columns:1fr 1fr}}
  .skill{border-left:2px solid var(--accent);padding:6px 0 6px 16px;background:rgba(10,10,20,.5);border-radius:0 8px 8px 0}
  .skill b{font-family:var(--mono);font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:var(--sec);display:block;margin-bottom:4px}
  .skill p{font-size:13.5px;color:rgba(228,224,255,.88);line-height:1.65}
  .why{padding:26px;border:1px solid var(--line);border-radius:12px;background:rgba(10,12,22,.66);font-size:15px;line-height:1.85}
  .why p+p{margin-top:14px}
  footer{padding-block:54px 72px;border-top:1px solid var(--line);font-family:var(--mono);font-size:12px;color:var(--dim);line-height:2}
  footer a{color:var(--accent);text-decoration:none}
  footer a:hover{text-decoration:underline;color:var(--sec)}

  #sound-toggle{
    position:fixed;right:18px;bottom:18px;z-index:50;width:46px;height:46px;border-radius:50%;
    border:1px solid rgba(255,255,255,.2);background:rgba(4,6,10,.78);backdrop-filter:blur(8px);
    color:var(--accent);font-family:var(--mono);font-size:15px;cursor:pointer;
    display:flex;align-items:center;justify-content:center;
  }
  #sound-toggle.on{border-color:var(--sec);color:var(--sec);box-shadow:0 0 20px color-mix(in srgb, var(--sec) 45%, transparent)}

  @media print{
    @page{size:A4;margin:12mm}
    #fx,.grain,.cta,.constellation-bar,#sound-toggle{display:none!important}
    .hero{min-height:auto;padding-block:18px}
    section{padding-block:18px}
    .work,.skill,.why,.li-card,.copy-box{break-inside:avoid}
  }
</style>
</head>
<body>
${renderConstellationBar(c.slug)}
<canvas id="fx" aria-hidden="true"></canvas>
<div class="grain"></div>
<button id="sound-toggle" aria-label="toggle ambient synth" title="Toggle procedural Web Audio synth">♪</button>

<div class="wrap">
  <header class="hero">
    <div class="kicker">${esc(c.theme.kicker)}</div>
    <h1>Péter L<span class="accent">ó</span>dri</h1>
    <div class="target-pill">
      <span>TARGET: <strong>${esc(c.company)}</strong></span>
      <span>·</span>
      <span>${esc(c.location)}</span>
      <span>·</span>
      <span>${esc(c.comp)}</span>
    </div>
    <p class="role">${esc(c.heroRole)}</p>
    <p class="lede">${esc(c.heroLede)}</p>
    <nav class="cta" aria-label="Application Deliverables & Links">
      <a class="btn p" href="/resume.pdf">⬇ Resume PDF (履歴書)</a>
      <a class="btn p" href="/portfolio.pdf">⬇ Portfolio PDF</a>
      <a class="btn p" href="/application.pdf">⬇ Full Application PDF</a>
      <a class="btn" href="/resume">Résumé HTML</a>
      <a class="btn" href="/portfolio">Portfolio HTML</a>
      <a class="btn" href="/application">Application &amp; Cover Letter</a>
      <a class="btn" href="/eli5">ELI5 3-Min Guide</a>
      <a class="btn li" href="#linkedin">LinkedIn &amp; Contacts ▾</a>
      <a class="btn li" href="${esc(APPLICANT.linkedin)}" target="_blank" rel="noopener noreferrer">My LinkedIn ↗</a>
    </nav>
  </header>

  <main>
    <section id="works">
      <div class="sec-h"><span class="n">01</span><h2>Selected Work &amp; Open-Source Architecture</h2></div>
      <div class="works">
        ${worksHtml}
      </div>
    </section>

    <section id="linkedin">
      <div class="sec-h"><span class="n">02</span><h2>Direct Portal, LinkedIn Contacts &amp; 1-Click Outreach</h2></div>
      <div class="li-bar">
        <a class="btn p" href="${esc(c.portalUrl)}" target="_blank" rel="noopener noreferrer">Official Careers Portal (${esc(c.company.split(" (")[0])}) ↗</a>
        <a class="btn li" href="${esc(c.linkedinInfo.companyUrl)}" target="_blank" rel="noopener noreferrer">LinkedIn Company Page ↗</a>
        <a class="btn li" href="${esc(c.linkedinInfo.jobsUrl)}" target="_blank" rel="noopener noreferrer">LinkedIn Jobs ↗</a>
        <a class="btn li" href="${esc(c.linkedinInfo.peopleUrl)}" target="_blank" rel="noopener noreferrer">LinkedIn People Directory ↗</a>
        <a class="btn li" href="${esc(c.linkedinInfo.recruiterSearchUrl)}" target="_blank" rel="noopener noreferrer">Find Recruiters &amp; Engineers on LinkedIn ↗</a>
        <a class="btn" href="${esc(APPLICANT.linkedin)}" target="_blank" rel="noopener noreferrer">Péter Lódri LinkedIn Profile ↗</a>
        <a class="btn" href="mailto:${esc(c.portalEmail)}?subject=${encodeURIComponent(c.role + " — Péter József Lódri (" + c.subdomain + ")")}">${esc(c.portalEmail)} ✉</a>
      </div>

      <div class="li-grid">
        ${contactsHtml}
      </div>

      <div class="copy-box">
        <div class="copy-head">
          <span>1-Click LinkedIn Connection Note (&lt; 300 chars)</span>
          <button class="btn p" onclick="copyText('conn-note', this)">Copy Connection Note</button>
        </div>
        <pre class="copy-pre" id="conn-note">${esc(c.linkedinInfo.connectionNote)}</pre>
      </div>

      <div class="copy-box">
        <div class="copy-head">
          <span>1-Click LinkedIn InMail / Direct Email Message</span>
          <button class="btn p" onclick="copyText('inmail-body', this)">Copy Full Message</button>
        </div>
        <pre class="copy-pre" id="inmail-body">${esc(c.linkedinInfo.inmailBody)}</pre>
      </div>
    </section>

    <section id="skills">
      <div class="sec-h"><span class="n">03</span><h2>Technical Stack &amp; Capabilities</h2></div>
      <div class="skills">
        <div class="skill"><b>Systems, Rust &amp; Low-Bit Compute</b><p>Rust, C, Swift 6, Go — SIMD, custom Metal/WebGL2 GPU kernels, BitNet b1.58 {-1, 0, +1} ternary quantization (12.80× memory reduction), zero-dependency binaries.</p></div>
        <div class="skill"><b>Real-Time 3D, Simulation &amp; Spatial DSP</b><p>Unity, Three.js, WebGL2, GLSL/HLSL shaders, oscilloscope vector synthesis, LiDAR/geospatial 3D telemetry (Osiris), procedural Web Audio.</p></div>
        <div class="skill"><b>Multi-Agent &amp; Open-Source Architecture</b><p>Core Architect on Osaurus (osaurus-ai/osaurus) &amp; Osiris (simplifaisoul/osiris), contributor to Headroom (PR #1418 kompress router), creator of AgentField verifiable DAGs.</p></div>
        <div class="skill"><b>Distributed Production &amp; Languages</b><p>9+ years shipping high-concurrency Go/Python/Rust/TS systems (ASAPP, DailyWire 110k concurrent users, institutional fintech ETL). Fluent English, native Hungarian, conversational multi-lingual + daily Japanese in Tokyo.</p></div>
      </div>
    </section>

    <section id="apply">
      <div class="sec-h"><span class="n">04</span><h2>Why ${esc(c.company)}</h2></div>
      <div class="why">
        <p>${esc(c.whyEn)}</p>
        <p lang="ja">${esc(c.whyJa)}</p>
      </div>
    </section>
  </main>

  <footer>
    <div><strong>${esc(APPLICANT.name)}</strong> (${esc(APPLICANT.kana)}) · Passport: ${esc(APPLICANT.passportNo)} · Visa Ref: ${esc(APPLICANT.visaRef)}</div>
    <div>
      <a href="mailto:${esc(APPLICANT.emailPrimary)}">${esc(APPLICANT.emailPrimary)}</a> ·
      <a href="${esc(APPLICANT.linkedin)}" target="_blank" rel="noopener noreferrer">linkedin.com/in/peter-lodri</a> ·
      <a href="${esc(APPLICANT.githubPrimary)}" target="_blank" rel="noopener noreferrer">github.com/peterlodri-sec</a> ·
      <a href="${esc(APPLICANT.githubOrg)}" target="_blank" rel="noopener noreferrer">github.com/8b-is</a> ·
      <a href="https://github.com/osaurus-ai/osaurus" target="_blank" rel="noopener noreferrer">osaurus-ai/osaurus</a> ·
      <a href="https://github.com/simplifaisoul/osiris" target="_blank" rel="noopener noreferrer">simplifaisoul/osiris</a> ·
      <a href="https://github.com/headroomlabs-ai/headroom/pull/1418" target="_blank" rel="noopener noreferrer">headroom#1418</a>
    </div>
    <div>
      <a href="/resume">Résumé (HTML)</a> ·
      <a href="/resume.pdf">resume.pdf</a> ·
      <a href="/portfolio">Portfolio (HTML)</a> ·
      <a href="/portfolio.pdf">portfolio.pdf</a> ·
      <a href="/application">Application (HTML)</a> ·
      <a href="/application.pdf">application.pdf</a> ·
      <a href="/eli5">ELI5 Guide</a> ·
      <a href="https://apply.vaked.dev">Master Career Hub (apply.vaked.dev)</a>
    </div>
    <div style="margin-top:8px;opacity:.75">fine touch from within · peter + 8b.is &lt;3 · {−1, 0, +1} · om mani padme hum</div>
  </footer>
</div>

<script>
function copyText(id, btn) {
  const el = document.getElementById(id);
  if (!el) return;
  navigator.clipboard.writeText(el.innerText).then(() => {
    const old = btn.textContent;
    btn.textContent = "✓ COPIED TO CLIPBOARD";
    setTimeout(() => { btn.textContent = old; }, 1800);
  });
}

(() => {
  'use strict';
  const MODE = ${JSON.stringify(c.simMode)};
  const ACCENT = ${JSON.stringify(c.theme.accent)};
  const SEC = ${JSON.stringify(c.theme.secondary)};
  const TER = ${JSON.stringify(c.theme.tertiary)};

  const cnv = document.getElementById('fx');
  if (!cnv || !cnv.getContext) return;
  const ctx = cnv.getContext('2d');
  let W = window.innerWidth, H = window.innerHeight, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let t = 0;
  const ptr = { x: W * 0.65, y: H * 0.45, tx: W * 0.65, ty: H * 0.45 };

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    cnv.width = W * dpr; cnv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pointermove', e => { ptr.tx = e.clientX; ptr.ty = e.clientY; }, { passive: true });

  // Initialize entities for Boids / LiDAR / Systolic / Woven / Taiko
  const nodes = Array.from({ length: 68 }, (_, i) => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 2.2,
    vy: (Math.random() - 0.5) * 2.2,
    trit: (i % 3) - 1,
    phase: Math.random() * Math.PI * 2
  }));

  function frame() {
    t += 0.014;
    ptr.x += (ptr.tx - ptr.x) * 0.08;
    ptr.y += (ptr.ty - ptr.y) * 0.08;

    ctx.fillStyle = 'rgba(4, 6, 10, 0.22)';
    ctx.fillRect(0, 0, W, H);

    if (MODE === 'sakana') {
      // Nature-inspired Boids fish school + ternary synaptic links
      for (let i = 0; i < nodes.length; i++) {
        const b = nodes[i];
        const dx = ptr.x - b.x, dy = ptr.y - b.y;
        const dist = Math.hypot(dx, dy) + 1;
        if (dist < 320) { b.vx += (dx / dist) * 0.09; b.vy += (dy / dist) * 0.09; }
        b.vx += Math.cos(t + b.phase) * 0.03;
        b.vy += Math.sin(t + b.phase) * 0.03;
        const sp = Math.hypot(b.vx, b.vy) || 1;
        if (sp > 2.8) { b.vx = (b.vx / sp) * 2.8; b.vy = (b.vy / sp) * 2.8; }
        b.x = (b.x + b.vx + W) % W;
        b.y = (b.y + b.vy + H) % H;

        const ang = Math.atan2(b.vy, b.vx);
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(ang);
        ctx.beginPath();
        ctx.moveTo(9, 0);
        ctx.lineTo(-6, 4);
        ctx.lineTo(-3, 0);
        ctx.lineTo(-6, -4);
        ctx.closePath();
        ctx.fillStyle = b.trit === 1 ? ACCENT : (b.trit === 0 ? SEC : TER);
        ctx.globalAlpha = 0.72;
        ctx.fill();
        ctx.restore();

        for (let j = i + 1; j < nodes.length; j++) {
          const o = nodes[j];
          const d = Math.hypot(b.x - o.x, b.y - o.y);
          if (d < 92) {
            ctx.beginPath();
            ctx.moveTo(b.x, b.y);
            ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = d < 48 ? ACCENT : SEC;
            ctx.globalAlpha = (1 - d / 92) * 0.25;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    } else if (MODE === 'mncore') {
      // MN-Core 2D Systolic Matrix PE Grid + wavefront pulses
      const cols = 12, rows = 8;
      const gx = W * 0.12, gy = H * 0.14, gw = W * 0.76, gh = H * 0.72;
      const cw = gw / cols, ch = gh / rows;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = gx + c * cw + cw * 0.5;
          const y = gy + r * ch + ch * 0.5;
          const d = Math.hypot(ptr.x - x, ptr.y - y);
          const wave = Math.sin(t * 3 - (c + r) * 0.45 - d * 0.01);
          ctx.strokeStyle = wave > 0.3 ? ACCENT : SEC;
          ctx.globalAlpha = 0.16 + Math.max(0, wave) * 0.35;
          ctx.strokeRect(x - cw * 0.34, y - ch * 0.34, cw * 0.68, ch * 0.68);
          if (wave > 0.65) {
            ctx.fillStyle = ACCENT;
            ctx.globalAlpha = 0.28;
            ctx.fillRect(x - cw * 0.2, y - ch * 0.2, cw * 0.4, ch * 0.4);
          }
        }
      }
      ctx.globalAlpha = 1;
    } else if (MODE === 'lidar') {
      // TIER IV Autoware 3D LiDAR point-cloud rings & perception trajectory
      const cx = ptr.x, cy = ptr.y;
      for (let ring = 1; ring <= 9; ring++) {
        const rad = ring * 44 + Math.sin(t * 2 + ring) * 6;
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2; a += 0.12) {
          const jitter = Math.sin(a * 7 + t * 3 + ring) * 8;
          const px = cx + Math.cos(a + t * 0.2) * (rad + jitter);
          const py = cy + Math.sin(a + t * 0.2) * (rad + jitter) * 0.68;
          ctx.fillStyle = ring % 2 === 0 ? ACCENT : SEC;
          ctx.globalAlpha = 0.45 * (1 - ring / 11);
          ctx.fillRect(px, py, 2.2, 2.2);
        }
      }
      ctx.globalAlpha = 1;
    } else if (MODE === 'woven') {
      // Woven City / Arene Isometric Digital Twin Mesh
      const step = 64;
      ctx.lineWidth = 1;
      for (let x = 0; x < W + step; x += step) {
        for (let y = 0; y < H + step; y += step) {
          const d = Math.hypot(ptr.x - x, ptr.y - y);
          const z = Math.sin(d * 0.018 - t * 2.4) * 14;
          ctx.fillStyle = d < 180 ? ACCENT : SEC;
          ctx.globalAlpha = d < 240 ? 0.55 : 0.2;
          ctx.beginPath();
          ctx.arc(x, y + z, d < 160 ? 2.6 : 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    } else if (MODE === 'taiko') {
      // Taiko Based Rollup L1<->L2 Cryptographic Proof Ring
      const cx = ptr.x, cy = ptr.y;
      for (let k = 0; k < 5; k++) {
        const r = 60 + k * 48;
        ctx.beginPath();
        ctx.arc(cx, cy, r, t * (k % 2 ? 1 : -1), t * (k % 2 ? 1 : -1) + Math.PI * 1.35);
        ctx.strokeStyle = k % 2 === 0 ? ACCENT : SEC;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.38;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    } else {
      // teamLab Lissajous weave
      ctx.beginPath();
      const N = 420;
      const r = Math.min(W, H) * 0.34;
      for (let i = 0; i <= N; i++) {
        const u = (i / N) * Math.PI * 2;
        const x = ptr.x + Math.sin(3 * u + t) * r * Math.cos(u * 0.5);
        const y = ptr.y + Math.sin(4 * u - t * 0.8) * r * 0.75;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = ACCENT;
      ctx.lineWidth = 1.6;
      ctx.globalAlpha = 0.55;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // Ambient Web Audio toggle
  let ac = null, osc = null, gain = null, playing = false;
  const btn = document.getElementById('sound-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      if (!playing) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        ac = ac || new AudioCtx();
        osc = ac.createOscillator();
        gain = ac.createGain();
        osc.type = 'sine';
        osc.frequency.value = 110 + (${Number(c.id)} * 27.5);
        gain.gain.value = 0.03;
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start();
        playing = true;
        btn.classList.add('on');
      } else {
        if (osc) { try { osc.stop(); } catch (_) {} osc = null; }
        playing = false;
        btn.classList.remove('on');
      }
    });
  }
})();
</script>
</body>
</html>`;
}

export function renderResumeHtml(c) {
  const eduRows = EDUCATION.map(
    (e) => `
          <tr>
            <td class="when">${esc(e.period)}</td>
            <td><span class="role">${esc(e.role)}</span> <span class="org">— ${esc(e.org)}</span>
              <div class="note">${esc(e.note)}</div></td>
          </tr>`
  ).join("\n");

  const expRows = EXPERIENCE.map(
    (x) => `
          <tr>
            <td class="when">${esc(x.period)}</td>
            <td><span class="role">${esc(x.role)}</span> <span class="org">— ${esc(x.org)}</span>
              <div class="note">${esc(x.note)}</div>
              <div class="tech">${esc(x.tech)}</div></td>
          </tr>`
  ).join("\n");

  const liContacts = c.linkedinInfo.contacts
    .map(
      (ct) =>
        `<li><strong>${esc(ct.name)}</strong> (${esc(ct.title)}) — <a href="${esc(ct.url)}">${esc(ct.url)}</a></li>`
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(APPLICANT.name)} — Résumé / 履歴書（職務経歴書） · ${esc(c.company)}</title>
<meta name="author" content="${esc(APPLICANT.name)}">
<meta name="description" content="Tailored Résumé / 履歴書・職務経歴書 of ${esc(APPLICANT.name)} for ${esc(c.company)} (${esc(c.role)}).">
<style>
  :root {
    color-scheme: dark;
    --ink: #f2f4ff;
    --dim: #c2c6e6;
    --faint: #8f95bd;
    --bg: #070a12;
    --surface: #101524;
    --line: rgba(255,255,255,0.14);
    --accent: ${c.theme.accent};
    --sec: ${c.theme.secondary};
    --ter: ${c.theme.tertiary};
    --mono: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;
    --sans: "Inter", system-ui, -apple-system, "Hiragino Sans", "Yu Gothic", sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: var(--sans);
    font-size: 0.92rem;
    line-height: 1.58;
    color: var(--ink);
    background: var(--bg);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  a { color: var(--sec); text-underline-offset: 3px; }
  .page { max-width: 48rem; margin: 0 auto; padding: 0 clamp(16px, 4vw, 36px); }
  .band {
    padding: 28px 0 22px;
    background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
    border-bottom: 1px solid var(--line);
  }
  .kicker { font-family: var(--mono); font-size: 0.72rem; letter-spacing: 0.26em; text-transform: uppercase; color: var(--accent); }
  .name { font-size: 2.3rem; font-weight: 800; margin-top: 6px; color: #fff; }
  .kana { font-family: var(--mono); font-size: 0.8rem; color: var(--dim); margin-top: 4px; }
  .contacts { display: flex; flex-wrap: wrap; gap: 6px 12px; margin-top: 12px; font-family: var(--mono); font-size: 0.74rem; color: var(--dim); }
  section { padding-block: 16px; break-inside: avoid; }
  .sec-head { display: flex; align-items: baseline; gap: 12px; margin-bottom: 10px; border-bottom: 1px solid var(--line); padding-bottom: 5px; }
  .sec-head .n { font-family: var(--mono); font-size: 0.74rem; color: var(--accent); letter-spacing: 0.16em; }
  .sec-head h2 { font-size: 1.2rem; font-weight: 700; color: #fff; }
  .sec-head .jp { font-family: var(--mono); font-size: 0.72rem; color: var(--faint); }
  .facts { display: grid; grid-template-columns: max-content 1fr; gap: 5px 16px; font-size: 0.84rem; }
  .facts dt { font-family: var(--mono); color: var(--faint); font-size: 0.72rem; text-transform: uppercase; }
  .tl { width: 100%; border-collapse: collapse; font-size: 0.83rem; }
  .tl th { font-family: var(--mono); font-size: 0.66rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); text-align: left; border-bottom: 1px solid var(--line); padding: 0 10px 5px 0; }
  .tl td { padding: 7px 10px 7px 0; vertical-align: top; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .tl .when { font-family: var(--mono); font-size: 0.73rem; color: var(--dim); white-space: nowrap; width: 9.2rem; }
  .tl .role { font-weight: 700; color: #fff; }
  .tl .org { color: var(--dim); }
  .tl .note { font-size: 0.8rem; color: var(--dim); margin-top: 2px; }
  .tl .tech { font-family: var(--mono); font-size: 0.71rem; color: var(--sec); margin-top: 2px; }
  .card { padding: 14px 16px; border-radius: 10px; background: var(--surface); border: 1px solid var(--line); font-size: 0.84rem; line-height: 1.65; margin-top: 8px; break-inside: avoid; }
  .card h3 { font-size: 0.94rem; color: var(--accent); margin-bottom: 4px; }
  .skills { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .skill { border-left: 2px solid var(--accent); padding: 2px 0 2px 12px; break-inside: avoid; }
  .skill b { display: block; font-family: var(--mono); font-size: 0.71rem; text-transform: uppercase; color: var(--sec); }
  .skill p { font-size: 0.8rem; color: var(--dim); }
  footer { margin-top: 12px; padding: 14px 0 24px; border-top: 1px solid var(--line); font-family: var(--mono); font-size: 0.72rem; color: var(--faint); line-height: 1.8; }
  @page { size: A4; margin: 9mm 11mm; }
  @media print {
    #experience { break-before: page; }
    #portfolio { break-before: page; }
  }
</style>
</head>
<body>
<div class="band">
  <div class="page">
    <p class="kicker">履歴書 ・ 職務経歴書 · CURRICULUM VITAE · TAILORED FOR ${esc(c.company)}</p>
    <h1 class="name">${esc(APPLICANT.name)}</h1>
    <p class="kana">${esc(APPLICANT.kana)} · Passport: ${esc(APPLICANT.passportName)} (${esc(APPLICANT.passportNo)}) · Visa Ref: ${esc(APPLICANT.visaRef)}</p>
    <nav class="contacts">
      <a href="mailto:${esc(APPLICANT.emailPrimary)}">${esc(APPLICANT.emailPrimary)}</a> ·
      <span>${esc(APPLICANT.phone)}</span> ·
      <a href="${esc(APPLICANT.linkedin)}">linkedin.com/in/peter-lodri</a> ·
      <a href="${esc(APPLICANT.githubPrimary)}">github.com/peterlodri-sec</a> ·
      <a href="https://${esc(c.subdomain)}">${esc(c.subdomain)}</a>
    </nav>
  </div>
</div>

<div class="page">
  <main>
    <section id="personal">
      <div class="sec-head"><span class="n">00</span><h2>Personal Data &amp; Target Position</h2><span class="jp">基本情報・希望職種</span></div>
      <dl class="facts">
        <dt>Name 氏名</dt><dd>${esc(APPLICANT.name)} (${esc(APPLICANT.kana)})</dd>
        <dt>Target Company</dt><dd><strong>${esc(c.company)}</strong> — ${esc(c.location)}</dd>
        <dt>Target Role 希望職種</dt><dd><strong>${esc(c.role)}</strong> (${esc(c.comp)})</dd>
        <dt>Dedicated Site</dt><dd><a href="https://${esc(c.subdomain)}">https://${esc(c.subdomain)}</a> (Interactive CV, PDFs, ELI5 &amp; LinkedIn Kit)</dd>
        <dt>Passport / Visa</dt><dd>${esc(APPLICANT.passportName)} · No. ${esc(APPLICANT.passportNo)} (${esc(APPLICANT.nationality)}) · Visa Ref: ${esc(APPLICANT.visaRef)}</dd>
        <dt>Born 生年月日</dt><dd>${esc(APPLICANT.dob)} · Tatabánya, Hungary</dd>
        <dt>Address 現住所</dt><dd>${esc(APPLICANT.address)}</dd>
        <dt>LinkedIn &amp; GitHub</dt><dd><a href="${esc(APPLICANT.linkedin)}">linkedin.com/in/peter-lodri</a> · <a href="${esc(APPLICANT.githubPrimary)}">github.com/peterlodri-sec</a> · <a href="${esc(APPLICANT.githubOrg)}">github.com/8b-is</a></dd>
      </dl>
    </section>

    <section id="education">
      <div class="sec-head"><span class="n">01</span><h2>Education</h2><span class="jp">学歴（高校以降すべて）</span></div>
      <table class="tl">
        <thead><tr><th>Period / 期間</th><th>Institution &amp; Qualification / 学校・専攻</th></tr></thead>
        <tbody>${eduRows}</tbody>
      </table>
    </section>

    <section id="experience">
      <div class="sec-head"><span class="n">02</span><h2>Professional Experience &amp; Open-Source Leadership</h2><span class="jp">職務経歴書</span></div>
      <table class="tl">
        <thead><tr><th>Period / 期間</th><th>Role &amp; Engineering Impact / 職務・実績</th></tr></thead>
        <tbody>${expRows}</tbody>
      </table>
    </section>

    <section id="skills">
      <div class="sec-head"><span class="n">03</span><h2>Technical Skills &amp; Languages</h2><span class="jp">スキル・語学</span></div>
      <div class="skills">
        <div class="skill"><b>Systems &amp; Low-Bit Compute</b><p>Rust, C, Swift 6, Go — SIMD, custom Metal/GPU kernels, BitNet b1.58 {-1, 0, +1} ternary quantization (12.80× compression), zero-dependency binaries.</p></div>
        <div class="skill"><b>Real-Time 3D, Simulation &amp; DSP</b><p>Unity, Three.js, WebGL2, GLSL/HLSL shaders, vector/oscilloscope synthesis, 3D geospatial/LiDAR telemetry (Osiris), procedural Web Audio.</p></div>
        <div class="skill"><b>OSS Architecture &amp; Multi-Agent DAGs</b><p>Core Architect on Osaurus (osaurus-ai/osaurus) &amp; Osiris (simplifaisoul/osiris); contributor to Headroom (PR #1418); AgentField verifiable compute.</p></div>
        <div class="skill"><b>Human &amp; Programming Languages</b><p>English (fluent), Hungarian (native), Spanish, Latin, Esperanto, Romani, Macedonian; daily Japanese in Tokyo. Code: Rust, C, Go, Python, Swift 6, TypeScript, Kotlin, Scala, Ada.</p></div>
      </div>
    </section>

    <section id="portfolio">
      <div class="sec-head"><span class="n">04</span><h2>Selected Works, Links &amp; LinkedIn Network for ${esc(c.company)}</h2><span class="jp">制作実績・リンク</span></div>
      <div class="card">
        <h3>Tailored Interactive Showcase &amp; Verified Repositories</h3>
        <p>• <strong>Dedicated Subdomain Site</strong>: <a href="https://${esc(c.subdomain)}">https://${esc(c.subdomain)}</a> · Master Hub: <a href="https://apply.vaked.dev">https://apply.vaked.dev</a></p>
        <p>• <strong>Open-Source Architect &amp; PRs</strong>: <a href="https://github.com/osaurus-ai/osaurus">osaurus-ai/osaurus</a> · <a href="https://github.com/simplifaisoul/osiris">simplifaisoul/osiris</a> · <a href="https://github.com/headroomlabs-ai/headroom/pull/1418">headroomlabs-ai/headroom#1418</a> · <a href="https://github.com/8b-is">github.com/8b-is</a></p>
      </div>
      <div class="card">
        <h3>Direct Portal &amp; LinkedIn Contacts (${esc(c.company)})</h3>
        <p>• <strong>Official Careers Portal</strong>: <a href="${esc(c.portalUrl)}">${esc(c.portalUrl)}</a> · <strong>Company LinkedIn</strong>: <a href="${esc(c.linkedinInfo.companyUrl)}">${esc(c.linkedinInfo.companyUrl)}</a></p>
        <ul style="padding-left:18px;margin-top:6px">${liContacts}</ul>
      </div>
    </section>

    <section id="why">
      <div class="sec-head"><span class="n">05</span><h2>Why ${esc(c.company)}</h2><span class="jp">志望動機</span></div>
      <div class="card">
        <p>${esc(c.whyEn)}</p>
        <p style="margin-top:8px" lang="ja">${esc(c.whyJa)}</p>
      </div>
    </section>

    <section id="ai">
      <div class="sec-head"><span class="n">06</span><h2>AI Usage &amp; Verification Disclosure</h2><span class="jp">AI利用に関する明記</span></div>
      <div class="card">
        <p lang="ja">提出物の開発において、AIコーディングアシスタントを補助的に使用しました（雛形生成、ドキュメント整備、検証スクリプト補助）。企画・数理設計・アーキテクチャ決定・量子化およびリアルタイム描画の実装判断・最終ハッシュ検証はすべて応募者本人が行っています。</p>
        <p style="margin-top:6px">AI coding assistants were used strictly as a support tool for scaffolding and documentation formatting. All architectural design, mathematical formulation, kernel/shader implementation decisions, and cryptographic hash verifications were performed by the applicant.</p>
      </div>
    </section>
  </main>

  <footer>
    <div>${esc(APPLICANT.name)} · <a href="mailto:${esc(APPLICANT.emailPrimary)}">${esc(APPLICANT.emailPrimary)}</a> · <a href="${esc(APPLICANT.linkedin)}">linkedin.com/in/peter-lodri</a> · <a href="https://${esc(c.subdomain)}">${esc(c.subdomain)}</a></div>
    <div>fine touch from within · peter + 8b.is &lt;3 · {−1, 0, +1} · om mani padme hum</div>
  </footer>
</div>
</body>
</html>`;
}

export function renderPortfolioHtml(c) {
  const worksCards = c.works
    .map(
      (w) => `
        <a class="work" href="${esc(w.url)}">
          <span class="tag">${esc(w.tag)}</span>
          <h3>${esc(w.title)}</h3>
          <p>${esc(w.desc)}</p>
          <div class="url">${esc(w.label)}</div>
        </a>`
    )
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(APPLICANT.name)} — Engineering Portfolio for ${esc(c.company)}</title>
<style>
  :root {
    color-scheme: dark;
    --ink: #f2f4ff;
    --dim: #c2c6e6;
    --faint: #8f95bd;
    --bg: #070a12;
    --surface: #101524;
    --line: rgba(255,255,255,0.14);
    --accent: ${c.theme.accent};
    --sec: ${c.theme.secondary};
    --mono: ui-monospace, "SF Mono", Menlo, monospace;
    --sans: "Inter", system-ui, -apple-system, "Hiragino Sans", sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: var(--sans); font-size: 0.92rem; line-height: 1.6; color: var(--ink); background: var(--bg); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  a { color: var(--sec); text-decoration: none; }
  .page { max-width: 48rem; margin: 0 auto; padding: 0 clamp(16px, 4vw, 36px); }
  .band { padding: 28px 0 22px; border-bottom: 1px solid var(--line); background: linear-gradient(135deg, rgba(255,255,255,0.05), transparent); }
  .kicker { font-family: var(--mono); font-size: 0.72rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--accent); }
  .name { font-size: 2.3rem; font-weight: 800; margin-top: 6px; color: #fff; }
  .role { font-size: 1.05rem; color: var(--ink); margin-top: 6px; }
  .lede { font-family: var(--mono); font-size: 0.8rem; color: var(--dim); margin-top: 8px; }
  .contacts { display: flex; flex-wrap: wrap; gap: 8px 14px; margin-top: 12px; font-family: var(--mono); font-size: 0.75rem; color: var(--dim); }
  section { padding-block: 18px; break-inside: avoid; }
  .sec-head { display: flex; align-items: baseline; gap: 12px; margin-bottom: 12px; border-bottom: 1px solid var(--line); padding-bottom: 5px; }
  .sec-head .n { font-family: var(--mono); font-size: 0.74rem; color: var(--accent); }
  .sec-head h2 { font-size: 1.25rem; font-weight: 700; color: #fff; }
  .works { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .work { padding: 14px 16px; border-radius: 10px; background: var(--surface); border: 1px solid var(--line); display: block; color: inherit; break-inside: avoid; }
  .work .tag { font-family: var(--mono); font-size: 0.66rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); }
  .work h3 { font-size: 1rem; margin: 4px 0 6px; color: #fff; }
  .work p { font-size: 0.82rem; color: var(--dim); }
  .work .url { font-family: var(--mono); font-size: 0.71rem; color: var(--sec); margin-top: 8px; }
  .why { padding: 16px 18px; border-radius: 10px; background: var(--surface); border: 1px solid var(--line); font-size: 0.88rem; line-height: 1.75; }
  footer { margin-top: 14px; padding: 14px 0 24px; border-top: 1px solid var(--line); font-family: var(--mono); font-size: 0.72rem; color: var(--faint); line-height: 1.8; }
  @page { size: A4; margin: 10mm 11mm; }
</style>
</head>
<body>
<div class="band">
  <div class="page">
    <p class="kicker">ENGINEERING &amp; ARCHITECTURE PORTFOLIO · ${esc(c.company)}</p>
    <h1 class="name">${esc(APPLICANT.name)}</h1>
    <p class="role">${esc(c.role)} — ${esc(c.heroRole)}</p>
    <p class="lede">Printable mirror of <a href="https://${esc(c.subdomain)}">https://${esc(c.subdomain)}</a> · LinkedIn: <a href="${esc(APPLICANT.linkedin)}">linkedin.com/in/peter-lodri</a></p>
    <nav class="contacts">
      <a href="mailto:${esc(APPLICANT.emailPrimary)}">${esc(APPLICANT.emailPrimary)}</a> ·
      <a href="${esc(APPLICANT.linkedin)}">LinkedIn</a> ·
      <a href="${esc(APPLICANT.githubPrimary)}">github.com/peterlodri-sec</a> ·
      <a href="${esc(APPLICANT.githubOrg)}">github.com/8b-is</a> ·
      <a href="https://${esc(c.subdomain)}">${esc(c.subdomain)}</a>
    </nav>
  </div>
</div>

<div class="page">
  <main>
    <section id="works">
      <div class="sec-head"><span class="n">01</span><h2>Selected Architecture &amp; Engineering Works for ${esc(c.company)}</h2></div>
      <div class="works">
        ${worksCards}
      </div>
    </section>

    <section id="why">
      <div class="sec-head"><span class="n">02</span><h2>Why ${esc(c.company)} (${esc(c.location)})</h2></div>
      <div class="why">
        <p>${esc(c.whyEn)}</p>
        <p style="margin-top:10px" lang="ja">${esc(c.whyJa)}</p>
      </div>
    </section>
  </main>

  <footer>
    <div>${esc(APPLICANT.name)} · Live Interactive Site: <a href="https://${esc(c.subdomain)}">https://${esc(c.subdomain)}</a> · Master Hub: <a href="https://apply.vaked.dev">https://apply.vaked.dev</a></div>
    <div>fine touch from within · peter + 8b.is &lt;3 · {−1, 0, +1} · om mani padme hum</div>
  </footer>
</div>
</body>
</html>`;
}

export function renderEli5Md(c) {
  const contactLines = c.linkedinInfo.contacts
    .map((ct) => `- **${ct.name}** (*${ct.title}*): [${ct.url}](${ct.url}) — ${ct.note}`)
    .join("\n");

  return `# ELI5 (Explain Like I'm 5) — ${c.company} E2E Application & LinkedIn Outreach Guide

**Target Company:** ${c.company} (${c.location})  
**Target Role:** \`${c.role}\`  
**Estimated Compensation:** \`${c.comp}\`  
**Dedicated Interactive Subdomain:** **[https://${c.subdomain}](https://${c.subdomain})**  
**Applicant LinkedIn:** **[https://www.linkedin.com/in/peter-lodri/](https://www.linkedin.com/in/peter-lodri/)**

---

## 1. What Is Ready Right Now (ELI5)

We built a complete, self-contained **dedicated subdomain website** (\`https://${c.subdomain}\`) and **3 print-ready PDFs** specifically for **${c.company}**:

| Asset | Local File | Live Subdomain URL | When to Use It |
| :--- | :--- | :--- | :--- |
| **Interactive Browser CV** | \`index.html\` | **[https://${c.subdomain}/](https://${c.subdomain}/)** | Paste this as your **Portfolio / Website URL** in the application form and in LinkedIn DMs. |
| **Tailored Résumé / 履歴書 PDF** | \`lodri-resume.pdf\` | **[https://${c.subdomain}/resume.pdf](https://${c.subdomain}/resume.pdf)** | Upload to the **Resume / CV / 履歴書・職務経歴書** slot. |
| **Visual & Systems Portfolio PDF** | \`lodri-portfolio.pdf\` | **[https://${c.subdomain}/portfolio.pdf](https://${c.subdomain}/portfolio.pdf)** | Upload to the **Portfolio / Work Samples / 作品** slot. |
| **Full Application Dossier PDF** | \`lodri-application.pdf\` | **[https://${c.subdomain}/application.pdf](https://${c.subdomain}/application.pdf)** | Upload as **Cover Letter / Additional Documents** or attach to email. |
| **Raw Markdown Answers** | \`application.md\` | **[https://${c.subdomain}/application.md](https://${c.subdomain}/application.md)** | Copy-paste answers directly into web form text boxes. |

---

## 2. How to Apply in 3 Minutes (Step-by-Step)

1. **Open the Official Portal:** Click **[${c.portalUrl}](${c.portalUrl})** (or email \`${c.portalEmail}\`).
2. **Upload Your Tailored PDFs:**
   - Attach \`lodri-resume.pdf\` (\`https://${c.subdomain}/resume.pdf\`) as your CV/Resume.
   - Attach \`lodri-portfolio.pdf\` (\`https://${c.subdomain}/portfolio.pdf\`) as your Portfolio.
3. **Paste Your Dedicated Subdomain URL:** Put \`https://${c.subdomain}\` in the Website/Portfolio URL field, and \`https://www.linkedin.com/in/peter-lodri/\` in the LinkedIn field.
4. **Send the 1-Click LinkedIn Note (Below):** Right after submitting, open the LinkedIn links below and send the 1-click connection note so an engineer/founder/recruiter pulls your application straight from the queue!

---

## 3. LinkedIn Links & Key Contacts for ${c.company}

- **Company LinkedIn Page:** [${c.linkedinInfo.companyUrl}](${c.linkedinInfo.companyUrl})
- **Company LinkedIn Jobs:** [${c.linkedinInfo.jobsUrl}](${c.linkedinInfo.jobsUrl})
- **Company LinkedIn People Directory:** [${c.linkedinInfo.peopleUrl}](${c.linkedinInfo.peopleUrl})
- **1-Click Filtered Recruiter & Engineer Search:** [Search ${c.company} Recruiters & Engineers on LinkedIn](${c.linkedinInfo.recruiterSearchUrl})
- **Your LinkedIn Profile:** [https://www.linkedin.com/in/peter-lodri/](https://www.linkedin.com/in/peter-lodri/)

### Named Leadership & Recruiting Contacts
${contactLines}

---

## 4. Copy-Paste LinkedIn Connection Note (< 300 Characters)

\`\`\`text
${c.linkedinInfo.connectionNote}
\`\`\`

---

## 5. Copy-Paste LinkedIn InMail / Direct Email (\`${c.portalEmail}\`)

\`\`\`text
${c.linkedinInfo.inmailBody}
\`\`\`
`;
}

export function renderApplicationMd(c, existingAppMd) {
  const contactLines = c.linkedinInfo.contacts
    .map((ct) => `- **${ct.name}** (${ct.title}): [${ct.url}](${ct.url}) — ${ct.note}`)
    .join("\n");

  return `# ${c.company} — Complete Application Dossier & LinkedIn Kit

- **Applicant:** ${APPLICANT.name} (\`${APPLICANT.passportName}\` · ${APPLICANT.kana})
- **Target Role:** ${c.role}
- **Location:** ${c.location}
- **Compensation Band:** \`${c.comp}\`
- **Dedicated Live Subdomain:** [https://${c.subdomain}](https://${c.subdomain})
- **Formal Résumé PDF:** [https://${c.subdomain}/resume.pdf](https://${c.subdomain}/resume.pdf)
- **Engineering Portfolio PDF:** [https://${c.subdomain}/portfolio.pdf](https://${c.subdomain}/portfolio.pdf)
- **LinkedIn Profile:** [https://www.linkedin.com/in/peter-lodri/](https://www.linkedin.com/in/peter-lodri/)
- **GitHub & OSS Architect:** [github.com/peterlodri-sec](https://github.com/peterlodri-sec) · [github.com/8b-is](https://github.com/8b-is) · [osaurus-ai/osaurus](https://github.com/osaurus-ai/osaurus) · [simplifaisoul/osiris](https://github.com/simplifaisoul/osiris) · [headroomlabs-ai/headroom#1418](https://github.com/headroomlabs-ai/headroom/pull/1418)

---

## Direct Application & LinkedIn Contact Directory

- **Official Careers Portal:** [${c.portalUrl}](${c.portalUrl})
- **Direct Recruiting Email:** \`${c.portalEmail}\`
- **LinkedIn Company Page:** [${c.linkedinInfo.companyUrl}](${c.linkedinInfo.companyUrl})
- **LinkedIn People Directory:** [${c.linkedinInfo.peopleUrl}](${c.linkedinInfo.peopleUrl})
- **LinkedIn Recruiter & Team Search:** [Find ${c.company} Recruiters & Engineers](${c.linkedinInfo.recruiterSearchUrl})

### Key Leadership & Talent Contacts
${contactLines}

### LinkedIn Connection Note (< 300 chars)
\`\`\`text
${c.linkedinInfo.connectionNote}
\`\`\`

### LinkedIn InMail / Direct Email Body
\`\`\`text
${c.linkedinInfo.inmailBody}
\`\`\`

---

${existingAppMd}
`;
}

export function renderWranglerToml(c) {
  return `name = "${c.workerName}"
main = "worker.js"
compatibility_date = "2026-09-01"

routes = [
  { pattern = "${c.subdomain}", custom_domain = true }
]
`;
}

export function renderWorkerBuildMjs(c) {
  return `// Regenerate deploy/worker.js and application.html for ${c.subdomain}
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
    .replace(/\`([^\`]+)\`/g,"<code>$1</code>")
    .replace(/\\*\\*([^*]+)\\*\\*/g,"<strong>$1</strong>")
    .replace(/\\*([^*]+)\\*/g,"<em>$1</em>")
    .replace(/\\[([^\\]]+)\\]\\((https?:[^)]+)\\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

function md(src){
  const lines = src.replace(/\\r/g,"").split("\\n");
  let out = "", inList = false, inOrdered = false, inTable = false, inQuote = false, inCode = false;
  const closeBlocks = () => {
    if(inList){ out += "</ul>"; inList = false; }
    if(inOrdered){ out += "</ol>"; inOrdered = false; }
    if(inTable){ out += "</tbody></table>"; inTable = false; }
    if(inQuote){ out += "</blockquote>"; inQuote = false; }
  };
  const cells = (l) => l.replace(/^\\||\\|$/g,"").split("|").map(c => c.trim());

  for (let i = 0; i < lines.length; i++){
    const l = lines[i];
    if (inCode){
      if (l.trim().startsWith("\`\`\`")){ out += "</code></pre>"; inCode = false; }
      else { out += esc(l) + "\\n"; }
      continue;
    }
    if (l.trim().startsWith("\`\`\`")){
      closeBlocks();
      out += "<pre><code>";
      inCode = true;
      continue;
    }
    if (/^\\s*$/.test(l)){ closeBlocks(); continue; }
    if (/^---+\\s*$/.test(l)){ closeBlocks(); out += "<hr>"; continue; }
    if (/^\\|/.test(l) && /\\|\\s*$/.test(l)){
      const cellsArr = cells(l);
      if (i + 1 < lines.length && /^\\|[\\s:|-]+\\|?\\s*$/.test(lines[i + 1])){
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
    const h = l.match(/^(#{1,4})\\s+(.*)$/);
    if (h){
      closeBlocks();
      out += "<h" + h[1].length + ">" + inline(h[2]) + "</h" + h[1].length + ">";
      continue;
    }
    if (/^>\\s?/.test(l)){
      if (!inQuote){ closeBlocks(); out += "<blockquote>"; inQuote = true; }
      out += inline(l.replace(/^>\\s?/, "")) + "<br>";
      continue;
    }
    if (/^\\s*[-*]\\s+/.test(l)){
      if (!inList){ closeBlocks(); out += "<ul>"; inList = true; }
      out += "<li>" + inline(l.replace(/^\\s*[-*]\\s+/, "")) + "</li>";
      continue;
    }
    if (/^\\s*\\d+\\.\\s+/.test(l)){
      if (!inOrdered){ closeBlocks(); out += "<ol>"; inOrdered = true; }
      out += "<li>" + inline(l.replace(/^\\s*\\d+\\.\\s+/, "")) + "</li>";
      continue;
    }
    closeBlocks();
    out += "<p>" + inline(l) + "</p>";
  }
  closeBlocks();
  return out;
}

function page(title, body, accent){
  return \`<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>\${title}</title><meta name="robots" content="noindex">
<style>
 :root{color-scheme:dark;--ink:#eef0ff;--dim:#b8b2d4;--line:rgba(255,255,255,.12);--accent:\${accent}}
 *{box-sizing:border-box}
 body{margin:0;background:#04060a;color:var(--ink);font:15px/1.75 ui-monospace,'SF Mono','Hiragino Sans',Menlo,monospace;padding:clamp(20px,5vw,60px)}
 main{max-width:880px;margin:0 auto}
 a{color:${c.theme.secondary};text-underline-offset:3px}
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
<div class="top"><a href="/">🜂 ${c.subdomain}</a><span>${esc(c.company)} · Péter József Lódri</span></div>
\${body}
<footer>
  <div><a href="/">Interactive CV</a> · <a href="/resume">Résumé (HTML)</a> · <a href="/resume.pdf">resume.pdf</a> · <a href="/portfolio">Portfolio (HTML)</a> · <a href="/portfolio.pdf">portfolio.pdf</a> · <a href="/application">Application</a> · <a href="/application.pdf">application.pdf</a> · <a href="/eli5">ELI5 Guide</a> · <a href="https://www.linkedin.com/in/peter-lodri/">LinkedIn</a> · <a href="https://apply.vaked.dev">apply.vaked.dev</a></div>
  <div>fine touch from within · peter + 8b.is · {−1, 0, +1} · om mani padme hum</div>
</footer>
</main></body></html>\`;
}

const applicationHtml = page("${esc(c.company)} Application — Péter József Lódri", md(app), "${c.theme.accent}");
const eli5Html = page("ELI5 Guide — ${esc(c.company)} — Péter József Lódri", md(eli5), "${c.theme.accent}");
writeFileSync(join(root, "application.html"), applicationHtml);
writeFileSync(join(root, "eli5.html"), eli5Html);

const worker = \`// ${c.subdomain} — E2E Interactive CV, Resume, Portfolio, Application, ELI5 & LinkedIn Kit
const HTML = \${JSON.stringify(html)};
const APPLICATION = \${JSON.stringify(app)};
const APPLICATION_HTML = \${JSON.stringify(applicationHtml)};
const ELI5_MD = \${JSON.stringify(eli5)};
const ELI5_HTML = \${JSON.stringify(eli5Html)};
const RESUME = \${JSON.stringify(resume)};
const PORTFOLIO = \${JSON.stringify(portfolio)};
const RESUME_PDF_B64 = \${JSON.stringify(resumePdf)};
const PORTFOLIO_PDF_B64 = \${JSON.stringify(portfolioPdf)};
const APP_PDF_B64 = \${JSON.stringify(appPdf)};

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
    const p = url.pathname.replace(/\\\\/+$/, "") || "/";

    if (p === "/resume.pdf" || p === "/lodri-resume.pdf") {
      return new Response(b64Bytes(RESUME_PDF_B64), {
        headers: { ...COMMON_HEADERS, "content-type": "application/pdf", "content-disposition": 'inline; filename="Peter-Lodri-Resume-${c.slug}.pdf"' }
      });
    }
    if (p === "/portfolio.pdf" || p === "/lodri-portfolio.pdf") {
      if (!PORTFOLIO_PDF_B64) return Response.redirect("https://8b-is.github.io/peter-applications/${c.slug}/lodri-portfolio.pdf", 302);
      return new Response(b64Bytes(PORTFOLIO_PDF_B64), {
        headers: { ...COMMON_HEADERS, "content-type": "application/pdf", "content-disposition": 'inline; filename="Peter-Lodri-Portfolio-${c.slug}.pdf"' }
      });
    }
    if (p === "/application.pdf" || p === "/lodri-application.pdf" || p === "/lodri-teamlab-application.pdf") {
      if (!APP_PDF_B64) return Response.redirect("https://8b-is.github.io/peter-applications/${c.slug}/lodri-application.pdf", 302);
      return new Response(b64Bytes(APP_PDF_B64), {
        headers: { ...COMMON_HEADERS, "content-type": "application/pdf", "content-disposition": 'inline; filename="Peter-Lodri-Application-${c.slug}.pdf"' }
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
      return Response.redirect("https://${c.subdomain}/#linkedin", 302);
    }
    if (p === "/health") {
      return new Response("OK", { headers: { ...COMMON_HEADERS, "content-type": "text/plain; charset=utf-8" } });
    }
    return new Response(HTML, { headers: { ...COMMON_HEADERS, "content-type": "text/html; charset=utf-8" } });
  }
};
\`;

writeFileSync(join(here, "worker.js"), worker);
console.log(\`[${c.slug}] worker.js regenerated (\${worker.length} chars)\`);
`;
}
