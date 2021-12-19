<template>
  <div class="select-container">
    <v-select
      :items="projectList"
      :value="selectedId"
      item-text="name"
      item-value="_id"
      hide-details
      dark
      dense
      @change="select"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'project-selector',
  computed: {
    ...mapGetters('projectList', {
      projectList: 'getList',
      selectedId: 'getSelectedId',
    }),
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    ...mapActions('projectList', {
      fetchProjects: 'fetch',
      selectProject: 'select'
    }),
    select(value) {
      this.$router.push({ 
        name: `project`, 
        params: { id: value },
      });
      this.selectProject({ projectId: value });
    },
  },
}
</script>

<style scoped>

</style>