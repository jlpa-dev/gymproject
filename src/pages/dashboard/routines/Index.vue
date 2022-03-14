<template>
  <q-page padding>
      <router-view/>
  </q-page>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'ExerciseIndex',
  setup () {
    const store = useStore(),
      tabs = [{
        icon: '',
        label: 'Rutinas',
        to: '/rutinas',
        id: 1
      },
      {
        icon: '',
        label: 'Calendario',
        to: '/rutinas/calendario',
        id: 1
      }]

    onMounted(() => {
      store.dispatch('updateTabs', { tabs })
    })
  }
})
</script>
