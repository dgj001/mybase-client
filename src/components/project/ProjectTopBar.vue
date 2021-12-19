<template>
  <v-app-bar app flat clipped-left color="primary" height="48px">
    <v-img 
      src="@/assets/logo.svg"
      class="logo"
      max-height="100%"
      max-width="48px"
    />
    <div class="mybase pl-2 pr-6">MyBase</div>
    <project-selector />
    <v-spacer />
    <v-menu
      bottom
      left
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item dense @click="doLogout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex';
import ProjectSelector from './ProjectSelector';

export default {
  name: 'project-top-bar',
  components: { 
    ProjectSelector 
  },
  methods: {
    ...mapActions('auth', {
      logout: 'logout',
    }),
    doLogout() {
      this.logout();      
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.mybase {
  color: white;  
}
</style>