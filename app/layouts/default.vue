<template>
  <div
    class="min-h-screen font-sans text-neutral-900 dark:text-neutral-100 relative"
  >
    <div
      class="fixed inset-0 z-0 bg-cover bg-center"
      style="background-image: url('/background.png')"
    ></div>

    <div
      class="relative z-10 min-h-screen bg-white/10 dark:bg-black/40 backdrop-blur-[2px] flex flex-col"
    >
      <main class="flex-1 flex flex-col">
        <slot />
      </main>
    </div>
  </div>
</template>
