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
              label="Portada del Ejercicio"
              class="col-md-6"
              spinner-color="white"
              v-model="portada"
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
import { defineComponent, reactive, ref } from 'vue'
import { db, storage, firebase } from 'src/boot/firebase'
import { upload } from 'src/helper/firebaseUpload'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import FileUploadPreview from 'src/components/FileUploadPreview/FileUploadPreview'
import { useQuasar } from 'quasar'

import { EXERCISE_TYPES } from 'src/helper/options'
import { getMetadata } from 'src/helper/imageMeta'

export default defineComponent({
  name: 'ExercisesCreate',
  components: {
    FileUploadPreview
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const $q = useQuasar()
    const vform = reactive({
      nombre: '',
      descripcion: '',
      sugerencias: '',
      peso_sugerido: '',
      series_sugeridas: ''
    })

    const portada = ref([])

    const save = async () => {
      const ref = await db.collection('exercises')
      const id = await db.collection('exercises').doc().id

      if (portada.value.length > 0) {
        const meta = await getMetadata(portada.value[0])
        const uploadTask = storage.ref(`exercises/${id}/portada.jpg`).put(portada.value[0], meta)

        const downloadURL = await upload(uploadTask)

        ref.add({
          id,
          ...vform,
          estado: 1,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          portada: [{
            ...meta,
            mediaLink: downloadURL
          }]
        }).then(async response => {
          console.log(response)
        }).catch(error => console.log(error))
      }

      $q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'check',
        message: 'Ejercicio creado satisfactoriamente',
        position: 'top-right',
        avatar: '',
        timeout: 1500
      })
      router.go(-1)
    }

    return {
      vform,
      save,
      store,
      EXERCISE_TYPES,
      portada
    }
  }

})
</script>
