<template>
  <UContainer class="py-10">
    <UButton
      to="/admin"
      color="neutral"
      variant="ghost"
      icon="i-lucide-arrow-left"
      class="mb-4"
    >
      {{ $t("admin.detail.back") }}
    </UButton>

    <div
      class="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 ring-1 ring-black/5 overflow-hidden"
    >
      <div v-if="pending && !group" class="p-10 text-center">
        <UIcon name="i-lucide-loader-circle" class="w-6 h-6 animate-spin" />
      </div>

      <div v-else-if="error || !group" class="p-10 text-center text-neutral-600 dark:text-neutral-400">
        {{ $t("admin.detail.notFound") }}
      </div>

      <template v-else>
        <div class="p-6 border-b border-white/10 dark:border-white/5">
          <div class="flex flex-wrap gap-3 justify-between items-center">
            <h1 class="text-2xl font-bold">{{ group.name }}</h1>
            <div class="flex items-center gap-2">
              <UBadge
                v-if="group.round > 1"
                color="neutral"
                variant="subtle"
                size="lg"
                icon="i-lucide-repeat"
              >
                {{ $t("group.round", { n: group.round }) }}
              </UBadge>
              <UBadge
                :color="group.status === 'open' ? 'info' : 'success'"
                variant="subtle"
                size="lg"
              >
                {{ group.status === "open" ? $t("group.open") : $t("group.drawn") }}
              </UBadge>
            </div>
          </div>
          <p class="text-sm text-neutral-500 mt-1">
            {{ $t("admin.groups.created") }}: {{ formatDate(group.createdAt) }}
          </p>

          <div class="flex flex-wrap gap-2 mt-3">
            <UButton
              v-if="group.previousRoundId"
              :to="`/admin/groups/${group.previousRoundId}`"
              size="sm"
              color="neutral"
              variant="soft"
              icon="i-lucide-arrow-left"
            >
              {{ $t("group.nextRound.previous", { n: group.round - 1 }) }}
            </UButton>
            <UButton
              v-if="group.nextRoundId"
              :to="`/admin/groups/${group.nextRoundId}`"
              size="sm"
              color="neutral"
              variant="soft"
              trailing-icon="i-lucide-arrow-right"
            >
              {{ $t("group.nextRound.goTo", { n: group.round + 1 }) }}
            </UButton>
            <UButton
              v-else-if="group.status === 'drawn'"
              size="sm"
              color="primary"
              variant="soft"
              icon="i-lucide-repeat"
              :loading="startingNextRound"
              @click="startNextRound"
            >
              {{ $t("group.nextRound.button") }}
            </UButton>
          </div>

          <div class="flex gap-2 mt-4">
            <UInput
              :model-value="groupAdminUrl"
              readonly
              class="flex-1"
              :ui="{ root: 'bg-white/50 dark:bg-black/50' }"
            />
            <UButton
              icon="i-lucide-clipboard"
              color="neutral"
              variant="soft"
              :aria-label="$t('admin.detail.copyAdminLink')"
              @click="copy(groupAdminUrl)"
            />
            <UButton
              icon="i-lucide-external-link"
              color="neutral"
              variant="soft"
              :to="groupAdminPath"
              :aria-label="$t('admin.detail.openAdminLink')"
            />
          </div>
        </div>

        <div class="p-6">
          <!-- Open round: manage participants and start the draw -->
          <div
            v-if="isOpen"
            class="mb-8 p-5 bg-white/40 dark:bg-white/5 rounded-xl border border-white/20 space-y-5"
          >
            <div>
              <h3 class="font-medium mb-2 text-sm uppercase tracking-wide text-neutral-500">
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
                  :disabled="!newMemberName.trim()"
                  color="primary"
                  variant="soft"
                  icon="i-lucide-plus"
                >
                  {{ $t("group.addMember.button") }}
                </UButton>
              </form>
            </div>

            <div v-if="group.formerParticipants.length">
              <h3 class="font-medium mb-1 text-sm uppercase tracking-wide text-neutral-500">
                {{ $t("group.former.title") }}
              </h3>
              <p class="text-xs text-neutral-500 mb-2">{{ $t("group.former.hint") }}</p>
              <div class="flex flex-wrap gap-2">
                <UButton
                  v-for="person in group.formerParticipants"
                  :key="person.personId"
                  size="sm"
                  color="neutral"
                  variant="soft"
                  icon="i-lucide-user-plus"
                  :loading="readding === person.personId"
                  @click="readdPerson(person.personId)"
                >
                  {{ person.name }}
                </UButton>
              </div>
            </div>

            <div v-if="group.members.length > 1">
              <UButton
                block
                color="primary"
                size="lg"
                class="font-bold"
                :loading="drawing"
                @click="startDraw"
              >
                {{ $t("group.actions.startDraw") }}
              </UButton>
              <p class="text-xs text-center mt-2 text-neutral-500">
                {{ $t("group.actions.startDrawWarning") }}
              </p>
            </div>
          </div>

          <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <UIcon name="i-lucide-users" class="w-5 h-5 text-primary-500" />
            {{ $t("group.participants.title") }}
            <span class="text-neutral-500 font-normal">({{ rows.length }})</span>
          </h2>

          <div
            v-if="rows.length === 0"
            class="text-neutral-500 text-center py-12 bg-white/20 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700"
          >
            {{ $t("group.participants.empty") }}
          </div>

          <template v-else>
            <p v-if="editable" class="text-sm text-neutral-600 dark:text-neutral-400 mb-3 flex items-start gap-2">
              <UIcon name="i-lucide-arrow-left-right" class="w-4 h-4 mt-0.5 shrink-0" />
              {{ $t("admin.edit.hint") }}
            </p>

            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr
                    class="text-left text-xs uppercase tracking-wide text-neutral-500 border-b border-neutral-200/60 dark:border-white/10"
                  >
                    <th class="py-2 pr-4 font-medium">
                      {{ $t("admin.detail.participant") }}
                    </th>
                    <th class="py-2 pr-4 font-medium">
                      {{ $t("admin.detail.gives") }}
                    </th>
                    <th class="py-2 font-medium sr-only">
                      {{ $t("admin.detail.memberLink") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="row in rows"
                    :key="row.id"
                    class="border-b border-neutral-200/40 dark:border-white/5 transition-colors"
                    :class="{
                      'bg-primary-500/10 outline-2 outline-dashed outline-primary-500 -outline-offset-2':
                        dropTarget === row.id && dragGiver !== row.id,
                      'bg-error/10': editable && problem(row.id) === 'self',
                      'bg-warning/10': editable && problem(row.id) === 'repeat',
                    }"
                    @dragover.prevent="editable && dragGiver && (dropTarget = row.id)"
                    @dragleave="dropTarget === row.id && (dropTarget = null)"
                    @drop.prevent="onDrop(row.id)"
                  >
                    <td class="py-2 pr-4 font-medium whitespace-nowrap">{{ row.name }}</td>
                    <td class="py-2 pr-4">
                      <div v-if="editable" class="flex flex-wrap items-center gap-2">
                        <span
                          draggable="true"
                          class="hidden sm:inline-flex cursor-grab active:cursor-grabbing p-1 rounded text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10"
                          :title="$t('admin.edit.dragHandle')"
                          :aria-label="$t('admin.edit.dragHandle')"
                          @dragstart="onDragStart(row.id, $event)"
                          @dragend="onDragEnd"
                        >
                          <UIcon name="i-lucide-grip-vertical" class="w-4 h-4 block" />
                        </span>
                        <USelect
                          :model-value="draft[row.id]"
                          :items="receiverItems(row.id)"
                          :color="problem(row.id) === 'self' ? 'error' : problem(row.id) ? 'warning' : 'neutral'"
                          :highlight="!!problem(row.id)"
                          icon="i-lucide-gift"
                          class="w-40 sm:w-48"
                          :ui="{ base: 'bg-white/50 dark:bg-black/50' }"
                          @update:model-value="(v) => onAssign(row.id, v as string)"
                        />
                        <span
                          v-if="problem(row.id) === 'self'"
                          class="text-xs text-error flex items-center gap-1"
                        >
                          <UIcon name="i-lucide-triangle-alert" class="w-4 h-4" />
                          {{ $t("admin.edit.selfAssigned") }}
                        </span>
                        <UBadge
                          v-if="problem(row.id) === 'repeat'"
                          color="warning"
                          variant="subtle"
                          size="sm"
                          icon="i-lucide-history"
                        >
                          {{ $t("group.repeat.badge", { n: repeatRound(row.id, draft[row.id]) }) }}
                        </UBadge>
                        <UBadge
                          v-if="problem(row.id) !== 'self' && draft[row.id] !== row.targetId"
                          color="warning"
                          variant="subtle"
                          size="sm"
                        >
                          {{ $t("admin.edit.changed") }}
                        </UBadge>
                      </div>
                      <span v-else-if="row.target" class="flex items-center gap-2">
                        <UIcon name="i-lucide-gift" class="w-4 h-4 text-primary-500 shrink-0" />
                        {{ row.target }}
                        <UBadge
                          v-if="repeatRound(row.id, row.targetId)"
                          color="warning"
                          variant="subtle"
                          size="sm"
                          icon="i-lucide-history"
                        >
                          {{ $t("group.repeat.badge", { n: repeatRound(row.id, row.targetId) }) }}
                        </UBadge>
                      </span>
                      <span v-else class="text-neutral-500">
                        {{ $t("admin.detail.notDrawn") }}
                      </span>
                    </td>
                    <td class="py-2 text-right">
                      <UButton
                        size="xs"
                        color="neutral"
                        variant="ghost"
                        icon="i-lucide-link"
                        :aria-label="$t('group.actions.copyLink')"
                        @click="copy(memberUrl(row.id))"
                      >
                        <span class="hidden sm:inline">{{ $t("group.actions.copyLink") }}</span>
                      </UButton>
                      <UButton
                        v-if="isOpen"
                        size="xs"
                        color="error"
                        variant="ghost"
                        icon="i-lucide-user-minus"
                        :aria-label="$t('group.removeMember.button', { name: row.name })"
                        :title="$t('group.removeMember.button', { name: row.name })"
                        :loading="removing === row.id"
                        @click="removeMember(row.id, row.name)"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              v-if="dirty"
              class="mt-4 p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3"
              :class="
                invalid
                  ? 'border-error/40 bg-error/10'
                  : 'border-warning/40 bg-warning/10'
              "
            >
              <div class="text-sm space-y-1">
                <p class="font-medium">
                  {{ invalid ? $t("admin.edit.invalid") : $t("admin.edit.unsaved") }}
                </p>
                <p class="text-neutral-600 dark:text-neutral-400">
                  {{ $t("admin.edit.warning") }}
                </p>
              </div>
              <div class="flex gap-2">
                <UButton color="neutral" variant="ghost" @click="resetDraft">
                  {{ $t("admin.edit.reset") }}
                </UButton>
                <UButton
                  color="primary"
                  icon="i-lucide-save"
                  :disabled="invalid"
                  :loading="saving"
                  @click="save"
                >
                  {{ $t("admin.edit.save") }}
                </UButton>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>

    <UModal v-model:open="confirmState.open" :title="confirmState.title" :description="confirmState.description">
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton color="neutral" variant="ghost" @click="closeConfirm(false)">
            {{ $t("group.confirm.cancel") }}
          </UButton>
          <UButton color="primary" @click="closeConfirm(true)">
            {{ $t("group.confirm.confirm") }}
          </UButton>
        </div>
      </template>
    </UModal>
  </UContainer>
</template>

<script setup lang="ts">
import type { Assignments } from "~/utils/assignments";

const { t, locale } = useI18n();
const route = useRoute();
const toast = useToast();
const requestUrl = useRequestURL({ xForwardedHost: true, xForwardedProto: true });

useSeoMeta({ title: () => t("admin.title"), robots: "noindex, nofollow" });

const {
  data: group,
  pending,
  error,
  refresh,
} = await useFetch(`/api/admin/groups/${route.params.id}`);

// Not logged in (or admin disabled) → back to the login page
if (error.value?.statusCode === 401) {
  await navigateTo("/admin");
}

// Drawn members in chain order, then members without a target
const rows = computed(() => {
  const members = group.value?.members ?? [];
  const pairs = toChainedPairings(members);
  const paired = new Set(pairs.map((p) => p.id));
  const byId = new Map(members.map((m) => [m.id, m]));
  return [
    ...pairs.map((p) => ({
      id: p.id,
      name: p.giver,
      target: p.receiver,
      targetId: byId.get(p.id)?.targetId,
    })),
    ...members
      .filter((m) => !paired.has(m.id))
      .map((m) => ({ id: m.id, name: m.name, target: undefined, targetId: undefined })),
  ];
});

// --- Editing the draw -------------------------------------------------------
// Only for drawn groups where every member has a target, and only for the
// latest round (changing an earlier round could repeat pairs of later rounds)
const editable = computed(
  () =>
    group.value?.status === "drawn" &&
    !group.value.nextRoundId &&
    group.value.members.length > 1 &&
    group.value.members.every((m) => m.targetId)
);

function savedAssignments(): Assignments {
  return Object.fromEntries(
    (group.value?.members ?? []).map((m) => [m.id, m.targetId ?? ""])
  );
}

const draft = ref<Assignments>({});
watch(group, () => (draft.value = savedAssignments()), { immediate: true });

const dirty = computed(() => {
  const saved = savedAssignments();
  return Object.keys(draft.value).some((g) => draft.value[g] !== saved[g]);
});
// Round in which giver → receiver was already drawn earlier in the series
function repeatRound(giverId: string, receiverId?: string) {
  return receiverId ? group.value?.lastGifted[giverId]?.[receiverId] : undefined;
}

// "self" blocks saving; "repeat" (pair from an earlier round) is only a warning
function problem(giverId: string): "self" | "repeat" | null {
  const receiver = draft.value[giverId];
  if (receiver === giverId) return "self";
  if (repeatRound(giverId, receiver)) return "repeat";
  return null;
}
const invalid = computed(() => selfAssigned(draft.value).length > 0);

// The giver is listed but disabled, so a temporary self-assignment still
// shows a name instead of the raw id
function receiverItems(giverId: string) {
  return (group.value?.members ?? []).map((m) => ({
    label: m.name,
    value: m.id,
    disabled: m.id === giverId,
  }));
}

function onAssign(giverId: string, receiverId: string) {
  draft.value = assignReceiver(draft.value, giverId, receiverId);
}

// Drag & drop: drop one row's receiver onto another row to swap them
const dragGiver = ref<string | null>(null);
const dropTarget = ref<string | null>(null);

function onDragStart(giverId: string, event: DragEvent) {
  dragGiver.value = giverId;
  event.dataTransfer?.setData("text/plain", giverId);
  if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
}

function onDragEnd() {
  dragGiver.value = null;
  dropTarget.value = null;
}

function onDrop(giverId: string) {
  if (editable.value && dragGiver.value) {
    draft.value = swapReceivers(draft.value, dragGiver.value, giverId);
  }
  onDragEnd();
}

function resetDraft() {
  draft.value = savedAssignments();
}

// Next round (as global admin)
const startingNextRound = ref(false);
async function startNextRound() {
  startingNextRound.value = true;
  try {
    const next = await $fetch(`/api/groups/${route.params.id}/next-round`, {
      method: "POST",
    });
    toast.add({ title: t("group.nextRound.toast", { n: next.round }), color: "success" });
    await navigateTo(`/admin/groups/${next.id}`);
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

// --- Open round: manage participants -----------------------------------------
const isOpen = computed(() => group.value?.status === "open" && !group.value.nextRoundId);

const confirmState = ref({ open: false, title: "", description: "" });
let confirmResolve: (value: boolean) => void = () => {};
function askConfirm(title: string, description: string) {
  confirmState.value = { open: true, title, description };
  return new Promise<boolean>((resolve) => (confirmResolve = resolve));
}
function closeConfirm(value: boolean) {
  confirmState.value.open = false;
  confirmResolve(value);
}
// Closing the modal via Escape / overlay counts as "cancel"
watch(
  () => confirmState.value.open,
  (open) => !open && confirmResolve(false)
);

function showError(e: unknown) {
  toast.add({
    title: t("group.toast.error"),
    description: (e as { statusMessage?: string }).statusMessage,
    color: "error",
  });
}

const newMemberName = ref("");
const addingMember = ref(false);
async function addMember() {
  const name = newMemberName.value.trim();
  if (!name) return;
  addingMember.value = true;
  try {
    await $fetch(`/api/groups/${route.params.id}/members`, { method: "POST", body: { name } });
    newMemberName.value = "";
    toast.add({ title: t("group.addMember.toast.success") });
    await refresh();
  } catch (e) {
    showError(e);
  } finally {
    addingMember.value = false;
  }
}

const readding = ref<string | null>(null);
async function readdPerson(personId: string) {
  readding.value = personId;
  try {
    await $fetch(`/api/groups/${route.params.id}/members`, { method: "POST", body: { personId } });
    await refresh();
  } catch (e) {
    showError(e);
  } finally {
    readding.value = null;
  }
}

const removing = ref<string | null>(null);
async function removeMember(memberId: string, name: string) {
  if (!(await askConfirm(t("group.removeMember.confirmTitle", { name }), t("group.removeMember.confirmDesc")))) return;
  removing.value = memberId;
  try {
    await $fetch(`/api/groups/${route.params.id}/members/${memberId}`, { method: "DELETE" });
    await refresh();
  } catch (e) {
    showError(e);
  } finally {
    removing.value = null;
  }
}

const drawing = ref(false);
async function startDraw() {
  if (!(await askConfirm(t("group.confirm.startTitle"), t("group.confirm.startDesc")))) return;
  drawing.value = true;
  try {
    const result = await $fetch(`/api/groups/${route.params.id}/draw`, { method: "POST", body: {} });
    toast.add({
      title: t("group.toast.drawn"),
      description: result.repeats ? t("group.repeat.toast", { n: result.repeats }) : undefined,
      color: result.repeats ? "warning" : "success",
    });
    await refresh();
  } catch (e) {
    showError(e);
  } finally {
    drawing.value = false;
  }
}

const saving = ref(false);
async function save() {
  saving.value = true;
  try {
    await $fetch(`/api/admin/groups/${route.params.id}/assignments`, {
      method: "PUT",
      body: { assignments: draft.value },
    });
    toast.add({ title: t("admin.edit.saved"), color: "success" });
    await refresh();
  } catch (e) {
    toast.add({
      title: t("admin.edit.error"),
      description: (e as { statusMessage?: string }).statusMessage,
      color: "error",
    });
  } finally {
    saving.value = false;
  }
}

const groupAdminPath = computed(() =>
  group.value ? `/groups/${group.value.id}?token=${group.value.adminToken}` : ""
);
const groupAdminUrl = computed(() => `${requestUrl.origin}${groupAdminPath.value}`);

function memberUrl(memberId: string) {
  return `${requestUrl.origin}/m/${memberId}`;
}

function formatDate(value: string | Date) {
  return new Date(value).toLocaleString(locale.value, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function copy(text: string) {
  navigator.clipboard.writeText(text);
  toast.add({ title: t("group.toast.copied"), duration: 1500 });
}
</script>
