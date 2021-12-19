<template>
  <v-app>
    <project-list-top-bar />
    <project-list />
  </v-app>
</template>

<script>
import ProjectList from '@/components/project-list/ProjectList';
import ProjectListTopBar from '@/components/project-list/ProjectListTopBar';

export default {
  name: 'project-view',
  components: {
    ProjectList,
    ProjectListTopBar,
  },
}
</script>

<style scoped>
</style>