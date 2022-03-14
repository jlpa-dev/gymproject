<template>
    <q-file
        v-model="oFiles"
        ref="multipleFilesInput"
        :label="label"
        filled
        :multiple="multiple"
        @input="handleInput"
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
import { computed, defineComponent, ref } from 'vue'
import FilePreview from './FilePreview'

export default defineComponent({
  name: 'FileUploadPreview',
  components: {
    FilePreview
  },
  emits: ['removeItem', 'input'],
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
      type: String,
      default: '',
      required: true
    }
  },
  setup (props, { emit }) {
    const oFiles = ref([]),
      multipleFilesInput = ref('')

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

    const handleInput = () => {
      console.log(files)
      emit('update:modelValue', files)
    }
    return {
      oFiles,
      removeItem,
      handleInput,
      multipleFilesInput,
      files
    }
  }
})
</script>
