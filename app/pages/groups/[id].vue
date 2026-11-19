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
          <div class="flex flex-wrap gap-3 justify-between items-center">
            <h1 class="text-2xl font-bold">{{ group?.name }}</h1>
            <div class="flex items-center gap-2">
              <UBadge
                v-if="(group?.round ?? 1) > 1"
                color="neutral"
                variant="subtle"
                size="lg"
                icon="i-lucide-repeat"
              >
                {{ $t("group.round", { n: group?.round }) }}
              </UBadge>
              <UBadge
                :color="group?.status === 'open' ? 'info' : 'success'"
                variant="subtle"
                size="lg"
              >
                {{
                  group?.status === "open" ? $t("group.open") : $t("group.drawn")
                }}
              </UBadge>
            </div>
          </div>
          <NuxtLink
            v-if="group?.previousRound"
            :to="roundUrl(group.previousRound)"
            class="mt-2 inline-flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:underline"
          >
            <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
            {{ $t("group.nextRound.previous", { n: group.previousRound.round }) }}
          </NuxtLink>
        </div>

        <div class="p-6">
          <div
            v-if="group?.isAdmin"
            class="mb-8 p-6 bg-white/40 dark:bg-white/5 rounded-xl border border-white/20 backdrop-blur-sm"
          >
            <h2 class="text-lg font-semibold mb-2 flex items-center gap-2">
              <UIcon name="i-lucide-crown" class="w-5 h-5 text-yellow-500" />
              {{ $t("group.adminArea") }}
            </h2>
            <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
              {{ $t("group.saveLink") }}
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
                  {{ $t("group.addMember.title") }}
                </h3>
                <form class="flex gap-2" @submit.prevent="addMember">
                  <UInput
                    v-model="newMemberName"
                    :placeholder="$t('group.addMember.placeholder')"
                    class="flex-1"
                    :ui="{ root: 'bg-white/50 dark:bg-black/50' }"
                  />
                  <UButton
                    type="submit"
                    :loading="addingMember"
                    color="primary"
                    variant="soft"
                    icon="i-lucide-plus"
                    >{{ $t("group.addMember.button") }}</UButton
                  >
                </form>
              </div>
            </div>

            <div
              class="mt-8 pt-6 border-t border-neutral-200/50 dark:border-white/10 space-y-4"
            >
              <div v-if="group?.status === 'drawn'">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <h3
                      class="font-medium text-sm uppercase tracking-wide text-neutral-500 flex items-center gap-2"
                    >
                      <UIcon name="i-lucide-shuffle" class="w-4 h-4" />
                      {{ $t("group.results.title") }}
                    </h3>
                    <p class="text-xs text-neutral-500 mt-1">
                      {{ $t("group.results.hint") }}
                    </p>
                  </div>
                  <USwitch
                    v-model="showResults"
                    :label="$t('group.actions.showResults')"
                    class="shrink-0"
                  />
                </div>

                <ul
                  v-if="showResults"
                  class="mt-4 divide-y divide-neutral-200/60 dark:divide-white/10 rounded-xl bg-white/50 dark:bg-black/30 border border-white/20"
                >
                  <li
                    v-for="pair in pairings"
                    :key="pair.id"
                    class="px-4 py-2.5 grid grid-cols-[1fr_auto_1fr] items-center gap-3"
                  >
                    <span class="font-medium truncate">{{ pair.giver }}</span>
                    <span
                      class="flex items-center gap-1 text-primary-500"
                      :title="$t('group.results.gives')"
                    >
                      <UIcon name="i-lucide-gift" class="w-4 h-4" />
                      <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
                    </span>
                    <span class="truncate">{{ pair.receiver }}</span>
                  </li>
                </ul>
              </div>

              <div
                v-if="group?.status === 'open' && group?.members?.length > 1"
              >
                <UButton
                  block
                  color="primary"
                  size="xl"
                  :loading="drawing"
                  class="font-bold"
                  @click="draw(false)"
                >
                  {{ $t("group.actions.startDraw") }}
                </UButton>
                <p class="text-xs text-center mt-3 text-neutral-500">
                  {{ $t("group.actions.startDrawWarning") }}
                </p>
              </div>

              <div v-if="group?.status === 'drawn' && !group?.nextRound" class="pt-4">
                <UButton
                  block
                  color="neutral"
                  variant="ghost"
                  :loading="drawing"
                  icon="i-lucide-refresh-cw"
                  @click="draw(true)"
                >
                  {{ $t("group.actions.redraw") }}
                </UButton>
              </div>

              <!-- Next round -->
              <div
                v-if="group?.status === 'drawn'"
                class="pt-6 border-t border-neutral-200/50 dark:border-white/10"
              >
                <h3
                  class="font-medium text-sm uppercase tracking-wide text-neutral-500 flex items-center gap-2 mb-2"
                >
                  <UIcon name="i-lucide-repeat" class="w-4 h-4" />
                  {{ $t("group.nextRound.title") }}
                </h3>

                <UButton
                  v-if="group.nextRound"
                  block
                  color="primary"
                  variant="soft"
                  trailing-icon="i-lucide-arrow-right"
                  :to="roundUrl(group.nextRound)"
                >
                  {{ $t("group.nextRound.goTo", { n: group.nextRound.round }) }}
                </UButton>

                <div
                  v-else-if="group.seriesComplete"
                  class="p-4 rounded-xl bg-success/10 border border-success/30 text-sm flex items-start gap-2"
                >
                  <UIcon name="i-lucide-party-popper" class="w-5 h-5 text-success shrink-0" />
                  {{ $t("group.nextRound.complete") }}
                </div>

                <template v-else>
                  <p class="text-xs text-neutral-500 mb-3">
                    {{ $t("group.nextRound.desc") }}
                  </p>
                  <UButton
                    block
                    color="primary"
                    variant="soft"
                    icon="i-lucide-repeat"
                    :loading="startingNextRound"
                    @click="startNextRound"
                  >
                    {{ $t("group.nextRound.button") }}
                  </UButton>
                </template>
              </div>
            </div>
          </div>

          <div>
            <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <UIcon name="i-lucide-users" class="w-5 h-5 text-primary-500" />
              {{ $t("group.participants.title") }}
              <span class="text-neutral-500 font-normal"
                >({{ group?.members?.length || 0 }})</span
              >
            </h2>

            <div
              v-if="group?.members?.length === 0"
              class="text-neutral-500 text-center py-12 bg-white/20 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700"
            >
              {{ $t("group.participants.empty") }}
            </div>

            <ul class="space-y-2">
              <li
                v-for="member in group?.members"
                :key="member.id ?? member.name"
                class="p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-white/20 flex justify-between items-center transition-colors hover:bg-white/60 dark:hover:bg-white/10"
              >
                <div class="flex items-center gap-2">
                  <span class="font-medium">{{ member.name }}</span>
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
                    {{ $t("group.actions.copyLink") }}
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
          <UButton color="neutral" variant="ghost" @click="onCancel">{{
            $t("group.confirm.cancel")
          }}</UButton>
          <UButton color="primary" @click="onConfirm">{{
            $t("group.confirm.confirm")
          }}</UButton>
        </div>
      </template>
    </UModal>
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n();
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

