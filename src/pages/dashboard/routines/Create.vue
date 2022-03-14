<template>
 <q-list bordered separator>
   <q-item clickable v-ripple :active="active" active-class="text-orange">
        <q-item-section avatar>
          <q-icon name="signal_wifi_off"></q-icon>
        </q-item-section>
        <q-item-section>Active, Active class</q-item-section>
        <q-item-section side>Side</q-item-section>
      </q-item>
      <q-item clickable v-ripple :active="active">
        <q-item-section avatar>
          <q-icon name="signal_wifi_off"></q-icon>
        </q-item-section>
        <q-item-section>Active</q-item-section>
        <q-item-section side>Side</q-item-section>
      </q-item>
      <q-item clickable v-ripple :active="active">
        <q-item-section avatar>
          <q-icon name="signal_wifi_off"></q-icon>
        </q-item-section>
        <q-item-section>Active</q-item-section>
        <q-item-section side>Side</q-item-section>
      </q-item>
      <q-item clickable v-ripple :active="active">
        <q-item-section avatar>
          <q-icon name="signal_wifi_off"></q-icon>
        </q-item-section>
        <q-item-section>Active</q-item-section>
        <q-item-section side>Side</q-item-section>
      </q-item>
      <q-item clickable v-ripple :active="active">
        <q-item-section avatar>
          <q-icon name="signal_wifi_off"></q-icon>
        </q-item-section>
        <q-item-section>Active</q-item-section>
        <q-item-section side>Side</q-item-section>
      </q-item>
      <q-item clickable v-ripple :active="active">
        <q-item-section avatar>
          <q-icon name="signal_wifi_off"></q-icon>
        </q-item-section>
        <q-item-section>Active</q-item-section>
        <q-item-section side>Side</q-item-section>
      </q-item>

 </q-list>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'RoutinesIndex',
  setup () {
    const store = useStore(),
      tabs = []

    onMounted(() => {
      store.dispatch('updateTabs', { tabs })
    })
  }
})
</script>
