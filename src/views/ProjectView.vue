<template>
  <v-app class="project-view">
    <top-bar :show-project-list="true" />
    <v-main>
      <v-container style="height: 100%">
        <database style="height: 95%"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Database from '../components/database/Database';
import TopBar from '../components/TopBar';

export default {
  name: 'project-view',
  components: {
    Database,
    TopBar,
  },
}
</script>

<style>
html { 
  overflow-y: auto;
}
</style>

<style scoped>
.project-view {  
  background-color: #f0f0f0;
}
</style>