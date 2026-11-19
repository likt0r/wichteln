export default {
  home: {
    title: 'Wichtel App',
    subtitle: 'Opret en gruppe og lad skæbnen bestemme!',
    groupNamePlaceholder: 'Gruppenavn (f.eks. Julefrokost)',
    createButton: 'Opret Gruppe',
    toast: {
      created: 'Gruppe oprettet!',
      error: 'Fejl ved oprettelse'
    }
  },
  group: {
    open: 'Åben',
    drawn: 'Trukket',
    adminArea: 'Administratorområde',
    saveLink: 'Gem dette link for at vende tilbage senere!',
    addMember: {
      title: 'Tilføj ny deltager',
      placeholder: 'Navn',
      button: 'Tilføj',
      toast: {
        success: 'Deltager tilføjet',
        error: 'Fejl'
      }
    },
    actions: {
      showResults: 'Vis resultater',
      startDraw: '🎲 Start Secret Santa',
      startDrawWarning: 'Advarsel: Dette tildeler tilfældigt en partner til hver deltager og lukker gruppen.',
      redraw: 'Træk om',
      copyLink: 'Kopier link'
    },
    results: {
      title: 'Lodtrækning',
      hint: 'Kun synlig for dig som admin – pas på, hvis du selv er med!',
      gives: 'giver en gave til',
    },
    round: 'Runde {n}',
    nextRound: {
      title: 'Næste runde',
      desc: 'Opretter en ny gruppe med de samme deltagere og trækker lod igen. Ingen får en person, de allerede har givet en gave i en tidligere runde.',
      button: 'Start næste runde',
      confirmTitle: 'Start næste runde?',
      confirmDesc: 'Der oprettes en ny gruppe med de samme deltagere, og der trækkes lod med det samme. Ingen giver en gave til en, de allerede har givet til. Alle får nye personlige links, som du derefter skal sende ud.',
      goTo: 'Gå til runde {n}',
      previous: 'Tilbage til runde {n}',
      complete: 'Alle har givet alle en gave! Hver person har givet hver af de andre præcis én gang, så endnu en runde er ikke mulig.',
      completeShort: 'Alle har givet alle en gave',
      toast: 'Runde {n} startet',
    },
    participants: {
      title: 'Deltagere',
      empty: 'Ingen deltagere endnu.'
    },
    confirm: {
      startTitle: 'Start Secret Santa?',
      startDesc: 'Vil du virkelig starte Secret Santa? Dette kan ikke fortrydes.',
      redrawTitle: 'Træk om?',
      redrawDesc: 'Vil du virkelig trække om? Gamle tildelinger vil gå tabt!',
      cancel: 'Annuller',
      confirm: 'Bekræft'
    },
    toast: {
      drawn: 'Trækning gennemført!',
      redrawn: 'Trukket om!',
      copied: 'Kopieret!',
      error: 'Fejl'
    }
  },
  member: {
    title: 'Secret Santa: {group}',
    hello: 'Hej, {name}!',
    waiting: {
      title: 'Trækning i gang...',
      desc: 'Arrangøren har ikke startet Secret Santa endnu.'
    },
    result: {
      title: 'Skæbnen har bestemt! Du skal give en gave til:',
      clickToReveal: 'Klik for at afsløre',
      psst: 'Shhh! Sig det ikke til nogen!'
    },
    error: 'Der opstod en fejl. Kontakt venligst administratoren.',
    og: {
      description: 'Hej {name}! Se hvem du skal give gave til!'
    }
  },
  admin: {
    title: 'Adminoversigt',
    logout: 'Log ud',
    disabled: 'Adminoversigten er deaktiveret. Angiv miljøvariablen NUXT_ADMIN_PASSWORD for at aktivere den.',
    login: {
      title: 'Log ind',
      password: 'Adgangskode',
      button: 'Log ind',
      error: 'Forkert adgangskode',
      tooMany: 'For mange mislykkede forsøg. Prøv igen senere.',
    },
    groups: {
      title: 'Alle grupper',
      search: 'Søg grupper…',
      empty: 'Ingen grupper fundet.',
      name: 'Navn',
      status: 'Status',
      members: 'Deltagere',
      created: 'Oprettet',
    },
    detail: {
      back: 'Tilbage til oversigten',
      notFound: 'Gruppen blev ikke fundet.',
      participant: 'Deltager',
      gives: 'Giver en gave til',
      notDrawn: 'Ikke trukket endnu',
      memberLink: 'Deltagerlink',
      copyAdminLink: 'Kopiér adminlink',
      openAdminLink: 'Åbn gruppeadmin',
    },
    edit: {
      hint: 'Træk en person i håndtaget hen på en anden række, eller vælg en fra listen for at bytte. De to givere bytter modtagere.',
      dragHandle: 'Træk for at bytte',
      selfAssigned: 'ville give sig selv en gave',
      earlierRound: 'allerede trukket i en tidligere runde',
      changed: 'ændret',
      unsaved: 'Ikke-gemte ændringer',
      invalid: 'Nogen ville give sig selv en gave. Byt videre.',
      warning: 'Den, der allerede har set sin lodtrækning, ser en anden person, når du har gemt.',
      reset: 'Kassér',
      save: 'Gem',
      saved: 'Lodtrækning gemt',
      error: 'Kunne ikke gemme',
    },
  },
}

