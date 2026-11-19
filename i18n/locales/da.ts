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
  },
}

