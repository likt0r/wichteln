<template>
  <div class="min-h-screen bg-neutral-100 dark:bg-neutral-900 font-sans text-neutral-900 dark:text-neutral-100">
    <header class="bg-white dark:bg-neutral-800 shadow-sm border-b border-neutral-200 dark:border-neutral-700">
      <UContainer class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="flex items-center gap-2">
          <span class="text-2xl">🎁</span>
          <span class="font-bold text-xl tracking-tight">Wichteln</span>
        </NuxtLink>
        
        <div class="flex items-center gap-2">
          <UButton
            to="/"
            icon="i-heroicons-plus"
            variant="ghost"
            color="neutral"
            label="Neue Gruppe"
          />
        </div>
      </UContainer>
    </header>

    <main>
      <slot />
    </main>

    <footer class="py-6 text-center text-neutral-500 text-sm">
      <UContainer>
        <p>Frohe Weihnachten! 🎄</p>
      </UContainer>
    </footer>
  </div>
</template>

