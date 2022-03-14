<template>
  <form @submit.prevent="login">
    <q-card
      inline
      class="bigger q-ma-sm fixed-center"
      style="background-color: white; opacity: 0.9"
    >
      <q-card-section class="text-center"> Registrarse </q-card-section>

      <q-separator />

      <q-card-section>
        <div>
          <!--ul v-for="message in form.errors">
                  <li v-text="message['email']"></li>
                </ul-->
          Oh! hay problemas con los datos
        </div>

        <q-input
          orientation="vertical"
          label="Nombre"
          v-model="vform.name"
          type="text"
        />
        <br>
        <q-input
          orientation="vertical"
          label="Usuario"
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
      <!-- <q-card-actions>
        <q-btn
          round
          color="primary"
          :loading="store.getters.getLoadingState"
          icon="mail"
        ></q-btn>
      </q-card-actions> -->
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
      login: async () => {
        store.dispatch('auth/registerUser', vform)
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
