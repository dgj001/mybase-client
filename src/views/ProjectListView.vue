<template>
  <v-app>
    <top-bar />
    <project-cards />
  </v-app>
</template>

<script>
import ProjectCards from '@/components/ProjectCards';
import TopBar from '@/components/TopBar';

export default {
  name: 'project-view',
  components: {
    ProjectCards,
    TopBar,
  },
}
</script>

<style scoped>
</style>