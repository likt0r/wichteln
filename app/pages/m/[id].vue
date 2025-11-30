<template>
  <UContainer class="py-10">
    <div v-if="pending" class="text-center">Lade...</div>
    <div v-else-if="error" class="text-center text-red-500">Ungültiger Link</div>
    <div v-else>
      <div class="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 ring-1 ring-black/5 overflow-hidden">
        <div class="p-8 text-center border-b border-white/10">
           <h2 class="text-xl text-neutral-500 dark:text-neutral-400 font-medium">Wichteln: {{ data?.group?.name }}</h2>
           <h1 class="text-4xl font-bold mt-3 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400">
             Hallo, {{ data?.member?.name }}! 👋
           </h1>
        </div>

        <div class="py-12 px-6 text-center">
          <div v-if="data?.group?.status === 'open'">
             <div class="text-7xl mb-6 animate-pulse">⏳</div>
             <h3 class="text-2xl font-bold mb-2">Die Auslosung läuft...</h3>
             <p class="text-neutral-600 dark:text-neutral-300 text-lg">Der Organisator hat das Wichteln noch nicht gestartet.</p>
          </div>

          <div v-else-if="data?.target">
             <p class="text-xl mb-6 text-neutral-600 dark:text-neutral-300">Das Los hat entschieden! Du beschenkst:</p>
             
             <div class="relative group">
               <div class="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
               <div class="relative bg-white/80 dark:bg-black/40 p-10 rounded-2xl border border-green-100 dark:border-green-900/30 shadow-lg backdrop-blur-sm">
                  <span class="text-5xl mb-4 block">🎁</span>
                  <span class="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight">{{ data.target.name }}</span>
               </div>
             </div>

             <p class="mt-10 text-sm text-neutral-500 font-medium uppercase tracking-widest">Pssst! Nicht verraten! 🤫</p>
          </div>
          
          <div v-else>
             <p class="text-red-500">Ein Fehler ist aufgetreten. Bitte kontaktiere den Admin.</p>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const { data, pending, error } = await useFetch(`/api/members/${route.params.id}`)
</script>

