<template>
  <q-layout view="lHh Lpr lFf">
 <q-ajax-bar position="top" ref="acall" @start="store.dispatch('is_loading', true)" @stop="store.dispatch('is_loading', false)"> </q-ajax-bar>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

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
    <q-drawer
        v-model="leftDrawerOpen"
        :breakpoint="500"
        bordered
        class="bg-white-2"
      >
        <q-scroll-area class="fit">
          <q-list>
            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item  :to="menuItem.to" clickable :active="menuItem.label === 'Outbox'" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon"></q-icon>
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index"  v-if="menuItem.separator"></q-separator>
            </template>
          </q-list>
           <q-separator />

        <q-item>
            <q-item-section>
                 <q-btn color="negative" class="full-width" label="Cerrar Sesión" @click="logout()" />
            </q-item-section>
        </q-item>
        </q-scroll-area>
      </q-drawer>

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
    const acall = ref('')
    const leftDrawerOpen = ref(false),
      menuList = [
        {
          icon: 'inbox',
          label: 'Inicio',
          separator: true,
          to: '/dashboard'
        },
        {
          icon: 'send',
          label: 'Rutinas',
          separator: false,
          to: '/dashboard/rutinas'
        },
        {
          icon: 'send',
          label: 'Ejercicios',
          separator: false,
          to: '/dashboard/ejercicios'
        }

      ],
      store = useStore(),
      toggleLeftDrawer = () => {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }

    const logout = () => {
      store.dispatch('auth/logoutUser')
    }
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
    //   essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer,
      menuList,
      onResize,
      store,
      acall,
      logout
    }
  }

})
</script>
