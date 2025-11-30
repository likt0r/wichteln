<template>
  <UContainer class="py-10">
    <div v-if="pending" class="text-center">Lade...</div>
    <div v-else-if="error" class="text-center text-red-500">Gruppe nicht gefunden</div>
    <div v-else>
      <div class="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 ring-1 ring-black/5 overflow-hidden">
        <div class="p-6 border-b border-white/10 dark:border-white/5">
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">{{ group?.name }}</h1>
            <UBadge :color="group?.status === 'open' ? 'info' : 'success'" variant="subtle" size="lg">
              {{ group?.status === 'open' ? 'Offen' : 'Ausgelost' }}
            </UBadge>
          </div>
        </div>

        <div class="p-6">
          <div v-if="group?.isAdmin" class="mb-8 p-6 bg-white/40 dark:bg-white/5 rounded-xl border border-white/20 backdrop-blur-sm">
            <h2 class="text-lg font-semibold mb-2 flex items-center gap-2">
              <span>👑</span> Admin Bereich
            </h2>
            <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-6">Speichere diesen Link um später zurückzukehren!</p>
            
            <div class="flex gap-2 mb-6">
              <UInput 
                :model-value="adminUrl" 
                readonly 
                class="flex-1" 
                :ui="{ root: 'bg-white/50 dark:bg-black/50' }"
              />
              <UButton icon="i-heroicons-clipboard" color="neutral" variant="soft" @click="copyToClipboard(adminUrl)" />
            </div>

            <div v-if="group?.status === 'open'" class="mt-4 space-y-4">
               <div>
                 <h3 class="font-medium mb-2 text-sm uppercase tracking-wide text-neutral-500">Neuen Teilnehmer hinzufügen</h3>
                 <form @submit.prevent="addMember" class="flex gap-2">
                   <UInput 
                     v-model="newMemberName" 
                     placeholder="Name" 
                     class="flex-1" 
                     :ui="{ root: 'bg-white/50 dark:bg-black/50' }"
                   />
                   <UButton type="submit" :loading="addingMember" color="primary" variant="soft">Hinzufügen</UButton>
                 </form>
               </div>
            </div>
            
            <div v-if="group?.status === 'open' && group?.members?.length > 1" class="mt-8 pt-6 border-t border-neutral-200/50 dark:border-white/10">
              <UButton block color="primary" size="xl" :loading="drawing" @click="draw" class="font-bold">
                🎲 Wichteln starten
              </UButton>
              <p class="text-xs text-center mt-3 text-neutral-500">
                Achtung: Dies weist jedem Teilnehmer zufällig einen Partner zu und schließt die Gruppe.
              </p>
            </div>
          </div>

          <div>
            <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>👥</span> Teilnehmer <span class="text-neutral-500 font-normal">({{ group?.members?.length || 0 }})</span>
            </h2>
            
            <div v-if="group?.members?.length === 0" class="text-neutral-500 text-center py-12 bg-white/20 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700">
              Noch keine Teilnehmer.
            </div>

            <ul class="space-y-2">
              <li v-for="member in group?.members" :key="member.name" class="p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-white/20 flex justify-between items-center transition-colors hover:bg-white/60 dark:hover:bg-white/10">
                <span class="font-medium">{{ member.name }}</span>
                
                <div v-if="group?.isAdmin && member.id" class="flex items-center gap-2">
                   <UButton size="xs" color="neutral" variant="ghost" icon="i-heroicons-link" @click="copyToClipboard(getMemberUrl(member.id))">
                     Link kopieren
                   </UButton>
                </div>
                <div v-else-if="member.hasDrawn">
                  <UIcon name="i-heroicons-check-circle" class="text-green-500 w-6 h-6" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
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

