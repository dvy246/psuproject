# AdSense Readiness Audit — PSUCheck

**Date:** July 14, 2026
**Auditor:** Automated Policy & E-E-A-T Review
**Status:** READY AFTER MINOR FIXES

---

## 1. Executive Summary

PSUCheck is a well-constructed, technically sound static site with strong content quality on core calculator tools and guides. The site has solid technical SEO foundations (Astro SSG, sitemap, schema.org markup, fast page loads). However, three verified issues prevent immediate AdSense application: a non-functional contact form, missing dedicated Disclaimer page, and missing Editorial Policy page. Once these are resolved, the site is ready.

---

## 2. Overall AdSense Readiness Score

| Category | Score | Notes |
|---|---|---|
| **Overall Readiness** | **75/100** | 3 blocking items, no structural problems |
| **E-E-A-T** | **65/100** | Strong methodology docs, no named individuals (intentional), team-based credibility |
| **Content Quality** | **80/100** | Excellent tools and guides; programmatic pages at risk of thin-content flag |
| **Trust & Transparency** | **55/100** | Broken contact form drags this down |
| **Technical Quality** | **90/100** | Static generation, proper SEO, schema, fast load |
| **User Experience** | **85/100** | Dark theme, good nav, accessible markup |

---

## 3. Verified Issues

### 3.1 BLOCKING — Contact Form Non-Functional

- **Source:** `src/pages/contact.astro:82`
- **Evidence:** Form action is `https://formspree.io/f/placeholder` — the literal string "placeholder" means no real Formspree project is configured. Form submissions return an error.
- **Why it blocks:** Google AdSense requires a working contact mechanism. Reviewers test the contact form. A broken form signals low operational maturity.
- **Fix:** Replace Formspree endpoint with a real one OR implement a Cloudflare Pages Function to handle submissions. Also remove hardcoded personal email from client-side JS (`contact.astro:258-263`).
- **Auto-fix possible:** Yes — already done.

### 3.2 BLOCKING — No Dedicated Disclaimer Page

- **Source:** No `disclaimer.astro` or equivalent exists in `src/pages/`
- **Evidence:** Affiliate disclosure is present but buried inside Terms of Service (§5) and Privacy Policy (§3). AdSense expects prominent, upfront affiliate and liability disclaimers.
- **Why it blocks:** Google AdSense program policies require clear disclosure of affiliate relationships and limitation of liability. A dedicated page ensures prominence.
- **Fix:** Create `/disclaimer` page covering: affiliate relationships (Amazon Associates, Newegg Affiliate Program), accuracy limitations (pricing estimates, transient modeling), liability disclaimer, and non-endorsement statement.
- **Auto-fix possible:** Yes — already done.

### 3.3 BLOCKING — No Editorial Policy Page

- **Source:** No page documenting editorial standards or correction procedures
- **Evidence:** Methodology page details calculation formulas. About page describes independence. But there is no documented editorial policy covering content review, data correction, update frequency, or fact-checking process.
- **Why it blocks:** E-E-A-T requirements for monetized tool sites increasingly expect transparent editorial standards. AdSense manual reviewers check this.
- **Fix:** Create `/editorial-policy` page covering: data sourcing standards, correction process (48-hour commitment already stated on About page), update frequency schedule, and team oversight.
- **Auto-fix possible:** Yes — already done.

### 3.4 HIGH — Programmatic Page Thin Content Risk

- **Source:** `src/pages/oracle/[slug].astro`, `src/pages/psu-replacement/[slug].astro`, `src/pages/psu-for/[slug].astro`
- **Evidence:** Sitemap shows 3,135 pages. ~1,370 oracle verdict pages, ~472 PSU replacement pages, ~318 PSU matchmaker pages. All share dynamic templates with computed data but similar structural layouts.
- **Why it matters:** Google's helpful content system may flag auto-generated content at scale. AdSense manual reviews sample-programmatic pages.
- **Mitigation:** Each page already has unique computed data (transient peaks, per-rail currents, health scores, degradation timelines) plus dynamic context-aware related guides and PSU recommendations. This is good but can be strengthened.
- **Recommended fix:** Add 1-2 paragraphs of GPU/CPU-specific narrative text per page template.
- **Auto-fix possible:** Partial — template-level injection of contextual paragraphs.

### 3.5 MEDIUM — No Cookie Consent Banner

- **Source:** Privacy Policy §2.4 (Google AdSense cookies) and §4 (localStorage theme preference)
- **Evidence:** Privacy Policy correctly documents AdSense cookie usage, but there is no cookie consent banner implementation.
- **Why it matters:** GDPR/ePrivacy directive requires consent before AdSense tracking cookies for EU visitors. AdSense TOS requires compliance with applicable privacy laws.
- **Fix:** Implement a lightweight cookie consent banner.
- **Auto-fix possible:** Yes — Preact component can be added.

### 3.6 MEDIUM — Uniform lastmod Dates in Sitemap

- **Source:** `dist/sitemap-0.xml`
- **Evidence:** All 3,135 URLs share the identical `<lastmod>` value (`2026-07-14T08:15:00.919Z`).
- **Why it matters:** Uniform lastmod dates signal auto-generation to Google. Differentiated dates help Google understand content freshness.
- **Fix:** Configure per-page lastmod metadata or omit lastmod for programmatic pages.
- **Auto-fix possible:** Partial.

### 3.7 MEDIUM — Empty /blog/ Directory

- **Source:** `src/pages/blog/` is an empty directory
- **Evidence:** No files exist inside the blog directory. If linked, it produces a broken/empty page.
- **Why it matters:** Empty or broken pages create poor user experience signals.
- **Fix:** Remove the empty directory or create redirect.
- **Auto-fix possible:** Yes.

### 3.8 LOW — Missing Visible "Last Updated" on Some Pages

- **Source:** Several guide pages and all oracle/comparison pages lack visible last-updated dates
- **Evidence:** Privacy Policy and Terms show dates. Guides library index shows dates. But individual oracle and replacement verdict pages do not.
- **Why it matters:** Content freshness is an E-E-A-T signal.
- **Fix:** Add last-updated metadata display consistently across all pages.
- **Auto-fix possible:** Yes.

---

## 4. Quick Wins (Completed / <30 min each)

| # | Fix | Time | Status |
|---|---|---|---|
| 1 | Replace Formspree placeholder with CF Pages Function | ~20 min | Done |
| 2 | Remove hardcoded email from client-side JS | ~2 min | Done |
| 3 | Create `/disclaimer` page | ~15 min | Done |
| 4 | Create `/editorial-policy` page | ~15 min | Done |
| 5 | Remove empty `/blog/` directory | ~1 min | Done |

---

## 5. Final AdSense Approval Assessment

**READY AFTER MINOR FIXES**

PSUCheck has strong technical foundations, original content, and transparent methodology documentation. After applying the verified fixes listed above (3 blocking items resolved), the site meets AdSense quality standards. The programmatic page volume (3,135) is a monitoring item — continue adding unique narrative context to templates over time.

**Recommended application timing:** Immediately after applying all blocking and high-priority fixes.
