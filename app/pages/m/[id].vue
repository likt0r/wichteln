<template>
  <UContainer class="py-10">
    <div v-if="pending" class="text-center">Lade...</div>
    <div v-else-if="error" class="text-center text-red-500">
      Ungültiger Link
    </div>
    <div v-else>
      <div
        class="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 ring-1 ring-black/5 overflow-hidden"
      >
        <div class="p-8 text-center border-b border-white/10">
          <h2
            class="text-xl text-neutral-500 dark:text-neutral-400 font-medium"
          >
            {{ $t('member.title', { group: data?.group?.name }) }}
          </h2>
          <h1
            class="text-4xl font-bold mt-3 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 flex items-center justify-center gap-3"
          >
            {{ $t('member.hello', { name: data?.member?.name }) }}
            <UIcon name="i-lucide-hand" class="w-8 h-8 text-yellow-500" />
          </h1>
        </div>

        <div class="py-12 px-6 text-center">
          <div v-if="data?.group?.status === 'open'">
            <div class="mb-6 flex justify-center">
              <UIcon
                name="i-lucide-hourglass"
                class="w-20 h-20 text-blue-500 animate-pulse"
              />
            </div>
            <h3 class="text-2xl font-bold mb-2">{{ $t('member.waiting.title') }}</h3>
            <p class="text-neutral-600 dark:text-neutral-300 text-lg">
              {{ $t('member.waiting.desc') }}
            </p>
          </div>

          <div v-else-if="data?.target">
            <p class="text-xl mb-6 text-neutral-600 dark:text-neutral-300">
              {{ $t('member.result.title') }}
            </p>

            <div
              class="relative group max-w-md mx-auto cursor-pointer"
              @click="revealed = !revealed"
            >
              <div
                class="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"
              ></div>

              <div
                class="relative bg-white/80 dark:bg-black/40 p-10 rounded-2xl border border-green-100 dark:border-green-900/30 shadow-lg backdrop-blur-sm flex flex-col items-center gap-4 min-h-[200px] justify-center transition-all duration-500 overflow-hidden"
              >
                <!-- Revealed State -->
                <div
                  v-if="revealed"
                  class="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500"
                >
                  <UIcon
                    name="i-lucide-gift"
                    class="w-16 h-16 text-green-600 dark:text-green-400"
                  />
                  <span
                    class="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight break-all"
                    >{{ data.target.name }}</span
                  >
                </div>

                <!-- Hidden State -->
                <div
                  v-else
                  class="flex flex-col items-center justify-center gap-4 absolute inset-0 bg-neutral-100 dark:bg-neutral-900 z-10 rounded-2xl p-6"
                >
                  <UIcon
                    name="i-lucide-eye"
                    class="w-12 h-12 text-neutral-400 mb-2 animate-bounce shrink-0"
                  />
                  <span
                    class="text-lg font-medium text-neutral-500 uppercase tracking-widest text-center"
                    >{{ $t('member.result.clickToReveal') }}</span
                  >
                </div>
              </div>
            </div>

            <p
              class="mt-10 text-sm text-neutral-500 font-medium uppercase tracking-widest flex items-center justify-center gap-2"
            >
              {{ $t('member.result.psst') }}
              <UIcon name="i-lucide-message-circle-off" class="w-4 h-4" />
            </p>
          </div>

          <div v-else>
            <p class="text-red-500">
              {{ $t('member.error') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute();
const { data, pending, error } = await useFetch(
  `/api/members/${route.params.id}`
);

const revealed = ref(false);
</script>
