export default {
  home: {
    title: "Wichtel App",
    subtitle: "Créez un groupe et laissez le destin décider !",
    groupNamePlaceholder: "Nom du groupe (ex. Fête de Noël)",
    createButton: "Créer le groupe",
    toast: {
      created: "Groupe créé !",
      error: "Erreur lors de la création du groupe",
    },
  },
  group: {
    open: "Ouvert",
    drawn: "Tiré au sort",
    adminArea: "Zone d'administration",
    saveLink: "Enregistrez ce lien pour revenir plus tard !",
    addMember: {
      title: "Ajouter un participant",
      placeholder: "Nom",
      button: "Ajouter",
      toast: {
        success: "Participant ajouté",
        error: "Erreur",
      },
    },
    actions: {
      showResults: "Afficher les résultats",
      startDraw: "🎲 Lancer le tirage",
      startDrawWarning:
        "Attention : Cela attribuera aléatoirement un partenaire à chaque participant et fermera le groupe.",
      redraw: "Relancer le tirage",
      copyLink: "Copier le lien",
    },
    participants: {
      title: "Participants",
      empty: "Aucun participant pour le moment.",
    },
    confirm: {
      startTitle: "Lancer le Secret Santa ?",
      startDesc:
        "Voulez-vous vraiment lancer le tirage ? Cette action est irréversible.",
      redrawTitle: "Relancer le tirage ?",
      redrawDesc:
        "Voulez-vous vraiment relancer ? Les anciennes attributions seront perdues !",
      cancel: "Annuler",
      confirm: "Confirmer",
    },
    toast: {
      drawn: "Tirage réussi !",
      redrawn: "Tirage relancé !",
      copied: "Copié !",
      error: "Erreur",
    },
  },
  member: {
    title: "Secret Santa : {group}",
    hello: "Bonjour, {name} !",
    waiting: {
      title: "Tirage en cours...",
      desc: "L'organisateur n'a pas encore lancé le Secret Santa.",
    },
    result: {
      title: "Le sort en est jeté ! Vous offrez un cadeau à :",
      clickToReveal: "Cliquer pour révéler",
      psst: "Chut ! Ne le dites à personne !",
    },
    error: "Une erreur est survenue. Veuillez contacter l'administrateur.",
  },
};
