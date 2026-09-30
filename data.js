// Inhalte und Auswertung des Adler-Selbsttests.
// Läuft im Browser (window.ADLER) und in Node (module.exports) für Tests.
(function (root) {
  // ---------- Teil A: Lebensstil (Skala 1–5) ----------
  // dim: "A" = Aktivität, "G" = Gemeinschaftsgefühl; rev: umgekehrt gepolt
  const partA = [
    { id: "a1", dim: "A", rev: false, text: "Wenn in einer Gruppe keiner anfängt, fange ich an." },
    { id: "g1", dim: "G", rev: false, text: "Wenn jemand in der Klasse Hilfe braucht, biete ich sie an – auch wenn ich selbst nichts davon habe." },
    { id: "a2", dim: "A", rev: false, text: "Probleme packe ich lieber sofort an, statt abzuwarten, ob sie sich von selbst lösen." },
    { id: "g2", dim: "G", rev: true,  text: "Bei Gruppenarbeiten ist mir vor allem wichtig, dass ich selbst gut dastehe." },
    { id: "a3", dim: "A", rev: true,  text: "Bei schwierigen Aufgaben schiebe ich den Anfang oft lange hinaus." },
    { id: "g3", dim: "G", rev: false, text: "Ich freue mich ehrlich, wenn andere Erfolg haben – auch wenn ich selbst gerade keinen habe." },
    { id: "a4", dim: "A", rev: false, text: "Ich setze mir Ziele und bleibe dran, auch wenn es mühsam wird." },
    { id: "g4", dim: "G", rev: false, text: "Ich frage mich oft, was ich zu einer Gruppe beitragen kann – nicht nur, was ich von ihr bekomme." }
  ];
  const likertLabels = ["Trifft gar nicht zu", "Trifft eher nicht zu", "Teils, teils", "Trifft eher zu", "Trifft voll zu"];

  // ---------- Bonus: Geschwisterposition ----------
  const birth = {
    question: "Bonusfrage: Welche Position hast du unter deinen Geschwistern?",
    options: [
      { id: "aeltestes", text: "Ältestes Kind",
        result: "Als Ältestes warst du laut Adler erst Einzelkind und wurdest dann „entthront“. Erstgeborene übernehmen deshalb oft früh Verantwortung, mögen Ordnung und führen gern." },
      { id: "mittleres", text: "Mittleres Kind",
        result: "Als Mittleres Kind hast du laut Adler immer jemanden vor dir, den du einholen willst. Mittlere Kinder gelten bei ihm als ehrgeizig, anpassungsfähig und gute Vermittler." },
      { id: "juengstes", text: "Jüngstes Kind",
        result: "Als Jüngstes wirst du laut Adler nie entthront. Jüngste gelten bei ihm als charmant, kreativ und ehrgeizig – manchmal aber auch als ein bisschen verwöhnt." },
      { id: "einzelkind", text: "Einzelkind",
        result: "Als Einzelkind bist du laut Adler viel mit Erwachsenen aufgewachsen. Einzelkinder gelten bei ihm als selbstständig und reif – teilen und im Mittelpunkt zurückstehen fällt ihnen manchmal schwerer." }
    ],
    note: "Adlers Geschwister-Theorie ist heute umstritten: Große Studien finden kaum messbare Effekte. Nimm diesen Teil mit einem Augenzwinkern."
  };

  // ---------- Teil B: Situationen (0–3 Punkte, max. 18) ----------
  const partB = [
    { id: "b1", text: "Du hast Streit mit einem Freund. Wie reagierst du?", options: [
      { p: 0, text: "Ich lasse nicht locker, bis der andere mich versteht." },
      { p: 1, text: "Ich ziehe mich beleidigt zurück und warte, dass er sich meldet." },
      { p: 2, text: "Ich sage noch einmal sehr bestimmt meine Meinung, überlege aber kurz, was eigentlich meine Aufgabe ist." },
      { p: 3, text: "Ich kläre meine eigene Haltung und lasse los, wie der andere darauf reagiert." }
    ]},
    { id: "b2", text: "Du hast Angst vor einer wichtigen Prüfung. Wie reagierst du?", options: [
      { p: 0, text: "Ich vermeide das Lernen, weil mich schon der Gedanke daran stresst." },
      { p: 1, text: "Ich lerne, aber ständig mit dem Gedanken „Was, wenn ich versage?“" },
      { p: 2, text: "Ich frage mich, wofür die Angst gerade gut sein könnte, lerne aber eher aus Pflichtgefühl." },
      { p: 3, text: "Ich frage mich, wozu mir die Angst dient, und nutze das, um gezielt zu lernen." }
    ]},
    { id: "b3", text: "Du vergleichst dich auf Social Media mit anderen. Wie reagierst du?", options: [
      { p: 0, text: "Ich scrolle weiter und fühle mich einfach schlechter." },
      { p: 1, text: "Ich vergleiche mich, sage mir aber: „Die zeigen eh nur ihre Highlights.“" },
      { p: 2, text: "Ich merke den Vergleich, lenke mich aber nur ab, statt etwas daraus zu machen." },
      { p: 3, text: "Ich nehme das Gefühl als Ansporn, an etwas Eigenem zu arbeiten." }
    ]},
    { id: "b4", text: "Bei einer Gruppenarbeit trägt jemand kaum etwas bei. Wie reagierst du?", options: [
      { p: 0, text: "Ich beschwere mich bei anderen über die Person, ändere aber nichts." },
      { p: 1, text: "Ich mache den Teil einfach selbst, ohne etwas zu sagen." },
      { p: 2, text: "Ich spreche die Person an, aber eher vorwurfsvoll." },
      { p: 3, text: "Ich kläre sachlich, was meine Aufgabe ist und was ihre, und biete Unterstützung an." }
    ]},
    { id: "b5", text: "Du bist in einem Schulfach deutlich schlechter als andere. Wie reagierst du?", options: [
      { p: 0, text: "Ich denke, ich bin einfach nicht gut genug dafür, und gebe auf." },
      { p: 1, text: "Ich vergleiche mich ständig mit den Besseren und werde frustriert." },
      { p: 2, text: "Ich übe mehr – vor allem, um besser dazustehen als die anderen." },
      { p: 3, text: "Ich nutze das Gefühl als Motivation, mich selbst zu verbessern – unabhängig von den anderen." }
    ]},
    { id: "b6", text: "Du merkst, dass du in Konflikten fast immer gleich reagierst. Wie gehst du damit um?", options: [
      { p: 0, text: "Das ist halt meine Art, daran kann man nichts ändern." },
      { p: 1, text: "Ich ärgere mich über mich selbst, mache aber weiter wie immer." },
      { p: 2, text: "Ich bemerke das Muster und denke kurz darüber nach, reagiere dann aber doch wieder gleich." },
      { p: 3, text: "Ich erkenne, dass ich das Muster selbst mitgestaltet habe, und probiere bewusst eine andere Reaktion." }
    ]}
  ];

  // ---------- Typen ----------
  const types = {
    macher: {
      name: "Der Macher", adler: "Adlers „herrschender Typ“", icon: "⚡",
      text: "Du packst an, übernimmst gern die Führung und lässt dich nicht so leicht aufhalten. Diese Energie ist deine Stärke. Adler würde aber fragen: Für wen setzt du sie ein? Geht es vor allem darum, zu gewinnen oder recht zu behalten, verpufft viel davon. Richtest du sie auf die Gruppe aus, wirst du zum Mitgestalter.",
      wozu: "Wozu brauchst du es, recht zu behalten – und was würde passieren, wenn du es einmal nicht müsstest?"
    },
    mitlaeufer: {
      name: "Der Mitläufer", adler: "Adlers „nehmender Typ“", icon: "🌊",
      text: "Du bist umgänglich und findest dich gut in Gruppen ein – oft lässt du aber andere entscheiden und vorangehen. Das ist bequem, macht dich aber davon abhängig, was die anderen tun. Adler sieht hier viel ungenutztes Potenzial: Schon kleine eigene Schritte bringen dich in Richtung Mitgestalter.",
      wozu: "Wozu wartest du darauf, dass jemand anders den ersten Schritt macht?"
    },
    ausweicher: {
      name: "Der Ausweicher", adler: "Adlers „vermeidender Typ“", icon: "🛡️",
      text: "Schwierigen Aufgaben und Konflikten gehst du lieber aus dem Weg – wer nichts versucht, kann auch nicht scheitern. Adler nennt das eine Strategie, die kurzfristig schützt, das Leben langfristig aber klein macht. Die gute Nachricht aus seiner Sicht: Das ist keine feste Eigenschaft, sondern eine Wahl, die du jederzeit anders treffen kannst.",
      wozu: "Wozu dient dir das Ausweichen – wovor schützt es dich, und was kostet es dich?"
    },
    mitgestalter: {
      name: "Der Mitgestalter", adler: "Adlers „sozial nützlicher Typ“", icon: "🤝",
      text: "Du packst an und hast dabei die anderen im Blick. Genau das ist für Adler das Ideal: Aktivität plus Gemeinschaftsgefühl. Menschen wie du gehen die großen Lebensaufgaben – Arbeit, Freundschaft, Liebe – eher mit Mut als mit Angst an. Achte nur darauf, dass du es nicht tust, um gelobt zu werden, sondern weil es dir wirklich wichtig ist.",
      wozu: "Wozu tust du das Gute, das du tust – für die Gemeinschaft oder für die Anerkennung?"
    },
    mitgestalter_leise: {
      name: "Der stille Mitgestalter", adler: "Adlers „sozial nützlicher Typ“ – noch zurückhaltend", icon: "🌱",
      text: "Dir liegen die anderen am Herzen – und das ist für Adler die wichtigste Zutat überhaupt. Beim Umsetzen hältst du dich aber noch oft zurück. Adler würde sagen: Dir fehlt nicht das Herz, sondern ein bisschen Mut zum ersten Schritt.",
      wozu: "Was wäre ein kleiner erster Schritt, mit dem du diese Woche aus deinem Mitgefühl eine Handlung machst?"
    }
  };
  // Für die Klassenauswertung: stiller Mitgestalter zählt zu den Mitgestaltern
  const mainTypes = ["mitgestalter", "macher", "mitlaeufer", "ausweicher"];
  function mainType(t) { return t === "mitgestalter_leise" ? "mitgestalter" : t; }

  const levels = [
    { min: 0, max: 6, name: "Eher im Reaktionsmodus",
      text: "Du reagierst meist so, wie es sich gerade anfühlt, und lässt dich stark von äußeren Umständen steuern. Adler zeigt: Zwischen Reiz und Reaktion liegt immer ein Spielraum, den du aktiv nutzen kannst." },
    { min: 7, max: 12, name: "Auf dem Weg zum Adlerianer",
      text: "Du merkst oft schon, dass du eine Wahl hast, greifst im Alltag aber noch häufig auf gewohnte Muster zurück. Mit etwas Übung im „Wozu?“ statt „Warum?“ kommst du Adlers Blickwinkel noch näher." },
    { min: 13, max: 18, name: "Ziemlich adlerianisch unterwegs",
      text: "Du denkst schon sehr zielgerichtet und übernimmst Verantwortung für deine eigene Reaktion, statt dich als Opfer der Umstände zu sehen. Genau das ist der Kern von Adlers Individualpsychologie." }
  ];

  // ---------- Auswertung ----------
  // answersA: { a1: 1..5, ... }  → Werte 0–100 pro Dimension
  function scoreA(answersA) {
    const sum = { A: 0, G: 0 }, n = { A: 0, G: 0 };
    for (const q of partA) {
      const v = answersA[q.id];
      if (typeof v !== "number") continue;
      sum[q.dim] += q.rev ? 6 - v : v;
      n[q.dim] += 1;
    }
    const pct = d => n[d] ? Math.round(((sum[d] - n[d]) / (4 * n[d])) * 100) : 0;
    return { aktivitaet: pct("A"), gemeinschaft: pct("G") };
  }

  // Grenzwerte: Gemeinschaftsgefühl ab 65 = hoch; Aktivität ab 60 hoch, unter 40 niedrig.
  // Adlers Modell: hohes Gemeinschaftsgefühl + Aktivität = sozial nützlich.
  // Bei niedrigem Gemeinschaftsgefühl entscheidet der Aktivitätsgrad (herrschend > nehmend > vermeidend).
  function classify(akt, gem) {
    if (gem >= 65) return akt >= 40 ? "mitgestalter" : "mitgestalter_leise";
    if (akt >= 60) return "macher";
    if (akt >= 40) return "mitlaeufer";
    return "ausweicher";
  }

  function scoreB(answersB) {
    let s = 0;
    for (const q of partB) { const v = answersB[q.id]; if (typeof v === "number") s += v; }
    return s;
  }
  function level(score) { return levels.find(l => score >= l.min && score <= l.max); }

  const api = { partA, likertLabels, birth, partB, types, mainTypes, mainType, levels, scoreA, classify, scoreB, level };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ADLER = api;
})(typeof window !== "undefined" ? window : globalThis);
