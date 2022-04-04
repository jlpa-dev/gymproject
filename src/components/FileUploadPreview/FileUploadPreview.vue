<template>
    <q-file
        v-model="oFiles"
        ref="multipleFilesInput"
        :label="label"
        filled
        :multiple="multiple"
        append
    ></q-file>
    <q-list>
        <FilePreview
            @removeItem="removeItem"
            v-for="(file, index) in files"
            :controls="multiple"
            :key="index"
            :index="index"
            :id="file.id"
            :file="file"
        />
    </q-list>
</template>

<script>
import { computed, defineComponent, ref, watch } from 'vue'
import FilePreview from './FilePreview'

export default defineComponent({
  name: 'FileUploadPreview',
  components: {
    FilePreview
  },
  emits: ['update:modelValue'],
  props: {
    label: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    modelValue: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  setup (props, { emit }) {
    const oFiles = ref([]),
      multipleFilesInput = ref([])

    const removeItem = ({ index, id }) => {
      multipleFilesInput.value.removeAtIndex(index)
    }

    const files = computed(
      () => {
        if (oFiles.value[Symbol.iterator] === undefined) {
          return [oFiles.value]
        } else {
          return oFiles.value
        }
      }
    )

    watch(() => oFiles.value, () => {
      emit('update:modelValue', files.value)
    })

    return {
      oFiles,
      removeItem,
      multipleFilesInput,
      files
    }
  }
})
</script>
