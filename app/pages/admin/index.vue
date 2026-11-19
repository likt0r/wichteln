<template>
  <UContainer class="py-10">
    <div
      class="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 ring-1 ring-black/5 overflow-hidden"
    >
      <div
        class="p-6 border-b border-white/10 dark:border-white/5 flex flex-wrap gap-4 justify-between items-center"
      >
        <h1 class="text-2xl font-bold flex items-center gap-2">
          <UIcon name="i-lucide-shield" class="w-6 h-6 text-primary-500" />
          {{ $t("admin.title") }}
        </h1>
        <UButton
          v-if="session?.authenticated"
          color="neutral"
          variant="ghost"
          icon="i-lucide-log-out"
          @click="logout"
        >
          {{ $t("admin.logout") }}
        </UButton>
      </div>

      <div class="p-6">
        <!-- Disabled: no password configured -->
        <div
          v-if="session && !session.enabled"
          class="text-center py-10 text-neutral-600 dark:text-neutral-400"
        >
          <UIcon name="i-lucide-lock" class="w-10 h-10 mx-auto mb-4" />
          <p>{{ $t("admin.disabled") }}</p>
        </div>

        <!-- Login -->
        <form
          v-else-if="session && !session.authenticated"
          class="max-w-sm mx-auto py-6 space-y-4"
          @submit.prevent="login"
        >
          <h2 class="text-lg font-semibold text-center">
            {{ $t("admin.login.title") }}
          </h2>
          <UInput
            v-model="password"
            type="password"
            autocomplete="current-password"
            :placeholder="$t('admin.login.password')"
            size="xl"
            icon="i-lucide-key-round"
            class="w-full"
            :ui="{ root: 'bg-white/50 dark:bg-black/50' }"
            autofocus
          />
          <p v-if="loginError" class="text-sm text-error text-center">
            {{ loginError }}
          </p>
          <UButton
            type="submit"
            block
            size="xl"
            color="primary"
            :loading="loggingIn"
            :disabled="!password"
          >
            {{ $t("admin.login.button") }}
          </UButton>
        </form>

        <!-- Group list -->
        <div v-else-if="session?.authenticated">
          <div class="flex flex-wrap gap-3 justify-between items-center mb-4">
            <h2 class="text-lg font-semibold flex items-center gap-2">
              {{ $t("admin.groups.title") }}
              <span class="text-neutral-500 font-normal">
                ({{ groups?.length ?? 0 }})
              </span>
            </h2>
            <UInput
              v-model="search"
              :placeholder="$t('admin.groups.search')"
              icon="i-lucide-search"
              class="w-full sm:w-64"
              :ui="{ root: 'bg-white/50 dark:bg-black/50' }"
            />
          </div>

          <div v-if="groupsPending" class="text-center py-10">
            <UIcon name="i-lucide-loader-circle" class="w-6 h-6 animate-spin" />
          </div>

          <div
            v-else-if="filteredGroups.length === 0"
            class="text-neutral-500 text-center py-12 bg-white/20 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700"
          >
            {{ $t("admin.groups.empty") }}
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr
                  class="text-left text-xs uppercase tracking-wide text-neutral-500 border-b border-neutral-200/60 dark:border-white/10"
                >
                  <th class="py-2 pr-4 font-medium">
                    {{ $t("admin.groups.name") }}
                  </th>
                  <th class="py-2 pr-4 font-medium">
                    {{ $t("admin.groups.status") }}
                  </th>
                  <th class="py-2 pr-4 font-medium text-right">
                    {{ $t("admin.groups.members") }}
                  </th>
                  <th class="py-2 pr-4 font-medium">
                    {{ $t("admin.groups.created") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="g in filteredGroups"
                  :key="g.id"
                  class="border-b border-neutral-200/40 dark:border-white/5 hover:bg-white/40 dark:hover:bg-white/5 cursor-pointer"
                  @click="navigateTo(`/admin/groups/${g.id}`)"
                >
                  <td class="py-3 pr-4 font-medium">
                    <NuxtLink
                      :to="`/admin/groups/${g.id}`"
                      class="hover:underline"
                      @click.stop
                    >
                      {{ g.name }}
                    </NuxtLink>
                  </td>
                  <td class="py-3 pr-4">
                    <UBadge
                      :color="g.status === 'open' ? 'info' : 'success'"
                      variant="subtle"
                    >
                      {{
                        g.status === "open" ? $t("group.open") : $t("group.drawn")
                      }}
                    </UBadge>
                  </td>
                  <td class="py-3 pr-4 text-right tabular-nums">
                    {{ g.memberCount }}
                  </td>
                  <td class="py-3 pr-4 whitespace-nowrap text-neutral-600 dark:text-neutral-400">
                    {{ formatDate(g.createdAt) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

useSeoMeta({ title: () => t("admin.title"), robots: "noindex, nofollow" });

const { data: session, refresh: refreshSession } =
  await useFetch("/api/admin/session");

const {
  data: groups,
  pending: groupsPending,
  execute: loadGroups,
  clear: clearGroups,
} = await useFetch("/api/admin/groups", {
  immediate: !!session.value?.authenticated,
});

const search = ref("");
const filteredGroups = computed(() => {
  const q = search.value.trim().toLowerCase();
  const list = groups.value ?? [];
  return q ? list.filter((g) => g.name.toLowerCase().includes(q)) : list;
});

function formatDate(value: string | Date) {
  return new Date(value).toLocaleString(locale.value, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// Login / logout
const password = ref("");
const loggingIn = ref(false);
const loginError = ref("");

async function login() {
  loggingIn.value = true;
  loginError.value = "";
  try {
    await $fetch("/api/admin/login", {
      method: "POST",
      body: { password: password.value },
    });
    password.value = "";
    await refreshSession();
    await loadGroups();
  } catch (e) {
    const status = (e as { statusCode?: number }).statusCode;
    loginError.value =
      status === 429 ? t("admin.login.tooMany") : t("admin.login.error");
  } finally {
    loggingIn.value = false;
  }
}

async function logout() {
  await $fetch("/api/admin/logout", { method: "POST" });
  clearGroups();
  await refreshSession();
}
</script>
