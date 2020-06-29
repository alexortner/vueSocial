<template>
  <v-app class="grey lighten-4">
    <router-view name="navigation"></router-view>
    <v-content >
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
//import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
  },

  data: () => ({
    //
  }),
};
</script>

