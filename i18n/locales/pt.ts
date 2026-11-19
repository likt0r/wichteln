export default {
  home: {
    title: "Wichtel App",
    subtitle: "Crie um grupo e deixe o destino decidir!",
    groupNamePlaceholder: "Nome do Grupo (ex. Festa de Natal)",
    createButton: "Criar Grupo",
    toast: {
      created: "Grupo criado!",
      error: "Erro ao criar grupo",
    },
  },
  group: {
    open: "Aberto",
    drawn: "Sorteado",
    adminArea: "Área de Administração",
    saveLink: "Guarde este link para voltar mais tarde!",
    addMember: {
      title: "Adicionar Novo Participante",
      placeholder: "Nome",
      button: "Adicionar",
      toast: {
        success: "Participante adicionado",
        error: "Erro",
      },
    },
    actions: {
      showResults: "Mostrar Resultados",
      startDraw: "🎲 Iniciar Amigo Secreto",
      startDrawWarning:
        "Aviso: Isto irá atribuir aleatoriamente um par a cada participante e fechar o grupo.",
      redraw: "Sortear Novamente",
      copyLink: "Copiar Link",
    },
    results: {
      title: "Sorteio do amigo secreto",
      hint: "Visível apenas para si como administrador – cuidado se também participar!",
      gives: "oferece a",
    },
    participants: {
      title: "Participantes",
      empty: "Ainda sem participantes.",
    },
    confirm: {
      startTitle: "Iniciar Amigo Secreto?",
      startDesc:
        "Deseja realmente iniciar o Amigo Secreto? Esta ação não pode ser desfeita.",
      redrawTitle: "Sortear Novamente?",
      redrawDesc:
        "Deseja realmente sortear novamente? As atribuições antigas serão perdidas!",
      cancel: "Cancelar",
      confirm: "Confirmar",
    },
    toast: {
      drawn: "Sorteio realizado com sucesso!",
      redrawn: "Sorteado novamente!",
      copied: "Copiado!",
      error: "Erro",
    },
  },
  member: {
    title: "Amigo Secreto: {group}",
    hello: "Olá, {name}!",
    waiting: {
      title: "Sorteio em andamento...",
      desc: "O organizador ainda não iniciou o Amigo Secreto.",
    },
    result: {
      title: "O destino decidiu! Você vai presentear:",
      clickToReveal: "Clique para revelar",
      psst: "Shhh! Não conte a ninguém!",
    },
    error: "Ocorreu um erro. Por favor contacte o administrador.",
    og: {
      description: "Olá {name}! Veja quem você vai presentear!",
    },
  },
  admin: {
    title: "Painel de administração",
    logout: "Terminar sessão",
    disabled: "O painel de administração está desativado. Defina a variável de ambiente NUXT_ADMIN_PASSWORD para o ativar.",
    login: {
      title: "Iniciar sessão",
      password: "Palavra-passe",
      button: "Iniciar sessão",
      error: "Palavra-passe incorreta",
      tooMany: "Demasiadas tentativas falhadas. Tente novamente mais tarde.",
    },
    groups: {
      title: "Todos os grupos",
      search: "Pesquisar grupos…",
      empty: "Nenhum grupo encontrado.",
      name: "Nome",
      status: "Estado",
      members: "Participantes",
      created: "Criado",
    },
    detail: {
      back: "Voltar ao painel",
      notFound: "Grupo não encontrado.",
      participant: "Participante",
      gives: "Oferece a",
      notDrawn: "Ainda não sorteado",
      memberLink: "Link do participante",
      copyAdminLink: "Copiar link de administrador",
      openAdminLink: "Abrir administração do grupo",
    },
    edit: {
      hint: "Para trocar, arraste uma pessoa pela pega para outra linha ou escolha-a na lista. Os dois participantes trocam quem presenteiam.",
      dragHandle: "Arrastar para trocar",
      selfAssigned: "presentear-se-ia a si próprio",
      changed: "alterado",
      unsaved: "Alterações não guardadas",
      invalid: "Alguém presentear-se-ia a si próprio. Continue a trocar.",
      warning: "Quem já viu o seu sorteio verá outra pessoa depois de guardar.",
      reset: "Descartar",
      save: "Guardar",
      saved: "Sorteio guardado",
      error: "Falha ao guardar",
    },
  },
};
