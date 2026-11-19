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
    results: {
      title: 'Estrazione',
      hint: 'Visibile solo a te come amministratore – attenzione se partecipi anche tu!',
      gives: 'fa un regalo a',
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
  },
  admin: {
    title: 'Pannello di amministrazione',
    logout: 'Esci',
    disabled: 'Il pannello di amministrazione è disattivato. Imposta la variabile d\'ambiente NUXT_ADMIN_PASSWORD per attivarlo.',
    login: {
      title: 'Accedi',
      password: 'Password',
      button: 'Accedi',
      error: 'Password errata',
      tooMany: 'Troppi tentativi falliti. Riprova più tardi.',
    },
    groups: {
      title: 'Tutti i gruppi',
      search: 'Cerca gruppi…',
      empty: 'Nessun gruppo trovato.',
      name: 'Nome',
      status: 'Stato',
      members: 'Partecipanti',
      created: 'Creato',
    },
    detail: {
      back: 'Torna alla panoramica',
      notFound: 'Gruppo non trovato.',
      participant: 'Partecipante',
      gives: 'Fa un regalo a',
      notDrawn: 'Non ancora estratto',
      memberLink: 'Link del partecipante',
      copyAdminLink: 'Copia link admin',
      openAdminLink: 'Apri admin del gruppo',
    },
    edit: {
      hint: 'Per scambiare, trascina una persona dalla maniglia su un\'altra riga o sceglila dall\'elenco. I due partecipanti si scambiano i destinatari.',
      dragHandle: 'Trascina per scambiare',
      selfAssigned: 'farebbe un regalo a sé stesso',
      changed: 'modificato',
      unsaved: 'Modifiche non salvate',
      invalid: 'Qualcuno farebbe un regalo a sé stesso. Continua a scambiare.',
      warning: 'Chi ha già visto la propria estrazione vedrà un\'altra persona dopo il salvataggio.',
      reset: 'Annulla',
      save: 'Salva',
      saved: 'Estrazione salvata',
      error: 'Salvataggio non riuscito',
    },
  },
}

