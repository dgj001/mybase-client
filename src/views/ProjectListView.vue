<template>
  <v-app>
    <project-list-top-bar />
    <project-cards />
  </v-app>
</template>

<script>
import ProjectCards from '@/components/project-list/ProjectCards';
import ProjectListTopBar from '@/components/project-list/ProjectListTopBar';

export default {
  name: 'project-view',
  components: {
    ProjectCards,
    ProjectListTopBar,
  },
}
</script>

<style scoped>
</style>