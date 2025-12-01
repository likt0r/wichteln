export default {
  home: {
    title: "Wichtel App",
    subtitle: "Stwórz grupę i niech los zadecyduje!",
    groupNamePlaceholder: "Nazwa grupy (np. Wigilia)",
    createButton: "Utwórz grupę",
    toast: {
      created: "Grupa utworzona!",
      error: "Błąd podczas tworzenia",
    },
  },
  group: {
    open: "Otwarta",
    drawn: "Wylosowana",
    adminArea: "Panel Administratora",
    saveLink: "Zapisz ten link, aby wrócić później!",
    addMember: {
      title: "Dodaj nowego uczestnika",
      placeholder: "Imię",
      button: "Dodaj",
      toast: {
        success: "Uczestnik dodany",
        error: "Błąd",
      },
    },
    actions: {
      showResults: "Pokaż wyniki",
      startDraw: "🎲 Rozpocznij losowanie",
      startDrawWarning:
        "Uwaga: To losowo przydzieli partnera każdemu uczestnikowi i zamknie grupę.",
      redraw: "Wylosuj ponownie",
      copyLink: "Kopiuj link",
    },
    participants: {
      title: "Uczestnicy",
      empty: "Brak uczestników.",
    },
    confirm: {
      startTitle: "Rozpocząć losowanie?",
      startDesc:
        "Czy na pewno chcesz rozpocząć Mikołajki? Tego nie można cofnąć.",
      redrawTitle: "Wylosować ponownie?",
      redrawDesc:
        "Czy na pewno chcesz wylosować ponownie? Poprzednie przydziały zostaną utracone!",
      cancel: "Anuluj",
      confirm: "Potwierdź",
    },
    toast: {
      drawn: "Losowanie zakończone!",
      redrawn: "Wylosowano ponownie!",
      copied: "Skopiowano!",
      error: "Błąd",
    },
  },
  member: {
    title: "Mikołajki: {group}",
    hello: "Cześć, {name}!",
    waiting: {
      title: "Losowanie w toku...",
      desc: "Organizator jeszcze nie rozpoczął Mikołajek.",
    },
    result: {
      title: "Los zadecydował! Obdarowujesz:",
      clickToReveal: "Kliknij, aby odkryć",
      psst: "Ciii! Nie mów nikomu!",
    },
    error: "Wystąpił błąd. Skontaktuj się z administratorem.",
    og: {
      description: "Cześć {name}! Sprawdź, kogo obdarowujesz!",
    },
  },
};
