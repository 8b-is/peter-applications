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
