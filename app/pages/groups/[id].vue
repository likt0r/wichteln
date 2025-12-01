<template>
  <UContainer class="py-10">
    <div v-if="pending" class="text-center">Lade...</div>
    <div v-else-if="error" class="text-center text-red-500">
      Gruppe nicht gefunden
    </div>
    <div v-else>
      <div
        class="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 ring-1 ring-black/5 overflow-hidden"
      >
        <div class="p-6 border-b border-white/10 dark:border-white/5">
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">{{ group?.name }}</h1>
            <UBadge
              :color="group?.status === 'open' ? 'info' : 'success'"
              variant="subtle"
              size="lg"
            >
              {{ group?.status === "open" ? "Offen" : "Ausgelost" }}
            </UBadge>
          </div>
        </div>

        <div class="p-6">
          <div
            v-if="group?.isAdmin"
            class="mb-8 p-6 bg-white/40 dark:bg-white/5 rounded-xl border border-white/20 backdrop-blur-sm"
          >
            <h2 class="text-lg font-semibold mb-2 flex items-center gap-2">
              <UIcon name="i-lucide-crown" class="w-5 h-5 text-yellow-500" />
              Admin Bereich
            </h2>
            <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
              Speichere diesen Link um später zurückzukehren!
            </p>

            <div class="flex gap-2 mb-6">
              <UInput
                :model-value="adminUrl"
                readonly
                class="flex-1"
                :ui="{ root: 'bg-white/50 dark:bg-black/50' }"
              />
              <UButton
                icon="i-lucide-clipboard"
                color="neutral"
                variant="soft"
                @click="copyToClipboard(adminUrl)"
              />
            </div>

            <div v-if="group?.status === 'open'" class="mt-4 space-y-4">
              <div>
                <h3
                  class="font-medium mb-2 text-sm uppercase tracking-wide text-neutral-500"
                >
                  Neuen Teilnehmer hinzufügen
                </h3>
                <form @submit.prevent="addMember" class="flex gap-2">
                  <UInput
                    v-model="newMemberName"
                    placeholder="Name"
                    class="flex-1"
                    :ui="{ root: 'bg-white/50 dark:bg-black/50' }"
                  />
                  <UButton
                    type="submit"
                    :loading="addingMember"
                    color="primary"
                    variant="soft"
                    icon="i-lucide-plus"
                    >Hinzufügen</UButton
                  >
                </form>
              </div>
            </div>

            <div
              class="mt-8 pt-6 border-t border-neutral-200/50 dark:border-white/10 space-y-4"
            >
              <div
                v-if="group?.status === 'drawn'"
                class="flex items-center justify-between"
              >
                <label
                  class="text-sm font-medium text-neutral-600 dark:text-neutral-400"
                  >Ergebnisse anzeigen</label
                >
                <USwitch v-model="showResults" />
              </div>

              <div
                v-if="group?.status === 'open' && group?.members?.length > 1"
              >
                <UButton
                  block
                  color="primary"
                  size="xl"
                  :loading="drawing"
                  @click="draw(false)"
                  class="font-bold"
                >
                  🎲 Wichteln starten
                </UButton>
                <p class="text-xs text-center mt-3 text-neutral-500">
                  Achtung: Dies weist jedem Teilnehmer zufällig einen Partner zu
                  und schließt die Gruppe.
                </p>
              </div>

              <div v-if="group?.status === 'drawn'" class="pt-4">
                <UButton
                  block
                  color="neutral"
                  variant="ghost"
                  :loading="drawing"
                  @click="draw(true)"
                  icon="i-lucide-refresh-cw"
                >
                  Neu auslosen
                </UButton>
              </div>
            </div>
          </div>

          <div>
            <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <UIcon name="i-lucide-users" class="w-5 h-5 text-primary-500" />
              Teilnehmer
              <span class="text-neutral-500 font-normal"
                >({{ group?.members?.length || 0 }})</span
              >
            </h2>

            <div
              v-if="group?.members?.length === 0"
              class="text-neutral-500 text-center py-12 bg-white/20 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700"
            >
              Noch keine Teilnehmer.
            </div>

            <ul class="space-y-2">
              <li
                v-for="member in group?.members"
                :key="member.name"
                class="p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-white/20 flex justify-between items-center transition-colors hover:bg-white/60 dark:hover:bg-white/10"
              >
                <div class="flex items-center gap-2">
                  <span class="font-medium">{{ member.name }}</span>
                  <span
                    v-if="showResults && member.target"
                    class="text-neutral-500 text-sm flex items-center gap-1"
                  >
                    <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
                    <UIcon name="i-lucide-gift" class="w-4 h-4" />
                    {{ member.target }}
                  </span>
                </div>

                <div
                  v-if="group?.isAdmin && member.id"
                  class="flex items-center gap-2"
                >
                  <UButton
                    size="xs"
                    color="neutral"
                    variant="ghost"
                    icon="i-lucide-link"
                    @click="copyToClipboard(getMemberUrl(member.id))"
                  >
                    Link kopieren
                  </UButton>
                </div>
                <div v-else-if="member.hasDrawn">
                  <UIcon
                    name="i-lucide-check-circle"
                    class="text-green-500 w-6 h-6"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <UModal
      v-model:open="confirmState.isOpen"
      :title="confirmState.title"
      :description="confirmState.description"
    >
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton color="neutral" variant="ghost" @click="onCancel"
            >Abbrechen</UButton
          >
          <UButton color="primary" @click="onConfirm">Bestätigen</UButton>
        </div>
      </template>
    </UModal>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute();
