<template>
  <form @submit.prevent="register">
    <q-card
      inline
      class="bigger q-ma-sm fixed-center"
      style="background-color: white; opacity: 0.9"
    >
      <q-card-section class="text-center"> Registrarse </q-card-section>

      <q-separator />

      <q-card-section>
        <!-- <div>
          Oh! hay problemas con los datos
        </div> -->

        <q-input
          orientation="vertical"
          label="Nombre"
          v-model="vform.name"
          type="text"
        />
        <br>
        <q-input
          orientation="vertical"
          label="Email"
          v-model="vform.email"
          type="text"
        />
        <br>
        <q-input
          type="password"
          label="Contraseña"
          v-model="vform.password"
          value="password"
        />
      </q-card-section>

      <q-card-actions>
        <q-btn
          color="primary"
          type="submit"
          class="full-width"
          label="Registrarse"
          :loading="store.getters.getLoadingState"
        ></q-btn>
      </q-card-actions>

      <q-separator />

    </q-card>
  </form>
</template>

<script>
import { useStore } from 'vuex'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup () {
    const store = useStore(),
      router = useRouter(),
      vform = reactive({
        name: '',
        email: '',
        password: ''
      })

    return {
      store,
      vform,
      router,
      register: async () => {
        await store.dispatch('auth/registerUser', vform)

        // Redirect dashboard.
        router.push({ name: 'login' })
      }
    }
  }
}
</script>

<style >
.login-container {
  background-color: white;
}
</style>
