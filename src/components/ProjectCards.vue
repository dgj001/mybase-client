<template>
  <div>
    <v-card
      v-for="project of projectList"
      :key="project._id"
      elevation="2"
    >
      <v-card-title>{{ project.name }}</v-card-title>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'project-cards',
  computed: {
    ...mapGetters('projectList', {
      projectList: 'getList'
    }),
  },
  mounted() {
    this.fetchProjects();
  },
  methods: {
    ...mapActions('projectList', {
      fetchProjects: 'fetch',
    }),
  }
}
</script>

<style scoped>

</style>