const toast = useToast();
const {
  data: group,
  pending,
  error,
  refresh,
} = await useFetch(`/api/groups/${route.params.id}`, {
  headers: {
    Authorization: route.query.token ? `Bearer ${route.query.token}` : "",
  },
});

const showResults = ref(false);

const adminUrl = computed(() => {
  if (process.client) {
    return `${window.location.origin}/groups/${route.params.id}?token=${route.query.token}`;
  }
  return "";
});

function getMemberUrl(memberId: string) {
  if (process.client) {
    return `${window.location.origin}/m/${memberId}`;
  }
  return "";
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
  toast.add({ title: "Kopiert!", duration: 1500 });
}

// Add Member
const newMemberName = ref("");
const addingMember = ref(false);

async function addMember() {
  if (!newMemberName.value) return;
  addingMember.value = true;
  try {
    await $fetch(`/api/groups/${route.params.id}/members`, {
      method: "POST",
      body: { name: newMemberName.value },
    });
    newMemberName.value = "";
    toast.add({ title: "Teilnehmer hinzugefügt" });
    refresh();
  } catch (e: any) {
    toast.add({
      title: "Fehler",
      description: e.statusMessage,
      color: "error",
    });
  } finally {
    addingMember.value = false;
  }
}

// Draw
const confirmState = ref({
  isOpen: false,
  title: "",
  description: "",
  resolve: (val: boolean) => {},
});

function openConfirm(title: string, description: string) {
  confirmState.value.title = title;
  confirmState.value.description = description;
  confirmState.value.isOpen = true;
  return new Promise<boolean>((resolve) => {
    confirmState.value.resolve = resolve;
  });
}

function onConfirm() {
  confirmState.value.isOpen = false;
  confirmState.value.resolve(true);
}

function onCancel() {
  confirmState.value.isOpen = false;
  confirmState.value.resolve(false);
}

const drawing = ref(false);
async function draw(force = false) {
  const confirmed = await openConfirm(
    force ? "Neu auslosen?" : "Wichteln starten?",
    force
      ? "Wirklich neu auslosen? Die alten Zuweisungen gehen verloren!"
      : "Wichteln wirklich starten? Dies kann nicht rückgängig gemacht werden."
  );

  if (!confirmed) return;

  drawing.value = true;
  try {
    await $fetch(`/api/groups/${route.params.id}/draw`, {
      method: "POST",
      body: { force },
      headers: {
        Authorization: route.query.token ? `Bearer ${route.query.token}` : "",
      },
    });
    toast.add({
      title: force ? "Neu ausgelost!" : "Auslosung erfolgreich!",
      color: "success",
    });
    refresh();
  } catch (e: any) {
    toast.add({
      title: "Fehler",
      description: e.statusMessage,
      color: "error",
    });
  } finally {
    drawing.value = false;
  }
}
</script>
