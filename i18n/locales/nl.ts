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
    results: {
      title: 'Lootjestrekking',
      hint: 'Alleen zichtbaar voor jou als beheerder – let op als je zelf meedoet!',
      gives: 'geeft een cadeau aan',
    },
    round: 'Ronde {n}',
    nextRound: {
      title: 'Volgende ronde',
      desc: 'Maakt een nieuwe groep met dezelfde deelnemers. Je kunt mensen verwijderen of toevoegen en daarna loten. Niemand krijgt iemand die hij al een cadeau heeft gegeven, zolang dat mogelijk is.',
      button: 'Volgende ronde starten',
      confirmTitle: 'Volgende ronde starten?',
      confirmDesc: 'Er wordt een nieuwe groep met dezelfde deelnemers gemaakt. Voor het loten kun je mensen verwijderen, nieuwe toevoegen of eerdere deelnemers terughalen. Wie wie al heeft verrast, blijft bewaard. Iedereen krijgt nieuwe persoonlijke links.',
      goTo: 'Naar ronde {n}',
      previous: 'Terug naar ronde {n}',
      toast: 'Ronde {n} gestart',
    },
    former: {
      title: 'Eerdere deelnemers',
      hint: 'Deden mee aan een eerdere ronde. Terughalen behoudt hun geschiedenis.',
    },
    removeMember: {
      button: '{name} verwijderen',
      confirmTitle: '{name} verwijderen?',
      confirmDesc: 'De persoon wordt uit deze ronde verwijderd. Eerdere rondes blijven ongewijzigd.',
    },
    repeat: {
      badge: 'al in ronde {n}',
      toast: '{n} herhaling(en) waren niet te vermijden; de langst geleden zijn gekozen.',
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
    error: 'Er is een fout opgetreden. Neem contact op met de beheerder.',
    og: {
      description: 'Hallo {name}! Bekijk wie jij een cadeau mag geven!'
    }
  },
  admin: {
    title: 'Beheeroverzicht',
    logout: 'Uitloggen',
    disabled: 'Het beheeroverzicht is uitgeschakeld. Stel de omgevingsvariabele NUXT_ADMIN_PASSWORD in om het te activeren.',
    login: {
      title: 'Inloggen',
      password: 'Wachtwoord',
      button: 'Inloggen',
      error: 'Onjuist wachtwoord',
      tooMany: 'Te veel mislukte pogingen. Probeer het later opnieuw.',
    },
    groups: {
      title: 'Alle groepen',
      search: 'Groepen zoeken…',
      empty: 'Geen groepen gevonden.',
      name: 'Naam',
      status: 'Status',
      members: 'Deelnemers',
      created: 'Aangemaakt',
    },
    detail: {
      back: 'Terug naar overzicht',
      notFound: 'Groep niet gevonden.',
      participant: 'Deelnemer',
      gives: 'Geeft een cadeau aan',
      notDrawn: 'Nog niet geloot',
      memberLink: 'Deelnemerslink',
      copyAdminLink: 'Beheerlink kopiëren',
      openAdminLink: 'Groepsbeheer openen',
    },
    edit: {
      hint: 'Sleep een persoon aan de greep naar een andere rij of kies iemand uit de lijst om te ruilen. De twee gevers ruilen hun ontvangers.',
      dragHandle: 'Slepen om te ruilen',
      selfAssigned: 'zou zichzelf een cadeau geven',
      changed: 'gewijzigd',
      unsaved: 'Niet-opgeslagen wijzigingen',
      invalid: 'Iemand zou zichzelf een cadeau geven. Blijf ruilen.',
      warning: 'Wie zijn lot al heeft bekeken, ziet na het opslaan een andere persoon.',
      reset: 'Verwerpen',
      save: 'Opslaan',
      saved: 'Loting opgeslagen',
      error: 'Opslaan mislukt',
    },
  },
}

