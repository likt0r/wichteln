export default {
  home: {
    title: "Wichtel App",
    subtitle: "Skapa en grupp och låt ödet avgöra!",
    groupNamePlaceholder: "Gruppnamn (t.ex. Julfest)",
    createButton: "Skapa grupp",
    toast: {
      created: "Grupp skapad!",
      error: "Fel vid skapande",
    },
  },
  group: {
    open: "Öppen",
    drawn: "Dragen",
    adminArea: "Administratörsområde",
    saveLink: "Spara denna länk för att återkomma senare!",
    addMember: {
      title: "Lägg till ny deltagare",
      placeholder: "Namn",
      button: "Lägg till",
      toast: {
        success: "Deltagare tillagd",
        error: "Fel",
      },
    },
    actions: {
      showResults: "Visa resultat",
      startDraw: "🎲 Starta Secret Santa",
      startDrawWarning:
        "Varning: Detta tilldelar slumpmässigt en partner till varje deltagare och stänger gruppen.",
      redraw: "Dra om",
      copyLink: "Kopiera länk",
    },
    participants: {
      title: "Deltagare",
      empty: "Inga deltagare än.",
    },
    confirm: {
      startTitle: "Starta Secret Santa?",
      startDesc: "Verkligen starta Secret Santa? Detta kan inte ångras.",
      redrawTitle: "Dra om?",
      redrawDesc:
        "Verkligen dra om? Gamla tilldelningar kommer att gå förlorade!",
      cancel: "Avbryt",
      confirm: "Bekräfta",
    },
    toast: {
      drawn: "Dragning klar!",
      redrawn: "Omdragen!",
      copied: "Kopierad!",
      error: "Fel",
    },
  },
  member: {
    title: "Secret Santa: {group}",
    hello: "Hej, {name}!",
    waiting: {
      title: "Dragning pågår...",
      desc: "Arrangören har inte startat Secret Santa än.",
    },
    result: {
      title: "Ödet har avgjort! Du ska ge en present till:",
      clickToReveal: "Klicka för att visa",
      psst: "Schhh! Berätta inte för någon!",
    },
    error: "Ett fel inträffade. Kontakta administratören.",
    og: {
      description: "Hej {name}! Se vem du ska ge en present till!",
    },
  },
};
