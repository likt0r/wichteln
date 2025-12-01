export default {
  home: {
    title: 'Wichtel App',
    subtitle: 'Crea un gruppo e lascia decidere al destino!',
    groupNamePlaceholder: 'Nome del gruppo (es. Festa di Natale)',
    createButton: 'Crea Gruppo',
    toast: {
      created: 'Gruppo creato!',
      error: 'Errore durante la creazione'
    }
  },
  group: {
    open: 'Aperto',
    drawn: 'Estratto',
    adminArea: 'Area Amministrazione',
    saveLink: 'Salva questo link per tornare più tardi!',
    addMember: {
      title: 'Aggiungi Nuovo Partecipante',
      placeholder: 'Nome',
      button: 'Aggiungi',
      toast: {
        success: 'Partecipante aggiunto',
        error: 'Errore'
      }
    },
    actions: {
      showResults: 'Mostra Risultati',
      startDraw: '🎲 Avvia Babbo Natale Segreto',
      startDrawWarning: 'Attenzione: Questo assegnerà casualmente un partner a ciascun partecipante e chiuderà il gruppo.',
      redraw: 'Riestrai',
      copyLink: 'Copia Link'
    },
    participants: {
      title: 'Partecipanti',
      empty: 'Nessun partecipante ancora.'
    },
    confirm: {
      startTitle: 'Avviare l\'estrazione?',
      startDesc: 'Vuoi davvero avviare il Babbo Natale Segreto? Non si può tornare indietro.',
      redrawTitle: 'Riestrarre?',
      redrawDesc: 'Vuoi davvero riestrarre? Le vecchie assegnazioni andranno perse!',
      cancel: 'Annulla',
      confirm: 'Conferma'
    },
    toast: {
      drawn: 'Estrazione riuscita!',
      redrawn: 'Riestratto!',
      copied: 'Copiato!',
      error: 'Errore'
    }
  },
  member: {
    title: 'Babbo Natale Segreto: {group}',
    hello: 'Ciao, {name}!',
    waiting: {
      title: 'Estrazione in corso...',
      desc: 'L\'organizzatore non ha ancora avviato il Babbo Natale Segreto.'
    },
    result: {
      title: 'Il destino ha deciso! Devi fare un regalo a:',
      clickToReveal: 'Clicca per rivelare',
      psst: 'Shhh! Non dirlo a nessuno!'
    },
    error: 'Si è verificato un errore. Contatta l\'amministratore.',
    og: {
      description: 'Ciao {name}! Scopri a chi devi fare un regalo!'
    }
  }
}

