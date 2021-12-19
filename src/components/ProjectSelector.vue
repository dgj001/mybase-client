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
    >
      <template v-slot:prepend-item>
        <v-list-item @click="gotoAll">
          <v-list-item-content>
            <v-list-item-title>
              Show all projects
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mt-2" />
      </template>
    </v-select>
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
    gotoAll() {
      this.$router.push({ name: 'projects' });
    },
  },
}
</script>

<style scoped>
</style>