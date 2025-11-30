<template>
  <UContainer class="py-10">
    <div v-if="pending" class="text-center">Lade...</div>
    <div v-else-if="error" class="text-center text-red-500">Ungültiger Link</div>
    <div v-else>
      <UCard>
        <template #header>
           <div class="text-center">
             <h2 class="text-xl text-neutral-500">Wichteln: {{ data?.group?.name }}</h2>
             <h1 class="text-3xl font-bold mt-2">Hallo, {{ data?.member?.name }}! 👋</h1>
           </div>
        </template>

        <div class="py-8 text-center">
          <div v-if="data?.group?.status === 'open'">
             <div class="text-6xl mb-4">⏳</div>
             <h3 class="text-xl font-semibold">Die Auslosung hat noch nicht begonnen.</h3>
             <p class="text-neutral-500 mt-2">Bitte gedulde dich noch etwas, bis der Organisator das Wichteln startet.</p>
          </div>

          <div v-else-if="data?.target">
             <p class="text-lg mb-4">Das Los hat entschieden! Du beschenkst:</p>
             <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-100 dark:border-green-800 inline-block min-w-[200px]">
                <span class="text-4xl font-bold text-green-600 dark:text-green-400 block mb-2">🎁</span>
                <span class="text-3xl font-bold text-neutral-900 dark:text-white">{{ data.target.name }}</span>
             </div>
             <p class="mt-8 text-sm text-neutral-500">Pssst! Nicht verraten! 🤫</p>
          </div>
          
          <div v-else>
             <p class="text-red-500">Ein Fehler ist aufgetreten. Bitte kontaktiere den Admin.</p>
          </div>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const { data, pending, error } = await useFetch(`/api/members/${route.params.id}`)
</script>

