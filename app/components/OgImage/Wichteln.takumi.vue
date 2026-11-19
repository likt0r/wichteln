<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    siteName?: string;
    theme?: string;
    image?: string;
    colorMode?: "light" | "dark";
  }>(),
  {
    title: "Wichteln",
    description: undefined,
    image: undefined,
    siteName: "Wichteln",
    theme: "#00c16a",
    colorMode: "dark",
  }
);
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-center items-center relative p-[60px]"
    :class="
      props.colorMode === 'dark'
        ? 'bg-neutral-900 text-neutral-50'
        : 'bg-white text-neutral-900'
    "
  >
    <img
      v-if="props.image"
      :src="props.image"
      class="absolute top-0 left-0 w-full h-full"
      style="object-fit: cover; opacity: 0.25"
    >
    <div
      class="absolute top-0 left-0 right-0 bottom-0"
      :style="{
        backgroundImage: `radial-gradient(at 100% 100%, ${props.theme}40, transparent), radial-gradient(at 0% 0%, ${props.theme}26, transparent)`,
      }"
    />

    <div class="relative flex flex-col items-center text-center gap-8">
      <div class="flex items-center gap-3">
        <svg
          viewBox="0 0 24 24"
          width="56"
          height="56"
          fill="none"
          :stroke="props.theme"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="8" width="18" height="4" rx="1" />
          <path d="M12 8v13" />
          <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
          <path
            d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"
          />
        </svg>
        <span class="text-[42px] font-bold tracking-tight">
          {{ props.siteName }}
        </span>
      </div>

      <h1
        class="text-[80px] font-bold m-0 leading-tight max-w-[1000px]"
        style="display: block; line-clamp: 3; text-overflow: ellipsis; text-wrap: balance"
      >
        {{ props.title }}
      </h1>

      <p
        v-if="props.description"
        class="text-[32px] opacity-80 max-w-[900px] leading-relaxed"
      >
        {{ props.description }}
      </p>
    </div>
  </div>
</template>
