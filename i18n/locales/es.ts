export default {
  home: {
    title: "Wichtel App",
    subtitle: "¡Crea un grupo y deja que el destino decida!",
    groupNamePlaceholder: "Nombre del grupo (ej. Fiesta de Navidad)",
    createButton: "Crear Grupo",
    toast: {
      created: "¡Grupo creado!",
      error: "Error al crear el grupo",
    },
  },
  group: {
    open: "Abierto",
    drawn: "Sorteado",
    adminArea: "Área de Administración",
    saveLink: "¡Guarda este enlace para volver más tarde!",
    addMember: {
      title: "Añadir Nuevo Participante",
      placeholder: "Nombre",
      button: "Añadir",
      toast: {
        success: "Participante añadido",
        error: "Error",
      },
    },
    actions: {
      showResults: "Mostrar Resultados",
      startDraw: "🎲 Empezar Sorteo",
      startDrawWarning:
        "Advertencia: Esto asignará aleatoriamente un compañero a cada participante y cerrará el grupo.",
      redraw: "Volver a sortear",
      copyLink: "Copiar Enlace",
    },
    results: {
      title: "Sorteo del amigo invisible",
      hint: "Solo visible para ti como administrador. ¡Cuidado si tú también participas!",
      gives: "regala a",
    },
    participants: {
      title: "Participantes",
      empty: "Aún no hay participantes.",
    },
    confirm: {
      startTitle: "¿Empezar Sorteo?",
      startDesc:
        "¿Realmente quieres empezar el Amigo Invisible? Esto no se puede deshacer.",
      redrawTitle: "¿Volver a sortear?",
      redrawDesc:
        "¿Realmente quieres volver a sortear? ¡Las asignaciones anteriores se perderán!",
      cancel: "Cancelar",
      confirm: "Confirmar",
    },
    toast: {
      drawn: "¡Sorteo exitoso!",
      redrawn: "¡Sorteado de nuevo!",
      copied: "¡Copiado!",
      error: "Error",
    },
  },
  member: {
    title: "Amigo Invisible: {group}",
    hello: "¡Hola, {name}!",
    waiting: {
      title: "El sorteo está en curso...",
      desc: "El organizador aún no ha iniciado el Amigo Invisible.",
    },
    result: {
      title: "¡El destino ha decidido! Le regalas a:",
      clickToReveal: "Haz clic para revelar",
      psst: "¡Shhh! ¡No se lo digas a nadie!",
    },
    error: "Ocurrió un error. Por favor contacta al administrador.",
    og: {
      description: "¡Hola {name}! ¡Mira a quién le regalas!",
    },
  },
  admin: {
    title: "Panel de administración",
    logout: "Cerrar sesión",
    disabled: "El panel de administración está desactivado. Define la variable de entorno NUXT_ADMIN_PASSWORD para activarlo.",
    login: {
      title: "Iniciar sesión",
      password: "Contraseña",
      button: "Iniciar sesión",
      error: "Contraseña incorrecta",
      tooMany: "Demasiados intentos fallidos. Inténtalo más tarde.",
    },
    groups: {
      title: "Todos los grupos",
      search: "Buscar grupos…",
      empty: "No se encontraron grupos.",
      name: "Nombre",
      status: "Estado",
      members: "Participantes",
      created: "Creado",
    },
    detail: {
      back: "Volver al panel",
      notFound: "Grupo no encontrado.",
      participant: "Participante",
      gives: "Regala a",
      notDrawn: "Aún no sorteado",
      memberLink: "Enlace del participante",
      copyAdminLink: "Copiar enlace de administrador",
      openAdminLink: "Abrir administración del grupo",
    },
  },
};
