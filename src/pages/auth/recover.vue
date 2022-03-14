<template>

      <form @submit.prevent="recover">
      <q-card inline class="bigger q-ma-sm fixed-center" style="background-color:white;opacity:0.9;">

          <q-card-section class="text-center">
            Inicio de Sesión
          </q-card-section>

          <q-separator/>

          <q-card-section>
              <div>
                <!--ul v-for="message in form.errors">
                  <li v-text="message['email']"></li>
                </ul-->
                Oh! hay problemas con los datos
              </div>

            <q-input
            orientation="vertical"
              label="Corre electrónico"
              v-model="vform.email"
              type="text"
            />

          </q-card-section>

          <q-card-actions>
            <q-btn color="primary" type="submit" class="full-width" label="Recuperar contraseña" :loading="store.getters.getLoadingState"></q-btn>
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
        email: ''
      })

    return {
      store,
      vform,
      router,
      recover: async () => {
        store.dispatch('auth/recoverPassword', vform)
        // const { data } = await this.form.post('/api/login')
        // // Save the token.
        // this.store.dispatch('saveToken', {
        //   token: data.token,
        //   remember: this.remember,
        //   permissions: data.permissions,
        //   roles: data.roles
        // })

        // // Fetch the user.
        // await this.store.dispatch('fetchUser')

        // // Redirect dashboard.
        // this.router.push({ name: 'dashboard' })
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
