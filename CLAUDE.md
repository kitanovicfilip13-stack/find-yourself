# Pronađi Sebe — Project Context

## Šta sajt radi
Platforma za lični razvoj mladih. Korisnik bira segment (srednja škola, fakultet ili posao/karijera), odgovara na 20 pitanja o ličnosti, interesovanjima i vrednostima, i dobija personalizovani profil. Zavisno od segmenta dobija: preporuku škole/fakulteta ili karijernog pravca, 7-dnevni plan razvoja, preporuke knjiga i podkasta. Rezultati se čuvaju na korisničkom profilu.

## Stack
- React 18 + Vite
- Tailwind CSS (sve stilove pišemo u Tailwindu, bez CSS fajlova)
- Supabase — auth (email/password) + tabela `results` za čuvanje rezultata
- Vercel — auto-deploy sa GitHub `main` brancha
- Framer Motion — scroll animacije
- Lenis — smooth scroll

## Supabase tabele
- `auth.users` — Supabase auth
- `public.results` — id, user_id, segment, city, answers (JSONB), result_label, created_at

## Struktura projekta
```
src/
  components/
    Auth/          — AuthModal
    Dashboard/     — Dashboard (sidebar, tabovi: profil, rezultati, plan razvoja, preporuke, podešavanja)
    Landing/       — LandingPage, Hero, Problem, HowItWorks, WhatYouGet, Testimonials, FAQ, FinalCTA
    Onboarding/    — SegmentSelector, CitySelector, OnboardingTest
    Results/       — ResultPage (posao), SegmentResultPage (srednja/fakultet)
    shared/        — Navbar, Footer, ScrollReveal
  i18n/
    translations.js    — SR/EN tekstovi
    questions.js       — pitanja za sve 3 segmente
    scoring.js         — scoring za posao segment
    segmentScoring.js  — scoring za srednja/fakultet
    schoolsDB.js       — baza škola/fakulteta po gradovima u Srbiji
    recommendations.js — knjige i podkasti po tipu ličnosti
    keywordScoring.js  — slobodan unos teksta
  hooks/
    useLenis.js
  App.jsx          — routing (landing | segment-select | city-select | onboarding | results | dashboard)
  AuthContext.jsx
  LanguageContext.jsx
  supabase.js
```

## Segmenti
- `posao` — 20 pitanja, scoring u 6 dimenzija (C/T/P/B/O/N), daje tip ličnosti + karijere
- `srednja` — 20 pitanja, scoring u TECH/MED/ART/SOC/SCI/ECO, daje top 5 škola po gradu
- `fakultet` — 20 pitanja, scoring u TECH/MED/ECO/LAW/SOC/ART/SCI, daje top 5 fakulteta po gradu

## Pravila
- Bez TypeScript — čisti JSX
- Bez komentara u kodu osim ako nije nužno
- Tailwind za sve stilove
- UI tekstovi na srpskom, kod (varijable, funkcije) na engleskom
- Git commit + push posle svake promene
- Default jezik: srpski (sr)
- Deployment: GitHub → Vercel automatski

## Lokalni podaci (localStorage)
- `fy_results` — `{ answers, segment, city, savedAt, userId }`
- `fy_progress` — `{ current, answers, segment, city }`
- `fy_checked` — `{ [itemId]: true/false }` za čekirane preporuke
