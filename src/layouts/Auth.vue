<template>
  <q-layout view="lHh Lpr lFf" style="">
    <!-- Ajax Bar Loading -->
    <q-ajax-bar position="top" ref="acall" @start="store.dispatch('is_loading', true)" @stop="store.dispatch('is_loading', false)" />
    <q-page-container>
        <q-page padding class="card-examples row items-start">

    <q-card-section style="margin:auto;top:-200px;">
         <!-- <q-icon
                contain
                class="gt-sm"
                name="img:./statics/brands/mapea_red.svg"
                spinner-color="white"
                size="7.6rem"
                style="height:100%;float:right;display:flex;align-items:center;justify-content:center;"
            /> -->
      </q-card-section>
      <router-view/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script type="text/javascript">
import { useStore } from 'vuex'
export default {
  name: 'LayoutLogin',
  setup () {
    const store = useStore()

    return {
      store
    }
  }
}
</script>

<style type="text/css">

</style>
