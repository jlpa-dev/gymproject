<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <div class="row">
        <q-breadcrumbs active-color="white" style="font-size: 16px">
          <q-breadcrumbs-el label="Ejercicios" icon="home"></q-breadcrumbs-el>
        </q-breadcrumbs>
      </div>

      <div class="row">
        <q-btn
          round
          class="q-my-md"
          color="positive"
          size="md"
          icon="add"
          @click="create()"
        >
          <q-tooltip :delay="500">Agregar</q-tooltip>
        </q-btn>
      </div>

      <div class="row">
        <!--Datatable-->
        <q-table
        ref="dtb"
          class="col-md-12"
          grid
          card-class="bg-primary text-white"
          :rows="rows"
          :columns="columns"
          row-key="name"
          :filter="filter"
          @request=tableData
          hide-header
        >
          <template v-slot:top-left>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search"></q-icon>
              </template>
            </q-input>
          </template>

          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-xl-2">
              <q-card>
                <q-card-section class="text-center">
                  <strong>{{ props.row.nombre }}</strong>
                </q-card-section>
                <q-card-section class="text-center">
                  Tipo: {{ props.row.tipo }}
                  <br />
                  {{ props.row.descripcion }}
                </q-card-section>

                <q-separator></q-separator>
                <q-card-section class="flex flex-center">
                  <q-avatar square size="200px" class="shadow-10">
                    <img :src="props.row.portada.length > 0 ? props.row.portada[0].mediaLink:''" />
                  </q-avatar>
                </q-card-section>
                <q-separator></q-separator>
                <q-card-section class="flex flex-center">
                  <q-btn
                    round
                    color="info"
                    class="q-mx-xs"
                    size="md"
                    icon="remove_red_eye"
                    @click="show(props.row.id)"
                  >
                    <q-tooltip :delay="500">Agregar</q-tooltip>
                  </q-btn>
                  <q-btn
                    round
                    color="primary"
                    size="md"
                    class="q-mx-xs"
                    icon="edit"
                    @click="edit(props.row.id)"
                  >
                    <q-tooltip :delay="500">Editar</q-tooltip>
                  </q-btn>
                   <q-btn
                    round
                    color="negative"
                    size="md"
                    class="q-mx-xs"
                    icon="delete"
                    @click="remove(props.row.id)"
                  >
                    <q-tooltip :delay="500">Eliminar</q-tooltip>
                  </q-btn>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiAdmin } from 'src/boot/axios'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'ExerciseList',
  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const dtb = ref('')
    const tablePagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 10
    })

    const rows = ref([])

    const columns = [
      {
        name: 'desc',
        required: true,
        label: 'Dessert (100g serving)',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true

      },
      { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
      { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
      { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
      { name: 'image', label: 'Image', field: 'image' }
    ]

    const show = (id) => {
      router.push({ name: 'exercises.show', params: { id: id } })
    }

    const edit = (id) => {
      router.push({ name: 'exercises.edit', params: { id: id } })
    }

    const create = () => {
      router.push({ name: 'exercises.create' })
    }

    const remove = (id) => {
      $q.dialog({
        title: 'Confirmar',
        message: 'Esta seguro que desea eliminar este equipo [ ' + id + ' ].',
        ok: 'Si, seguro',
        preventClose: true,
        cancel: 'Cancelar',
        color: 'negative'
      }).onOk(() => {
        $q.notify({
          message: 'Eliminando...!',
          timeout: 1000
        })

        apiAdmin
          .delete('/exercises/' + id)
          .then(({ data }) => {
            dtb.value.requestServerInteraction()
            $q.notify({
              color: 'positive',
              textColor: 'white',
              icon: 'check',
              message: 'Equipo eliminado satisfactoriamente',
              position: 'top-right',
              avatar: '',
              timeout: 3000
            })
          })
      }).onCancel(() => {
        $q.notify({
          message: 'Acción Cancelada',
          timeout: 1000
        })
      })
    }

    const tableData = (props) => {
      console.log(props)
      const { page, rowsPerPage, filter } = props.pagination
      apiAdmin
        .get(`/exercises?page=${page}&per_page=${rowsPerPage}&filter=${filter}`)
        .then(({ data }) => {
          // updating pagination to reflect in the UI
          tablePagination.value = props.pagination

          // then we update the rows with the fetched ones
          rows.value = data.data

        // finally we tell QTable to exit the "loading" state
        // this.$store.dispatch( 'is_loading' , false )
        })
    }

    onMounted(() => {
      tableData({
        pagination: tablePagination.value,
        filter: undefined
      })
    })

    return {
      columns,
      filter: ref(''),
      rows,
      show,
      edit,
      create,
      remove,
      tableData,
      dtb
    }
  }
})
</script>

<style scoped>
.q-card:hover {
  opacity: 70%;
}
</style>
