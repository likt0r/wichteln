export default {
  home: {
    title: 'Wichtel App',
    subtitle: 'Maak een groep en laat het lot beslissen!',
    groupNamePlaceholder: 'Groepsnaam (bv. Kerstfeest)',
    createButton: 'Groep aanmaken',
    toast: {
      created: 'Groep aangemaakt!',
      error: 'Fout bij aanmaken'
    }
  },
  group: {
    open: 'Open',
    drawn: 'Getrokken',
    adminArea: 'Beheergedeelte',
    saveLink: 'Bewaar deze link om later terug te komen!',
    addMember: {
      title: 'Nieuwe deelnemer toevoegen',
      placeholder: 'Naam',
      button: 'Toevoegen',
      toast: {
        success: 'Deelnemer toegevoegd',
        error: 'Fout'
      }
    },
    actions: {
      showResults: 'Resultaten tonen',
      startDraw: '🎲 Lootjes trekken starten',
      startDrawWarning: 'Waarschuwing: Dit wijst willekeurig een partner toe aan elke deelnemer en sluit de groep.',
      redraw: 'Opnieuw trekken',
      copyLink: 'Link kopiëren'
    },
    participants: {
      title: 'Deelnemers',
      empty: 'Nog geen deelnemers.',
    },
    confirm: {
      startTitle: 'Lootjes trekken starten?',
      startDesc: 'Echt starten? Dit kan niet ongedaan worden gemaakt.',
      redrawTitle: 'Opnieuw trekken?',
      redrawDesc: 'Echt opnieuw trekken? Oude toewijzingen gaan verloren!',
      cancel: 'Annuleren',
      confirm: 'Bevestigen'
    },
    toast: {
      drawn: 'Lootjes getrokken!',
      redrawn: 'Opnieuw getrokken!',
      copied: 'Gekopieerd!',
      error: 'Fout'
    }
  },
  member: {
    title: 'Secret Santa: {group}',
    hello: 'Hallo, {name}!',
    waiting: {
      title: 'Trekking bezig...',
      desc: 'De organisator is nog niet gestart met lootjes trekken.'
    },
    result: {
      title: 'Het lot heeft beslist! Jij geeft een cadeau aan:',
      clickToReveal: 'Klik om te onthullen',
      psst: 'Sssst! Niet doorvertellen!'
    },
    error: 'Er is een fout opgetreden. Neem contact op met de beheerder.'
  }
}

