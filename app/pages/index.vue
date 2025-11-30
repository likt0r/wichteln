<template>
  <UContainer class="flex-1 flex flex-col justify-center items-center py-10">
    <div class="w-full max-w-lg bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 border border-white/20 ring-1 ring-black/5">
      <div class="flex flex-col gap-6 items-center">
        <div class="text-center space-y-2">
          <h1 class="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800 dark:from-red-500 dark:to-red-400 pb-2">
            Wichtel App
          </h1>
          <p class="text-lg text-neutral-700 dark:text-neutral-200">
            Erstelle eine Gruppe und lasst den Zufall entscheiden! 🎅
          </p>
        </div>

        <UForm :state="state" @submit="onSubmit" class="w-full space-y-4 mt-4">
          <UFormField name="name" class="w-full">
            <UInput 
              v-model="state.name" 
              placeholder="Name der Gruppe (z.B. Weihnachtsfeier)" 
              size="xl"
              :ui="{ root: 'bg-white/50 dark:bg-black/50 backdrop-blur-sm' }"
              class="w-full"
            >
              <template #leading>
                <span class="text-xl">🎄</span>
              </template>
            </UInput>
          </UFormField>

          <UButton 
            type="submit" 
            block 
            size="xl" 
            :loading="loading"
            color="primary"
            variant="solid"
            class="font-bold transition-transform hover:scale-[1.02]"
          >
            Gruppe erstellen
          </UButton>
        </UForm>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const state = reactive({
  name: ''
})

const loading = ref(false)
const toast = useToast()
const router = useRouter()

async function onSubmit() {
  if (!state.name) return

  loading.value = true
  try {
    const data = await $fetch('/api/groups', {
      method: 'POST',
      body: { name: state.name }
    })
    
    // Redirect to admin page
    router.push({ 
      path: `/groups/${data.id}`, 
      query: { token: data.adminToken } 
    })
    
    toast.add({ title: 'Gruppe erstellt!', color: 'green' })
  } catch (e) {
    toast.add({ title: 'Fehler beim Erstellen', color: 'red' })
  } finally {
    loading.value = false
  }
}
</script>

