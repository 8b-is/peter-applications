# TIER IV (ティアフォー · Autoware) — Complete Application Dossier & LinkedIn Kit

- **Applicant:** Péter József Lódri (`LODRI PETER JOZSEF` · ロドリ・ペーテル・ヨージェフ)
- **Target Role:** Senior Rust Systems & Real-Time Edge GPU Engineer (Autoware Autonomous Driving OS)
- **Location:** Shinagawa, Tokyo (品川インターシティ)
- **Compensation Band:** `¥10,000,000 – ¥18,000,000+ JPY`
- **Dedicated Live Subdomain:** [https://tier4.vaked.dev](https://tier4.vaked.dev)
- **Formal Résumé PDF:** [https://tier4.vaked.dev/resume.pdf](https://tier4.vaked.dev/resume.pdf)
- **Engineering Portfolio PDF:** [https://tier4.vaked.dev/portfolio.pdf](https://tier4.vaked.dev/portfolio.pdf)
- **LinkedIn Profile:** [https://www.linkedin.com/in/peter-lodri/](https://www.linkedin.com/in/peter-lodri/)
- **GitHub & OSS Architect:** [github.com/peterlodri-sec](https://github.com/peterlodri-sec) · [github.com/8b-is](https://github.com/8b-is) · [osaurus-ai/osaurus](https://github.com/osaurus-ai/osaurus) · [simplifaisoul/osiris](https://github.com/simplifaisoul/osiris) · [headroomlabs-ai/headroom#1418](https://github.com/headroomlabs-ai/headroom/pull/1418)

---

## Direct Application & LinkedIn Contact Directory

- **Official Careers Portal:** [https://tier4.co.jp/en/careers](https://tier4.co.jp/en/careers)
- **Direct Recruiting Email:** `careers@tier4.jp`
- **LinkedIn Company Page:** [https://www.linkedin.com/company/tier-iv/](https://www.linkedin.com/company/tier-iv/)
- **LinkedIn People Directory:** [https://www.linkedin.com/company/tier-iv/people/](https://www.linkedin.com/company/tier-iv/people/)
- **LinkedIn Recruiter & Team Search:** [Find TIER IV (ティアフォー · Autoware) Recruiters & Engineers](https://www.linkedin.com/search/results/people/?keywords=TIER%20IV%20%28Recruiter%20OR%20Talent%20OR%20Autoware%20OR%20Rust%29)

### Key Leadership & Talent Contacts
- **Shinpei Kato (加藤真平)** (Founder & CEO / CTO, TIER IV & Founder of The Autoware Foundation): [https://www.linkedin.com/search/results/people/?keywords=Shinpei%20Kato%20TIER%20IV](https://www.linkedin.com/search/results/people/?keywords=Shinpei%20Kato%20TIER%20IV) — Founder of TIER IV and Autoware, leading open-source autonomous driving OS architecture.
- **Kazuya Takeda (竹田一哉)** (Co-Founder & Chief Scientist, TIER IV): [https://www.linkedin.com/search/results/people/?keywords=Kazuya%20Takeda%20TIER%20IV](https://www.linkedin.com/search/results/people/?keywords=Kazuya%20Takeda%20TIER%20IV) — Co-founder leading human-centric autonomous mobility and sensor signal processing.
- **TIER IV Global Engineering Talent Acquisition** (Technical Recruiting · Shinagawa, Tokyo): [https://www.linkedin.com/search/results/people/?keywords=TIER%20IV%20Recruiter%20OR%20Talent%20Acquisition%20Tokyo](https://www.linkedin.com/search/results/people/?keywords=TIER%20IV%20Recruiter%20OR%20Talent%20Acquisition%20Tokyo) — Global English-speaking engineering recruitment team in Shinagawa.

### LinkedIn Connection Note (< 300 chars)
```text
Hi! I built an interactive real-time LiDAR perception & Rust systems portfolio specifically for TIER IV's Autoware engineering team in Shinagawa: https://tier4.vaked.dev — combining zero-allocation C/Rust engines, edge GPU quantization & OSINT 3D architecture (Osiris). Would love to connect!
```

### LinkedIn InMail / Direct Email Body
```text
Dear TIER IV Autoware Engineering & Talent Team,

I built a live interactive LiDAR perception simulation and bilingual engineering application package tailored for TIER IV in Shinagawa, Tokyo:

• Live Interactive CV (Real-Time LiDAR Point Cloud & Trajectory Planner): https://tier4.vaked.dev
• Formal 履歴書 + 職務経歴書 (PDF): https://tier4.vaked.dev/resume.pdf
• Edge & Systems Portfolio (PDF): https://tier4.vaked.dev/portfolio.pdf
• Full Application Dossier: https://tier4.vaked.dev/application

I bring 9+ years of production systems engineering across C, Rust, Go, Linux kernel internals (Inpedio kptr_restrict & eBPF), real-time 3D spatial visualization (Core Architect on Osiris — simplifaisoul/osiris), and 12.80× compressed edge GPU inference (MLX-QUANT / pureQTern). I am ready to contribute immediately to Autoware's safety-critical Rust and edge perception stack in Tokyo.

Warm regards,
Péter József Lódri
https://www.linkedin.com/in/peter-lodri/
```

---

# 04 — TIER IV (Tokyo, Shinagawa)
**Role:** Senior Rust Systems & Real-Time Edge GPU Engineer (`Autoware` Autonomous Driving Runtime)  
**Estimated Compensation:** ¥10,000,000 – ¥18,000,000+ JPY (Tokyo On-Site / Hybrid)  
**Application Portal:** [https://tier4.co.jp/en/careers](https://tier4.co.jp/en/careers)  
**Resume to Attach:** [`../resumes/cv-peter-lodri-taiko.pdf`](../resumes/cv-peter-lodri-taiko.pdf) & [`../teamlab/lodri-resume.pdf`](../teamlab/lodri-resume.pdf)

---

## 1. ELI5: What Does TIER IV Do & Why Do They Need You?
- **What they do:** TIER IV leads **Autoware**, the world's largest open-source autonomous driving operating system, deployed in robo-taxis, autonomous buses, and factory logistics across Japan and globally.
- **Why you are a SOTA match:** Self-driving vehicles cannot tolerate garbage-collection pauses, memory leaks, or floating-point drift at 60Hz sensor tick rates. TIER IV is aggressively adopting **Rust** alongside C++/CUDA for deterministic real-time safety. Your `#![no_std]` zero-allocation Rust crates (`mem-16-10`, `cogito`), sub-117ms deterministic latency caps, and cryptographic replay/verification gates (`Ed25519` / `BLAKE3`) are tailor-made for safety-critical autonomous systems.

---

## 2. Ready-to-Paste Application Cover Letter

```text
Dear TIER IV Engineering Recruitment Team,

I am applying for the Senior Rust Systems & Edge Infrastructure Engineer role at TIER IV in Tokyo. My engineering focus is deterministic, zero-allocation Rust systems, real-time telemetry pipelines, and GPU-accelerated inference with strict latency and reproducibility guarantees.

Highlights relevant to Autoware and TIER IV's real-time vehicle stack:

1. `#![no_std]` Zero-Allocation Rust & Hard Real-Time Latency Caps (`cogito` & `mem-16-10`):
   - Authored pure `#![no_std]` Rust libraries with zero heap allocations, deterministic integer-only phase locking (`Z_{2^32}`), and hardware `CLZ`-seeded math kernels verified under strict latency budgets (`1M` calls in `5.52 ms`).
   - Built adversarial bit-flip sanitizers (`pos & neg == 0`) that detect and quarantine corrupted sensor/weight bitplanes in O(1) bitwise instructions before execution.
2. High-Throughput Telemetry & Mesh Networking (`8b-is-engine`):
   - Engineered WebSocket + QUIC mesh relays with deterministic frame boundaries, challenge-response clock proofs, and hash-chained event replay ledgers (`BLAKE3` + `Ed25519`).
3. Reproducible Fleet Infrastructure (`nix-base`):
   - Manage a multi-architecture (`x86_64` + `aarch64`) declarative NixOS fleet with automated CI canary verification—directly transferable to reproducible ECU and vehicle edge deployments.

Links:
- GitHub: https://github.com/peterlodri-sec & https://github.com/8b-is/cogito
- Interactive Portfolio: https://teamlab.vaked.dev

I am currently in Tokyo and eager to help TIER IV advance safe, deterministic Rust infrastructure for Autoware.

Best regards,
Péter József Lódri
peter.lodri@gmail.com | +36 20 391 5161
```

