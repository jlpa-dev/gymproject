<template>
  <q-layout view="lHh Lpr lFf">
 <q-ajax-bar position="top" ref="acall" @start="store.dispatch('is_loading', true)" @stop="store.dispatch('is_loading', false)"> </q-ajax-bar>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          MVP GYM
        </q-toolbar-title>

        <div>Quasar v0.0.1</div>
      </q-toolbar>
      <!-- Second row of header is a QTabs -->
      <!--q-tabs color="gprimary" v-if="this.$store.getters.listTabs.length > 0"-->
      <q-tabs align="left" color="gprimary" v-if="store.getters.listTabs.length > 0">
        <q-route-tab
          v-for="tab in store.getters.listTabs"
          :icon="tab.icon"
          :to="tab.to"
          :label="tab.label"
          :key="tab.id" />
      </q-tabs>
    </q-header>

    <q-page-container>
        <q-inner-loading :showing="store.getters.getLoadingState" style="z-index:10;">
          <q-spinner-gears size="80px" color="primary" ></q-spinner-gears>
        </q-inner-loading>
        <!-- Ajax Bar Loading -->

      <router-view />

    </q-page-container>

  </q-layout>
  <q-resize-observer @resize="onResize" />
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'MainLayout',

  components: {
    // EssentialLink
  },

  setup () {
    const acall = ref(''),
      store = useStore()

    onMounted(() => {
    //   acall.value.start()
    })
    const onResize = (size) => {
      // console.log(this.$store.getters.getScreenDim)
      // {
      //   width: 1200 // width of viewport (in px)
      //   height: 920 // height of viewport (in px)
      // }

      store.dispatch('ScreenDim', { width: size.width, height: size.height })
    }

    return {
      onResize,
      store,
      acall
    }
  }

})
</script>
