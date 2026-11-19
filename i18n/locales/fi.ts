export default {
  home: {
    title: 'Wichtel App',
    subtitle: 'Luo ryhmä ja anna kohtalon päättää!',
    groupNamePlaceholder: 'Ryhmän nimi (esim. Pikkujoulut)',
    createButton: 'Luo ryhmä',
    toast: {
      created: 'Ryhmä luotu!',
      error: 'Virhe luomisessa'
    }
  },
  group: {
    open: 'Avoin',
    drawn: 'Arvottu',
    adminArea: 'Ylläpitäjän alue',
    saveLink: 'Tallenna tämä linkki palataksesi myöhemmin!',
    addMember: {
      title: 'Lisää uusi osallistuja',
      placeholder: 'Nimi',
      button: 'Lisää',
      toast: {
        success: 'Osallistuja lisätty',
        error: 'Virhe'
      }
    },
    actions: {
      showResults: 'Näytä tulokset',
      startDraw: '🎲 Aloita Secret Santa',
      startDrawWarning: 'Varoitus: Tämä jakaa satunnaisesti parin jokaiselle osallistujalle ja sulkee ryhmän.',
      redraw: 'Arvo uudelleen',
      copyLink: 'Kopioi linkki'
    },
    results: {
      title: 'Arvonta',
      hint: 'Näkyy vain sinulle ylläpitäjänä – varo, jos osallistut itse!',
      gives: 'antaa lahjan henkilölle',
    },
    participants: {
      title: 'Osallistujat',
      empty: 'Ei vielä osallistujia.'
    },
    confirm: {
      startTitle: 'Aloita Secret Santa?',
      startDesc: 'Haluatko varmasti aloittaa? Tätä ei voi perua.',
      redrawTitle: 'Arvo uudelleen?',
      redrawDesc: 'Haluatko varmasti arpoa uudelleen? Vanhat jaot menetetään!',
      cancel: 'Peruuta',
      confirm: 'Vahvista'
    },
    toast: {
      drawn: 'Arvonta suoritettu!',
      redrawn: 'Arvottu uudelleen!',
      copied: 'Kopioitu!',
      error: 'Virhe'
    }
  },
  member: {
    title: 'Secret Santa: {group}',
    hello: 'Hei, {name}!',
    waiting: {
      title: 'Arvonta käynnissä...',
      desc: 'Järjestäjä ei ole vielä aloittanut Secret Santaa.'
    },
    result: {
      title: 'Kohtalo on päättänyt! Annat lahjan henkilölle:',
      clickToReveal: 'Klikkaa paljastaaksesi',
      psst: 'Hssst! Älä kerro kenellekään!'
    },
    error: 'Tapahtui virhe. Ota yhteyttä ylläpitäjään.',
    og: {
      description: 'Hei {name}! Katso kenelle annat lahjan!'
    }
  },
  admin: {
    title: 'Ylläpidon yleiskatsaus',
    logout: 'Kirjaudu ulos',
    disabled: 'Ylläpidon yleiskatsaus on pois käytöstä. Ota se käyttöön asettamalla ympäristömuuttuja NUXT_ADMIN_PASSWORD.',
    login: {
      title: 'Kirjaudu sisään',
      password: 'Salasana',
      button: 'Kirjaudu sisään',
      error: 'Väärä salasana',
      tooMany: 'Liian monta epäonnistunutta yritystä. Yritä myöhemmin uudelleen.',
    },
    groups: {
      title: 'Kaikki ryhmät',
      search: 'Hae ryhmiä…',
      empty: 'Ryhmiä ei löytynyt.',
      name: 'Nimi',
      status: 'Tila',
      members: 'Osallistujat',
      created: 'Luotu',
    },
    detail: {
      back: 'Takaisin yleiskatsaukseen',
      notFound: 'Ryhmää ei löytynyt.',
      participant: 'Osallistuja',
      gives: 'Antaa lahjan henkilölle',
      notDrawn: 'Ei vielä arvottu',
      memberLink: 'Osallistujan linkki',
      copyAdminLink: 'Kopioi ylläpitolinkki',
      openAdminLink: 'Avaa ryhmän ylläpito',
    },
    edit: {
      hint: 'Vaihda vetämällä henkilö kahvasta toiselle riville tai valitse hänet luettelosta. Kaksi antajaa vaihtavat saajansa.',
      dragHandle: 'Vedä vaihtaaksesi',
      selfAssigned: 'antaisi lahjan itselleen',
      changed: 'muutettu',
      unsaved: 'Tallentamattomia muutoksia',
      invalid: 'Joku antaisi lahjan itselleen. Jatka vaihtamista.',
      warning: 'Jos joku on jo katsonut arvontansa, hän näkee tallennuksen jälkeen eri henkilön.',
      reset: 'Hylkää',
      save: 'Tallenna',
      saved: 'Arvonta tallennettu',
      error: 'Tallennus epäonnistui',
    },
  },
}

