export default {
  home: {
    title: "Wichtel App",
    subtitle: "Create a group and let fate decide!",
    groupNamePlaceholder: "Group Name (e.g. Christmas Party)",
    createButton: "Create Group",
    toast: {
      created: "Group created!",
      error: "Error creating group",
    },
  },
  group: {
    open: "Open",
    drawn: "Drawn",
    adminArea: "Group Admin Area",
    saveLink: "Save this link to return later!",
    addMember: {
      title: "Add New Participant",
      placeholder: "Name",
      button: "Add",
      toast: {
        success: "Participant added",
        error: "Error",
      },
    },
    actions: {
      showResults: "Show Results",
      startDraw: "🎲 Start Secret Santa",
      startDrawWarning:
        "Warning: This will randomly assign a partner to each participant and close the group.",
      redraw: "Redraw",
      copyLink: "Copy Link",
    },
    participants: {
      title: "Participants",
      empty: "No participants yet.",
    },
    confirm: {
      startTitle: "Start Secret Santa?",
      startDesc: "Really start Secret Santa? This cannot be undone.",
      redrawTitle: "Redraw?",
      redrawDesc: "Really redraw? Old assignments will be lost!",
      cancel: "Cancel",
      confirm: "Confirm",
    },
    toast: {
      drawn: "Draw successful!",
      redrawn: "Redrawn!",
      copied: "Copied!",
      error: "Error",
    },
  },
  member: {
    title: "Secret Santa: {group}",
    hello: "Hello, {name}!",
    waiting: {
      title: "Draw in progress...",
      desc: "The organizer has not started the Secret Santa yet.",
    },
    result: {
      title: "Fate has decided! You are gifting:",
      clickToReveal: "Click to reveal",
      psst: "Shhh! Don't tell anyone!",
    },
    error: "An error occurred. Please contact the admin.",
    og: {
      description: "Hello {name}! Check who you are gifting!",
    },
  },
};
