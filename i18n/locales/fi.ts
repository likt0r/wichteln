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
  }
}

