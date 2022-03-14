<template>
  <q-page class="flex flex-center">
    <router-view />
  </q-page>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'DashboardIndex',
  setup () {
    const store = useStore(),
      tabs = []

    onMounted(() => {
      store.dispatch('updateTabs', { tabs })
    })
  }
})
</script>
