<template>

    <form @submit.prevent="login">
        <q-card inline class="bigger q-ma-sm fixed-center" style="background-color:white;opacity:0.9;">

            <q-card-section class="text-center">
                Inicio de Sesión
            </q-card-section>

            <q-separator/>

            <q-card-section>
                <!-- <div>
                    Oh! hay problemas con los datos
                </div> -->

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
                <q-btn color="primary" type="submit" class="full-width" label="Inicio" :loading="store.getters.getLoadingState"></q-btn>
            </q-card-actions>
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
        email: '',
        password: ''
      })

    return {
      store,
      vform,
      router,
      login: async () => {
        await store.dispatch('auth/loginUser', vform)
        // if (store.getters('auth/success')) {
        //   // Redirect dashboard.
        //   router.push({ name: 'dashboard' })
        // } else {
        //   store.getters('auth/messages')
        // }
      }
    }
  }
}
</script>

<style >
  .login-container {
    background-color: white
  }

</style>
