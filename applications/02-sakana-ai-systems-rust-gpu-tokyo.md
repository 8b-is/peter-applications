# 02 — Sakana AI (Tokyo, Minato-ku)
**Role:** AI Systems & Multi-GPU Infrastructure Engineer (Evolutionary Model Merging, Low-Bit Inference & Agentic Systems)  
**Estimated Compensation:** ¥15,000,000 – ¥28,000,000+ JPY + Equity (Tokyo Hybrid / On-Site)  
**Application Portal:** [https://sakana.ai/careers/](https://sakana.ai/careers/) · Direct Email: `careers@sakana.ai`  
**Resume to Attach:** [`../teamlab/lodri-resume.pdf`](../teamlab/lodri-resume.pdf) & [`../resumes/cv-peter-lodri-taiko.pdf`](../resumes/cv-peter-lodri-taiko.pdf)

---

## 1. ELI5: What Does Sakana AI Do & Why Do They Need You?
- **What they do:** Founded in Tokyo by former Google Brain researchers (David Ha & Llion Jones, co-author of the original *Attention Is All You Need* Transformer paper), Sakana AI builds **nature-inspired AI**: instead of training one giant, expensive model, they evolve swarms of smaller models (`Evolutionary Model Merging`) and autonomous AI Scientists (`The AI Scientist`).
- **Why you are a SOTA match:** Sakana AI needs systems engineers who can make swarms of models run ultra-fast on GPUs and Apple Silicon/edge hardware with verifiable determinism. You have already shipped:
  1. **`8b-is/MLX-QUANT` & `pureQTern`**: `1.58-bit` ternary (`BitNet b1.58 {-1, 0, +1}`) quantization and custom Metal GPU kernels (`12.80×` compression over `FP16`).
  2. **`8b-is/cogito` (v0.4.0)**: Zero-float-drift `Pq` arithmetic, hardware `CLZ`-seeded `isqrt_pq` (`1,000,000` calls in `5.52 ms`), and `BFP-64` 64-trit `POPCNT` bitplanes.
  3. **Multi-Reasoner Agentic Infrastructure**: Production `AgentField` multi-reasoner pipelines and verifiable memory ledgers (`mem-16-10`).

---

## 2. Ready-to-Send Application Email / Cover Note (`careers@sakana.ai`)

**Subject:** `Application: AI Systems & Low-Bit Inference Engineer — Péter József Lódri (Rust / Metal & GPU Kernels / Multi-Agent Systems, Tokyo)`

```text
Dear Sakana AI Hiring Team,

I am a Tokyo-based Principal Systems Engineer & Independent Researcher (8+ years across ASAPP, Plandek, Virality Data, and DailyWire) applying for AI Systems & Infrastructure Engineering at Sakana AI.

Sakana AI's thesis—that nature-inspired collective intelligence, evolutionary model composition, and efficient specialized models outperform monolithic brute-force scale—is the exact architectural principle behind my open-source systems work:

1. Low-Bit Ternary Quantization & Custom GPU Kernels (`MLX-QUANT` & `pureQTern`):
   - Built zero-dependency C and Rust inference engines and Apple Silicon Metal GPU kernels for BitNet b1.58 ({-1, 0, +1}) ternary models, achieving 12.80x weight compression over FP16 with bit-exact golden-hash parity between CPU and GPU.
2. Deterministic Sub-Millisecond Kernels (`8b-is/cogito`):
   - Engineered BFP-64 (64-trit POPCNT bitplanes with adversarial bit-flip sanitization) and zero-float-drift rational lattices (`Pq`) executing 1,000,000 integer square-root evaluations in 5.52 ms.
3. High-Throughput Distributed & Agentic Systems:
   - At ASAPP, architected Go/Kotlin/Kubernetes microservices that cut Fortune-100 AI customer-agent latency by 50–70%.
   - Built `mem-16-10` (`#![no_std]`, zero-alloc Rust verifiable memory ledger) and self-host a 30+ service NixOS/nix-darwin compute fleet.

Code & Live Systems:
- GitHub: https://github.com/peterlodri-sec & https://github.com/8b-is
- Interactive Technical Portfolio: https://teamlab.vaked.dev
- Verifiable Compute Engine: https://github.com/8b-is/cogito

I am currently in Tokyo, hold an EU passport (Hungary, BJ3429501), and would love to discuss how my Rust, GPU kernel, and multi-agent infrastructure work can accelerate Sakana AI's research and enterprise deployments.

Best regards,
Péter József Lódri
peter.lodri@gmail.com | +36 20 391 5161
https://github.com/peterlodri-sec
```
