# teamLab Application — Plain-English (ELI5) Guide & Asset Pack

**Applicant:** Péter József Lódri (`LODRI PETER JOZSEF` · ロドリ・ペーテル・ヨージェフ)  
**Primary Role:** Interactive Engineer (Unity / 3D / Real-Time CG) — `インタラクティブエンジニア（Unity / 3D）`  
**Secondary Role:** Catalyst (Creative Technical Producer) — `カタリスト`  
**Live Interactive Portfolio:** [https://teamlab.vaked.dev](https://teamlab.vaked.dev)  
**Official Application Portal:** [teamLab Careers / Talentio Form](https://www.team-lab.com/recruit/)

---

## 1. ELI5: What Is teamLab Looking For, and Why Are You a 10/10 Fit?

Think of a teamLab museum (**teamLab Borderless** in Azabudai Hills or **teamLab Planets** in Toyosu) like a giant living video game projected onto the walls, floors, and mirrors of an entire building:
- When a person touches a flower on the wall, thousands of petals scatter in real time at 60 frames per second, and the room's spatial audio changes pitch.
- **What an Interactive Engineer does:** Writes the real-time code (shaders, physics, particle systems, sound synthesis, and sensor math) so the room reacts instantaneously without lag.
- **What a Catalyst does:** Speaks both "Artist" and "Systems Engineer" to coordinate complex installations from concept to physical museum launch.
- **Why you stand out immediately:** Most applicants send a static PDF or a link to a YouTube video. Your portfolio ([`https://teamlab.vaked.dev`](https://teamlab.vaked.dev)) **is itself a live, zero-dependency real-time WebGL2 + Web Audio installation running directly in the reviewer's browser**, backed by 8+ years of senior production engineering (`ASAPP`, `DailyWire`, `Plandek`) and low-level `C / Rust / Swift / Metal` systems (`cogito`, `MLX-QUANT`, `zeno.vaked.dev`, `zenUltraCooker`).

---

## 2. ELI5: Which File Do I Upload Where? (Included Assets)

All required files are stored right inside [`teamlab/`](./) in this repository:

| Asset File | Size | What It Is (ELI5) | Where to Use It |
| :--- | :--- | :--- | :--- |
| **[`lodri-resume.pdf`](./lodri-resume.pdf)** | `1.8 MB` | Your official Japanese/English **Rirekisho + Shokumu Keirekisho (`履歴書・職務経歴書`)** with full education (high school onward) and work history (2016–present). | **Upload this file** to the mandatory `履歴書 / 職務経歴書` upload box on the teamLab application form. |
| **[`lodri-portfolio.pdf`](./lodri-portfolio.pdf)** | `1.3 MB` | Your visual & technical **Portfolio Book** showing your real-time shaders, oscilloscope vector synth, and systems architecture. | Upload as an optional second attachment or bring to the interview screen-share. |
| **[`lodri-teamlab-application.pdf`](./lodri-teamlab-application.pdf)** | `3.5 MB` | Your complete **All-in-One Application Dossier** combining your cover letter,Japanese/English Q&A, and portfolio proofs. | Keep open during interviews or attach if applying via email/recruiter. |
| **[`application.md`](./application.md)** | `14 KB` | Exact **Copy-Paste Answers** (in Japanese + English) for every single box on the teamLab online form. | Copy and paste line-by-line into the web form (takes 3 minutes). |
| **[`resume.html`](./resume.html) & [`application.html`](./application.html)** | `43 KB` | Print-ready HTML source templates used to generate the PDFs via Headless Chrome. | Edit here if you ever want to update a phone number or address. |

---

## 3. Step-by-Step: How to Submit the Form in 3 Minutes

1. **Open the teamLab Interactive Engineer Form** via [team-lab.com/recruit](https://www.team-lab.com/recruit/).
2. **Name (`名前`)**: `LODRI PETER JOZSEF` (or `Peter József Lódri / ロドリ・ペーテル・ヨージェフ`).
3. **Email (`メールアドレス`)**: `peter.lodri@gmail.com`
4. **Resume Upload (`履歴書 / 職務経歴書`)**: Select [`teamlab/lodri-resume.pdf`](./lodri-resume.pdf).
5. **Portfolio URL (`制作実績 / ポートフォリオ URL`)**:
   ```text
   https://teamlab.vaked.dev
   ```
6. **Code Samples URL (`コーディング能力がわかるもの URL`)**:
   ```text
   https://github.com/peterlodri-sec
   ```
7. **AI Usage Disclosure (`AIの利用に関する注意事項`)**: Paste the Japanese disclosure block from [`teamlab/application.md`](./application.md#L79-L91) (states clearly that AI via Crush was used for scaffolding/docs/tests, while you designed all concepts, math, shaders, audio, and hash verification).
8. **Exhibition Experience (`チームラボの展示を実際に見たことがありますか？`)**: Select **Yes (`はい`)** and paste the Japanese response from [`teamlab/application.md`](./application.md#L130-L143) referencing **teamLab Borderless (Azabudai Hills)** and **teamLab Planets (Toyosu)**.
9. **Consent (`同意事項`)**: Scroll to the bottom of the privacy box, check **「同意する」**, and click **Submit**.

---

## 4. ELI5: What Happens After You Apply? (The 3-Stage Process)

1. **Stage 1 — Portfolio & Document Screening (1–2 weeks)**:
   - Engineers on teamLab's Interactive Team open `https://teamlab.vaked.dev` and `lodri-resume.pdf`. Because your CV renders live procedural graphics and audio at 60fps in the browser, it immediately proves real-time competence.
2. **Stage 2 — Technical Interview / Practical Walkthrough (Online or Tokyo Office)**:
   - You screen-share `teamlab.vaked.dev`, `oscilloscope.vaked.dev` (`lissajoverse`), `viz.vaked.dev` (`enthea` 29-mode WebGL2 shader feedback), and `zeno.vaked.dev`, walking through how the frame loop, shader ping-pong buffers, and Web Audio synthesis work.
3. **Stage 3 — Final Culture & Catalyst Fit + Visa/Offer**:
   - Discuss working on-site in Tokyo (Azabudai / Ogawamachi headquarters), visa sponsorship (`Engineer / Specialist in Humanities` — EU passport `BJ3429501`, visa ref `LYYT5925161`), and start date.
