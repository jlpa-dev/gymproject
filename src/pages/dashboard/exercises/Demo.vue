<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <q-card class="q-mb-sm">
        <q-card-section>
          <q-icon name="card_travel" /> Información general
        </q-card-section>
        <q-card-section>
          <div class="row">
            <q-input
              class="col-xs-12 col-md-6 q-pa-sm"
              orientation="vertical"
              :count="50"
              value=""
              v-model="vform.nombre"
              label="Nombre"
            />
            <q-select
              class="col-xs-12 col-md-6 q-pa-sm"
              v-model="vform.tipo"
              :options="EXERCISE_TYPES"
              label="Tipo"
              emit-value
              map-options
            ></q-select>
          </div>
          <div>
            <q-input
              class="col-xs-12 col-md-6 q-pa-sm"
              orientation="vertical"
              :count="50"
              value=""
              v-model="vform.peso_sugerido"
              label="Peso Sugerido"
            />
            <q-input
              class="col-xs-12 col-md-6 q-pa-sm"
              orientation="vertical"
              :count="50"
              value=""
              v-model="vform.series_sugeridas"
              label="Series Sugeridas"
            ></q-input>
          </div>

          <div class="row">
            <q-input
              class="col-xs-12 col-md-6 q-pa-sm"
              orientation="vertical"
              :count="20"
              type="textarea"
              value=""
              v-model="vform.descripcion"
              label="Descripción"
            />
            <q-input
              class="col-xs-12 col-md-6 q-pa-sm"
              orientation="vertical"
              :count="20"
              type="textarea"
              value=""
              v-model="vform.sugerencias"
              label="Sugerencias"
            />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-icon name="card_travel" /> Representación de ejercicio
        </q-card-section>
        <q-card-section class="row">
          <q-card class="col-sm-12 col-md-6 q-pa-sm">
            <FileUploadPreview
              :files="vform.portada"
              label="Portada del Ejercicio"
              class="col-md-6"
              spinner-color="white"
              v-model="vform.portada"
            />
          </q-card>
        </q-card-section>
      </q-card>
    </div>

    <!-- FIXED BUTTONS -->
    <q-btn
      round
      color="positive"
      size="lg"
      class="fixed"
      icon="save"
      style="right: 18px; bottom: 18px"
      :loading="store.getters.getLoadingState"
      @click="save()"
    >
      <q-tooltip :delay="500">Guardar</q-tooltip>
    </q-btn>
    <!-- FIXED BUTTONS #END -->
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { apiAdmin } from 'src/boot/axios'
// import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import toFormData from 'src/helper/toFormData'
import FileUploadPreview from 'src/components/FileUploadPreview/FileUploadPreview'
import { useQuasar } from 'quasar'

import { EXERCISE_TYPES } from 'src/helper/options'
export default defineComponent({
  name: 'ExercisesCreate',
  components: {
    FileUploadPreview
  },
  setup () {
    const store = useStore()
    // const router = useRouter()
    const $q = useQuasar()
    const vform = reactive({
      nombre: '',
      descripcion: '',
      sugerencias: '',
      portada: '',
      peso_sugerido: '',
      series_sugeridas: ''
    })

    const save = async () => {
      try {
        await apiAdmin({
          method: 'POST',
          url: '/exercises',
          data: toFormData(vform)
        })
        // Redirect back
        // router.go(-1)
        $q.notify({
          color: 'positive',
          textColor: 'white',
          icon: 'check',
          message: 'Equipo creado satisfactoriamente',
          position: 'top-right',
          avatar: '',
          timeout: 1500
        })
      } catch (error) {

      }
    }

    return {
      vform,
      save,
      store,
      EXERCISE_TYPES
    }
  }

})

//   try {
//         await apiAdmin({
//           method: 'GET',
//           url: '/exercises/' + id
//         }).then(({ data }) => {
//           vform.nombre = data.data.nombre
//           vform.tipo = data.data.tipo
//           vform.sugerencias = data.data.sugerencias
//           vform.peso_sugerido = data.data.peso_sugerido
//           vform.series_sugeridas = data.data.series_sugeridas
//           vform.descripcion = data.data.descripcion

//           demo.value = data.data.demo[0] || []
//           portada.value = data.data.portada[0] || []
//         })
//       } catch (error) {

//       }
</script>
