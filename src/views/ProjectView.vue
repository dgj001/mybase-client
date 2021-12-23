<template>
  <v-app class="project-view">
    <project-top-bar />
    <v-main>
      <v-container style="height: 100%">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ProjectTopBar from '../components/project/ProjectTopBar';

export default {
  name: 'project-view',
  components: {
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