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
      <div v-if="pending" class="p-10 text-center">
        <UIcon name="i-lucide-loader-circle" class="w-6 h-6 animate-spin" />
      </div>

      <div v-else-if="error || !group" class="p-10 text-center text-neutral-600 dark:text-neutral-400">
        {{ $t("admin.detail.notFound") }}
      </div>

      <template v-else>
        <div class="p-6 border-b border-white/10 dark:border-white/5">
          <div class="flex flex-wrap gap-3 justify-between items-center">
            <h1 class="text-2xl font-bold">{{ group.name }}</h1>
            <UBadge
              :color="group.status === 'open' ? 'info' : 'success'"
              variant="subtle"
              size="lg"
            >
              {{ group.status === "open" ? $t("group.open") : $t("group.drawn") }}
            </UBadge>
          </div>
          <p class="text-sm text-neutral-500 mt-1">
            {{ $t("admin.groups.created") }}: {{ formatDate(group.createdAt) }}
          </p>

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

          <div v-else class="overflow-x-auto">
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
                  class="border-b border-neutral-200/40 dark:border-white/5"
                >
                  <td class="py-3 pr-4 font-medium">{{ row.name }}</td>
                  <td class="py-3 pr-4">
                    <span v-if="row.target" class="flex items-center gap-2">
                      <UIcon name="i-lucide-gift" class="w-4 h-4 text-primary-500 shrink-0" />
                      {{ row.target }}
                    </span>
                    <span v-else class="text-neutral-500">
                      {{ $t("admin.detail.notDrawn") }}
                    </span>
                  </td>
                  <td class="py-3 text-right">
                    <UButton
                      size="xs"
                      color="neutral"
                      variant="ghost"
                      icon="i-lucide-link"
                      @click="copy(memberUrl(row.id))"
                    >
                      {{ $t("group.actions.copyLink") }}
                    </UButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const route = useRoute();
const toast = useToast();
const requestUrl = useRequestURL({ xForwardedHost: true, xForwardedProto: true });

useSeoMeta({ title: () => t("admin.title"), robots: "noindex, nofollow" });

const {
  data: group,
  pending,
  error,
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
  return [
    ...pairs.map((p) => ({ id: p.id, name: p.giver, target: p.receiver })),
    ...members
      .filter((m) => !paired.has(m.id))
      .map((m) => ({ id: m.id, name: m.name, target: undefined })),
  ];
});

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