const pairings = computed(() => toChainedPairings(group.value?.members ?? []));

const adminUrl = computed(() => {
  if (import.meta.client) {
    return `${window.location.origin}/groups/${route.params.id}?token=${route.query.token}`;
  }
  return "";
});

function getMemberUrl(memberId: string) {
  if (import.meta.client) {
    return `${window.location.origin}/m/${memberId}`;
  }
  return "";
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
  toast.add({ title: t("group.toast.copied"), duration: 1500 });
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
    toast.add({ title: t("group.addMember.toast.success") });
    refresh();
  } catch (e) {
    toast.add({
      title: t("group.addMember.toast.error"),
      description: (e as { statusMessage?: string }).statusMessage,
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
  resolve: (_val: boolean) => {},
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

// Next round
function roundUrl(round: { id: string; adminToken: string }) {
  return `/groups/${round.id}?token=${round.adminToken}`;
}

const startingNextRound = ref(false);
async function startNextRound() {
  const confirmed = await openConfirm(
    t("group.nextRound.confirmTitle"),
    t("group.nextRound.confirmDesc")
  );
  if (!confirmed) return;

  startingNextRound.value = true;
  try {
    const next = await $fetch(`/api/groups/${route.params.id}/next-round`, {
      method: "POST",
      headers: {
        Authorization: route.query.token ? `Bearer ${route.query.token}` : "",
      },
    });
    toast.add({
      title: t("group.nextRound.toast", { n: next.round }),
      color: "success",
    });
    await navigateTo(roundUrl(next));
  } catch (e) {
    toast.add({
      title: t("group.toast.error"),
      description: (e as { statusMessage?: string }).statusMessage,
      color: "error",
    });
  } finally {
    startingNextRound.value = false;
  }
}

const drawing = ref(false);
async function draw(force = false) {
  const confirmed = await openConfirm(
    force ? t("group.confirm.redrawTitle") : t("group.confirm.startTitle"),
    force ? t("group.confirm.redrawDesc") : t("group.confirm.startDesc")
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
      title: force ? t("group.toast.redrawn") : t("group.toast.drawn"),
      color: "success",
    });
    refresh();
  } catch (e) {
    toast.add({
      title: t("group.toast.error"),
      description: (e as { statusMessage?: string }).statusMessage,
      color: "error",
    });
  } finally {
    drawing.value = false;
  }
}
</script>
