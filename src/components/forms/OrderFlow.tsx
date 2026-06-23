"use client";

import { useState } from "react";

/**
 * Multi-step meal order form for buurthuizen — a faithful React port of the
 * original Stitch inline flow. Step indices match the original:
 *   0 welcome, 1 organisatie, 2 aantal, 3 leveringsbevestiging,
 *   4 ophaalbevestiging, 5 smakenkeuze, 6 smakenselectie, 7 opmerkingen,
 *   8 contactgegevens, 9 success, 10 rejection.
 * Submit is stubbed (see submitOrder) — no live endpoint shipped.
 */

const STEP_HEIGHT = 600;

const FLAVORS = [
  "Gnocchi",
  "Korean Noodles",
  "Pasta Pesto",
  "Lentil Curry",
  "Stamppot",
  "Burrito Bowl",
];

type FormData = {
  organisatie: string;
  aantalDoosjes: number;
  totaalMaaltijden: number;
  bevestigingType: string;
  bevestigingStatus: boolean | null;
  keuzeType: string;
  smaken: string[];
  opmerkingen: string;
  voornaam: string;
  achternaam: string;
  telefoon: string;
};

const INITIAL: FormData = {
  organisatie: "",
  aantalDoosjes: 0,
  totaalMaaltijden: 0,
  bevestigingType: "",
  bevestigingStatus: null,
  keuzeType: "",
  smaken: [],
  opmerkingen: "",
  voornaam: "",
  achternaam: "",
  telefoon: "",
};

