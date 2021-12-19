<template>
  <v-app class="project-view">
    <project-top-bar />
    <v-main>
      <v-container style="height: 100%">
        <database style="height: 95%"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Database from '../components/project/Database';
import ProjectTopBar from '../components/project/ProjectTopBar';

export default {
  name: 'project-view',
  components: {
    Database,
    ProjectTopBar,
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