export default {
  home: {
    title: "Wichtel App",
    subtitle: "Erstelle eine Gruppe und lasst den Zufall entscheiden!",
    groupNamePlaceholder: "Name der Gruppe (z.B. Weihnachtsfeier)",
    createButton: "Gruppe erstellen",
    toast: {
      created: "Gruppe erstellt!",
      error: "Fehler beim Erstellen",
    },
  },
  group: {
    open: "Offen",
    drawn: "Ausgelost",
    adminArea: "Gruppen Admin Bereich",
    saveLink: "Speichere diesen Link um später zurückzukehren!",
    addMember: {
      title: "Neuen Teilnehmer hinzufügen",
      placeholder: "Name",
      button: "Hinzufügen",
      toast: {
        success: "Teilnehmer hinzugefügt",
        error: "Fehler",
      },
    },
    actions: {
      showResults: "Ergebnisse anzeigen",
      startDraw: "🎲 Wichteln starten",
      startDrawWarning:
        "Achtung: Dies weist jedem Teilnehmer zufällig einen Partner zu und schließt die Gruppe.",
      redraw: "Neu auslosen",
      copyLink: "Link kopieren",
    },
    results: {
      title: "Wichtel-Ziehung",
      hint: "Nur für dich als Admin sichtbar – Vorsicht, falls du selbst mitmachst!",
      gives: "beschenkt",
    },
    participants: {
      title: "Teilnehmer",
      empty: "Noch keine Teilnehmer.",
    },
    confirm: {
      startTitle: "Wichteln starten?",
      startDesc:
        "Wichteln wirklich starten? Dies kann nicht rückgängig gemacht werden.",
      redrawTitle: "Neu auslosen?",
      redrawDesc:
        "Wirklich neu auslosen? Die alten Zuweisungen gehen verloren!",
      cancel: "Abbrechen",
      confirm: "Bestätigen",
    },
    toast: {
      drawn: "Auslosung erfolgreich!",
      redrawn: "Neu ausgelost!",
      copied: "Kopiert!",
      error: "Fehler",
    },
  },
  member: {
    title: "Wichteln: {group}",
    hello: "Hallo, {name}!",
    waiting: {
      title: "Die Auslosung läuft...",
      desc: "Der Organisator hat das Wichteln noch nicht gestartet.",
    },
    result: {
      title: "Das Los hat entschieden! Du beschenkst:",
      clickToReveal: "Hier klicken zum Aufdecken",
      psst: "Pssst! Nicht verraten!",
    },
    error: "Ein Fehler ist aufgetreten. Bitte kontaktiere den Admin.",
    og: {
      description: "Hallo {name}! Schau nach, wen du beschenkst!",
    },
  },
  admin: {
    title: "Admin-Übersicht",
    logout: "Abmelden",
    disabled: "Die Admin-Übersicht ist deaktiviert. Setze die Umgebungsvariable NUXT_ADMIN_PASSWORD, um sie zu aktivieren.",
    login: {
      title: "Anmelden",
      password: "Passwort",
      button: "Anmelden",
      error: "Falsches Passwort",
      tooMany: "Zu viele Fehlversuche. Bitte später erneut versuchen.",
    },
    groups: {
      title: "Alle Gruppen",
      search: "Gruppe suchen…",
      empty: "Keine Gruppen gefunden.",
      name: "Name",
      status: "Status",
      members: "Teilnehmer",
      created: "Erstellt",
    },
    detail: {
      back: "Zurück zur Übersicht",
      notFound: "Gruppe nicht gefunden.",
      participant: "Teilnehmer",
      gives: "beschenkt",
      notDrawn: "Noch nicht ausgelost",
      memberLink: "Teilnehmer-Link",
      copyAdminLink: "Admin-Link kopieren",
      openAdminLink: "Gruppen-Admin öffnen",
    },
    edit: {
      hint: "Zum Tauschen eine Person am Griff auf eine andere Zeile ziehen oder in der Liste auswählen. Die bisherigen Beschenkten der beiden werden getauscht.",
      dragHandle: "Ziehen zum Tauschen",
      selfAssigned: "beschenkt sich selbst",
      changed: "geändert",
      unsaved: "Ungespeicherte Änderungen",
      invalid: "Jemand würde sich selbst beschenken. Bitte weiter tauschen.",
      warning: "Wer sein Los schon angesehen hat, sieht nach dem Speichern eine andere Person.",
      reset: "Verwerfen",
      save: "Speichern",
      saved: "Auslosung gespeichert",
      error: "Speichern fehlgeschlagen",
    },
  },
};
