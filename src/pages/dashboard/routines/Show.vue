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
import { defineComponent } from 'vue'
// import { useStore } from 'vuex'
export default defineComponent({
  name: 'RoutineIndex',
  setup () {
    const data = [{
      name: 'Corredor',
      tipo: 'intervalo',
      duracion: '10 min'
    },
    {
      name: 'Piernas de echado',
      tipo: 'repeticiones con peso',
      peso: '20kg'

    }]

    // Piernas sentado 5kg ñññ 10kg ñ
    // Gluteos maquina 5kg ñññ 10kg ñ
    // Sentadillas en maquina 0kg ññññ 10kg ñ

    // Pecho en maquina 5kg ñññ 10kg ñ
    // Hombros en maquina 5kg ñññ 10 kg ñ
    // Pecho en maquina de arco 10kg ñññ 15kg ñ

    // Maquina de arco inflador de llanta xd 10kg ñññ 15kg ñ
    // La soguita de al frente 10kg ñññ 5kg
    // Abs 4x15
    // Biceps 5kg ñññ 10kg ñ

    // Espalda sentado nuca 20kg ñ
    // Espalda remo 20kg ñ

    return {
      data
    }
  }
})
</script>
