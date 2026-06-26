# Resend mail setup

## Huidige status

- De contact- en partnerformulieren posten naar `/api/contact`.
- `/api/contact` gebruikt de Resend REST API.
- Productie staat live op `https://goodness-for-all.vercel.app`.
- `CONTACT_TO=info@goodnessforall.nl` staat in Vercel production.
- `RESEND_FROM="Goodness for All <noreply@goodnessforall.nl>"` staat in Vercel production.
- `RESEND_API_KEY` staat in Vercel production en is opnieuw gedeployd.
- Laatste live test naar `/api/contact` gaf nog `502`, omdat Resend het afzenderdomein weigert.

## Exacte fout uit Vercel logs

```text
Resend mail failed 403 {
  statusCode: 403,
  message: 'The goodnessforall.nl domain is not verified. Please, add and verify your domain on https://resend.com/domains',
  name: 'validation_error'
}
```

## Wat nog moet gebeuren

Verifieer het afzenderdomein in Resend.

Optie A: root domein gebruiken

- Voeg in Resend `goodnessforall.nl` toe bij Domains.
- Voeg de DNS-records toe die Resend geeft.
- Klik in Resend op Verify.
- `RESEND_FROM` kan blijven:

```text
Goodness for All <noreply@goodnessforall.nl>
```

Optie B: mail subdomein gebruiken

- Voeg in Resend `mail.goodnessforall.nl` toe bij Domains.
- Voeg de DNS-records toe die Resend geeft.
- Klik in Resend op Verify.
- Pas daarna Vercel production env var aan naar:

```text
RESEND_FROM="Goodness for All <noreply@mail.goodnessforall.nl>"
```

Daarna opnieuw deployen:

```powershell
vercel deploy --prod --yes
```

## Test na domeinverificatie

Stuur een live test naar:

```text
https://goodness-for-all.vercel.app/api/contact
```

Voorbeeld PowerShell:

```powershell
$json = @'
{
  "kind": "contact",
  "naam": "Codex Test",
  "email": "test@example.com",
  "bericht": "Dit is een test van het Goodness for All contactformulier via Resend."
}
'@

$json | curl.exe -sS -i -X POST "https://goodness-for-all.vercel.app/api/contact" -H "Content-Type: application/json" --data-binary "@-"
```

Verwachte uitkomst:

```text
HTTP/1.1 200 OK
{"ok":true}
```

Daarna moet er een mail binnenkomen op:

```text
info@goodnessforall.nl
```
