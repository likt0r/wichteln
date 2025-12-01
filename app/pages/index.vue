<template>
  <UContainer class="flex-1 flex flex-col justify-center items-center py-10">
    <div class="w-full max-w-lg bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 border border-white/20 ring-1 ring-black/5">
      <div class="flex flex-col gap-6 items-center">
        <div class="text-center space-y-2">
          <h1 class="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800 dark:from-red-500 dark:to-red-400 pb-2">
            {{ $t('home.title') }}
          </h1>
          <p class="text-lg text-neutral-700 dark:text-neutral-200 flex items-center justify-center gap-2">
            {{ $t('home.subtitle') }}
            <UIcon name="i-lucide-party-popper" class="w-5 h-5" />
          </p>
        </div>

        <UForm :state="state" @submit="onSubmit" class="w-full space-y-4 mt-4">
          <UFormField name="name" class="w-full">
            <UInput 
              v-model="state.name" 
              :placeholder="$t('home.groupNamePlaceholder')" 
              size="xl"
              :ui="{ root: 'bg-white/50 dark:bg-black/50 backdrop-blur-sm' }"
              class="w-full"
              icon="i-lucide-trees"
            />
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
            {{ $t('home.createButton') }}
          </UButton>
        </UForm>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()
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
    
    toast.add({ title: t('home.toast.created'), color: 'green' })
  } catch (e) {
    toast.add({ title: t('home.toast.error'), color: 'red' })
  } finally {
    loading.value = false
  }
}
</script>
