<template>
  <v-app class="project-view">
    <v-main>
      <v-container style="height: 100%">
        <database style="height: 95%"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Database from '../components/database/Database';

export default {
  name: 'project-view',
  components: {
    Database
  },
}
</script>

<style scoped>
.project-view {  
  background-color: #f4f4f4;
}
</style>