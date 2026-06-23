# Goodness for All CMS

De CMS staat op:

- Productie: https://goodness-mu.vercel.app/admin
- Lokale dev server: http://localhost:3002/admin wanneer `next dev` daar draait

De content staat in `content/site.json`. Sveltia CMS schrijft wijzigingen als commits naar:

- Repository: `Pimmetjeoss/goodness-for-all`
- Branch: `master`

Afbeeldingen die via de CMS worden geupload komen in `public/images/uploads` en zijn op de site bereikbaar als `/images/uploads/...`.

## Toegang voor klant

Geef de klant een GitHub-account met schrijfrechten op `Pimmetjeoss/goodness-for-all`. Daarna kan de klant via `/admin` inloggen en wijzigingen publiceren. Elke publicatie maakt een commit naar `master`; Vercel bouwt daarna opnieuw.

## Vercel GitHub-koppeling

De site is als Vercel-project gekoppeld aan `pimmetjes-projects/goodness`, maar als `vercel git connect --scope pimmetjes-projects` meldt dat de repo niet gekoppeld kan worden, mist de Vercel GitHub App toegang tot de private repository. Los dit op in GitHub/Vercel door de Vercel GitHub App toegang te geven tot `Pimmetjeoss/goodness-for-all` voor de account/organisatie die bij `pimmetjes-projects` hoort. Tot die koppeling werkt, kun je productie nog steeds handmatig deployen met:

```bash
vercel deploy --prod --scope pimmetjes-projects
```

## Wat is bewerkbaar

Via `content/site.json` zijn onder andere bewerkbaar:

- algemene instellingen, logo, navigatie en footer
- homepage hero, kaarten, teller, quote en partnerstrip
- partnerpagina hero, pakketten, vrieskastblok, uploadbare logo's en formuliercopy
- impact teller, locaties, quote, galerij en onderzoeksblok
- contactpagina, nieuwsbriefblok en contactformulier
- werken-bij pagina, vacatures, cultuurblokken en quote
- buurthuizenpagina en volledige bestelflow-copy
- ANBI-kaarten, CTA en download/contactlinks
- ons-verhaal teksten, beelden, carousel en teamleden
