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
    results: {
      title: "Losowanie",
      hint: "Widoczne tylko dla ciebie jako administratora – uważaj, jeśli też bierzesz udział!",
      gives: "obdarowuje",
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
  admin: {
    title: "Panel administratora",
    logout: "Wyloguj",
    disabled: "Panel administratora jest wyłączony. Ustaw zmienną środowiskową NUXT_ADMIN_PASSWORD, aby go włączyć.",
    login: {
      title: "Logowanie",
      password: "Hasło",
      button: "Zaloguj",
      error: "Nieprawidłowe hasło",
      tooMany: "Zbyt wiele nieudanych prób. Spróbuj ponownie później.",
    },
    groups: {
      title: "Wszystkie grupy",
      search: "Szukaj grup…",
      empty: "Nie znaleziono grup.",
      name: "Nazwa",
      status: "Status",
      members: "Uczestnicy",
      created: "Utworzono",
    },
    detail: {
      back: "Powrót do przeglądu",
      notFound: "Nie znaleziono grupy.",
      participant: "Uczestnik",
      gives: "Obdarowuje",
      notDrawn: "Jeszcze nie wylosowano",
      memberLink: "Link uczestnika",
      copyAdminLink: "Kopiuj link administratora",
      openAdminLink: "Otwórz administrację grupy",
    },
  },
};
