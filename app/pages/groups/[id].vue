<template>
  <UContainer class="py-10">
    <div v-if="pending" class="text-center">Lade...</div>
    <div v-else-if="error" class="text-center text-red-500">Gruppe nicht gefunden</div>
    <div v-else>
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">{{ group?.name }}</h1>
            <UBadge :color="group?.status === 'open' ? 'info' : 'success'">
              {{ group?.status === 'open' ? 'Offen' : 'Ausgelost' }}
            </UBadge>
          </div>
        </template>

        <div v-if="group?.isAdmin" class="mb-8 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <h2 class="text-lg font-semibold mb-2">👑 Admin Bereich</h2>
          <p class="text-sm text-neutral-500 mb-4">Speichere diesen Link um später zurückzukehren!</p>
          
          <div class="flex gap-2 mb-4">
            <UInput :model-value="adminUrl" readonly class="flex-1" />
            <UButton icon="i-heroicons-clipboard" color="neutral" variant="subtle" @click="copyToClipboard(adminUrl)" />
          </div>

          <div v-if="group?.status === 'open'" class="mt-4">
             <h3 class="font-medium mb-2">Neuen Teilnehmer hinzufügen</h3>
             <form @submit.prevent="addMember" class="flex gap-2">
               <UInput v-model="newMemberName" placeholder="Name" class="flex-1" />
               <UButton type="submit" :loading="addingMember">Hinzufügen</UButton>
             </form>
          </div>
          
          <div v-if="group?.status === 'open' && group?.members?.length > 1" class="mt-6">
            <UButton block color="primary" size="lg" :loading="drawing" @click="draw">
              🎲 Wichteln starten
            </UButton>
            <p class="text-xs text-center mt-2 text-neutral-500">
              Achtung: Dies weist jedem Teilnehmer zufällig einen Partner zu und schließt die Gruppe.
            </p>
          </div>
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-4">Teilnehmer ({{ group?.members?.length || 0 }})</h2>
          
          <div v-if="group?.members?.length === 0" class="text-neutral-500 text-center py-4">
            Noch keine Teilnehmer.
          </div>

          <ul class="space-y-2">
            <li v-for="member in group?.members" :key="member.name" class="p-3 rounded border border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
              <span class="font-medium">{{ member.name }}</span>
              
              <div v-if="group?.isAdmin && member.id" class="flex items-center gap-2">
                 <UButton size="xs" color="neutral" variant="ghost" icon="i-heroicons-link" @click="copyToClipboard(getMemberUrl(member.id))">
                   Link kopieren
                 </UButton>
              </div>
              <div v-else-if="member.hasDrawn">
                <UIcon name="i-heroicons-check-circle" class="text-green-500" />
              </div>
            </li>
          </ul>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const toast = useToast()
const { data: group, pending, error, refresh } = await useFetch(`/api/groups/${route.params.id}`, {
  headers: {
    Authorization: route.query.token ? `Bearer ${route.query.token}` : ''
  }
})

const adminUrl = computed(() => {
  if (process.client) {
    return `${window.location.origin}/groups/${route.params.id}?token=${route.query.token}`
  }
  return ''
})

function getMemberUrl(memberId: string) {
  if (process.client) {
    return `${window.location.origin}/m/${memberId}`
  }
  return ''
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
  toast.add({ title: 'Kopiert!', duration: 1500 })
}

// Add Member
const newMemberName = ref('')
const addingMember = ref(false)

async function addMember() {
  if (!newMemberName.value) return
  addingMember.value = true
  try {
    await $fetch(`/api/groups/${route.params.id}/members`, {
      method: 'POST',
      body: { name: newMemberName.value }
    })
    newMemberName.value = ''
    toast.add({ title: 'Teilnehmer hinzugefügt' })
    refresh()
  } catch (e) {
    toast.add({ title: 'Fehler', description: e.statusMessage, color: 'red' })
  } finally {
    addingMember.value = false
  }
}

// Draw
const drawing = ref(false)
async function draw() {
  if (!confirm('Wichteln wirklich starten? Dies kann nicht rückgängig gemacht werden.')) return
  
  drawing.value = true
  try {
    await $fetch(`/api/groups/${route.params.id}/draw`, {
      method: 'POST',
      headers: {
         Authorization: route.query.token ? `Bearer ${route.query.token}` : ''
      }
    })
    toast.add({ title: 'Auslosung erfolgreich!', color: 'green' })
    refresh()
  } catch (e) {
     toast.add({ title: 'Fehler', description: e.statusMessage, color: 'red' })
  } finally {
    drawing.value = false
  }
}
</script>

