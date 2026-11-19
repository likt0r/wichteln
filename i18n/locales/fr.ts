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
    results: {
      title: "Tirage au sort",
      hint: "Visible uniquement par vous en tant qu'admin – attention si vous participez vous-même !",
      gives: "offre un cadeau à",
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
    og: {
      description: "Bonjour {name} ! Découvrez à qui vous offrez un cadeau !",
    },
  },
  admin: {
    title: "Vue d'administration",
    logout: "Se déconnecter",
    disabled: "La vue d'administration est désactivée. Définissez la variable d'environnement NUXT_ADMIN_PASSWORD pour l'activer.",
    login: {
      title: "Connexion",
      password: "Mot de passe",
      button: "Se connecter",
      error: "Mot de passe incorrect",
      tooMany: "Trop de tentatives échouées. Veuillez réessayer plus tard.",
    },
    groups: {
      title: "Tous les groupes",
      search: "Rechercher un groupe…",
      empty: "Aucun groupe trouvé.",
      name: "Nom",
      status: "Statut",
      members: "Participants",
      created: "Créé",
    },
    detail: {
      back: "Retour à la vue d'ensemble",
      notFound: "Groupe introuvable.",
      participant: "Participant",
      gives: "Offre un cadeau à",
      notDrawn: "Pas encore tiré au sort",
      memberLink: "Lien du participant",
      copyAdminLink: "Copier le lien admin",
      openAdminLink: "Ouvrir l'admin du groupe",
    },
    edit: {
      hint: "Pour échanger, faites glisser une personne par la poignée sur une autre ligne ou choisissez-la dans la liste. Les deux participants échangent leurs destinataires.",
      dragHandle: "Glisser pour échanger",
      selfAssigned: "s'offrirait un cadeau à soi-même",
      changed: "modifié",
      unsaved: "Modifications non enregistrées",
      invalid: "Quelqu'un s'offrirait un cadeau à soi-même. Continuez à échanger.",
      warning: "Les personnes ayant déjà consulté leur tirage verront une autre personne après l'enregistrement.",
      reset: "Annuler",
      save: "Enregistrer",
      saved: "Tirage enregistré",
      error: "Échec de l'enregistrement",
    },
  },
};
