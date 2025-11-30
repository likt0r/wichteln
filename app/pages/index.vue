<template>
  <UContainer class="py-10">
    <UCard>
      <template #header>
        <h1 class="text-2xl font-bold text-center">🎅 Wichtel App 🎁</h1>
      </template>

      <div class="flex flex-col gap-4 items-center">
        <p class="text-neutral-600 dark:text-neutral-300 text-center">
          Erstelle eine Wichtel-Gruppe, lade deine Freunde ein und lasst den Zufall entscheiden!
        </p>

        <UForm :state="state" @submit="onSubmit" class="w-full max-w-md space-y-4">
          <UFormField label="Gruppen Name" name="name" required>
            <UInput v-model="state.name" placeholder="z.B. Weihnachtsfeier 2025" />
          </UFormField>

          <UButton type="submit" block :loading="loading">Gruppe erstellen</UButton>
        </UForm>
      </div>
    </UCard>
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

