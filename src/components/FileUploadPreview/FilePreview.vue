<template>
    <q-item>
        <q-item-section>
            {{oFile.name}}
        </q-item-section>
        <q-item-section avatar>
           <q-avatar rounded v-if="oFile.type === 'image/png'">
                <img :src="fileURL"/>
          </q-avatar>
        </q-item-section>
        <q-item-section side v-if="controls">
           <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" flat dense round icon="remove_red_eye" @click="showItem()"></q-btn>
            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="removeItem()"></q-btn>
          </div>
        </q-item-section>
    </q-item>
</template>

<script>
import { defineComponent, toRefs, ref, watch } from 'vue'

export default defineComponent({
  name: 'FilePreview',
  props: {
    file: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    id: {
      type: String,
      required: false,
      default: null
    },
    controls: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['removeItem'],
  setup (props, { emit }) {
    const { file: oFile, index: oIndex, id: oId } = toRefs(props),
      fileURL = ref(oFile.value ? URL.createObjectURL(oFile.value) : null)

    watch(oFile, () => {
      fileURL.value = URL.createObjectURL(oFile.value)
    })

    const removeItem = () => {
      emit('removeItem', { index: oIndex.value, id: oId.value })
    }

    const showItem = () => {
      alert('show')
    }

    return {
      fileURL,
      oFile,
      removeItem,
      showItem
    }
  }
})
</script>
