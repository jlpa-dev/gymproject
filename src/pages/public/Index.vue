<template>
  <q-page class="flex flex-center">
    <h3>PUBLIC</h3>
  </q-page>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PageIndex',
  setup () {
    const store = useStore(),
      tabs = []

    onMounted(() => {
      store.dispatch('updateTabs', { tabs })
    })
  }
})
</script>
