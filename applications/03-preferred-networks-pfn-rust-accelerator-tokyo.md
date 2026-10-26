# 03 — Preferred Networks / PFN (Tokyo, Otemachi)
**Role:** Senior / Principal Rust Systems & Custom AI Accelerator Engineer (`MN-Core` / `Rustuna` / LLM Inference Runtime)  
**Estimated Compensation:** ¥12,000,000 – ¥22,000,000+ JPY (Tokyo Hybrid / On-Site)  
**Application Portal:** [https://www.preferred.jp/en/careers/](https://www.preferred.jp/en/careers/)  
**Resume to Attach:** [`../teamlab/lodri-resume.pdf`](../teamlab/lodri-resume.pdf) & [`../resumes/cv-peter-lodri-taiko.pdf`](../resumes/cv-peter-lodri-taiko.pdf)

---

## 1. ELI5: What Does Preferred Networks (PFN) Do & Why Do They Need You?
- **What they do:** PFN is Japan's premier deep-tech hardware + AI company. They design their own supercomputer AI chips (**MN-Core / MN-Core 2**), build foundation models (**PLaMo**), run materials-discovery simulations (**Matlantis**), and rewrite slow Python AI tooling into ultra-fast **Rust** (such as **Rustuna**, their Rust engine for Optuna).
- **Why you are a SOTA match:** PFN's core engineering bottleneck is squeezing maximum compute density out of custom silicon and memory hierarchies using **Rust, C, SIMD, and low-bit quantization**. Your `BFP-64` bitplane packing (`popcnt(pos & inp) - popcnt(neg & inp)`), `wupz` 5-trits-per-byte codecs, and zero-dependency C/Rust ternary inference engines speak directly to PFN's compiler and runtime engineers.

---

## 2. Ready-to-Paste Application Cover Letter / Statement of Purpose

```text
Dear Preferred Networks Engineering & Recruiting Team,

I am applying for a Senior Systems / AI Infrastructure Engineer role at Preferred Networks in Tokyo. Over the past 8+ years, I have built high-throughput distributed backends (ASAPP, Virality Data, DailyWire, Plandek) and low-level Rust/C/Swift compute engines focused on low-bit quantization, deterministic numeric kernels, and hardware-accelerated inference.

Why my work aligns directly with PFN's MN-Core, PLaMo, and Rust systems stack:

1. Bitplane Quantization & Hardware-Sympathetic Kernels (`8b-is/cogito`, `pureQTern`):
   - Designed and shipped dependency-free C and `#![no_std]` Rust inference runtimes for 1.58-bit ternary (`{-1, 0, +1}`) models, replacing floating-point MAC arrays with two-plane 64-trit POPCNT dot products (`BFP-64`) and 5-trits-per-byte (`wupz`) dense packing.
   - Implemented Metal GPU compute parity gates (`max_abs = 0.0 <= 1e-5` between reference Rust and GPU shader execution).
2. Zero-Float-Drift Arithmetic & Spectral Rigidity (`mem-16-10` & `cogito`):
   - Built exact rational phase accumulators over Z_{2^32} that run 9,000,000,000 steps with zero floating-point drift, alongside hardware `CLZ`-seeded integer square-root kernels (`1M` evaluations in `5.52 ms`).
3. Production Python-to-Systems Modernization:
   - Across fintech (Citadel / Morgan Stanley / Sixth Street) and AI SaaS (ASAPP), I have repeatedly replaced Python/JVM bottlenecks with high-concurrency Go and Rust services—the same philosophy behind PFN's Rustuna.

Selected Open-Source Repositories:
- https://github.com/8b-is/cogito (Zero-alloc Rust ternary bitplanes, exact rational lattices & ABI v1 witnesses)
- https://github.com/8b-is/zenUltraCooker (Rust workspace + Metal GPU parity kernel + native iOS/Android apps)
- https://github.com/peterlodri-sec (70+ systems, cryptography, and NixOS infrastructure repositories)

I am currently in Tokyo and excited to contribute to PFN's AI infrastructure and systems engineering teams.

Sincerely,
Péter József Lódri
peter.lodri@gmail.com | +36 20 391 5161
```
