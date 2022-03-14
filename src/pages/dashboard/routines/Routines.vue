<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <div class="row">
        <q-breadcrumbs active-color="white" style="font-size: 16px">
          <q-breadcrumbs-el label="Rutinas" icon="home"></q-breadcrumbs-el>
        </q-breadcrumbs>
      </div>

      <div class="row">
        <q-btn
          round
          class="q-my-md"
          color="positive"
          size="md"
          icon="add"
          @click="show()"
        >
          <q-tooltip :delay="500">Agregar</q-tooltip>
        </q-btn>
      </div>

      <div class="row">
        <!--Datatable-->

        <q-table
          class="col-md-12"
          grid
          card-class="bg-primary text-white"
          :rows="rows"
          :columns="columns"
          row-key="name"
          :filter="filter"
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
                  <strong>{{ props.row.name }}</strong>
                </q-card-section>
                <q-card-section class="text-center">
                  {{ props.row.tipo }}
                </q-card-section>
                <q-separator></q-separator>
                <q-card-section>
                  <q-list bordered separator>
                    <q-item
                      clickable
                      v-ripple
                      :active="active"
                      v-for="(ejercicio, index) in props.row.ejercicios"
                      :key="index"
                      active-class="text-orange"
                    >
                      <q-item-section>{{ ejercicio.nombre }}</q-item-section>
                      <q-item-section side>{{
                        ejercicio.tipo === "cardio"
                          ? ejercicio.tiempo_minutos + "m"
                          : ejercicio.series + "x" + ejercicio.repeticiones
                      }}</q-item-section>
                    </q-item>
                  </q-list>
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
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'RoutinesIndex',
  setup () {
    const router = useRouter()
    // const route = useRoute()

    const columns = [
      {
        name: 'desc',
        required: true,
        label: 'Dessert (100g serving)',
        align: 'left',
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true
      },
      {
        name: 'tipo',
        align: 'center',
        label: 'Tipo',
        field: 'tipo',
        sortable: true
      },
      {
        name: 'ejercicios',
        align: 'center',
        label: 'Ejercicios',
        field: 'ejercicios',
        sortable: true
      }
    ]

    const rows = [
      {
        name: 'Fortalecimiento Muscular',
        tipo: 'intensidad',
        ejercicios: [
          {
            nombre: 'Corredor',
            descripcion: 'Corredor',
            completado: 5,
            peso_kg: null,
            repeticiones: 1,
            series: 1,
            tipo: 'cardio',
            tiempo_minutos: 10
          },
          {
            nombre: 'Piernas de echado',
            descripcion: 'Piernas de echado',
            completado: 5,
            tipo: 'peso',
            repeticiones: 15,
            series: 4,
            peso_kg: 20,
            tiempo_minutos: null
          },
          {
            nombre: 'Piernas de echado',
            descripcion: 'Piernas de echado',
            completado: 5,
            repeticiones: 15,
            series: 4,
            tipo: 'peso',
            peso_kg: 20,
            tiempo_minutos: null
          },
          {
            nombre: 'Piernas sentado',
            descripcion: 'Piernas sentado',
            completado: 5,
            tipo: 'peso',
            repeticiones: 15,
            series: 4,
            peso_kg: 10,
            tiempo_minutos: null
          },
          {
            nombre: 'Sentadillas en maquina',
            descripcion: 'Sentadillas en maquina',
            completado: 5,
            tipo: 'peso',
            repeticiones: 15,
            series: 4,
            peso_kg: 10,
            tiempo_minutos: null
          },
          {
            nombre: 'Pecho en maquina',
            descripcion: 'Pecho en maquina',
            completado: 5,
            tipo: 'peso',
            repeticiones: 15,
            series: 4,
            peso_kg: 10,
            tiempo_minutos: null
          },
          {
            nombre: 'Hombros en maquina',
            descripcion: 'Hombros en maquina',
            completado: 5,
            repeticiones: 15,
            series: 4,
            tipo: 'peso',
            peso_kg: 10,
            tiempo_minutos: null
          },
          {
            nombre: 'Pecho en maquina de arco',
            descripcion: 'Pecho en maquina de arco',
            completado: 5,
            tipo: 'peso',
            repeticiones: 15,
            series: 4,
            peso_kg: 15,
            tiempo_minutos: null
          },
          {
            nombre: 'Maquina de arco inflador de llanta',
            descripcion: 'Maquina de arco inflador de llanta',
            completado: 5,
            tipo: 'peso',
            repeticiones: 15,
            series: 4,
            peso_kg: 15,
            tiempo_minutos: null
          },
          {
            nombre: 'La soguita de al frente',
            descripcion: 'La soguita de al frente',
            completado: 5,
            repeticiones: 15,
            series: 4,
            tipo: 'peso',
            peso_kg: 10,
            tiempo_minutos: null
          },
          {
            nombre: 'La soguita de al frente',
            descripcion: 'La soguita de al frente',
            completado: 5,
            repeticiones: 15,
            series: 4,
            tipo: 'cuerpo',
            peso_kg: null,
            tiempo_minutos: null
          },
          {
            nombre: 'Maquina biceps',
            descripcion: 'Maquina biceps',
            completado: 5,
            repeticiones: 15,
            series: 4,
            tipo: 'peso',
            peso_kg: 10,
            tiempo_minutos: null
          },
          {
            nombre: 'Espalda sentado nuca',
            descripcion: 'Espalda sentado nuca',
            completado: 5,
            repeticiones: 15,
            series: 4,
            tipo: 'peso',
            peso_kg: 20,
            tiempo_minutos: null
          },
          {
            nombre: 'Espalda remo',
            descripcion: 'Espalda remo',
            completado: 5,
            repeticiones: 15,
            series: 4,
            tipo: 'peso',
            peso_kg: 20,
            tiempo_minutos: null
          }
        ]
      },
      {
        name: 'Musculación Pecho',
        tipo: 'intensidad',
        ejercicios: [
          {
            nombre: 'Pecho en máquina',
            descripcion: 'Pecho en máquina',
            completado: 5,
            repeticiones: 12,
            series: 4,
            tipo: 'peso',
            peso_kg: 20,
            tiempo_minutos: null
          },
          {
            nombre: 'Pecho mancuernas',
            descripcion: 'Pecho mancuernas',
            completado: 5,
            repeticiones: 12,
            series: 4,
            tipo: 'peso',
            peso_kg: 10,
            tiempo_minutos: null
          },
          {
            nombre: 'Pecho camilla',
            descripcion: 'Pecho camilla',
            completado: 5,
            repeticiones: 12,
            series: 4,
            tipo: 'peso',
            peso_kg: 10,
            tiempo_minutos: null
          },
          {
            nombre: 'Pecho maquina alta',
            descripcion: 'Pecho maquina alta',
            completado: 5,
            repeticiones: 12,
            series: 4,
            tipo: 'peso',
            peso_kg: 15,
            tiempo_minutos: null
          }
        ]
      },
      {
        name: 'Musculación Triceps',
        tipo: 'intensidad',
        ejercicios: [
          {
            nombre: 'Triceps inflador de llanta',
            descripcion: 'Triceps inflador de llanta',
            completado: 5,
            repeticiones: 12,
            series: 4,
            tipo: 'peso',
            peso_kg: 20,
            tiempo_minutos: null
          },
          {
            nombre: 'Triceps soguita arriba de cabeza',
            descripcion: 'Triceps soguita arriba de cabeza',
            completado: 5,
            repeticiones: 12,
            series: 4,
            tipo: 'peso',
            peso_kg: 20,
            tiempo_minutos: null
          },
          {
            nombre: 'Triceps elevaciones',
            descripcion: 'Triceps elevaciones',
            completado: 5,
            repeticiones: 5,
            series: 4,
            tipo: 'cuerpo',
            peso_kg: null,
            tiempo_minutos: null
          }
        ]
      },
      {
        name: 'Musculación Piernas',
        tipo: 'intensidad',
        ejercicios: [
          {
            nombre: 'Sentadillas en maquina parado',
            descripcion: 'Sentadillas en maquina parado',
            completado: 5,
            repeticiones: 12,
            series: 4,
            tipo: 'peso',
            peso_kg: 15,
            tiempo_minutos: null
          },
          {
            nombre: 'Sentadillas en máquina inclinado',
            descripcion: 'Sentadillas en máquina inclinado',
            completado: 5,
            repeticiones: 12,
            series: 4,
            tipo: 'peso',
            peso_kg: 15,
            tiempo_minutos: null
          },
          {
            nombre: 'Piernas sentado',
            descripcion: 'Piernas sentado',
            completado: 5,
            repeticiones: 12,
            series: 4,
            tipo: 'peso',
            peso_kg: 10,
            tiempo_minutos: null
          },
          {
            nombre: 'Piernas gluteos boca abajo',
            descripcion: 'Piernas gluteos boca abajo',
            completado: 5,
            repeticiones: 12,
            series: 4,
            tipo: 'peso',
            peso_kg: 10,
            tiempo_minutos: null
          }
        ]
      }
    ]

    const show = () => {
      router.push({ name: 'routines.show', params: { id: 'asdd' } })
    }

    return {
      columns,
      filter: ref(''),
      rows,
      show
    }
  }
})
</script>
