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
  },
};
