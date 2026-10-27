#!/usr/bin/env python3
"""Render tailored Resume, Portfolio, and Application PDFs for all 6 SOTA targets."""
import json
import os
import shutil
import subprocess
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.cidfonts import UnicodeCIDFont
from reportlab.platypus import (
    HRFlowable,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

pdfmetrics.registerFont(UnicodeCIDFont("HeiseiKakuGo-W5"))

ROOT = Path(__file__).resolve().parent.parent

# Load structured data from companies-data.mjs via node
DATA_JSON = subprocess.check_output(
    [
        "node",
        "-e",
        "import('./scripts/companies-data.mjs').then(m => console.log(JSON.stringify(m)))",
    ],
    cwd=str(ROOT),
    text=True,
)
DATA = json.loads(DATA_JSON)
APPLICANT = DATA["APPLICANT"]
EDUCATION = DATA["EDUCATION"]
EXPERIENCE = DATA["EXPERIENCE"]
COMPANIES = DATA["COMPANIES"]


def esc(text: str) -> str:
    return (
        str(text)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def make_styles(accent_hex: str):
    styles = getSampleStyleSheet()
    accent = colors.HexColor(accent_hex)
    ink = colors.HexColor("#111625")
    dim = colors.HexColor("#3b4259")

    s_kicker = ParagraphStyle(
        "Kicker",
        parent=styles["Normal"],
        fontName="HeiseiKakuGo-W5",
        fontSize=8.5,
        leading=12,
        textColor=accent,
        spaceAfter=2 * mm,
    )
    s_title = ParagraphStyle(
        "TitleMain",
        parent=styles["Normal"],
        fontName="HeiseiKakuGo-W5",
        fontSize=20,
        leading=25,
        textColor=ink,
        spaceAfter=1.5 * mm,
    )
    s_sub = ParagraphStyle(
        "Sub",
        parent=styles["Normal"],
        fontName="HeiseiKakuGo-W5",
        fontSize=9.2,
        leading=13.5,
        textColor=dim,
        spaceAfter=3 * mm,
    )
    s_h2 = ParagraphStyle(
        "H2",
        parent=styles["Normal"],
        fontName="HeiseiKakuGo-W5",
        fontSize=12,
        leading=16,
        textColor=accent,
        spaceBefore=4 * mm,
        spaceAfter=2 * mm,
    )
    s_body = ParagraphStyle(
        "Body",
        parent=styles["Normal"],
        fontName="HeiseiKakuGo-W5",
        fontSize=9.2,
        leading=14,
        textColor=ink,
        spaceAfter=2 * mm,
    )
    s_small = ParagraphStyle(
        "Small",
        parent=styles["Normal"],
        fontName="HeiseiKakuGo-W5",
        fontSize=8.2,
        leading=12,
        textColor=dim,
        spaceAfter=1.5 * mm,
    )
    return {
        "kicker": s_kicker,
        "title": s_title,
        "sub": s_sub,
        "h2": s_h2,
        "body": s_body,
        "small": s_small,
        "accent": accent,
    }


def build_resume_pdf(c: dict, out_path: Path):
    st = make_styles(c["theme"]["accent"])
    doc = SimpleDocTemplate(
        str(out_path),
        pagesize=A4,
        leftMargin=14 * mm,
        rightMargin=14 * mm,
        topMargin=13 * mm,
        bottomMargin=13 * mm,
        title=f"{APPLICANT['name']} — Resume / 履歴書 ({c['company']})",
        author=APPLICANT["name"],
    )
    story = []
    story.append(
        Paragraph(
            f"履歴書 ・ 職務経歴書 · CURRICULUM VITAE · TAILORED FOR {esc(c['company'])}",
            st["kicker"],
        )
    )
    story.append(
        Paragraph(
            f"{esc(APPLICANT['name'])} ({esc(APPLICANT['kana'])})",
            st["title"],
        )
    )
    story.append(
        Paragraph(
            f"Target Role: {esc(c['role'])} ({esc(c['comp'])}) · Location: {esc(c['location'])}<br/>"
            f"Dedicated Site: https://{esc(c['subdomain'])} · LinkedIn: {esc(APPLICANT['linkedin'])}<br/>"
            f"Email: {esc(APPLICANT['emailPrimary'])} · Phone: {esc(APPLICANT['phone'])} · "
            f"Passport: {esc(APPLICANT['passportName'])} ({esc(APPLICANT['passportNo'])}) · Visa Ref: {esc(APPLICANT['visaRef'])}",
            st["sub"],
        )
    )
    story.append(HRFlowable(width="100%", thickness=0.8, color=st["accent"]))

    # Education
    story.append(Paragraph("01. EDUCATION / 学歴（高校以降すべて）", st["h2"]))
    edu_rows = []
    for e in EDUCATION:
        edu_rows.append(
            [
                Paragraph(esc(e["period"]), st["small"]),
                Paragraph(
                    f"<b>{esc(e['role'])}</b> — {esc(e['org'])}<br/>{esc(e['note'])}",
                    st["body"],
                ),
            ]
        )
    t_edu = Table(edu_rows, colWidths=[36 * mm, 144 * mm])
    t_edu.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LINEBELOW", (0, 0), (-1, -1), 0.3, colors.HexColor("#d8deeb")),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    story.append(t_edu)

    # Experience
    story.append(
        Paragraph(
            "02. PROFESSIONAL EXPERIENCE & OPEN-SOURCE ARCHITECTURE / 職務経歴書",
            st["h2"],
        )
    )
    exp_rows = []
    for x in EXPERIENCE:
        exp_rows.append(
            [
                Paragraph(esc(x["period"]), st["small"]),
                Paragraph(
                    f"<b>{esc(x['role'])}</b> — {esc(x['org'])}<br/>"
                    f"{esc(x['note'])}<br/>"
                    f"<i>Stack: {esc(x['tech'])}</i>",
                    st["body"],
                ),
            ]
        )
    t_exp = Table(exp_rows, colWidths=[36 * mm, 144 * mm])
    t_exp.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LINEBELOW", (0, 0), (-1, -1), 0.3, colors.HexColor("#d8deeb")),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    story.append(t_exp)

    # Why Company
    story.append(Paragraph(f"03. WHY {esc(c['company'])} / 志望動機", st["h2"]))
    story.append(Paragraph(esc(c["whyEn"]), st["body"]))
    story.append(Paragraph(esc(c["whyJa"]), st["body"]))

    # Links & LinkedIn
    story.append(
        Paragraph(
            "04. VERIFIED LINKS, OSS ARCHITECT CREDITS & LINKEDIN NETWORK",
            st["h2"],
        )
    )
    story.append(
        Paragraph(
            f"• Dedicated Interactive Subdomain: https://{esc(c['subdomain'])}<br/>"
            f"• Master Career Command Center: https://apply.vaked.dev<br/>"
            f"• Applicant LinkedIn: {esc(APPLICANT['linkedin'])}<br/>"
            f"• GitHub & OSS Architecture: https://github.com/peterlodri-sec · https://github.com/8b-is · "
            f"https://github.com/osaurus-ai/osaurus · https://github.com/simplifaisoul/osiris · "
            f"https://github.com/headroomlabs-ai/headroom/pull/1418<br/>"
            f"• Company LinkedIn: {esc(c['linkedinInfo']['companyUrl'])} · Portal: {esc(c['portalUrl'])}",
            st["body"],
        )
    )
    doc.build(story)


def build_portfolio_pdf(c: dict, out_path: Path):
    st = make_styles(c["theme"]["accent"])
    doc = SimpleDocTemplate(
        str(out_path),
        pagesize=A4,
        leftMargin=14 * mm,
        rightMargin=14 * mm,
        topMargin=13 * mm,
        bottomMargin=13 * mm,
        title=f"{APPLICANT['name']} — Engineering Portfolio ({c['company']})",
        author=APPLICANT["name"],
    )
    story = []
    story.append(
        Paragraph(
            f"SELECTED ARCHITECTURE & ENGINEERING PORTFOLIO · {esc(c['company'])}",
            st["kicker"],
        )
    )
    story.append(Paragraph(esc(APPLICANT["name"]), st["title"]))
    story.append(
        Paragraph(
            f"{esc(c['role'])} — {esc(c['heroRole'])}<br/>"
            f"Live Interactive Showcase: https://{esc(c['subdomain'])} · LinkedIn: {esc(APPLICANT['linkedin'])}",
            st["sub"],
        )
    )
    story.append(HRFlowable(width="100%", thickness=0.8, color=st["accent"]))

    story.append(
        Paragraph(
            f"01. SELECTED SYSTEMS & INTERACTIVE WORKS FOR {esc(c['company'])}",
            st["h2"],
        )
    )
    for w in c["works"]:
        story.append(
            Paragraph(
                f"<b>{esc(w['title'])}</b> [{esc(w['tag'])}] — {esc(w['url'])}<br/>"
                f"{esc(w['desc'])}",
                st["body"],
            )
        )
        story.append(Spacer(1, 1.5 * mm))

    story.append(
        Paragraph("02. ALIGNMENT WITH YOUR ENGINEERING ROADMAP / 志望動機", st["h2"])
    )
    story.append(Paragraph(esc(c["whyEn"]), st["body"]))
    story.append(Paragraph(esc(c["whyJa"]), st["body"]))

    story.append(
        Paragraph("03. DIRECT LINKS & LINKEDIN CONTACTS", st["h2"])
    )
    for ct in c["linkedinInfo"]["contacts"]:
        story.append(
            Paragraph(
                f"• <b>{esc(ct['name'])}</b> ({esc(ct['title'])}): {esc(ct['url'])} — {esc(ct['note'])}",
                st["small"],
            )
        )
    doc.build(story)


def build_application_pdf(c: dict, out_path: Path):
    st = make_styles(c["theme"]["accent"])
    doc = SimpleDocTemplate(
        str(out_path),
        pagesize=A4,
        leftMargin=14 * mm,
        rightMargin=14 * mm,
        topMargin=13 * mm,
        bottomMargin=13 * mm,
        title=f"{APPLICANT['name']} — Full Application Dossier ({c['company']})",
        author=APPLICANT["name"],
    )
    story = []
    story.append(
        Paragraph(
            f"COMPLETE E2E APPLICATION DOSSIER, ELI5 & LINKEDIN KIT · {esc(c['company'])}",
            st["kicker"],
        )
    )
    story.append(
        Paragraph(
            f"{esc(APPLICANT['name'])} → {esc(c['company'])}",
            st["title"],
        )
    )
    story.append(
        Paragraph(
            f"Role: {esc(c['role'])} · Comp: {esc(c['comp'])} · Location: {esc(c['location'])}<br/>"
            f"Dedicated Subdomain: https://{esc(c['subdomain'])} · Portal: {esc(c['portalUrl'])} ({esc(c['portalEmail'])})",
            st["sub"],
        )
    )
    story.append(HRFlowable(width="100%", thickness=0.8, color=st["accent"]))

    story.append(
        Paragraph("01. COVER LETTER & OUTREACH MESSAGE (INMAIL / EMAIL)", st["h2"])
    )
    for para in c["linkedinInfo"]["inmailBody"].split("\n\n"):
        story.append(
            Paragraph(esc(para).replace("\n", "<br/>"), st["body"])
        )

    story.append(
        Paragraph("02. 1-CLICK LINKEDIN CONNECTION NOTE (< 300 CHARS)", st["h2"])
    )
    story.append(Paragraph(esc(c["linkedinInfo"]["connectionNote"]), st["body"]))

    story.append(
        Paragraph("03. LINKEDIN COMPANY & LEADERSHIP CONTACTS", st["h2"])
    )
    story.append(
        Paragraph(
            f"• Company LinkedIn: {esc(c['linkedinInfo']['companyUrl'])}<br/>"
            f"• Company Jobs: {esc(c['linkedinInfo']['jobsUrl'])}<br/>"
            f"• Company People: {esc(c['linkedinInfo']['peopleUrl'])}<br/>"
            f"• Recruiter Search: {esc(c['linkedinInfo']['recruiterSearchUrl'])}",
            st["body"],
        )
    )
    for ct in c["linkedinInfo"]["contacts"]:
        story.append(
            Paragraph(
                f"• <b>{esc(ct['name'])}</b> ({esc(ct['title'])}): {esc(ct['url'])}<br/>  {esc(ct['note'])}",
                st["small"],
            )
        )

    story.append(Paragraph("04. BILINGUAL MOTIVATION / 志望動機", st["h2"]))
    story.append(Paragraph(esc(c["whyEn"]), st["body"]))
    story.append(Paragraph(esc(c["whyJa"]), st["body"]))
    doc.build(story)


def main():
    resumes_dir = ROOT / "resumes"
    resumes_dir.mkdir(parents=True, exist_ok=True)
    orig_teamlab = ROOT.parent / "teamlab.vaked.dev"
    for c in COMPANIES:
        slug = c["slug"]
        c_dir = ROOT / slug
        c_dir.mkdir(parents=True, exist_ok=True)

        r_pdf = c_dir / "lodri-resume.pdf"
        p_pdf = c_dir / "lodri-portfolio.pdf"
        a_pdf = c_dir / "lodri-application.pdf"

        if slug == "teamlab" and (orig_teamlab / "lodri-resume.pdf").exists():
            shutil.copy2(orig_teamlab / "lodri-resume.pdf", r_pdf)
            shutil.copy2(orig_teamlab / "lodri-portfolio.pdf", p_pdf)
            shutil.copy2(orig_teamlab / "lodri-teamlab-application.pdf", a_pdf)
            shutil.copy2(
                orig_teamlab / "lodri-teamlab-application.pdf",
                c_dir / "lodri-teamlab-application.pdf",
            )
        else:
            build_resume_pdf(c, r_pdf)
            build_portfolio_pdf(c, p_pdf)
            build_application_pdf(c, a_pdf)

        shutil.copy2(r_pdf, resumes_dir / f"lodri-resume-{slug}.pdf")
        shutil.copy2(p_pdf, resumes_dir / f"lodri-portfolio-{slug}.pdf")
        shutil.copy2(a_pdf, resumes_dir / f"lodri-application-{slug}.pdf")
        print(
            f"[{slug}] Ready {r_pdf.name} ({r_pdf.stat().st_size} B), "
            f"{p_pdf.name} ({p_pdf.stat().st_size} B), "
            f"{a_pdf.name} ({a_pdf.stat().st_size} B)"
        )


if __name__ == "__main__":
    main()
