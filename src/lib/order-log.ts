import "server-only";

import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const CSV_HEADERS = [
  "ingediend_op",
  "vraag_1_organisatie",
  "vraag_2_aantal_doosjes",
  "vraag_2_totaal_maaltijden",
  "vraag_3_4_bevestiging_type",
  "vraag_3_4_bevestiging_antwoord",
  "vraag_5_keuze_type",
  "vraag_6_smaken",
  "vraag_7_opmerkingen",
  "vraag_8_voornaam",
  "vraag_8_achternaam",
  "vraag_8_telefoon",
  "bron",
] as const;

type CsvHeader = (typeof CSV_HEADERS)[number];

export type OrderSubmission = {
  organisatie: string;
  aantalDoosjes: number;
  totaalMaaltijden: number;
  bevestigingType: string;
  bevestigingStatus: boolean;
  keuzeType: string;
  smaken: string[];
  opmerkingen: string;
  voornaam: string;
  achternaam: string;
  telefoon: string;
  source?: string;
};

type OrderLogRow = Record<CsvHeader, string | number>;

type GithubContentResponse = {
  content?: string;
  encoding?: string;
  sha?: string;
};

function requiredString(value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${field} ontbreekt.`);
  }

  return value.trim();
}

function optionalString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function requiredNumber(value: unknown, field: string): number {
  const numberValue = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(numberValue) || numberValue <= 0) {
    throw new Error(`${field} is ongeldig.`);
  }

  return numberValue;
}

export function parseOrderSubmission(payload: unknown): OrderSubmission {
  if (!payload || typeof payload !== "object") {
    throw new Error("Geen formulierdata ontvangen.");
  }

  const record = payload as Record<string, unknown>;
  const smaken = Array.isArray(record.smaken)
    ? record.smaken.filter((flavor): flavor is string => typeof flavor === "string")
    : [];
  const bevestigingStatus = record.bevestigingStatus;

  if (typeof bevestigingStatus !== "boolean") {
    throw new Error("Bevestiging ontbreekt.");
  }

  return {
    organisatie: requiredString(record.organisatie, "Organisatie"),
    aantalDoosjes: requiredNumber(record.aantalDoosjes, "Aantal doosjes"),
    totaalMaaltijden: requiredNumber(record.totaalMaaltijden, "Totaal maaltijden"),
    bevestigingType: requiredString(record.bevestigingType, "Bevestigingstype"),
    bevestigingStatus,
    keuzeType: requiredString(record.keuzeType, "Keuzetype"),
    smaken,
    opmerkingen: optionalString(record.opmerkingen),
    voornaam: requiredString(record.voornaam, "Voornaam"),
    achternaam: requiredString(record.achternaam, "Achternaam"),
    telefoon: requiredString(record.telefoon, "Telefoon"),
    source: optionalString(record.source),
  };
}

function toCsvValue(value: string | number): string {
  const text = String(value);

  if (!/[",\n\r]/.test(text)) return text;

  return `"${text.replaceAll('"', '""')}"`;
}

function toCsvLine(row: OrderLogRow): string {
  return CSV_HEADERS.map((header) => toCsvValue(row[header])).join(",");
}

function toOrderRow(order: OrderSubmission): OrderLogRow {
  return {
    ingediend_op: new Date().toISOString(),
    vraag_1_organisatie: order.organisatie,
    vraag_2_aantal_doosjes: order.aantalDoosjes,
    vraag_2_totaal_maaltijden: order.totaalMaaltijden,
    vraag_3_4_bevestiging_type: order.bevestigingType,
    vraag_3_4_bevestiging_antwoord: order.bevestigingStatus ? "ja" : "nee",
    vraag_5_keuze_type: order.keuzeType,
    vraag_6_smaken: order.smaken.join(" | "),
    vraag_7_opmerkingen: order.opmerkingen,
    vraag_8_voornaam: order.voornaam,
    vraag_8_achternaam: order.achternaam,
    vraag_8_telefoon: order.telefoon,
    bron: order.source ?? "",
  };
}

async function appendLocalCsv(line: string): Promise<string> {
  const filePath = path.join(process.cwd(), "content", "buurthuis-bestellingen.csv");

  await mkdir(path.dirname(filePath), { recursive: true });

  try {
    await readFile(filePath, "utf8");
  } catch {
    await writeFile(filePath, `${CSV_HEADERS.join(",")}\n`, "utf8");
  }

  await appendFile(filePath, `${line}\n`, "utf8");

  return filePath;
}

function getEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

async function appendGithubCsv(line: string, attempt = 1): Promise<string> {
  const token = getEnv("ORDER_LOG_GITHUB_TOKEN");

  if (!token) {
    throw new Error("ORDER_LOG_GITHUB_TOKEN ontbreekt.");
  }

  const repo = getEnv("ORDER_LOG_GITHUB_REPO") ?? "Pimmetjeoss/goodness-for-all";
  const branch = getEnv("ORDER_LOG_GITHUB_BRANCH") ?? "master";
  const filePath = getEnv("ORDER_LOG_GITHUB_PATH") ?? "content/buurthuis-bestellingen.csv";
  const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const current = await fetch(`${url}?ref=${encodeURIComponent(branch)}`, { headers });
  let existing = "";
  let sha: string | undefined;

  if (current.ok) {
    const payload = (await current.json()) as GithubContentResponse;
    sha = payload.sha;

    if (payload.content && payload.encoding === "base64") {
      existing = Buffer.from(payload.content, "base64").toString("utf8");
    }
  } else if (current.status !== 404) {
    throw new Error(`GitHub kon het logbestand niet lezen (${current.status}).`);
  }

  const prefix = existing.trim() ? existing.replace(/\s*$/, "\n") : `${CSV_HEADERS.join(",")}\n`;
  const content = Buffer.from(`${prefix}${line}\n`, "utf8").toString("base64");
  const update = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      branch,
      content,
      message: "Log buurthuis bestelling",
      sha,
    }),
  });

  if (update.status === 409 && attempt < 3) {
    return appendGithubCsv(line, attempt + 1);
  }

  if (!update.ok) {
    throw new Error(`GitHub kon het logbestand niet bijwerken (${update.status}).`);
  }

  return `${repo}/${filePath}`;
}

export async function logOrderSubmission(order: OrderSubmission): Promise<{
  location: string;
  row: OrderLogRow;
}> {
  const row = toOrderRow(order);
  const line = toCsvLine(row);
  const location =
    process.env.NODE_ENV === "production" || getEnv("ORDER_LOG_GITHUB_TOKEN")
      ? await appendGithubCsv(line)
      : await appendLocalCsv(line);

  console.info("Buurthuis bestelling gelogd", row);

  return { location, row };
}
