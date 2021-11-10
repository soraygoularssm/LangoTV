<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-pink-6">
      <q-toolbar>
        <q-toolbar-title>
          LangoTV
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      side="right"
      v-model="rightDrawerOpen"
      show-if-above
      
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay

      :width="200"
      :breakpoint="500"

      class="bg-pink-6 text-white"
    >
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'خانه',
    caption: 'quasar.dev',
    icon: 'fas fa-home',
    link: '/'
  },
  {
    title: 'ورود - ثبت نام',
    caption: 'github.com/quasarframework',
    icon: 'fas fa-sign-in-alt',
    link: '/signup'
  },
  {
    title: 'داشبورد',
    caption: 'chat.quasar.dev',
    icon: 'school',
    link: '/dashboard'
  },
  {
    title: 'دفترچه من',
    caption: 'forum.quasar.dev',
    icon: 'book',
    link: '/notebook'
  },
  {
    title: 'لغت نامه',
    caption: '@quasarframework',
    icon: 'fas fa-book-open',
    link: '/vocalbulary'
  },
  {
    title: 'شنوایی',
    caption: '@QuasarFramework',
    icon: 'fas fa-assistive-listening-systems',
    link: '/listening'
  },
  {
    title: 'صحبت کردن',
    caption: 'Community Quasar projects',
    icon: 'fas fa-microphone',
    link: '/speaking'
  }
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const rightDrawerOpen = ref(false)
    const miniState= ref(true)

    return {
      essentialLinks: linksList,
      rightDrawerOpen,
      miniState,
      toggleLeftDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
})
</script>