export default function OrderFlow() {
  const [step, setStep] = useState(0);
  // History stack of visited steps (used only via the functional updater in prevStep).
  const [, setHistory] = useState<number[]>([0]);
  const [data, setData] = useState<FormData>(INITIAL);
  const [calcText, setCalcText] = useState("");
  const [rejectionText, setRejectionText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function goTo(index: number) {
    setHistory((h) => [...h, index]);
    setStep(index);
  }

  function nextStep() {
    goTo(step + 1);
  }

  function prevStep() {
    setHistory((h) => {
      if (h.length <= 1) return h;
      const next = h.slice(0, -1);
      setStep(next[next.length - 1]);
      return next;
    });
  }

  function handleSelect(value: string) {
    setData((d) => ({ ...d, organisatie: value }));
    if (value) goTo(2);
  }

  function calculateMaaltijden(val: string) {
    const n = parseInt(val, 10) || 0;
    if (n >= 5) {
      setCalcText(`Dat zijn ${n * 9} maaltijden.`);
      setData((d) => ({ ...d, aantalDoosjes: n, totaalMaaltijden: n * 9 }));
    } else {
      setCalcText("");
      setData((d) => ({ ...d, aantalDoosjes: n, totaalMaaltijden: 0 }));
    }
  }

  function checkAmountAndProceed() {
    if (data.aantalDoosjes < 5) {
      window.alert("Minimaal 5 doosjes vereist.");
      return;
    }
    goTo(data.aantalDoosjes <= 30 ? 3 : 4);
  }

  function handleConfirmation(type: string, confirmed: boolean) {
    setData((d) => ({ ...d, bevestigingType: type, bevestigingStatus: confirmed }));
    if (confirmed) {
      goTo(5);
    } else {
      setRejectionText(
        type === "levering"
          ? "Helaas kunnen we de maaltijden alleen leveren als er iemand aanwezig is. Neem contact op voor alternatieven."
          : "Vanwege de omvang van de bestelling is ophalen noodzakelijk. Neem contact op om de mogelijkheden te bespreken.",
      );
      goTo(10);
    }
  }

  function handleChoice(choice: string) {
    setData((d) => ({
      ...d,
      keuzeType: choice,
      smaken: choice === "mix" ? ["Mix"] : d.smaken,
    }));
    if (choice === "zelf") {
      goTo(6);
    } else {
      goTo(7);
    }
  }

  function toggleFlavor(flavor: string) {
    setData((d) => ({
      ...d,
      smaken: d.smaken.includes(flavor)
        ? d.smaken.filter((f) => f !== flavor)
        : [...d.smaken, flavor],
    }));
  }

  function submitOrder() {
    if (!data.voornaam || !data.achternaam || !data.telefoon) {
      window.alert("Vul alstublieft alle contactgegevens in.");
      return;
    }
    setSubmitting(true);
    // TODO: POST `data` to backend / Google Sheets endpoint.
    setTimeout(() => {
      setSubmitting(false);
      goTo(9);
    }, 1500);
  }

  function reset() {
    setData(INITIAL);
    setCalcText("");
    setRejectionText("");
    setHistory([0]);
    setStep(0);
  }

  const showNav = step !== 0 && step < 9;

  return (
    <div className="w-full">
      {/* Progress / back controls (between steps) */}
      <div
        className={`mb-8 ${showNav ? "flex" : "hidden"} items-center justify-between`}
      >
        <button
          type="button"
          onClick={prevStep}
          className="flex items-center gap-2 text-evergreen font-bold hover:opacity-70 transition-opacity"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Terug</span>
        </button>
        <div className="text-evergreen/60 font-bold tracking-widest text-sm uppercase">
          Vraag <span>{step}</span> van 8
        </div>
      </div>

      {/* Stepped viewport */}
      <div
        className="overflow-hidden border-2 border-evergreen bg-white shadow-xl"
        style={{ height: STEP_HEIGHT }}
      >
        <div
          className="flex flex-col"
          style={{
            transition: "transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)",
            transform: `translateY(-${step * STEP_HEIGHT}px)`,
          }}
        >
          {/* SCREEN 0: WELCOME */}
          <Screen>
            <div className="mb-6">
              <span className="material-symbols-outlined text-harvest-orange text-5xl">eco</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-evergreen leading-tight mb-4">
              Goed eten voor iedereen bereikbaar maken.
            </h2>
            <p className="text-body-md text-evergreen/80 mb-6">
              Dit bestelportaal is exclusief voor maatschappelijke organisaties. Nog geen account?{" "}
              <a className="text-harvest-orange underline font-bold" href="#">
                Registreer je hier
              </a>
              .
            </p>
            <button
              type="button"
              onClick={nextStep}
              className="bg-harvest-orange text-white font-cta font-extrabold py-4 px-8 inline-flex items-center gap-4 hover:bg-evergreen transition-colors w-fit"
            >
              Start <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </Screen>

          {/* Q1: ORGANISATIE */}
          <Screen>
            <label className="font-headline-md text-headline-md text-evergreen mb-6 block">
              Voor welke organisatie bestel je?
            </label>
            <div className="relative">
              <select
                className="w-full border-2 border-evergreen p-4 text-lg bg-white focus:outline-none appearance-none cursor-pointer"
                value={data.organisatie}
                onChange={(e) => handleSelect(e.target.value)}
              >
                <option disabled value="">
                  Kies een locatie...
                </option>
                <option value="Incluzio">Incluzio</option>
                <option value="SOL">SOL</option>
                <option value="DOCK">DOCK</option>
                <option value="WijZijn">WijZijn</option>
                <option value="Andere">Andere maatschappelijke partner</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                expand_more
              </span>
            </div>
          </Screen>

          {/* Q2: AANTAL DOOSJES */}
          <Screen>
            <label className="font-headline-md text-headline-md text-evergreen mb-2 block">
              Hoeveel doosjes wil je bestellen?
            </label>
            <p className="text-evergreen/60 mb-6 text-sm">Minimaal 5 doosjes per bestelling.</p>
            <input
              className="w-full border-2 border-evergreen p-4 text-3xl font-bold focus:outline-none mb-4"
              min={5}
              onChange={(e) => calculateMaaltijden(e.target.value)}
              placeholder="0"
              type="number"
            />
            <p className="text-xl font-bold text-harvest-orange h-8">{calcText}</p>
            <button
              type="button"
              onClick={checkAmountAndProceed}
              className="mt-4 bg-evergreen text-white font-cta font-bold py-4 px-8 w-fit hover:bg-harvest-orange transition-colors"
            >
              Volgende
            </button>
          </Screen>

          {/* Q3: LEVERINGSBEVESTIGING */}
          <Screen>
            <h2 className="font-headline-md text-headline-md text-evergreen mb-6">
              Kun je bevestigen dat er iemand aanwezig is op de leverlocatie op de gewenste dag?
            </h2>
            <YesNo
              onYes={() => handleConfirmation("levering", true)}
              onNo={() => handleConfirmation("levering", false)}
            />
          </Screen>

          {/* Q4: OPHAALBEVESTIGING */}
          <Screen>
            <h2 className="font-headline-md text-headline-md text-evergreen mb-6">
              Vanwege de grootte vragen we je dit op te halen bij ons depot. Akkoord?
            </h2>
            <YesNo
              onYes={() => handleConfirmation("ophaal", true)}
              onNo={() => handleConfirmation("ophaal", false)}
            />
          </Screen>

          {/* Q5: SMAKENKEUZE */}
          <Screen>
            <h2 className="font-headline-md text-headline-md text-evergreen mb-6">
              Zelf kiezen of een verrassingsmix?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleChoice("zelf")}
                className="bg-evergreen text-white font-bold py-6 text-xl hover:opacity-90"
              >
                Zelf kiezen
              </button>
              <button
                type="button"
                onClick={() => handleChoice("mix")}
                className="border-2 border-evergreen text-evergreen font-bold py-6 text-xl hover:bg-sandstone-beige"
              >
                Verrassingsmix
              </button>
            </div>
          </Screen>

          {/* Q6: SMAKENSELECTIE */}
          <Screen>
            <h2 className="font-headline-md text-headline-md text-evergreen mb-4">Kies je smaken</h2>
            <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
              {FLAVORS.map((flavor) => {
                const selected = data.smaken.includes(flavor);
                return (
                  <div
                    key={flavor}
                    onClick={() => toggleFlavor(flavor)}
                    className={`border-2 border-evergreen p-2 cursor-pointer font-bold text-center flex items-center justify-center h-16 transition-colors ${
                      selected ? "bg-evergreen text-white" : ""
                    }`}
                  >
                    {flavor}
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => goTo(7)}
              className="mt-6 bg-evergreen text-white font-cta font-bold py-4 px-8 w-fit hover:bg-harvest-orange transition-colors"
            >
              Volgende
            </button>
          </Screen>

          {/* Q7: OPMERKINGEN */}
          <Screen>
            <label className="font-headline-md text-headline-md text-evergreen mb-6 block">
              Opmerkingen of dieetwensen?
            </label>
            <textarea
              className="w-full border-2 border-evergreen p-4 text-lg focus:outline-none bg-white"
              placeholder="Bijv. 10x glutenvrij..."
              rows={3}
              value={data.opmerkingen}
              onChange={(e) => setData((d) => ({ ...d, opmerkingen: e.target.value }))}
            />
            <button
              type="button"
              onClick={() => goTo(8)}
              className="mt-6 bg-evergreen text-white font-cta font-bold py-4 px-8 w-fit hover:bg-harvest-orange transition-colors"
            >
              Volgende
            </button>
          </Screen>

          {/* Q8: CONTACTGEGEVENS */}
          <Screen>
            <h2 className="font-headline-md text-headline-md text-evergreen mb-6">Contactgegevens</h2>
            <div className="space-y-3">
              <input
                className="w-full border-2 border-evergreen p-3 text-lg focus:outline-none"
                placeholder="Voornaam"
                type="text"
                value={data.voornaam}
                onChange={(e) => setData((d) => ({ ...d, voornaam: e.target.value }))}
              />
              <input
                className="w-full border-2 border-evergreen p-3 text-lg focus:outline-none"
                placeholder="Achternaam"
                type="text"
                value={data.achternaam}
                onChange={(e) => setData((d) => ({ ...d, achternaam: e.target.value }))}
              />
              <input
                className="w-full border-2 border-evergreen p-3 text-lg focus:outline-none"
                pattern="[0-9]{10}"
                placeholder="Telefoonnummer"
                type="tel"
                value={data.telefoon}
                onChange={(e) => setData((d) => ({ ...d, telefoon: e.target.value }))}
              />
            </div>
            <button
              type="button"
              onClick={submitOrder}
              disabled={submitting}
              className="mt-6 bg-harvest-orange text-white font-cta font-extrabold py-4 px-8 w-full text-lg hover:bg-evergreen transition-colors flex items-center justify-center gap-4 disabled:opacity-70"
            >
              {submitting ? "BEZIG..." : "Versturen"}
              {!submitting && <span className="material-symbols-outlined">send</span>}
            </button>
          </Screen>

          {/* SUCCESS */}
          <Screen>
            <span className="material-symbols-outlined text-evergreen text-6xl mb-4">
              check_circle
            </span>
            <h2 className="font-headline-md text-headline-md text-evergreen mb-4">
              Bedankt voor je bestelling!
            </h2>
            <p className="text-body-md text-evergreen/80 mb-6">
              We nemen zo snel mogelijk contact op voor de definitieve bevestiging.
            </p>
            <button
              type="button"
              onClick={reset}
              className="bg-harvest-orange text-white font-bold py-4 px-8 w-fit"
            >
              Nieuwe bestelling
            </button>
          </Screen>

          {/* REJECTION */}
          <Screen>
            <span className="material-symbols-outlined text-evergreen text-6xl mb-4">info</span>
            <h2 className="font-headline-md text-headline-md text-evergreen mb-4">Helaas...</h2>
            <p className="text-body-md text-evergreen/80 mb-6">{rejectionText}</p>
            <button
              type="button"
              onClick={prevStep}
              className="bg-evergreen text-white font-bold py-4 px-8 w-fit"
            >
              Terug
            </button>
          </Screen>
        </div>
      </div>
    </div>
  );
}

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="w-full flex-shrink-0 flex flex-col justify-center p-8 max-w-[800px] mx-auto"
      style={{ height: STEP_HEIGHT }}
    >
      {children}
    </section>
  );
}

function YesNo({ onYes, onNo }: { onYes: () => void; onNo: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        onClick={onYes}
        className="bg-evergreen text-white font-bold py-6 text-xl hover:opacity-90"
      >
        Ja
      </button>
      <button
        type="button"
        onClick={onNo}
        className="border-2 border-evergreen text-evergreen font-bold py-6 text-xl hover:bg-sandstone-beige"
      >
        Nee
      </button>
    </div>
  );
}
